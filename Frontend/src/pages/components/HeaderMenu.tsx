import { Link } from "react-router-dom";

function HeaderMenue() {
  return (
    <>
      <div className="xs:hidden md:flex font-[500] flex-row justify-start items-center w-full h-[36px] max-w-[1200px] mx-auto gap-[35px] text-[#255BB3] px-8">
        <Link to="/news">
          <h1 className="lg:text-[18px]">ニュース</h1>
        </Link>
        <a target="_blank" href="https://asnaro.co.jp/about/">
          <h1 className="lg:text-[18px]">ASNAROとは</h1>
        </a>
        <Link to="/user-guide">
          <h1 className="lg:text-[18px]">ご利用ガイド</h1>
        </Link>
        <Link to="/contact">
          <h1 className="lg:text-[18px]">お問い合わせ</h1>
        </Link>
      </div>
      <div className="border-t-[1px] border-[#E6E6E6]"></div>
    </>
  );
}

export default HeaderMenue;
