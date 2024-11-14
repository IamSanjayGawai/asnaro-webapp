import { useAppDispatch } from "@/state/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { setFirstTimeAfterPayment } from "@/state/slices/transactionSlice";

const PaymentCompletedModal = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { id } = useParams();

  const handleNavigateBack = () => {
    try {
      router(`/transaction/${id}`);
      dispatch(setFirstTimeAfterPayment(true));
    } catch (error) {
      console.error("Error redirecting transaction:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="lg:justify-center lg:items-center lg:flex lg:overflow-auto lg:fixed inset-0 lg:z-50 outline-none lg:focus:outline-none lg:bg-[#00000080]">
        <div className="relative  xs:w-full sm:w-5/6 md:w-3/4 lg:w-full w-auto  mx-auto max-w-3xl  border">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-2 rounded-t">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  handleNavigateBack();
                }}
              >
                <RxCross2 />
              </button>
            </div>
            <div>
              <div className="relative my-6 mx-auto max-w-3xl bg-white w-full">
                <div className=" px-8 pb-[105px] flex flex-col justify-center">
                  <div className="text-sm text-center mb-[43px] font-bold text-[#255BB3] lg:text-[24px] xs:text-[18px]">
                    決済完了
                  </div>
                  <div className="flex justify-center flex-col border-2 border-[#E6E6E6]-500  py-10 lg:px-8 w-full">
                    <p className=" mb-[43px] text-center font-bold text-[#255BB3] lg:text-[#255BB3] lg:text-[24px] xs:text-[18px]">
                      決済が完了しました
                    </p>
                    <div className="flex justify-center py-2 lg:px-8">
                      <button
                        type="button"
                        onClick={() => {
                          handleNavigateBack();
                        }}
                        className="bg-tertiary text-white lg:w-[450px] xs:w-[200px] py-2  font-[700] text-[18px]"
                      >
                        戻る
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompletedModal;
