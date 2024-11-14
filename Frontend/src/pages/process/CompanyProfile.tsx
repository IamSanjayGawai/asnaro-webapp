import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getAllProcessListThunkWithUser } from "@/state/thunks/processThunks";
import { getaverageRatingSellerThunk } from "@/state/thunks/transactionThunks";
import { selectTransaction } from "@/state/slices/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectProcess } from "@/state/slices/processSlice";
import ProcessCards from "../components/ProcessCards";
import { FaListUl } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import Spinner from "@/components/static/Spinner";
import { replaceWithAnchorTags } from "@/utils/replaceWithAnchorTags";
import RatingSystemForSeller from "../../pages/components/RatingSystemForSeller";

const CompanyProfile: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const { uid } = useParams();
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { process, loading } = useAppSelector(selectProcess);
  const { getRatings_Seller } = useAppSelector(selectTransaction);
  const averageRatingSeller = getRatings_Seller?.averageRating || 0;
  const totalRatingsSeller = getRatings_Seller?.ratingCount || 0;
  const [coverImage, setCoverImage] = useState([
    process?.user?.img1,
    process?.user?.img2,
    process?.user?.img3,
  ]);
  const openTime = new Date(process?.user?.open_time);
  const closeTime = new Date(process?.user?.close_time);
  const [holidayList, setHolidayList] = useState<string[]>([]);
  const maxButtons = 10;
  const startPage = Math.max(
    1,
    process?.pagination?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    process?.pagination?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/process/company-profile/${uid}?page=${pageNumber}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getAllProcessListThunkWithUser({ uid, currentPage }));
  }, [dispatch, uid, currentPage]);

  useEffect(() => {
    dispatch(getaverageRatingSellerThunk(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    if (
      process &&
      process?.user &&
      process?.user?.img1 &&
      process?.user?.img2 &&
      process?.user?.img3
    ) {
      setCoverImage([
        process?.user?.img1,
        process?.user?.img2,
        process?.user?.img3,
      ]);
    } else {
      setCoverImage([
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ]);
    }
  }, [process]);

  useEffect(() => {
    const holidays = [];
    if (process?.user?.holiday_flg1 === "1") {
      holidays.push("月曜日");
    }
    if (process?.user?.holiday_flg2 === "2") {
      holidays.push("火曜日");
    }
    if (process?.user?.holiday_flg3 === "3") {
      holidays.push("水曜日");
    }
    if (process?.user?.holiday_flg4 === "4") {
      holidays.push("木曜日");
    }
    if (process?.user?.holiday_flg5 === "5") {
      holidays.push("金曜日");
    }
    if (process?.user?.holiday_flg6 === "6") {
      holidays.push("土曜日");
    }
    if (process?.user?.holiday_flg7 === "7") {
      holidays.push("日曜日");
    }
    if (process?.user?.regular_holiday) {
      holidays.push(process?.user?.regular_holiday);
    }
    setHolidayList(holidays);
  }, [process]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [grid, setGrid] = useState(false);
  console.log("Grid => ", grid);
  const nextSlide = () => {
    if (slideIndex !== 2) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === 2) {
      setSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 0) {
      setSlideIndex(2);
    }
  };

  // console.log("averageRatingSeller", averageRatingSeller);
  // console.log("totalRatingsSeller", totalRatingsSeller);
  // console.log("userId", userId);
  // console.log("getRatings_Seller", getRatings_Seller);
  console.log("process", process);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col  items-center border-b border-secondary">
          <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
            <div
              className="
          flex justify-start items-end
          "
              style={{
                backgroundImage: `url(${coverImage[slideIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "437px",
              }}
            >
              <div className="w-full flex justify-evenly  overflow-hidden px-5 py-2 bg-[#00000080]">
                <div
                  className="w-fit p-3 my-auto bg-[#00000080] rounded-[50%] cursor-pointer"
                  onClick={prevSlide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="15"
                    viewBox="0 0 13 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_396_25261)">
                      <path
                        d="M11.7888 1.22838C12.0612 1.51178 12.205 1.83993 12.2153 2.22277C12.2256 2.60561 12.0817 2.93376 11.7888 3.21716L4.00332 10.7497L11.7888 18.2822C12.0612 18.5507 12.2051 18.8788 12.2256 19.2666C12.2462 19.6544 12.1023 19.9925 11.8145 20.271C11.537 20.5544 11.1978 20.6985 10.7867 20.7085C10.3756 20.7184 10.0313 20.5792 9.75892 20.2958L0.714404 11.57C0.596209 11.4557 0.503708 11.3264 0.442041 11.1822C0.380374 11.038 0.34954 10.8939 0.34954 10.7447C0.34954 10.5955 0.380374 10.4514 0.44204 10.3072C0.503708 10.163 0.59107 10.0387 0.714404 9.91935L9.73322 1.20352C10.0056 0.940006 10.3448 0.805765 10.7507 0.805765C11.1567 0.805765 11.501 0.944979 11.7939 1.22838L11.7888 1.22838Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_396_25261">
                        <rect
                          width="11.8709"
                          height="19.9027"
                          fill="white"
                          transform="translate(12.2253 20.708) rotate(180)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="w-full ">
                  <div className="flex sm:justify-start justify-center mx-[5em]  duration-700 gap-[21px] ">
                    <img
                      src={coverImage[slideIndex === 0 ? 2 : slideIndex - 1]}
                      onClick={() =>
                        setSlideIndex(slideIndex === 0 ? 2 : slideIndex - 1)
                      }
                      className="w-full max-w-[126px] h-[76px] object-cover cursor-pointer"
                      alt="img_9"
                    />

                    <img
                      src={coverImage[slideIndex === 2 ? 0 : slideIndex + 1]}
                      onClick={() =>
                        setSlideIndex(slideIndex === 2 ? 0 : slideIndex + 1)
                      }
                      className="w-full max-w-[126px] h-[76px] object-cover cursor-pointer"
                      alt="img_8"
                    />
                  </div>
                </div>

                <div
                  className=" p-3  bg-[#00000080] rounded-[50%] my-auto w-fit cursor-pointer"
                  onClick={nextSlide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="15"
                    viewBox="0 0 13 21"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_396_25256)">
                      <path
                        d="M1.05007 19.6124C0.777706 19.329 0.633816 19.0009 0.623538 18.618C0.61326 18.2352 0.75715 17.9071 1.05007 17.6237L8.83555 10.0912L1.05007 2.55865C0.777706 2.29016 0.633816 1.96201 0.61326 1.5742C0.592705 1.18639 0.736595 0.848294 1.02437 0.569865C1.30188 0.286464 1.64105 0.142277 2.05216 0.132333C2.46327 0.122389 2.80758 0.261604 3.07995 0.545005L12.1245 9.27078C12.2427 9.38513 12.3352 9.51441 12.3968 9.65859C12.4585 9.80278 12.4893 9.94697 12.4893 10.0961C12.4893 10.2453 12.4585 10.3895 12.3968 10.5337C12.3352 10.6778 12.2478 10.8021 12.1245 10.9215L3.10564 19.6373C2.83328 19.9008 2.49411 20.0351 2.08813 20.0351C1.68216 20.0351 1.33785 19.8958 1.04493 19.6124H1.05007Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_396_25256">
                        <rect
                          width="11.8709"
                          height="19.9027"
                          fill="white"
                          transform="translate(0.613281 0.132812)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full items-center mx-auto mt-[31px]  inline-grid inline-grid-cols-2   justify-center gap-3">
              <img
                src={
                  process?.user?.profile_img ||
                  "https://static.thenounproject.com/png/1559146-200.png"
                }
                className="w-full  sm:max-w-[145px] max-w-[69px] rounded-full row-start-1 row-end-2 md:row-end-3  h-auto sm:mr-4"
                alt="logo"
              />
              <div className="flex mt-3 flex-col row-start-1 row-end-2  col-span-1">
                <h1
                  className="text-[#255BB3] my-auto sm:text-[24px] text-[14px] font-[700]"
                  dangerouslySetInnerHTML={{
                    __html:
                      process?.user?.name01 &&
                      replaceWithAnchorTags(process?.user?.name01),
                  }}
                ></h1>

                {averageRatingSeller ? (
                  <RatingSystemForSeller
                    averageRating={averageRatingSeller}
                    totalRatings={totalRatingsSeller}
                  />
                ) : (
                  <RatingSystemForSeller averageRating={0} totalRatings={0} />
                )}
              </div>

              <p className="text-[12px] sm:text-[14px] col-span-3 text-[#808080] md:col-start-2 sm:col-end-3 md:row-start-2 sm:mt-2 max-w-[660px] w-full break-all">
                {process?.user?.business_content && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: replaceWithAnchorTags(
                        process?.user?.business_content ||
                          "エレベータ部品、工作機械部品の製造を主として、板金、製缶加工から機械加工、塗装、組み立てまで大型構造物を社内にて一括加工を行います。 10tまでの製缶構造物の対応、最大2500*5000の大型五面加工機を保有するなど大型製品の対応が可能です。"
                      ),
                    }}
                  />
                )}
              </p>

              <div className="col-span-3 md:col-start-2 md:row-start-4 ">
                <div className="border-[1px] sm:mt-0  mt-[16px] p-4  border-[#E6E6E6] w-full max-w-[660px] ">
                  <div className="inline-grid items-start inline-grid-cols-2 sm:gap-[40px] gap-[20px] border-b-[1px] border-[#E6E6E6] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] row-start-1 text-left sm:w-[70px]">
                      加工分類
                    </h2>
                    <div className="flex flex-wrap gap-[10px] col-span-2 row-start-2 sm:row-start-1">
                      {process?.user?.classified01 && (
                        <h2 className="text-[12px]  text-[#FA0] font-[700]  py-[2px]  px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1 ">
                          {" "}
                          {process?.user?.classified01 || ""}
                        </h2>
                      )}
                      {process?.user?.classified02 && (
                        <h2 className="text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1   ">
                          {process?.user?.classified02 || ""}
                        </h2>
                      )}
                      {process?.user?.classified03 && (
                        <h2 className="text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1  ">
                          {process?.user?.classified03 || ""}
                        </h2>
                      )}
                      {process?.user?.classified04 && (
                        <h2 className="text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1  ">
                          {process?.user?.classified04 || ""}
                        </h2>
                      )}
                      {process?.user?.classified05 && (
                        <h2 className="text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1  ">
                          {process?.user?.classified05 || ""}
                        </h2>
                      )}
                    </div>
                  </div>

                  <div className="grid mt-[16px] sm:mt-[20px] grid-cols-6 sm:items-center items-start sm:gap-[40px] gap-5  border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2 sm:col-span-1 ">
                      営業時間
                    </h2>
                    {openTime || closeTime ? (
                      <h2 className="text-[14px] text-[#808080] font-[400] col-span-2  sm:row-start-1 row-start-2 sm:line-clamp-2">
                        {openTime.getHours()}:
                        {openTime.getMinutes().toString().padStart(2, "0")} ~{" "}
                        {closeTime.getHours()}:
                        {closeTime.getMinutes().toString().padStart(2, "0")}{" "}
                      </h2>
                    ) : (
                      <h2 className="text-[14px] text-[#808080] font-[400] col-span-2  sm:row-start-1 row-start-2 sm:line-clamp-2">
                        ー
                      </h2>
                    )}
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500] sm:col-start-4  col-start-5 p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2">
                      定休日
                    </h2>
                    <h2 className=" font-[400] p-1 text-[14px]  col-start-5 col-end-8 text-left  text-[#808080] sm:row-start-1 row-start-2 sm:line-clamp-2 ">
                      {holidayList && holidayList.length > 0
                        ? holidayList.join(", ")
                        : "ー"}
                    </h2>
                  </div>

                  <div className="grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] text-left sm:text-center font-[500] p-1 text-[14px] text-[#808080]  row-start-1 col-span-6 sm:col-span-1 sm:w-[70px]">
                      所在地
                    </h2>
                    <h2 className="text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 col-span-6 sm:line-clamp-3">
                      〒{process?.user?.zip01 ? process?.user?.zip01 : "ー"} -{" "}
                      {process?.user?.zip02 ? process?.user?.zip02 : "ー"}{" "}
                      {process?.user?.pref ? process?.user?.pref : "ー"}{" "}
                      {process?.user?.addr01 ? process?.user?.addr01 : "ー"}{" "}
                      {process?.user?.addr02 ? process?.user?.addr02 : "ー"}
                    </h2>
                  </div>

                  <div className="grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] text-left sm:text-center font-[500] p-1 text-[14px] text-[#808080] col-span-3 sm:row-start-1 sm:col-span-1 sm:w-[70px] ">
                      URL
                    </h2>
                    {process?.user?.corporate_url ? (
                      <a
                        target="_blank"
                        href={
                          process.user.corporate_url.startsWith("http://") ||
                          process.user.corporate_url.startsWith("https://")
                            ? process.user.corporate_url
                            : `https://${process.user.corporate_url}`
                        }
                        className="text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 col-span-6 underline cursor-pointer"
                      >
                        {process.user.corporate_url}
                      </a>
                    ) : (
                      <span className="text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 col-span-6 cursor-default">
                        ー
                      </span>
                    )}
                  </div>

                  <div className="grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-5  border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2 sm:col-span-1 ">
                      設立日{" "}
                    </h2>
                    <h2 className="text-[14px] text-[#808080] font-[400] col-span-2  sm:row-start-1 row-start-2 sm:line-clamp-2">
                      {process?.user?.establishment_date
                        ? new Date(
                            process.user.establishment_date
                          ).toLocaleDateString()
                        : "ー"}
                    </h2>
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500]  sm:col-start-4  col-start-5 p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1  col-span-2 sm:col-span-1">
                      資本金{" "}
                    </h2>
                    <h2
                      className="font-[400] p-1 text-[14px] col-start-5 col-end-8 text-left text-[#808080] sm:row-start-1 row-start-2 sm:line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: process?.user?.capital
                          ? replaceWithAnchorTags(
                              `${process.user.capital}  万円`
                            )
                          : replaceWithAnchorTags("ー"),
                      }}
                    ></h2>
                  </div>

                  <div className="grid mt-[16px] sm:mt-[4px] grid-cols-6 sm:items-center items-start gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4  w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 ">
                      代表
                    </h2>
                    <h2
                      className="text-[14px] text-[#808080] font-[400] sm:col-span-2 sm:row-start-1 row-start-2 col-span-3 sm:line-clamp-2 ml-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          (process?.user?.delegate_name01 ||
                            process?.user?.delegate_name02) &&
                          replaceWithAnchorTags(
                            `${process?.user?.delegate_name01}  ${process?.user?.delegate_name02}`
                          ),
                      }}
                    ></h2>
                    <h2 className="sm:bg-[#E6E6E6] sm:text-center font-[500] sm:col-start-4  col-start-5 p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2 ml-8">
                      従業員数
                    </h2>
                    <h2
                      className=" font-[400] p-1 text-[14px]  col-start-5 col-end-8 text-left  text-[#808080] sm:row-start-1 row-start-2 sm:line-clamp-2 ml-8"
                      dangerouslySetInnerHTML={{
                        __html: process?.user?.employees_number
                          ? replaceWithAnchorTags(
                              `${process?.user?.employees_number} 名`
                            )
                          : replaceWithAnchorTags("ー"),
                      }}
                    ></h2>
                  </div>

                  <div className="grid mt-[16px] sm:mt-[4px] grid-cols-5 items-center gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit">
                    <h2 className="sm:bg-[#E6E6E6] text-left sm:text-center font-[500] col-start-1 col-end-3 p-1 text-[14px] text-[#808080] row-start-1 w-[220px] ">
                      適格請求書発行事業者登録番号
                    </h2>
                    <h2
                      className="text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 sm:line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: process?.user?.business_id
                          ? replaceWithAnchorTags(process?.user?.business_id)
                          : replaceWithAnchorTags("ー"),
                      }}
                    ></h2>
                  </div>

                  <div className="grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-[20px] w-fit">
                    <h2 className="sm:bg-[#E6E6E6] text-center font-[500] p-1 text-[14px] text-[#808080] row-start-1 w-[80px]  ">
                      主要取引先
                    </h2>
                    <h2
                      className="text-[14px] text-[#808080] font-[400] col-span-3 sm:row-start-1 row-start-2 sm:col-span-2 sm:line-clamp-2 "
                      dangerouslySetInnerHTML={{
                        __html: process?.user?.main_customer
                          ? replaceWithAnchorTags(process?.user?.main_customer)
                          : replaceWithAnchorTags("ー"),
                      }}
                    ></h2>
                    {/* <h2 className='text-[14px] text-[#808080] font-[400] col-span-3 sm:row-start-1 row-start-2 sm:col-span-2'>トヨタ自動車株式会社 </h2> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[58px]">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <h1 className="text-[#255BB3] text-[24px] hidden sm:block  font-[700] pr-4">
                    取り扱い工程一覧{" "}
                  </h1>
                  <span className="text-[#808080] text-[16px] font-[700] ml-4">
                    該当件数：{process?.pagination?.totalItems}件
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <FaListUl
                    className="cursor-pointer"
                    onClick={() => setGrid(false)}
                    size={20}
                    color={grid && "#808080"}
                  />

                  <IoGrid
                    className="cursor-pointer"
                    onClick={() => setGrid(true)}
                    size={20}
                    color={!grid && "#808080"}
                  />
                </div>
              </div>

              <div
                className={`grid mt-[30px] ${
                  grid
                    ? "grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4"
                    : "grid-cols-1 gap-4"
                }`}
              >
                {process?.processes &&
                  process?.processes?.map((process, index) => (
                    <ProcessCards
                      key={index}
                      grid={grid}
                      setGrid={setGrid}
                      process={process}
                    />
                  ))}
              </div>

              {process?.processes?.length > 0 && (
                <div className="col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]">
                  <div className="flex gap-1">
                    {pageNumbers.map((value, index) => (
                      <button
                        className={`border w-[25px] ${
                          currentPage === value
                            ? "bg-primary text-white"
                            : "bg-white"
                        } border-[#DCDCDC]`}
                        key={index}
                        onClick={() => handlePageChange(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  {endPage < process?.pagination?.totalPages && (
                    <div
                      className="flex gap-1 items-center cursor-pointer"
                      onClick={() => handlePageChange(endPage + 1)}
                    >
                      <div className="font-[500] text-primary text-[16px] w-full">
                        次ページ
                      </div>
                      <svg
                        className=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                      >
                        <path
                          d="M15.4318 9L0.138137 17.6603L0.138138 0.339745L15.4318 9Z"
                          fill="#255BB3"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
