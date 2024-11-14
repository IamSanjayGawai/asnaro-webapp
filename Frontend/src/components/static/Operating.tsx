import { useNavigate, } from "react-router-dom";
import { useAppDispatch , useAppSelector} from "@/state/hooks";
import { useEffect } from "react";
import {getCommercialActThunk} from "../../state/thunks/adminThunks";
import { selectAdmin } from "@/state/slices/adminSlice";
 
const Operating = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch()
  const {commercialAct} = useAppSelector(selectAdmin);
  console.log("commercialAct,", commercialAct)

  const scrollToTop = () => {
    router("/");
  };

  useEffect(() => {
    dispatch(getCommercialActThunk({}))
  }, [])



  return (
    <div className="md:max-w-[1024px] xs:mt-[24px] md:mt-0 md:pt-[50px] pb-[100px] mx-auto xs:px-4 sm:px-6 md:px-8 text-tertiary">
    { commercialAct?.data?.map((act) => (
      <div className="md:mx-auto grid grid-cols-24 xs:gap-y-1 md:gap-y-2 lg:gap-y-1">
        <div className="col-span-24 text-[24px] mb-[43px] font-bold text-tertiary">
          特定商取引法に基づく表記
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8  ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            販売業者
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
          {act.distributor} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            運営責任者
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
          {act.operationManager} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            住所
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex flex-col justify-center xs:p-[16px]">
            <div>   {act.postCode} </div>
            <div>   {act.location} </div>
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            電話番号
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
          {act.telephone} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            FAX番号
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
          {act.fax} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            メールアドレス
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
          <a
              target="_blank"
              href="https://www.info_asnaro@asnaro.co.jp"
              className={`${" underline"}`}
            >
          {act.email} 
            </a>  
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            URL
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
          <a
              target="_blank"
              href="http://www.marubishi-co-ltd.com/index.html"
              className={`${" underline"}`}
            >
   {act.url} 
            </a>
          </div>
         
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            商品以外の必要代金
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
          {act.requiredFees} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            注文方法
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
          {act.howToOrder} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            支払方法
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
          {act.paymentMethod} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            支払期限
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
          {act.dueDateForPayment} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            引渡し時期
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
          {act.deliveryTime} 
          </div>
        </div>
        <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
          <div className="text-base xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
            キャンセル・ 差戻について
          </div>
          <div className="text-base xs:col-span-17 lg:col-span-18 xs:p-[16px]">
          {act.aboutReturnExchange} 
          </div>
        </div>
      </div>
     ) )}
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

export default Operating;
