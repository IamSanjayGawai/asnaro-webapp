// import Map from "./Map";
import { useNavigate } from "react-router-dom";

const About = () => {
  const router = useNavigate();

  const scrollToTop = () => {
    router("/");
  };

  return (
    <div className="md:max-w-[1024px] xs:mt-[24px] md:mt-0 md:pt-[50px] pb-[100px] mx-auto xs:px-4 sm:px-6 md:px-8 text-tertiary">
      <div className="md:mx-auto grid grid-cols-24 xs:gap-y-1 md:gap-y-2 lg:gap-y-1">
        <div className="col-span-24 text-[24px] mb-[43px] font-bold text-tertiary">
          会社概要
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 text-base">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            商号
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            株式会社 丸菱製作所
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            住所
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex flex-col justify-center xs:p-[16px]">
            <div>486-0807</div>
            <div>愛知県春日井市大手町字川内1045番地</div>
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            URL
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            <a
              target="_blank"
              href="http://www.marubishi-co-ltd.com"
              className={`${" underline"}`}
            >
              http://www.marubishi-co-ltd.com
            </a>
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            電話番号
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            0568-31-8414
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            FAX番号
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            0568-31-8489
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            メールアドレス
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            <a href="mailto:marubishi@marubishi-co-ltd.com"
                className={`${" underline "}`}
                >
              marubishi@marubishi-co-ltd.com
            </a>
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            設立日
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            昭和27年2月26日
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            資本金
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            3,600万円
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            代表取締役社長
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            戸松 精三
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            従業員数
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            92名
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            主要取引先
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            三菱電機株式会社、三菱電機ビルソリューションズ株式会社、中部抵抗器株式会社
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            取引銀行
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            三菱UFJ銀行、十六銀行、大垣共立銀行、瀬戸信用金庫、岐阜信用金庫
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 px-2 py-2 lg:col-span-6 flex justify-center items-center bg-primary text-white">
            事業内容
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
            エレベータ・工作機械の大型金属部品の一貫加工、與板板金加工、大型機械加工、塗装、組み立て
          </div>
        </div>
      </div>
      <div className="md:h-[500px] xs:h-[300px] w-full bg-tertiary mt-[30px] mb-[100px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73717.34251798071!2d136.89678360761107!3d35.25931445361537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600372f91f90540f%3A0xd80a008687500129!2z44ix5Li46I-x6KO95L2c5omA!5e0!3m2!1sja!2sjp!4v1705034574897!5m2!1sja!2sjp"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="mt-[100px] flex justify-center items-center">
        <button
          onClick={scrollToTop}
          className="text-white bg-tertiary py-3 rounded xs:w-1/2 md:w-1/3 lg:w-1/4 h-full"
        >
          トップページに戻る
        </button>
      </div>
    </div>
  );
};

export default About;
