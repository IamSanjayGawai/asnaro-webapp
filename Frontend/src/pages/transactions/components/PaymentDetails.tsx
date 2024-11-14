import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { makePaymentThunk } from "@/state/thunks/transactionThunks";
import { RxCross2 } from "react-icons/rx";
import {
  selectTransaction,
  setFirstTimeAfterPayment,
} from "@/state/slices/transactionSlice";
import { showPaymentModal } from "@/state/slices/transactionSlice";
import PaymentCompletedModal from "./PaymentCompletedModal";
import { useState } from "react";
import Spinner from "@/components/static/Spinner";

const PaymentDetails = ({
  showModal,
  setShowModal,
  paymentDetails,
  lasttotalAmountIncludingTax,
}) => {
  const dispatch = useAppDispatch();

  const { paymentModalShow } = useAppSelector(selectTransaction);
  const [showDetails, setShowDetails] = useState(true);
  const [showPaymentCompleteModal, setShowPaymentCompleteModal] =
    useState(false);
  const { transaction, loading } = useAppSelector(selectTransaction);
  const transactionId = transaction && transaction?.transaction?._id;

  const handleNavigateBack = async () => {
    console.log("transactionId", transactionId);
    await dispatch(makePaymentThunk({ paymentDetails, transactionId }));

    if (makePaymentThunk.fulfilled) {
      setShowDetails(false);
      setShowPaymentCompleteModal(true);
      dispatch(setFirstTimeAfterPayment(true));
    }
  };

  return (
    <>
      {showModal && !paymentModalShow && showDetails && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl  border">
            {/*content*/}
            <div className="border-0 shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-4 rounded-t">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setShowModal(false);
                    dispatch(showPaymentModal(true));
                  }}
                >
                  <RxCross2 />
                </button>
              </div>

              <div className=" px-8 pb-[60px] flex flex-col justify-center items-center lg:w-[600px] xs:w-[400px]">
                <div className="text-sm text-center mb-[43px] font-bold text-[#255BB3] lg:text-[24px] xs:text-[18px]">
                  決済内容の確認
                </div>
                <div className="flex justify-center flex-col border-2 border-[#E6E6E6]-500  py-5 lg:px-8 w-full">
                  <p className="text-center font-bold text-[#255BB3] lg:text-[#255BB3] lg:text-[24px] xs:text-[18px]">
                    決済内容
                  </p>
                  <div className="flex justify-center  py-2  px-4  flex-col gap-5">
                    <div className="flex flex-col justify-center ">
                      <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                        ご請求金額&nbsp;&nbsp;&nbsp;
                        {lasttotalAmountIncludingTax}&nbsp;（税込）
                      </span>
                      <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                        工程名&nbsp;&nbsp;&nbsp;
                        {transaction?.transaction?.process_name}
                      </span>
                      <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                        契約ID&nbsp;&nbsp;&nbsp;{transaction?.transaction?._id}
                      </span>
                      <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                        決済方法&nbsp;&nbsp;&nbsp;{paymentDetails.paymentType}
                      </span>
                      <span className="text-[#808080] lg:text-[18px] xs:text-[16px]">
                        支払予定日&nbsp;&nbsp;&nbsp; 2024/05/04{" "}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleNavigateBack}
                      className="bg-[#FFAA00] text-white lg:w-[450px] xs:w-full py-2 font-[700]  lg:text-[18px] xs:text-[16px]"
                    >
                      {loading ? (
                        <Spinner className="h-full" />
                      ) : (
                        "支払いを確定する"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(showPaymentModal(true));
                      }}
                      className="bg-tertiary text-white lg:w-[450px] xs:w-full py-2  font-[700]  lg:text-[18px] xs:text-[16px]"
                    >
                      前に戻る
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentCompleteModal && <PaymentCompletedModal />}
    </>
  );
};

export default PaymentDetails;
