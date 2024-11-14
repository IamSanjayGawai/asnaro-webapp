import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "@/state/hooks";
import { showCancelModalThunk } from "@/state/slices/transactionSlice";

export default function CancelationModal({
  cancelModalshow,
  handleCancelRequest,
}) {
  const dispatch = useAppDispatch();

  const handelCancellation = async () => {
    await handleCancelRequest();
    dispatch(showCancelModalThunk(false));
  };

  return (
    cancelModalshow && (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-auto my-6 mx-auto max-w-3xl border">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between px-4 rounded">
              <button
                onClick={() => {
                  dispatch(showCancelModalThunk(false));
                }}
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <RxCross2 />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              {/*body*/}

              <div className="relative px-4 gap-5 flex-auto w-full">
                <h3 className="mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[24px]">
                  取引のキャンセル
                </h3>
                <p className="text-[#808080] text-center xs:text-[14px] lg:text-[18px] font-noto-sans-jp px-8 text-base font-[500]  w-full mt-[4em] mb-[3em] mx-auto">
                  取引をキャンセルしてもよろしいですか?
                </p>
              </div>

              {/*footer*/}
              <div className="grid grid-cols-1 justify-center p-4   mx-auto mb-8 ">
                <button
                  className="bg-[#FFAA00] text-white  font-bold uppercase text-[18px] px-6 py-3 w-[348px]  outline-none  mx-auto mb-2"
                  type="submit"
                  onClick={handelCancellation}
                >
                  合意する
                </button>

                <button
                  className="bg-[#808080] text-white  font-bold uppercase text-[18px] px-6 py-3 w-[348px] mx-auto  outline-none mb-1"
                  type="button"
                  onClick={() => {
                    dispatch(showCancelModalThunk(false));
                  }}
                >
                  戻る
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
