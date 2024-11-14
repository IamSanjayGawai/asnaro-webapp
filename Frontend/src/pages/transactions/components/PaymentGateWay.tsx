import { useState, useEffect } from "react";
import { selectTransaction } from "@/state/slices/transactionSlice";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import Spinner from "@/components/static/Spinner";
import PaymentCards from "../../../assets/Payment_Cards.jpg";
import { showPaymentModal } from "@/state/slices/transactionSlice";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { bankTransferPayment, newPayment } from "@/api/payment";
import { ThreeDSErrorType } from "@/types/types";
import { fetchTransactionThunk } from "@/state/thunks/transactionThunks";

const PaymentGateWay = () => {
  const [liveMonthError, setMonthLiveError] = useState("");
  const [liveYearError, setYearLiveError] = useState("");

  const [isCheckedCardFirst, setIsCheckedCardFirst] = useState(false);
  const [isCheckedCardSecond, setIsCheckedCardSecond] = useState(false);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { id } = useParams();
  const [_, setShowModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [appErr, setAppErr] = useState<ThreeDSErrorType>({
    error: "",
    details: [{ errCode: "", errInfo: "" }],
  });
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [bankTransferInitiated, setBankTransferInitiated] = useState(false);
  const [promisedPaymentDate, setPromisedPaymentDate] = useState<Date | null>(
    new Date()
  );
  const { transaction, paymentModalShow } = useAppSelector(selectTransaction);
  const transactionPromisedPaymentDate =
    transaction?.transaction?.promisedPaymentDate;
  const { loading } = useAppSelector(selectTransaction);
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    paymentType: "card",
    transactionId: id,
    amount: "",
  });
  const [formattedStr, setFormattedStr] = useState<string>("");
  const contractSignedDate = transaction?.transaction?.contractSignedDate;
  const transferDeadline = contractSignedDate
    ? new Date(
        new Date(contractSignedDate).setDate(
          new Date(contractSignedDate).getDate() + 7
        )
      )
        .toISOString()
        .split("T")[0]
    : null;

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (transaction?.transaction?.transaction_status === 3) {
      router(`/transaction/${id}/payment-completed`);
    }
    setAmount(
      transaction?.transaction?.quotation?.[0]?.totalAmountIncludingTax
    );
  }, [transaction]);

  useEffect(() => {
    setPaymentDetails((prev) => {
      return {
        ...prev,
        amount,
      };
    });
  }, [amount]);

  const fetchData = async () => {
    await dispatch(fetchTransactionThunk(id));
  };

  const handleInputCNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanedString = e.target.value.replace(/[^\d]/g, "");
    cleanedString = cleanedString.slice(0, 16);
    e.target.value = cleanedString;

    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    let groups = cleanedString.match(/.{1,4}/g);
    let formattedString = groups ? groups.join("-") : "";

    setFormattedStr(formattedString);
  };

  const handleInputNameChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const today = new Date().toISOString().split("T")[0];

  const handleInputMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanedString = e.target.value.replace(/[^\d]/g, "");
    cleanedString = cleanedString.slice(0, 2);

    if (parseInt(cleanedString, 10) <= 12) {
      const { name } = e.target;
      let formattedValue = cleanedString === "00" ? "" : cleanedString;
      setMonthInput(formattedValue);
      setMonthLiveError("");
      setPaymentDetails((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
      console.log(paymentDetails, typeof paymentDetails.expiryMonth);
    } else {
      setMonthInput(cleanedString);
      setMonthLiveError(`Invalid Month! もう一度確認してください。 `);
      cleanedString === "" && setMonthLiveError("");
    }
  };

  const handleInputYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleanedString = e.target.value.replace(/[^\d]/g, "");
    let currentEraLength = new Date().getFullYear().toString().length;
    cleanedString = cleanedString.slice(0, currentEraLength);
    if (parseInt(cleanedString) >= new Date().getFullYear()) {
      setYearInput(cleanedString);
      const { name } = e.target;

      setYearLiveError("");
      setPaymentDetails((prevState) => ({
        ...prevState,
        [name]: cleanedString,
      }));
    } else {
      setYearInput(cleanedString);
      setYearLiveError(`Invalid Year! もう一度確認してください。 `);
      cleanedString === "" && setYearLiveError("");
    }
  };

  const handleInputSecurityChange = (e) => {
    let val = e.target.value.slice(0, 3);
    val = val.match(/^\d{0,3}$/) ? val : "";
    e.target.value = val;

    const { name, value } = e.target;

    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(paymentDetails);
  };

  const resetCCPaymentDetails = () => {
    setPaymentDetails({
      cardNumber: "",
      cardholderName: "",
      expiryMonth: "",
      expiryYear: "",
      securityCode: "",
      paymentType: "card",
      transactionId: id,
      amount,
    });
    setFormattedStr("");
    setMonthInput("");
    setYearInput("");
  };

  const handleCCSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPaymentLoading(true);
    console.log("Payment details", paymentDetails);
    const ThreeDSResponse = await newPayment(paymentDetails);
    console.log("ThreeDSResponse", ThreeDSResponse);
    setPaymentLoading(false);
    if ("success" in ThreeDSResponse) {
      setRedirectUrl(ThreeDSResponse?.success?.redirectUrl);
    } else {
      setAppErr(ThreeDSResponse);
    }
    resetCCPaymentDetails();
  };

  const handleBankTransferSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("promisedPaymentDate", new Date(promisedPaymentDate));
    const bankTransferResponse = await bankTransferPayment(
      id,
      parseInt(amount),
      promisedPaymentDate
    );
    console.log("Bank Transfer Response", bankTransferResponse);
    if (bankTransferResponse?.success) {
      setBankTransferInitiated(true);
    } else {
      setAppErr(bankTransferResponse?.error);
    }
  };

  const handleFirstCheckboxChange = () => {
    setIsCheckedCardFirst(true);
    setIsCheckedCardSecond(false);
    setPaymentDetails((prevState) => ({
      ...prevState,
      paymentType: "card",
    }));
  };

  const handleSecondCheckboxChange = () => {
    setIsCheckedCardSecond(true);
    setIsCheckedCardFirst(false);
    setPaymentDetails((prevState) => ({
      ...prevState,
      paymentType: "bank",
    }));
  };

  const handleNavigateBack = () => {
    try {
      router(`/transaction/${id}`);
    } catch (error) {
      console.error("Error redirecting transaction:", error);
    }
  };

  console.log("amount", amount);
  console.log("redirectUrl", redirectUrl);
  console.log("transaction", transaction);
  console.log("transferDeadline", transferDeadline);
  console.log("promisedPaymentDate", promisedPaymentDate);
  console.log("appErr", appErr);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        paymentModalShow && (
          <div className="lg:justify-center lg:items-center lg:flex lg:overflow-auto lg:fixed inset-0 lg:z-50 outline-none lg:focus:outline-none lg:bg-[#00000080]">
            {bankTransferInitiated || transactionPromisedPaymentDate ? (
              <div className="lg:relative xs:w-full sm:w-5/6 md:w-3/5 lg:w-full xl:w-3/5 my-6 w-auto mx-auto lg:border ">
                <div className="border-2 shadow-lg lg:relative flex gap-5 flex-col w-full bg-white p-4 outline-none focus:outline-none justify-center text-[#255BB3] items-center">
                  {/* Your payment has been initiated. Deposit the amount to the
                  bank account below before the promised payment date. You will
                  reach the next step after the payment is confirmed. This is
                  your deadline : {transferDeadline} and this is your promised
                  payment date :{" "} */}
                  お支払いが開始されました。約束の支払い日までに、以下の銀行口座に金額を入金してください。支払いが確認されると、次のステップに進みます。これが期限です:
                  {transferDeadline} 約束された支払い日は次のとおりです:{" "}
                  {
                    new Date(
                      transactionPromisedPaymentDate
                        ? transactionPromisedPaymentDate
                        : promisedPaymentDate
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  <button
                    className="bg-[#808080] border-2 text-[#E6E6E6] text-xl leading-none font-semibold outline-none focus:outline-none p-2 mt-4 w-2/5"
                    onClick={() => {
                      setShowModal(false);
                      dispatch(showPaymentModal(false));
                      handleNavigateBack();
                    }}
                  >
                    {/* <RxCross2 /> */} 戻る
                  </button>
                </div>
              </div>
            ) : (
              <div className="lg:relative xs:w-full sm:w-5/6 md:w-3/5 lg:w-full xl:w-4/5 my-6 w-auto mx-auto lg:border">
                <div className="border-0 shadow-lg lg:relative flex gap-4 flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-2 rounded-t mt-20">
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setShowModal(false);
                        dispatch(showPaymentModal(false));
                        handleNavigateBack();
                      }}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="text-sm flex lg:justify-center lg:items-center font-bold text-[#255BB3] lg:text-[24px] xs:text-[16px] xs:px-8 mt-8 w-full">
                    <span className="">お支払い方法の選択</span>
                  </div>
                  <div className="px-8 pb-[60px] flex flex-col justify-center items-center  w-full">
                    <div>
                      <div className="flex lg:flex-row xs:flex-col gap-5 w-full justify-center  ">
                        <form
                          onClick={handleFirstCheckboxChange}
                          onSubmit={handleCCSubmit}
                          className={`flex justify-center flex-col py-5 lg:w-2/4 xs:w-full border ${
                            isCheckedCardFirst
                              ? "border-neutral-900"
                              : "border-[#E6E6E6]-500"
                          } border-[#E6E6E6]-500`}
                        >
                          <div className="flex lg:justify-center lg:items-center px-8 gap-5">
                            <input
                              type="radio"
                              className="w-[21px] h-[21px]"
                              id="card"
                              checked={isCheckedCardFirst}
                              onChange={handleFirstCheckboxChange}
                            />
                            <p className="text-center font-bold text-[#255BB3] lg:text-[#255BB3] lg:text-[18px] xs:text-[16px]">
                              クレジットカード
                            </p>
                          </div>
                          <div className="flex lg:justify-center py-2 px-4 flex-col gap-5 lg:items-center">
                            <img
                              src={PaymentCards}
                              alt="Payment Cards"
                              className="lg:w-3/4 xs:w-2/4"
                            />
                          </div>
                          <div className="flex flex-col gap-3 mt-3">
                            <div className="px-8">
                              <label
                                className="block lg:text-[18px] xs:text-[16px] font-medium mb-1 text-[#808080]"
                                htmlFor="card-nr"
                              >
                                クレジットカード番号
                              </label>
                              <input
                                id="card-nr"
                                name="cardNumber"
                                className="lg:text-[18px] xs:text-[16px] text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                type="text"
                                value={formattedStr}
                                onChange={handleInputCNChange}
                                required
                              />
                            </div>
                            <div className="px-8">
                              <label
                                className="block lg:text-[18px] xs:text-[16px] font-medium mb-1 text-[#808080]"
                                htmlFor="card-name"
                              >
                                名義
                              </label>
                              <input
                                id="card-name"
                                name="cardholderName"
                                className="lg:text-[18px] xs:text-[16px] text-gray-800 bg-white border rounded leading-5 h-10 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                type="text"
                                value={paymentDetails.cardholderName}
                                onChange={handleInputNameChange}
                                required
                              />
                            </div>
                            <div className="px-8 flex justify-between items-center gap-4 w-full ">
                              <div>
                                <label
                                  className="block lg:text-[18px] xs:text-[16px] font-medium mb-1 text-[#808080]"
                                  htmlFor="card-security-code"
                                >
                                  有効期限月
                                </label>
                                <input
                                  id="card-expiry-month"
                                  name="expiryMonth"
                                  className="lg:text-[18px] xs:text-[16px] text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                  type="text"
                                  value={monthInput}
                                  onChange={handleInputMonthChange}
                                  required
                                />
                                {liveMonthError && (
                                  <p className="text-fifth">{liveMonthError}</p>
                                )}
                              </div>
                              <div>
                                <label
                                  className="block lg:text-[18px] xs:text-[16px] font-medium mb-1 text-[#808080]"
                                  htmlFor="card-security-code"
                                >
                                  有効期限
                                </label>
                                <input
                                  id="card-expiry-year"
                                  name="expiryYear"
                                  className="lg:text-[18px] xs:text-[16px] text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                  type="number"
                                  value={yearInput}
                                  onChange={handleInputYearChange}
                                  required
                                />
                                {liveYearError && (
                                  <p className="text-fifth">{liveYearError}</p>
                                )}
                              </div>
                            </div>
                            <div className="px-8">
                              <label
                                className="block lg:text-[18px] xs:text-[16px] font-medium mb-1 text-[#808080]"
                                htmlFor="card-name"
                              >
                                セキュリティコード
                              </label>
                              <input
                                name="securityCode"
                                className="lg:text-[18px] xs:text-[16px] text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                type="password"
                                value={paymentDetails.securityCode}
                                onChange={handleInputSecurityChange}
                                required
                              />
                            </div>
                          </div>
                          {isCheckedCardFirst && appErr.error && (
                            <div className="px-8 text-red-700 flex justify-between items-center gap-4 w-full">
                              Something went wrong, Check your credentials
                            </div>
                          )}
                          <button
                            type="submit"
                            className="bg-[#FFAA00] text-white py-2 mt-8 mx-8 font-[700] text-[18px]"
                          >
                            {paymentLoading ? (
                              <Spinner className="h-full w-full" />
                            ) : (
                              "決済する"
                            )}
                          </button>
                        </form>
                        <form
                          onClick={handleSecondCheckboxChange}
                          onSubmit={handleBankTransferSubmit}
                          className={`flex justify-center flex-col lg:gap-6 py-5 lg:w-2/4 xs:w-full border ${
                            isCheckedCardSecond
                              ? "border-neutral-900"
                              : "border-[#E6E6E6]-500"
                          }`}
                        >
                          <div className="flex lg:justify-center lg:items-center px-8 gap-5">
                            <input
                              type="radio"
                              className="w-[21px] h-[21px]"
                              id="bank"
                              checked={isCheckedCardSecond}
                              onChange={handleSecondCheckboxChange}
                            />
                            <p className="text-center font-bold text-[#255BB3] lg:text-[#255BB3] lg:text-[18px] xs:text-[16px]">
                              銀行振込
                            </p>
                          </div>
                          <div className="flex justify-center py-2 px-8 flex-col gap-5 mb-3">
                            <div className="flex flex-col">
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                                振込先
                              </span>
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px] mt-3">
                                銀行名（コード） XXXXX銀行（XXXX）
                              </span>
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                                支店名（コード） XXXXX支店（XXXX）
                              </span>
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                                区分 普通預金
                              </span>
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                                口座番号 XXXXXXXXXXXXXXXX
                              </span>
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                                口座名義 XXXXXXXXXX
                              </span>
                              <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                                振込期限 {transferDeadline}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col px-8 mt-10 gap-2">
                            <label className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                              振込予定日 ※契約後7日以内
                            </label>
                            <input
                              type="date"
                              value={
                                new Date(promisedPaymentDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                              onChange={(e) =>
                                setPromisedPaymentDate(new Date(e.target.value))
                              }
                              min={today}
                              className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                            />
                          </div>
                          {isCheckedCardSecond && appErr.error && (
                            <div className="flex flex-col px-8 mt-10 gap-2">
                              Something went wrong
                            </div>
                          )}
                          <button
                            type="submit"
                            className="bg-[#FFAA00] text-white py-2 mt-8 mx-8 font-[700] text-[18px]"
                          >
                            決済する
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default PaymentGateWay;
