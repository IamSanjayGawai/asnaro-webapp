import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { createSubCategoryThunk } from "@/state/thunks/adminThunks";
import { useAppDispatch } from "@/state/hooks";

interface DataProps {
  isChildCatBtn: boolean;
  setIsChildCatBtn?: (showModal: boolean) => void;
  show?: boolean;
  setShow?: (show: boolean) => void;
  confirmationMessage?: string;
  headerMessage?: string;
  parentCategoryId?: number;
}

const Modal = ({
  isChildCatBtn,
  setIsChildCatBtn,
  parentCategoryId,
  show = true,
}: DataProps) => {
  const [sent] = useState(true); // default send to true
  const [subCategory, setSubCategory] = useState("");
  const dispatch = useAppDispatch();

  const handleCreate = async () => {
    dispatch(
      createSubCategoryThunk({
        category_name: subCategory,
        parent_category_id: parentCategoryId,
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategory(e.target.value);
    console.log(subCategory);
  };
  console.log(parentCategoryId);
  return (
    <>
      {isChildCatBtn ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4  rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsChildCatBtn(false)}
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
                          カテゴリを追加
                        </span>
                      </div>
                      <hr className="text-center w-[100%] h-[2px] my-2  border-0  bg-[#808080]" />
                    </div>
                    <form className="flex justify-around flex-row items-center w-full  gap-5">
                      <div className="flex flex-col gap-5">
                        <input
                          type="text"
                          className=" border lg:lg:w-[263px]  md:w-[200px]  xs:w-[150px] h-[33px] border-[#E0E0E0] px-4 lg:text-[14px] xs:text-[12px]"
                          placeholder="種別名"
                          value={subCategory}
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </div>
                )}

                {/*footer*/}
                <div className="grid grid-cols-1 justify-center p-4 w-2/3 mx-auto mb-8 ">
                  {show && (
                    <button
                      className="bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 lg:w-[150px]  xs:w-[150px] outline-none  mx-auto mb-2"
                      type="submit"
                      onClick={async () => {
                        await setIsChildCatBtn(false);
                        handleCreate();
                      }}
                    >
                      追加
                    </button>
                  )}

                  <button
                    className="bg-[#808080] text-white  font-bold uppercase text-sm px-6 py-3 lg:w-[150px]  xs:w-[150px] mx-auto  outline-none mb-1"
                    type="button"
                    onClick={() => setIsChildCatBtn(false)}
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
