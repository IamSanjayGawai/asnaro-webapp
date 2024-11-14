import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { applyForPartnerThunk } from "@/state/thunks/userThunks";
import { selectUser } from "@/state/slices/userSlice";
import Spinner from "@/components/static/Spinner";

interface DataProps {
  showModal: boolean;
  setShowModal?: (showModal: boolean) => void;
  show?: boolean;
  setShow?: (show: boolean) => void;
  confirmationMessage?: string;
  headerMessage?: string;
}

const Modal = ({
  showModal,
  setShowModal,
  show = true,
  confirmationMessage,
  headerMessage,
}: DataProps) => {
  const dispatch = useAppDispatch();
  const { otherLoading } = useAppSelector(selectUser);
  const [sent, setSent] = useState(false); // default send to true

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
                {/* "パートナー申請を受け付けました。承認されるまでお待ちください" */}

                {/*body*/}

                {!sent ? (
                  <div className="relative px-4 gap-5 flex-auto ">
                    <h3 className="mb-6 text-[#808080] text-center font-noto-sans-jp font-bold text-[20px]">
                      パートナー申請をしてください
                    </h3>
                    <div className=" w-full   lg:px-[8rem]  xs:px-[2rem]">
                      <p className="lg:text-[14px] xs:text-[12px] text-[#808080]">
                        工程を登録するには、パートナー登録をする必要があります
                      </p>
                      <p className="lg:text-[14px] xs:text-[12px] text-[#808080]">
                        下記ボタンから、パートナー申請をお願いいたします
                      </p>
                    </div>
                    {/* <p className="text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-full mt-[4em] mb-[3em] mx-auto">
                      工程を登録するには、パートナー登録をする必要があります
                      下記ボタンから、パートナー申請をお願いいたします
                    </p> */}
                  </div>
                ) : (
                  <div className="relative px-4 gap-5 flex-auto ">
                    <h3 className="mb-6 text-[#808080] text-center font-noto-sans-jp font-bold text-[20px]">
                      {headerMessage
                        ? headerMessage
                        : "パートナー申請を受け付けました"}
                    </h3>
                    <p className="text-[#808080] text-sm font-noto-sans-jp xs:px-2 lg:px-10 text-base font-[500]  w-full mt-[4em] mb-[3em] mx-auto ">
                      {confirmationMessage ? (
                        confirmationMessage
                      ) : (
                        <div className="-full   lg:px-[8rem]  xs:px-[2rem]">
                          <p className="lg:text-[14px] xs:text-[12px]  text-[#808080]">
                            パートナー申請を受け付けました
                          </p>
                          <p className="lg:text-[14px] xs:text-[12px]  text-[#808080]">
                            事務局による審査を行いますので、今しばらくお待ちください
                          </p>
                        </div>
                      )}
                    </p>
                  </div>
                )}

                {/*footer*/}
                <div className="grid grid-cols-1 justify-center p-4 w-full mx-auto mb-8 ">
                  {!sent && show && (
                    <button
                      className="bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px]  outline-none  mx-auto mb-2"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        setSent(true);
                        dispatch(applyForPartnerThunk());
                      }}
                    >
                      {otherLoading ? (
                        <Spinner className="w-full h-full" />
                      ) : (
                        "パートナー申請をする"
                      )}
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
