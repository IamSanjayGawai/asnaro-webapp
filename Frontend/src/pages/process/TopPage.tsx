import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectProcess } from "@/state/slices/processSlice";
import { selectUser } from "@/state/slices/userSlice";
import {
  getAllRecommendedProcessThunk,
  getAllUsageProcessThunk,
  processSearchThunk,
} from "@/state/thunks/processThunks";
import { getAllNewsListThunk } from "@/state/thunks/newsApiThunks";
import { selectNews } from "@/state/slices/newsSlice";
import TopPageCards from "../components/TopPageCards";
import UsageHistoryCard from "../components/UsageHistoryCard";
import Image_10 from "../../assets/compnay/image_10.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { BASE_URL } from "@/utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { socket } from "@/state/store";
import NewsDetailSkeleton from "../components/NewsDetailSkeleton";
import { Link } from "react-router-dom";

type hotWordType = {
  _id: string;
  count: number;
};

type hotWordsType = {
  data: hotWordType[];
  success: boolean;
};

const TopPage = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { recommended, usageProcess } = useAppSelector(selectProcess);
  const { newsAll, loading: newsLoading } = useAppSelector(selectNews);
  const { user } = useAppSelector(selectUser);
  const userId = user?.newUser?.id;
  console.log("news all on topPage", newsAll);
  const [hotWords, setHotWords] = useState<hotWordsType>({
    data: [],
    success: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const isDataLoading = newsLoading || isLoading;

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    socket.on("newNewsToggle", async () => {
      await dispatch(getAllNewsListThunk(1));
    });
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage] = useState(page ? parseInt(page) : 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllRecommendedProcessThunk());
      await dispatch(getAllUsageProcessThunk(userId));
      await dispatch(getAllNewsListThunk(currentPage));
    };
    fetchData();
  }, [currentPage]);

  console.log("user", user?.newUser?.id);
  useEffect(() => {
    const fetchHotWords = async () => {
      try {
        const response = await axios.get<hotWordsType>(
          `${BASE_URL}/process/top-hot-words`
        );
        setHotWords(response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchHotWords();
  }, []);

  const carouselData = [
    {
      imageUrl: Image_10,
      title: "Image 4",
    },

    {
      imageUrl:
        "https://www.japantimes.co.jp/uploads/imported_images/uploads/2017/10/b-subaru-a-20171028.jpg",
      title: "Image 1",
    },

    {
      imageUrl:
        "https://www.raypcb.com/wp-content/uploads/2021/07/EMS-Electronics-Manufacturing-Companies.jpg",
      title: "Image 2",
    },

    {
      imageUrl:
        "https://image.cnbcfm.com/api/v1/image/101072030-105033276.jpg?v=1575249229&w=929&h=523&vtcrop=y",
      title: "Image 3",
    },
  ];

  const CustomPrevArrow = (props) => (
    <div
      {...props}
      className="absolute top-1/2 left-1 w-10 h-10 bg-[#00000080] rounded-full shadow sm:flex items-center justify-center z-10 cursor-pointer  hidden"
      style={{ marginLeft: "1em" }}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="20"
        viewBox="0 0 13 20"
        fill="none"
      >
        <g clip-path="url(#clip0_387_18351)">
          <path
            d="M12.3536 19.5809C12.6253 19.2999 12.7688 18.9745 12.7791 18.5948C12.7893 18.2152 12.6458 17.8898 12.3536 17.6087L4.58701 10.139L12.3536 2.66928C12.6253 2.40303 12.7688 2.07762 12.7893 1.69304C12.8098 1.30846 12.6663 0.973182 12.3792 0.697074C12.1024 0.416034 11.764 0.27305 11.3539 0.263189C10.9438 0.253328 10.6003 0.391382 10.3286 0.672421L1.30608 9.32547C1.18817 9.43887 1.09589 9.56707 1.03438 9.71005C0.972859 9.85304 0.942101 9.99602 0.942101 10.1439C0.942101 10.2919 0.972859 10.4348 1.03438 10.5778C1.09589 10.7208 1.18304 10.8441 1.30608 10.9624L10.303 19.6056C10.5747 19.8669 10.9131 20 11.318 20C11.723 20 12.0665 19.862 12.3587 19.5809H12.3536Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_387_18351">
            <rect
              width="11.8421"
              height="19.7368"
              fill="white"
              transform="matrix(-1 0 0 1 12.7896 0.263672)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div
      {...props}
      className="absolute top-1/2 right-1 w-10 h-10 bg-[#00000080] rounded-full shadow sm:flex items-center justify-center z-10 cursor-pointer hidden"
      style={{ marginRight: "1em" }}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="20"
        viewBox="0 0 13 20"
        fill="none"
      >
        <g clip-path="url(#clip0_387_18346)">
          <path
            d="M0.698906 19.5809C0.427204 19.2999 0.283664 18.9745 0.273411 18.5948C0.263158 18.2152 0.406699 17.8898 0.698906 17.6087L8.46548 10.139L0.698906 2.66928C0.427204 2.40303 0.283664 2.07762 0.263158 1.69304C0.242652 1.30846 0.386193 0.973182 0.673274 0.697074C0.950103 0.416034 1.28845 0.27305 1.69856 0.263189C2.10868 0.253328 2.45215 0.391382 2.72386 0.672421L11.7464 9.32547C11.8643 9.43887 11.9566 9.56707 12.0181 9.71005C12.0796 9.85304 12.1104 9.99602 12.1104 10.1439C12.1104 10.2919 12.0796 10.4348 12.0181 10.5778C11.9566 10.7208 11.8694 10.8441 11.7464 10.9624L2.74949 19.6056C2.47779 19.8669 2.13944 20 1.73445 20C1.32946 20 0.985988 19.862 0.69378 19.5809H0.698906Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_387_18346">
            <rect
              width="11.8421"
              height="19.7368"
              fill="white"
              transform="translate(0.262939 0.263672)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          swipeToSlide: true,
        },
      },
    ],
  };

  const numberOfCards = usageProcess?.processes?.length || 0;
  const Usagesetting = {
    infinite: numberOfCards > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    horizontal: true,
    autoplay: numberOfCards > 6,
    prevArrow: numberOfCards > 6 ? <CustomPrevArrow /> : null,
    nextArrow: numberOfCards > 6 ? <CustomNextArrow /> : null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(
            3,
            numberOfCards + Math.max(0, 3 - numberOfCards)
          ),
          infinite: numberOfCards > 3,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(
            2,
            numberOfCards + Math.max(0, 2 - numberOfCards)
          ),
          infinite: numberOfCards > 2,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(
            2,
            numberOfCards + Math.max(0, 2 - numberOfCards)
          ),
          initialSlide: 1,
          infinite: numberOfCards > 3,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(
            2,
            numberOfCards + Math.max(0, 2 - numberOfCards)
          ),
          swipeToSlide: true,
          infinite: numberOfCards > 2,
          prevArrow: null,
          nextArrow: null,
        },
      },
    ],
  };

  const recommendedCards = recommended?.data?.length || 0;
  const settingForRecommended = {
    infinite: recommendedCards > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    horizontal: true,
    autoplay: recommendedCards > 6,
    prevArrow: recommendedCards > 6 ? <CustomPrevArrow /> : null,
    nextArrow: recommendedCards > 6 ? <CustomNextArrow /> : null,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(
            3,
            recommendedCards + Math.max(0, 3 - recommendedCards)
          ),
          infinite: recommendedCards > 3,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(
            2,
            recommendedCards + Math.max(0, 2 - recommendedCards)
          ),
          infinite: recommendedCards > 2,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(
            2,
            recommendedCards + Math.max(0, 2 - recommendedCards)
          ),
          initialSlide: 1,
          infinite: recommendedCards > 3,
          prevArrow: null,
          nextArrow: null,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(
            2,
            recommendedCards + Math.max(0, 2 - recommendedCards)
          ),
          swipeToSlide: true,
          infinite: recommendedCards > 2,
          prevArrow: null,
          nextArrow: null,
        },
      },
    ],
  };

  console.log("recommended", recommended);
  console.log("usageProcess", usageProcess);

  return (
    <>
      <div className="flex justify-center flex-col  items-center sm:mb-80 mb-10 ">
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <div className="sm:grid hidden grid-cols-[150px,auto] ">
            <h1 className="text-[#808080] text-[24px] font-bold mr-5">
              注目ワード
            </h1>
            <div className="flex flex-wrap sm:gap-5 gap-1 mt-2 ">
              {hotWords &&
                hotWords?.data &&
                hotWords?.data.map((word, index) => (
                  <div key={index}>
                    <div
                      className="sm:text-[14px] text-[6px] flex justify-center items-center h-6  text-[#FA0] font-[700]  py-[2px]  px-[13px] my-auto rounded-full bg-[#FFF4DF] cursor-pointer mb-0"
                      onClick={() => {
                        dispatch(
                          processSearchThunk({
                            keyword: word._id,
                            pageSize: 12,
                          })
                        );
                        router(`/process/search-results?keyword=${word._id}`);
                      }}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_387_18380)">
                            <path
                              d="M11.6666 12L7.28324 7.61667C6.9499 7.90667 6.5599 8.13 6.11657 8.29333C5.67324 8.45667 5.1999 8.53667 4.6999 8.53667C3.49657 8.53667 2.4799 8.12 1.6499 7.28667C0.819902 6.45333 0.399902 5.44333 0.399902 4.26667C0.399902 3.09 0.816569 2.08333 1.6499 1.25C2.48324 0.416667 3.49324 0 4.67657 0C5.8599 0 6.86657 0.416667 7.69323 1.25C8.5199 2.08333 8.93657 3.09 8.93657 4.27C8.93657 4.74667 8.8599 5.20667 8.70323 5.65C8.54657 6.09333 8.31323 6.51 8.00323 6.9L12.4032 11.2667L11.6699 12H11.6666ZM4.68324 7.53333C5.58657 7.53333 6.35324 7.21333 6.98657 6.57333C7.6199 5.93333 7.93324 5.16333 7.93324 4.26333C7.93324 3.36333 7.61657 2.59333 6.98657 1.95333C6.35324 1.31333 5.58657 0.993333 4.68324 0.993333C3.7799 0.993333 2.99657 1.31333 2.35657 1.95333C1.71657 2.59333 1.3999 3.36333 1.3999 4.26333C1.3999 5.16333 1.7199 5.93333 2.35657 6.57333C2.99657 7.21333 3.7699 7.53333 4.68324 7.53333Z"
                              fill="#FFAA00"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_387_18380">
                              <rect
                                width="12"
                                height="12"
                                fill="white"
                                transform="translate(0.399902)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        {word?._id}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* <div className='bg-[red]'> */}
          <Slider {...settings} className="mt-4 ">
            {carouselData.map((item, index) => (
              <div key={index}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full  sm:h-[230px] xs:h-[150px] md:h-[230px] lg:h-[430px] object-cover "
                />
              </div>
            ))}
          </Slider>
          {/* </div> */}

          <h1
            className={
              "text-[#808080] sm:text-[24px] text-[16px] mt-8 font-[700]"
            }
          >
            おすすめの工程
          </h1>

          <Slider
            {...settingForRecommended}
            className="flex flex-row mt-4 w-full "
          >
            {recommended &&
              recommended?.data.map((process, index) => (
                <div className="mx-2 border-2 shadow-lg mb-6">
                  <TopPageCards key={index} process={process} />
                </div>
              ))}

            {Array.from({
              length:
                settingForRecommended.slidesToShow - recommended?.data.length,
            }).map((_, index) => (
              <div key={`empty-${index}`} className="mx-2  shadow-lg mb-6" />
            ))}
          </Slider>
          {/* history processes */}
          <div
            className={`flex gap-4  mt-8 items-center ${
              user || (usageProcess && usageProcess.processes.length > 2)
                ? ""
                : "mb-5"
            }`}
          >
            <h1 className="text-[#808080] sm:text-[24px] text-[16px]  font-[700]">
              利用履歴
            </h1>
            <button
              className="bg-[#255BB3] text-white px-4 py-2 xs:text-[14px] lg:text-[16px]  font-bold"
              onClick={() => navigate("/dashboard/purchase-list")}
            >
              さらに表示する
            </button>
          </div>

          {user ? (
            usageProcess && usageProcess.processes.length > 0 ? (
              <Slider {...Usagesetting} className="flex flex-row mt-4 w-full">
                {usageProcess.processes.map((usageprocess, index) => (
                  <div className="mx-2 border-2 shadow-lg mb-6" key={index}>
                    <UsageHistoryCard usageprocess={usageprocess} />
                  </div>
                ))}

                {Array.from({
                  length:
                    Usagesetting.slidesToShow - usageProcess.processes.length,
                }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="mx-2  shadow-lg mb-6"
                  />
                ))}
              </Slider>
            ) : (
              <span className="text-[#255BB3] font-bold text-[24px]">
                利用履歴がありません。
              </span>
            )
          ) : (
            <span>
              <Link
                to="/login"
                className="text-[#255BB3] font-bold text-[24px]  "
              >
                利用履歴を確認するにはログインしてください
              </Link>
            </span>
          )}

          <h1 className="text-[#808080] sm:text-[24px] text-[16px] mt-8 font-[700]">
            ニュース
          </h1>

          {!isDataLoading && newsAll
            ? newsAll?.news?.slice(0, 5).map((item) => (
                <div className="mt-4" key={item._id}>
                  <div
                    className={`grid sm:grid-cols-[100px,auto]  gap-[10px] border-t-[1px]  border-t-[#E6E6E6] border-b-[#E6E6E6] pt-6 pb-2 cursor-pointer  ${
                      newsAll.news.indexOf(item) === newsAll.news.length - 1 &&
                      "border-b-[1px] pb-6"
                    }`}
                    onClick={() => router(`/news-detail/${item?._id}`)}
                  >
                    <h1 className="sm:text-[#808080] sm:text-[14px] sm:font-[400] font-[500] lg:text-[18px]">
                      {/* {item.news_date} */}
                      {new Date(item?.delivery_date)
                        .toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\//g, "-")}
                    </h1>
                    <div className="flex gap-2">
                      <p className="sm:text-[#808080]  text-[#255BB3] sm:text-[14px] sm:font-[400] font-[700] lg:text-[18px] line-clamp-1">
                        <span className=" font-bold">{item?.news_title}</span>{" "}
                        &nbsp; {item?.news_comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : newsAll?.news?.slice(0, 5).map(() => <NewsDetailSkeleton />)}
          <div className=" mt-8">
            <button
              className="bg-[#255BB3] text-white px-4 py-2 xs:text-[14px] lg:text-[16px]  font-bold"
              onClick={() => navigate("/news")}
            >
              さらに表示する
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPage;
