import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useAppDispatch } from "@/state/hooks";
import { updateAllUsageFeeThunk } from "@/state/thunks/adminThunks";

interface DataProps {
  showUsageEditModal: boolean;
  setShowUsageEditModal?: (showUsageEditModal: boolean) => void;
  show?: boolean;
  setShow?: (show: boolean) => void;
  confirmationMessage?: string;
  headerMessage?: string;
  id?: any;
  usage_names?: string;
  rates?: string;
}

const Modal = ({
  showUsageEditModal,
  setShowUsageEditModal,
  show = true,
  usage_names,
  rates,
  id,
}: DataProps) => {
  const [sent] = useState(true); // default send to true
  const dispatch = useAppDispatch();
  const [usage_name, setUsageName] = useState(usage_names);
  const [rate, setRate] = useState(rates);

  const handleCreateUsageFee = async () => {
    const usageData = {
      usage_name,
      rate,
    };
    console.log("usageData", usageData);
    await dispatch(updateAllUsageFeeThunk({ id, usageData }));
    setShowUsageEditModal(false);
  };

  const handleUsageFeeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValue = e.target.value;
    if (key === "usage_name") {
      setUsageName(newValue);
    } else if (key === "rate") {
      setRate(newValue);
    }
  };

  console.log(usage_name, rate);

  return (
    <>
      {showUsageEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4  rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowUsageEditModal(false)}
                  >
                    <RxCross2 />
                  </button>
                </div>

                {/*body*/}

                {!sent ? (
                  <div className="relative lg:px-8  xs:px-4 gap-5 flex-auto ">
                    <h3 className="mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]">
                      本気ですか？ ×
                    </h3>
                    <p className="text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto">
                      このユーザーのパートナーとして申請することに同意しますか?
                      はいの場合は [適用] ボタンをクリックし、いいえの場合は
                      [戻る] をクリックしますか?
                    </p>
                  </div>
                ) : (
                  <div className="relative lg:px-8  xs:px-4 flex-auto ">
                    <div className="flex flex-col justify-center items-center  ">
                      <div className="flex justify-around items-center w-full  ">
                        <span className="lg:text-[14px] xs:text-[12px] text-[#808080] ">
                          システム利用料
                        </span>
                        <span className="lg:text-[14px] xs:text-[12px] text-[#808080] ">
                          システム利用料(率)
                        </span>
                      </div>
                      <hr className="text-center w-[100%] h-[2px] my-2  border-0  bg-[#808080]" />
                    </div>
                    <div className="flex justify-around flex-row items-center w-full  gap-5">
                      <div className="flex flex-col gap-5">
                        <input
                          type="text"
                          className=" border lg:lg:w-[263px]  md:w-[200px]  xs:w-[150px] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px]"
                          placeholder="基本 プラン"
                          name="usage_name"
                          value={usage_name}
                          onChange={(e) =>
                            handleUsageFeeChange(e, "usage_name")
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-5">
                        <div>
                          <input
                            type="text"
                            className=" border lg:lg:w-[240px]  md:w-[200px]  sm:w-[150px] xs:w-[100px] h-[33px] border-[#E0E0E0] px-4 text-right lg:text-[14px] xs:text-[12px]"
                            placeholder="0"
                            name="rate"
                            value={rate}
                            onChange={(e) => handleUsageFeeChange(e, "rate")}
                          />
                          <span className="lg:ml-2 xs:ml-1  lg:text-[14px] xs:text-[10px] text-[#808080] ">
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/*footer*/}
                <div className="grid grid-cols-1 justify-center p-4 w-2/3 mx-auto mb-8 ">
                  {show && (
                    <button
                      className="bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 lg:w-[348px]  xs:w-[150px] outline-none  mx-auto mb-2"
                      type="button"
                      onClick={handleCreateUsageFee}
                    >
                      追加
                    </button>
                  )}

                  <button
                    className="bg-[#808080] text-white  font-bold uppercase text-sm px-6 py-3 lg:w-[348px]  xs:w-[150px] mx-auto  outline-none mb-1"
                    type="button"
                    onClick={() => setShowUsageEditModal(false)}
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
