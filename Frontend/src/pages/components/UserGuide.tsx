import { useNavigate } from "react-router-dom";

const UserGuide = () => {

    const router = useNavigate();
  
    const scrollToTop = () => {
      router("/");
    };
  return (
    <>
      <div className="flex justify-center flex-col  items-center border-b border-secondary">
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <h1 className="text-2xl text-[#255BB3] font-bold mt-[40px]">
            ご利用ガイド
          </h1>

          <h3 className="text-[#808080] text-[18px] font-bold mt-5">
            見出し見出し見出し見出し
          </h3>

          <p className="text-[#808080] text-[18px] font-normal mt-5 break-all">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </div>
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <h3 className="text-[#808080] text-[18px] font-bold mt-5">
            見出し見出し見出し見出し
          </h3>

          <p className="text-[#808080] text-[18px] font-normal mt-5 break-all">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </div>
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <h3 className="text-[#808080] text-[18px] font-bold mt-5">
            見出し見出し見出し見出し
          </h3>

          <p className="text-[#808080] text-[18px] font-normal mt-5 break-all">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </div>
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <h3 className="text-[#808080] text-[18px] font-bold mt-5">
            見出し見出し見出し見出し
          </h3>

          <p className="text-[#808080] text-[18px] font-normal mt-5 break-all">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </div>
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <h3 className="text-[#808080] text-[18px] font-bold mt-5">
            見出し見出し見出し見出し
          </h3>

          <p className="text-[#808080] text-[18px] font-normal mt-5 break-all">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </p>
        </div>
        <div className="flex justify-center my-[108px]">
          <button
            type="button"
            onClick={scrollToTop}
            className="bg-[#808080] text-[18px] font-bold text-[#FFFFFF] px-8 py-2 w-full  max-w-[263px]"
          >
            トップページに戻る
          </button>
        </div>
      </div>
    </>
  );
};

export default UserGuide;
