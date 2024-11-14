import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import Spinner from "@/components/static/Spinner";
import {
  statusSwitchToText,
  statusSwitchToNumber,
  allowedStatusSwitchForAdmin,
} from "../../../utils/statusSwitch";
import { changeTransactionDetailsAdmin } from "@/api/admin";
import { selectAdmin } from "@/state/slices/adminSlice";
import {
  getTransactionDetailsAdminThunk,
  getAllTaxRateThunk,
} from "@/state/thunks/adminThunks";
import { socket } from "@/state/store";
import DownloadPDF from "@/utils/downloadHelp/downloadHelpEstimation";
import DownloadPDFAdvancePayment from "@/utils/downloadHelp/downloadHelpAdvancepayment";
import DownloadPDFOrderForm from "@/utils/downloadHelp/downloadHelpOrderForm";
import DownloadPDFDelivery from "@/utils/downloadHelp/downloadHelpDelivery";
import DownloadPDFReceipt from "@/utils/downloadHelp/downloadHelpReceipt";
import DownloadPDFAcceptance from "@/utils/downloadHelp/downloadHelpAcceptance";
import DownloadPDFTransactionInvoice from "@/utils/downloadHelp/downloadHelpTransactionInvoice";
import DownloadPDFRefundTransactionInvoice from "@/utils/downloadHelp/downloadHelpRefundTransactionInoice";
import DownloadPDFRefundSystem from "@/utils/downloadHelp/downloadHelpRefundSystem";
import DownloadPDFSystem from "@/utils/downloadHelp/downloadHelpSystem";
import DownloadPDFRefundInvoice from "@/utils/downloadHelp/downloadHelpRefundInvoice";

