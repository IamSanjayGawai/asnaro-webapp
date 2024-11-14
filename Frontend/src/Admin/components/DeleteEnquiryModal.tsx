import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "@/state/hooks";
import { adminDeleteInquiryThunk } from "@/state/thunks/adminThunks";
interface DataProps {
  showModal: boolean;
  setShowModal?: (showModal: boolean) => void;
  show?: boolean;
  setShow?: (show: boolean) => void;
  confirmationMessage?: string;
  headerMessage?: string;
  idToDelete?: string;
}

const Modal = ({
  showModal,
  setShowModal,
  show = true,
  idToDelete,
}: DataProps) => {
  const dispatch = useAppDispatch();
  const [sent] = useState(true); // default send to true

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
            
            "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4  rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <RxCross2 />
                  </button>
                </div>

                {/*body*/}

                {!sent ? (
                  <div className="relative px-4 gap-5 flex-auto ">
                    <h3 className="mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]">
                      本気ですか？ ×
                    </h3>
                    <p className="text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto">
                      工程を登録するには、パートナー登録をする必要があります
                      下記ボタンから、パートナー申請をお願いいたします
                    </p>
                  </div>
                ) : (
                  <div className="relative px-4 gap-5 flex-auto ">
                    <h3 className="mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]">
                      本気ですか？ ×
                    </h3>
                    <p className="text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto">
                      本当にこれらのレコードを削除してもよろしいですか?このプロセスを元に戻すことはできません。
                    </p>
                  </div>
                )}

                {/*footer*/}
                <div className="grid grid-cols-1 justify-center p-4 w-2/3 mx-auto mb-8 ">
                  {show && (
                    <button
                      className="bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px]  outline-none  mx-auto mb-2"
                      type="submit"
                      onClick={() => {
                        dispatch(adminDeleteInquiryThunk(idToDelete));
                        setShowModal(false);
                      }}
                    >
                      削除を申請する
                    </button>
                  )}

                  <button
                    className="bg-[#808080] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px] mx-auto  outline-none mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    戻る
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
