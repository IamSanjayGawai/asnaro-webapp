import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/state/hooks";
import StatCalendar from "@/components/static/StatCalender";
import processImg from "@/assets/compnay/processImg.png";
import { FaAngleRight } from "react-icons/fa6";
import No_Image_Available from "../../assets/compnay/No_Image_Available.jpg";
import RatingSystem from "./RatingSystem";
import { processSearchThunk } from "@/state/thunks/processThunks";

type Process = {
  _id: string;
  img1: string;
  img2: string;
  img3: string;
  process_counter: number;
  name: string;
  maker_name: string;
  years_type: string;
  pref: string;
  mun: string;
  capacity: string;
  equipment_size: string;
  process_explanation: string;
  delivery_date: string;
  cost_price: string;
  unit_price: string;
  parent_category: string;
  children_category: string;
  remarks_column: string;
  status: string;
  tags: string[];
  search_word: string;
  customer_id: number;
  image_path: string;
  review: number;
  create_date: Date;
  update_date: Date;
  del_flg: number;
  user: {
    _id: string;
    name01: string;
    kana01: string;
    business_content: string;
  };
  totalRatingSum: number;
  totalReviews: number;
  availability: Array<{
    date: Date;
    selectedStatus: string;
  }>;
};

type Props = {
  grid?: boolean;
  setGrid?: React.Dispatch<React.SetStateAction<boolean>>;
  process?: Process | null;
};