const parseIndianNumber = (numberString) => {
  if (!numberString || typeof numberString !== "string") {
    return numberString;
  }
  const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

function formatIndianNumber(number) {
  if (number === null) {
    return "";
  }
  return number.toLocaleString("ja-JP");
}

const OrderManagementDetail = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { id } = useParams();
  const { transactionAdmin, loading } = useAppSelector(selectAdmin);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const transactionData = transactionAdmin?.transaction;
  const prevTransactionStatus = transactionData?.transaction_status;
  const [transactionPaymentDate, setTransactionPaymentDate] =
    useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [transactionPaymentType, setTransactionPaymentType] =
    useState<string>("");
  const [totalAmountTotal, setTotalAmountTotal] = useState<string>("");
  const [totalAmountNotTotal, setTotalAmountNotTotal] = useState<string>("");
  const [currentTransactionStatus, setCurrentTransactionStatus] =
    useState<string>("");
  const [allowedStatusChangingArray, setAllowedStatusChangingArray] = useState<
    string[]
  >([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const isBlueButtonForEstimation = transactionData?.estimation_pdf;
  const isBlueButtonForAdvancePayment =
    transactionData?.advance_payment_invoice;
  const isBlueButtonForOrderForm = transactionData?.order_form;
  const isBlueButtonForDeliverySlip = transactionData?.delivery_slip;
  const isBlueButtonForReceipt = transactionData?.Receipt;
  const isBlueButtonForAcceptanceLetter = transactionData?.acceptance_letter;
  const isBlueButtonForTransactionInvoice =
    transactionData?.refund_transaction_invoice
      ? transactionData?.refund_transaction_invoice
      : transactionData?.transaction_invoice;
  const isBlueButtonForSystemFee = transactionData?.refund_system_fee_invoice
    ? transactionData?.refund_system_fee_invoice
    : transactionData?.system_fee_invoice;
  const isBlueButtonForRefundInvoice = transactionData?.refund_invoice;
  const [currentSystemFee, setCurrentSystemFee] = useState<number>(0);
  const [currentRefundSystemFee, setCurrentRefundSystemFee] =
    useState<number>(0);

  useEffect(() => {
    socket.emit("join", id);
  }, []);

  useEffect(() => {
    dispatch(getTransactionDetailsAdminThunk({ transactionId: id }));
    dispatch(getAllTaxRateThunk({}));
  }, [dispatch, refresh]);

  useEffect(() => {
    setCurrentSystemFee(transactionData?.adminSystemFee);
    setCurrentRefundSystemFee(
      transactionData?.refund?.taxDetails?.adminRefundSystemFee
    );
    setCurrentTransactionStatus(
      statusSwitchToText(transactionData?.transaction_status)
    );
    setTransactionPaymentType(
      transactionAdmin?.paymentType ? transactionAdmin.paymentType : ""
    );
    setTransactionPaymentDate(
      transactionData?.promisedPaymentDate
        ? new Date(transactionData?.promisedPaymentDate)
            .toISOString()
            .split("T")[0]
        : ""
    );
    setTotalAmount(
      transactionData?.quotation && transactionData?.quotation.length > 0
        ? transactionData?.quotation?.[0]?.totalAmountIncludingTax
        : ""
    );
    setTotalAmountTotal(
      transactionData &&
        transactionData.quotation &&
        transactionData.quotation.length > 0 &&
        transactionData?.transaction_status !== 5 &&
        transactionData?.transaction_status !== 7
        ? formatIndianNumber(
            Math.floor(
              parseInt(
                parseIndianNumber(
                  transactionData?.quotation?.[0]?.totalAmountIncludingTax
                )
              ) +
                Math.floor(
                  (parseInt(
                    parseIndianNumber(
                      transactionData.quotation[0].totalamountExcludingTax
                    )
                  ) *
                    currentSystemFee) /
                    100
                ) +
                Math.floor(
                  (parseInt(
                    parseIndianNumber(
                      transactionData.quotation[0].totalamountExcludingTax
                    )
                  ) *
                    currentSystemFee *
                    transactionData.adminTax) /
                    (100 * 100)
                )
            )
          )
        : transactionData?.refund &&
          transactionData?.refund?.taxDetails &&
          transactionData?.refund?.taxDetails.totalAmountIncludingTax !== 0 &&
          (transactionData?.transaction_status === 5 ||
            transactionData?.transaction_status === 7)
        ? formatIndianNumber(
            Math.floor(
              parseInt(
                parseIndianNumber(
                  transactionData?.quotation?.[0]?.totalAmountIncludingTax
                )
              )
            ) +
              Math.floor(
                (parseInt(
                  parseIndianNumber(
                    transactionData.quotation[0].totalamountExcludingTax
                  )
                ) *
                  currentSystemFee) /
                  100
              ) +
              Math.floor(
                (parseInt(
                  parseIndianNumber(
                    transactionData.quotation[0].totalamountExcludingTax
                  )
                ) *
                  currentSystemFee *
                  transactionData.adminTax) /
                  (100 * 100)
              ) +
              Math.floor(
                (parseInt(
                  parseIndianNumber(
                    transactionData.refund.taxDetails.totalAmountExcludingTax
                  )
                ) *
                  currentRefundSystemFee) /
                  100
              ) +
              Math.floor(
                (parseInt(
                  parseIndianNumber(
                    transactionData.refund.taxDetails.totalAmountExcludingTax
                  )
                ) *
                  currentRefundSystemFee *
                  transactionData.refund.taxDetails.adminRefundTax) /
                  (100 * 100)
              ) -
              Math.floor(
                parseInt(
                  parseIndianNumber(
                    transactionData.refund.taxDetails.totalAmountIncludingTax
                  )
                )
              )
          )
        : 0
    );
    setTotalAmountNotTotal(
      transactionData &&
        transactionData?.quotation &&
        transactionData?.quotation.length > 0 &&
        transactionData?.transaction_status !== 5 &&
        transactionData?.transaction_status !== 7
        ? formatIndianNumber(
            Math.floor(
              parseInt(
                parseIndianNumber(
                  transactionData?.quotation?.[0]?.totalamountExcludingTax
                )
              ) +
                (parseInt(
                  parseIndianNumber(
                    transactionData?.quotation?.[0]?.totalamountExcludingTax
                  )
                ) *
                  currentSystemFee) /
                  100
            )
          )
        : transactionData?.refund &&
          transactionData?.refund?.taxDetails &&
          transactionData?.refund?.taxDetails?.totalAmountIncludingTax !== 0 &&
          (transactionData?.transaction_status === 5 ||
            transactionData?.transaction_status === 7)
        ? formatIndianNumber(
            Math.floor(
              parseInt(
                parseIndianNumber(
                  transactionData?.quotation?.[0]?.totalamountExcludingTax
                )
              )
            ) +
              Math.floor(
                (parseInt(
                  parseIndianNumber(
                    transactionData?.quotation?.[0]?.totalamountExcludingTax
                  )
                ) *
                  currentSystemFee) /
                  100
              ) +
              Math.floor(
                (parseInt(
                  parseIndianNumber(
                    transactionData.refund.taxDetails.totalAmountExcludingTax
                  )
                ) *
                  currentSystemFee) /
                  100
              ) -
              Math.floor(
                parseInt(
                  parseIndianNumber(
                    transactionData.refund.taxDetails.totalAmountExcludingTax
                  )
                )
              )
          )
        : 0
    );
    setStartDate(
      transactionData?.tradingStartDate
        ? new Date(transactionData?.tradingStartDate)
            .toISOString()
            .split("T")[0]
        : "Transaction Not Started"
    );
    setEndDate(
      transactionData?.tradingEndDate
        ? new Date(transactionData?.tradingEndDate).toISOString().split("T")[0]
        : "Transaction Ongoing"
    );
    setAllowedStatusChangingArray(
      allowedStatusSwitchForAdmin(
        statusSwitchToText(transactionData?.transaction_status)
      )
    );
  }, [transactionAdmin]);

  console.log("transactionData", transactionData);
  // console.log("taxes", tax);
  // console.log("usageFee", currentSystemFee);
  // console.log("currentTransactionStatus", currentTransactionStatus);
  // console.log("allowedStatusChangingArray", allowedStatusChangingArray);
  // console.log("prevTransactionStatus", prevTransactionStatus);
  // console.log("transactionPaymentType", transactionPaymentType);
  // console.log("transactionPaymentDate", transactionPaymentDate);
  // console.log("totalAmount", totalAmount);
  // console.log("transactionDeadline", transactionDeadline);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setButtonLoading(true);
    event.preventDefault();
    const response = await changeTransactionDetailsAdmin(
      id,
      statusSwitchToNumber(currentTransactionStatus),
      prevTransactionStatus
    );
    console.log("response", response);
    if (
      statusSwitchToNumber(currentTransactionStatus) === 3 &&
      prevTransactionStatus !== 2
    ) {
      console.log("emitting");
      socket.emit("adminDeliveryStatusChange", { id }, () => {
        setButtonLoading(false);
        setRefresh(true);
      });
    }
    if (
      statusSwitchToNumber(currentTransactionStatus) === 3 &&
      prevTransactionStatus === 2
    ) {
      console.log("emitting");
      socket.emit("adminPaymentChange", { id }, () => {
        setButtonLoading(false);
        setRefresh(true);
      });
    }
    if (statusSwitchToNumber(currentTransactionStatus) === 9) {
      console.log("emitting");
      socket.emit("adminTransactionCancel", { id }, () => {
        setButtonLoading(false);
        setRefresh(true);
      });
    }
    setRefresh(true);
    setButtonLoading(false);
  };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #F8F8F8;
        color: #808080;
        font-size: 12px;

        @media (max-width: 768px) {
          background-color: #255BB3;
          color: #fff;
        }

      `,
      Table: `
        --data-table-library_grid-template-columns: 1fr 1fr 1fr 1fr;


        @media (max-width: 1150px) {
          --data-table-library_grid-template-columns: repeat(4, minmax(10px, 400px));
          overflow-x: auto;
          width: 200% !important;
          white-space: nowrap;
        }

        @media (max-width: 500px) {
          --data-table-library_grid-template-columns: repeat(4, minmax(10px, 500px));
          overflow-x: auto;
          width: 200% !important;
          white-space: nowrap;
        }
      `,
      BaseCell: `
        &:nth-of-type(n) {
          font-weight: 500;
          text-align: center;
          align-items: start;
        }

        &:nth-of-type(6) {
          text-align: right;
        }

        &:nth-of-type(1) {
          text-align: left;
        }
      `,
      Cell: `
        .custom-checkbox {
          margin: 0; /* Adjust this based on your layout */
          padding: 0; /* Adjust this based on your layout */
          cursor: pointer; /* Ensure cursor changes on hover */
        }
      `,
    },
  ]);

  const nodes = [
    {
      id: "1",
      subject: "工程料",
      amount_of_money: "XX,XXX円　",
      consumption_tax: "X,XXX円　",
      subtotal: "XX,XXX円　",
    },
    {
      id: "2",
      subject: "システム利用料",
      amount_of_money: "0%",
      consumption_tax: "―　",
      subtotal: "0円　",
    },
    {
      id: "3",
      subject: "返金請求額(税込)",
      amount_of_money: "",
      consumption_tax: "―　",
      subtotal: "0円　",
    },
  ];

  const data = {
    nodes:
      transactionData &&
      transactionData.quotation &&
      transactionData.quotation.length > 0
        ? [
            {
              id: "1",
              subject: "工程料",
              amount_of_money: `${transactionData.quotation[0].totalamountExcludingTax}円　`,
              consumption_tax: `${transactionData.quotation[0].taxAmount}円　`,
              subtotal: `${transactionData.quotation[0].totalAmountIncludingTax}円　`,
            },
            {
              id: "2",
              subject: `システム利用料(${currentSystemFee})%`,
              amount_of_money: `${
                transactionData.quotation[0].totalamountExcludingTax
                  ? formatIndianNumber(
                      Math.floor(
                        (parseInt(
                          parseIndianNumber(
                            transactionData.quotation[0].totalamountExcludingTax
                          )
                        ) *
                          currentSystemFee) /
                          100
                      )
                    )
                  : "0"
              }円　`,
              consumption_tax: `${
                transactionData.quotation[0].totalAmountIncludingTax
                  ? formatIndianNumber(
                      Math.floor(
                        (parseInt(
                          parseIndianNumber(
                            transactionData.quotation[0].totalamountExcludingTax
                          )
                        ) *
                          currentSystemFee *
                          transactionData.adminTax) /
                          (100 * 100)
                      )
                    )
                  : "0"
              }円　`,
              subtotal: `${
                transactionData.quotation[0].totalAmountIncludingTax
                  ? formatIndianNumber(
                      Math.floor(
                        (parseInt(
                          parseIndianNumber(
                            transactionData.quotation[0].totalamountExcludingTax
                          )
                        ) *
                          currentSystemFee) /
                          100
                      ) +
                        Math.floor(
                          (parseInt(
                            parseIndianNumber(
                              transactionData.quotation[0]
                                .totalamountExcludingTax
                            )
                          ) *
                            currentSystemFee *
                            transactionData.adminTax) /
                            (100 * 100)
                        )
                    )
                  : "0"
              }円　`,
            },
            {
              id: "3",
              subject: "返金請求額(税込)",
              amount_of_money: `${
                transactionData.refund &&
                transactionData.refund.taxDetails &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? formatIndianNumber(
                      transactionData.refund.taxDetails.totalAmountExcludingTax
                    )
                  : 0
              }円　`,
              consumption_tax: `${
                transactionData.refund &&
                transactionData.refund.taxDetails &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? formatIndianNumber(
                      transactionData.refund.taxDetails.taxAmount
                    )
                  : 0
              }円　`,
              subtotal: `${
                transactionData.refund &&
                transactionData.refund.taxDetails &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? formatIndianNumber(
                      transactionData.refund.taxDetails.totalAmountIncludingTax
                    )
                  : 0
              }円　`,
            },
            {
              id: "4",
              subject: `返金制度利用料(${
                transactionData.refund &&
                transactionData.refund.taxDetails.totalAmountIncludingTax !==
                  0 &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? currentRefundSystemFee
                  : 0
              }%)`,
              amount_of_money: `${
                transactionData.refund &&
                transactionData.refund.taxDetails &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? formatIndianNumber(
                      Math.floor(
                        (parseInt(
                          parseIndianNumber(
                            transactionData.refund.taxDetails
                              .totalAmountExcludingTax
                          )
                        ) *
                          currentRefundSystemFee) /
                          100
                      )
                    )
                  : "0"
              }円　`,
              consumption_tax: `${
                transactionData.refund &&
                transactionData.refund.taxDetails &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? formatIndianNumber(
                      Math.floor(
                        (parseInt(
                          parseIndianNumber(
                            transactionData.refund.taxDetails
                              .totalAmountExcludingTax
                          )
                        ) *
                          currentRefundSystemFee *
                          transactionData.refund.taxDetails.adminRefundTax) /
                          (100 * 100)
                      )
                    )
                  : "0"
              }円　`,
              subtotal: `${
                transactionData.refund &&
                transactionData.refund.taxDetails &&
                (transactionData?.transaction_status === 5 ||
                  transactionData?.transaction_status === 7)
                  ? formatIndianNumber(
                      Math.floor(
                        (parseInt(
                          parseIndianNumber(
                            transactionData.refund.taxDetails
                              .totalAmountExcludingTax
                          )
                        ) *
                          currentRefundSystemFee) /
                          100
                      ) +
                        Math.floor(
                          (parseInt(
                            parseIndianNumber(
                              transactionData.refund.taxDetails
                                .totalAmountExcludingTax
                            )
                          ) *
                            currentRefundSystemFee *
                            transactionData.refund.taxDetails.adminRefundTax) /
                            (100 * 100)
                        )
                    )
                  : "0"
              }円　`,
            },
          ]
        : nodes,
  };

  const COLUMNS = [
    {
      label: <span className="flex justify-center">科目</span>,
      key: "subject",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.subject}
        </div>
      ),
    },

    {
      label: "金額",
      key: "amount_of_money",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-right "
          style={{ whiteSpace: "normal" }}
        >
          {cell.amount_of_money}
        </div>
      ),
    },
    {
      label: "消費税額",
      key: "consumption_tax",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-right "
          style={{ whiteSpace: "normal" }}
        >
          {cell.consumption_tax}
        </div>
      ),
    },
    {
      label: "単価(小計)",
      key: "subtotal",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-right "
          style={{ whiteSpace: "normal" }}
        >
          {cell.subtotal}
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" lg:w-[80%] xl:w-[78%] xs:w-[100%] mb-40"
        >
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]">
            <div className="flex lg:gap-20 xs:gap-2">
              <h1 className="text-[#808080] font-[700] text-[20px] mb-4">
                受発注情報
              </h1>
              <h3 className="text-[#FF8080]">※は回答必須</h3>
            </div>
          </div>
          {/* main  container*/}
          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[1rem] lg:w-[100%] xs:w-[85%] sm:w-[80%] ">
            <div className="w-full flex flex-col gap-4">
              <div className="flex  gap-4 lg:flex-row  lg:items-center ">
                <label className="text-[#808080] flex-shrink-0 lg:text-[14px] xs:text-[12px] w-32 ">
                  取引ID
                </label>
                <span className="flex-grow h-[39px] px-[46px] text-[#808080] ">
                  {transactionData?._id}
                </span>
              </div>

              <div className="flex flex-col lg:flex-col gap-5">
                {/* Left Inputs */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="flex items-center gap-4">
                    <label className="text-[#808080] flex-shrink-0 w-32 lg:text-[14px] xs:text-[12px]">
                      企業ID(発注者)
                    </label>
                    <span className="text-[#FF8080]">※</span>
                    <span className="flex-grow h-[39px] px-5 text-[#808080]">
                      {transactionData?.customer_id?._id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-[#808080] flex-shrink-0 w-32 lg:text-[14px] xs:text-[12px]">
                      企業ID(受注者)
                    </label>
                    <span className="text-[#FF8080]">※</span>
                    <span className="flex-grow h-[39px] px-5 text-[#808080]">
                      {transactionData?.seller_id?._id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-[#808080] flex-shrink-0 w-32 lg:text-[14px] xs:text-[12px]">
                      工程ID
                    </label>
                    <span className="text-[#FF8080]">※</span>
                    <span className="flex-grow h-[39px] px-5 text-[#808080]">
                      {transactionData?.process_id?._id}
                    </span>
                  </div>
                </div>

                {/* Right Inputs */}
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  <div className="flex items-center gap-4 ">
                    <label className="text-[#808080] flex-shrink-0 w-32 lg:text-[14px] xs:text-[12px]">
                      企業名(発注者)
                    </label>
                    <span className="text-[#FF8080]">※</span>
                    <span className="flex-grow h-[39px] px-5 text-[#808080]">
                      {transactionData?.customer_id?.name01}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-[#808080] flex-shrink-0 w-32 lg:text-[14px] xs:text-[12px]">
                      企業名(受注者)
                    </label>
                    <span className="text-[#FF8080]">※</span>
                    <span className="flex-grow h-[39px] px-5 text-[#808080]">
                      {transactionData?.seller_id?.name01}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-[#808080] flex-shrink-0 w-32 lg:text-[14px] xs:text-[12px]">
                      工程名
                    </label>
                    <span className="text-[#FF8080]">※</span>
                    <span className="flex-grow h-[39px] px-5 text-[#808080]">
                      {transactionData?.process_id?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* remaining */}
            <div className="flex flex-row gap-4 w-full lg:w-1/2">
              <div className="flex items-center gap-4 ">
                <label className="text-[#808080] flex lg:text-[14px] xs:text-[12px] flex-shrink-0 w-32">
                  発注番号
                </label>
                <span className="text-[#FF8080]">※</span>
              </div>
              <span className=" outline-0 xl:w-[247px] lg:w-[180px] xs:w-full h-[39px] px-5 xs:mt-[9px] text-[#808080]">
                {transactionData?.order_id}
              </span>
            </div>
            <div className="flex flex-row gap-4 w-full lg:w-1/2">
              <div className="flex items-center gap-4 ">
                <label className="text-[#808080] flex  gap-4 lg:text-[14px] xs:text-[12px] flex-shrink-0 w-32 ">
                  ステータス
                </label>
                <span className="text-[#FF8080] ">※</span>
              </div>

              <div className=" xl:w-[64%] lg:w-[60%]  xs:w-full lg:items-center ">
                <select
                  value={currentTransactionStatus}
                  onChange={(e) => {
                    setCurrentTransactionStatus(e.target.value);
                  }}
                  id="first_name"
                  className="text-tertiary border-[1px] border-[#DCDCDC] px-10  outline-0  text-sm  h-[39px] lg:text-[14px] xs:text-[12px]"
                  placeholder="取引完了"
                >
                  {/* <option
                    className="text-tertiary lg:text-[14px] xs:text-[12px]"
                    value=""
                  >
                    取引完了
                  </option> */}
                  {allowedStatusChangingArray.map((status) => (
                    <option
                      key={status}
                      className="text-tertiary lg:text-[14px] xs:text-[12px]"
                      value={status}
                    >
                      {status}
                    </option>
                  ))}

                  <option className="text-tertiary"></option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-4 w-full lg:w-1/2 mt-4 ">
              <div className="flex items-center gap-4">
                <label className="text-[#808080] flex  gap-4 lg:text-[14px] xs:text-[12px] flex-shrink-0 w-32 ">
                  決済方法
                </label>
              </div>

              <div className="xl:w-[65%] lg:w-[60%]  xs:w-full  lg:items-center  pl-[50px]">
                <span className="flex-grow h-[39px] px-2 text-[#808080]">
                  {transactionPaymentType}
                </span>
                {/* <input
                  value={transactionPaymentType}
                  onChange={(e) => {
                    setTransactionPaymentType(e.target.value);
                  }}
                  className="text-tertiary border-[1px] border-[#DCDCDC] px-10  outline-0  text-sm  h-[39px]  lg:w-[60%] xs:mt-[9px]  lg:text-[14px] xs:text-[12px]"
                  placeholder="銀行振込"
                  disabled
                /> */}
              </div>
            </div>
            {/*  */}
            <div className="flex flex-row gap-4 w-full lg:w-1/2 mt-4 ">
              <div className="flex items-center gap-4">
                <label className="text-[#808080] flex  gap-4 lg:text-[14px] xs:text-[12px] flex-shrink-0 w-32">
                  取引期間
                </label>
              </div>
              <div className="   pl-[50px]">
                <span className=" outline-0 xl:w-[150px] lg:w-[180px] xs:w-[30%] h-[39px]  xs:mt-[9px]  ml-[10px] text-[#808080]">
                  {startDate}
                </span>
                ~
                <span className=" outline-0 xl:w-[247px] lg:w-[300px] xs:w-[60%] h-[39px]  xs:mt-[9px]  text-center text-[#808080]">
                  {endDate}
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex xl:w-[43%] lg:w-[48%]  xs:w-[100%] lg:flex-row xs:flex-col  justify-between mt-4">
              <div className="flex lg:w-[34%] xl:w-[37%] xs:w-[43%]  lg:justify-between lg:items-center">
                <label className="text-[#808080] flex  gap-4 lg:text-[14px] xs:text-[12px] ">
                  支払期日
                </label>
              </div>
              <div className="xl:w-[65%] lg:w-[60%]  ">
                <span
                  className="border-0 outline-0  lg:w-[155px] xs:w-[150px] h-[39px] px-5 xs:mt-[9px] text-[#808080]"
                  onChange={(e) => e.preventDefault()}
                >
                  {transactionPaymentDate}
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex xl:w-[43%] lg:w-[48%] xs:w-[100%] lg:flex-row xs:flex-row  justify-between mt-4">
              <div className="flex lg:w-[34%] xl:w-[37%] xs:w-[43%]  lg:justify-between lg:items-center">
                <label className="text-[#808080] flex  gap-4 lg:text-[14px] xs:text-[12px] ">
                  工程料金
                </label>
              </div>
              <div className="xl:w-[65%] lg:w-[60%] xs:w-full ">
                <span
                  className="border-0 outline-0 lg:w-[155px] xs:w-[150px] h-[39px] pl-20 xs:mt-[9px] text-[#808080]"
                  onChange={(e) => e.preventDefault()}
                >
                  {totalAmount}
                </span>
                <span className="xs:ml-4 text-[#808080] lg:text-[14px] xs:text-[12px]">
                  円
                </span>
              </div>
            </div>
            {/* table  start*/}

            <div className="flex lg:flex-row xs:flex-col  lg:gap-10 xs:gap-1 mt-4 ">
              <label className="text-[#808080] flex  lg:text-[14px] xs:text-[12px] ">
                {" "}
                システム利用情報
              </label>
              <div className="mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto  lg:w-[65%]  ml-[1rem]">
                <CompactTable
                  data={data}
                  columns={COLUMNS}
                  theme={theme}
                  layout={{ custom: true, horizontalScroll: true }}
                />
                <div className="border lg:w-full xs:w-[200%] bg-[#F5F5F5]  h-[2rem] text-[14px] flex items-center justify-end ">
                  <div className="flex justify-between w-1/2">
                    <span className="text-[#808080] lg:mx-[80px] xs:mx-[120px]">
                      合計
                    </span>{" "}
                    <span className="mr-3 text-[#808080]">
                      {totalAmountNotTotal === "NaN"
                        ? "0"
                        : totalAmountNotTotal}
                      円　
                    </span>
                  </div>
                  <div className="flex justify-between w-1/2">
                    <span className="text-[#808080] lg:mx-[100px] xs:mx-[120px] ">
                      合計(税込)
                    </span>{" "}
                    <span className="mr-3 text-[#808080]">
                      {totalAmountTotal === "NaN" ? "0" : totalAmountTotal}円　
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* table  end*/}
            <div className="flex lg:w-[80%] xs:w-[100%] lg:flex-row xs:flex-col justify-between mt-[36px] ">
              <div className="flex w-full lg:w-[25%] lg:justify-between ">
                <label className="text-[#808080] lg:text-[14px] xs:text-[12px] flex gap-4 ">
                  帳票情報
                </label>
              </div>
              <div className="lg:w-full xs:w-full grid lg:grid-cols-4 xs:grid-cols-3 gap-2 xs:mt-[9px] ">
                <span
                  onClick={() => DownloadPDF(transactionAdmin)}
                  className={`${
                    isBlueButtonForEstimation
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  見積書
                </span>
                <span
                  onClick={() => DownloadPDFAdvancePayment(transactionAdmin)}
                  className={`${
                    isBlueButtonForAdvancePayment
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  仮払い請求書
                </span>
                <span
                  onClick={() => DownloadPDFOrderForm(transactionAdmin)}
                  className={`${
                    isBlueButtonForOrderForm
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  発注書
                </span>
                <span
                  onClick={() => DownloadPDFDelivery(transactionAdmin)}
                  className={`${
                    isBlueButtonForDeliverySlip
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  納品書
                </span>
                <span
                  onClick={() => DownloadPDFReceipt(transactionAdmin)}
                  className={`${
                    isBlueButtonForReceipt
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  受領書
                </span>
                <span
                  onClick={() => DownloadPDFAcceptance(transactionAdmin)}
                  className={`${
                    isBlueButtonForAcceptanceLetter
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  検収書
                </span>
                <span
                  onClick={() =>
                    transactionData?.refund_transaction_invoice
                      ? DownloadPDFRefundTransactionInvoice(transactionAdmin)
                      : DownloadPDFTransactionInvoice(transactionAdmin)
                  }
                  className={`${
                    isBlueButtonForTransactionInvoice
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  取引請求書
                </span>
                <span
                  onClick={() =>
                    transactionData?.refund_system_fee_invoice
                      ? DownloadPDFRefundSystem(transactionAdmin)
                      : DownloadPDFSystem(transactionAdmin)
                  }
                  className={`${
                    isBlueButtonForSystemFee
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px] border h-[25.96px]`}
                >
                  システム利用料請求書
                </span>
                <span
                  onClick={() => DownloadPDFRefundInvoice(transactionAdmin)}
                  className={`${
                    isBlueButtonForRefundInvoice
                      ? "bg-primary text-white cursor-pointer"
                      : "bg-[#F8F8F8] text-[#808080] cursor-not-allowed"
                  } text-center lg:text-[14px] xs:text-[12px]  border  h-[25.96px]`}
                >
                  返金請求書
                </span>
              </div>
            </div>

            <div className="flex lg:w-[80%] xs:w-[100%] lg:flex-row xs:flex-col justify-between mt-[36px] ">
              <div className="flex w-full lg:w-[25%] lg:justify-between ">
                <label className="text-[#808080] flex gap-4 lg:text-[14px] xs:text-[12px]">
                  取引情報
                </label>
              </div>
              <div className="lg:w-full xs:w-full grid lg:grid-cols-4 xs:grid-cols-3 gap-2 xs:mt-[9px] ">
                <span
                  onClick={() =>
                    router(`/admin/dashboard/transaction-view/${id}`)
                  }
                  className="bg-[#F8F8F8] text-[#808080] text-center lg:text-[14px] xs:text-[12px] cursor-pointer border h-[25.96px]"
                >
                  メッセージ
                </span>
              </div>
            </div>

            {/* btns */}
            <div className="lg:w-[80%] xs:w-full flex justify-center items-center gap-[46px] mt-[85px]">
              <button
                type="button"
                onClick={() => {
                  router(-1);
                }}
                className="px-5 bg-[#808080] text-[#F8F8F8] w-[194px] h-[36px] lg:text-[14px] xs:text-[12px]"
              >
                戻る
              </button>

              <button
                type="submit"
                className="px-2 bg-[#FFAA00] text-[#F8F8F8] w-[194px] h-[36px] lg:text-[14px] xs:text-[12px]"
              >
                {buttonLoading ? (
                  <Spinner className="w-full h-full" />
                ) : (
                  "この内容で登録する"
                )}
              </button>
            </div>
          </div>
          {/* main  container*/}
        </form>
      )}
    </>
  );
};

export default OrderManagementDetail;