function ProcessCards({ grid, process }: Props) {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(process?.img1);
  const handleDetailsNavigate = () => {
    router(`/process/details/${process?._id}`);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = No_Image_Available; // Fallback image
  };

  // console.log("process ....", process)
  return (
    <div
      className={` w-full   border-[1px] border-[#E6E6E6] p-0 sm:p-4 shadow-sm   ${
        !grid
          ? "grid md:grid-cols-[2fr,3fr,2fr] lg:grid-cols-[1fr,3fr,1fr] sm:gap-3"
          : "flex flex-col justify-between sm:justify-start "
      }`}
    >
      <div>
        <img
          src={image || processImg}
          alt="ProcessImg"
          className="w-full object-cover"
          onError={handleImageError}
        />
        <div
          className={
            grid ? "hidden" : " hidden sm:grid grid-cols-3 gap-[6px] mt-[6px] "
          }
        >
          <img
            src={process?.img1 || processImg}
            alt="ProcessImg"
            onClick={() => setImage(process?.img1 || processImg)}
            className="cursor-pointer"
            onError={handleImageError}
          />
          <img
            src={process?.img2 || processImg}
            onClick={() => setImage(process?.img2 || processImg)}
            alt="ProcessImg"
            className="cursor-pointer"
            onError={handleImageError}
          />
          <img
            src={process?.img3 || processImg}
            onClick={() => setImage(process?.img3 || processImg)}
            alt="ProcessImg"
            className="cursor-pointer"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className={grid ? "sm:px-0 px-4 mt-4" : "p-4"}>
        <h1
          className={`text-[#255BB3] no-underline sm:text-[20px] text-[16px] font-[700]  cursor-pointer  line-clamp-1 ${
            grid ? "" : "sm:underline"
          }`}
          onClick={handleDetailsNavigate}
        >
          {process?.name}
        </h1>
        <div
          className={`flex lg:flex-row xs:flex-col ${
            grid ? "lg:gap-10 xs:gap-2" : "lg:gap-8 xs:gap-2"
          } mt-2 `}
        >
          <h1
            className={`sm:text-[16px] text-[12px] text-[#808080] font-[500] underline cursor-pointer  line-clamp-1 ${
              grid ? "sm:block hidden" : ""
            }`}
            onClick={() =>
              router(`/process/company-profile/${process?.user?._id}`)
            }
          >
            {process?.user?.name01}
          </h1>

          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
            >
              <g clip-path="url(#clip0_1241_5287)">
                <path
                  d="M6.57895 7.71333C6.97368 7.71333 7.31497 7.57884 7.59457 7.30591C7.87418 7.03298 8.01809 6.70862 8.01809 6.32493C8.01809 5.94124 7.87829 5.61689 7.59457 5.34791C7.31086 5.07893 6.97368 4.94049 6.57484 4.94049C6.17599 4.94049 5.83882 5.07498 5.55921 5.34791C5.27961 5.62084 5.13569 5.9452 5.13569 6.32889C5.13569 6.71258 5.27549 7.03693 5.55921 7.30591C5.84293 7.57489 6.1801 7.71333 6.57895 7.71333ZM6.57895 15.8222C4.37089 14.0145 2.72204 12.3374 1.6324 10.7868C0.542763 9.23622 0 7.80431 0 6.48711C0 4.50933 0.662007 2.93502 1.98602 1.76022C3.30592 0.585422 4.83964 0 6.57895 0C8.31826 0 9.85197 0.585422 11.176 1.76022C12.5 2.93502 13.162 4.50933 13.162 6.48711C13.162 7.80431 12.6151 9.24018 11.5255 10.7908C10.4359 12.3413 8.78701 14.0185 6.57895 15.8262V15.8222Z"
                  fill="#808080"
                />
              </g>
              <defs>
                <clipPath id="clip0_1241_5287">
                  <rect width="13.1579" height="15.8222" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1 className="sm:text-[16px] text-[12px] text-[#808080] font-[400] ">
              {`${process?.pref ? process?.pref + ", " : ""}${
                process?.mun ? process?.mun : ""
              }`}
            </h1>
          </div>
        </div>
        <div className=" grid grid-cols-1 gap-2 sm:pb-0 pb-4 w-full sm:w-fit mt-2">
          <RatingSystem
            averageRating={process?.totalRatingSum || 0}
            totalRatings={process?.totalReviews || 0}
          />

          <div
            className={`flex flex-wrap gap-2 row-start-2 ${
              grid ? "" : "sm:row-start-2"
            }`}
          >
            {process?.tags &&
              process?.tags?.map((tag, index) => (
                <h2
                  key={index}
                  className={`text-[12px] ${
                    grid && "text-[10px] sm:text-[12px]"
                  }  text-[#FA0] font-[700]  py-[1px]  px-[15px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1 cursor-pointer`}
                  onClick={() => {
                    dispatch(
                      processSearchThunk({
                        keyword: tag,
                        pageSize: 12,
                      })
                    );
                    router(`/process/search-results?keyword=${tag}`);
                  }}
                >
                  {tag}
                </h2>
              ))}
          </div>
        </div>

        <div
          className={`flex items-start gap-3 sm:mt-4 ${
            grid ? "hidden sm:flex" : "flex"
          }`}
        >
          <h2 className="bg-[#E6E6E6] text-center font-[500] p-1 sm:text-[14px] text-[12px] text-[#808080] w-[60px]">
            工程
          </h2>
          <h2 className="sm:text-[14px] text-[12px] text-[#808080] font-[400] w-4/5 line-clamp-3 ">
            {process?.process_explanation}
          </h2>
        </div>

        <div
          className={`flex items-start gap-3 mt-4 ${
            grid ? "hidden sm:flex" : "flex"
          }`}
        >
          <h2
            className={
              "bg-[#E6E6E6] text-center font-[500] p-1 sm:text-[14px] text-[12px] text-[#808080] w-[60px]  "
            }
          >
            能力
          </h2>
          <h2 className="sm:text-[14px] text-[12px] text-[#808080] font-[400] w-4/5 line-clamp-3 ">
            {process?.capacity}
          </h2>
        </div>

        <div
          className={`flex items-center gap-3 mt-4 ${
            grid ? "hidden sm:flex" : "flex"
          }`}
        >
          <h2 className="bg-[#E6E6E6] text-center font-[500] p-1 sm:text-[14px] text-[12px] text-[#808080] w-[60px]">
            納期
          </h2>
          <h2 className="sm:text-[14px] text-[12px] text-[#808080] font-[400] w-4/5  line-clamp-3">
            {process?.delivery_date}
          </h2>
        </div>
      </div>

      <div className={!grid ? " hidden sm:block md:pt-4" : "hidden"}>
        <StatCalendar value={process} />
      </div>

      <div className={"w-full px-2 pb-2 sm:hidden"}>
        <button className="bg-[#255BB3] text-center w-full text-[#fff] p-2 flex items-center justify-center gap-2 font-bold">
          空き状況 <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default ProcessCards;
