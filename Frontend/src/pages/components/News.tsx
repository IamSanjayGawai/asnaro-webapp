import { getAllNewsListThunk } from "@/state/thunks/newsApiThunks";
import { selectNews } from "@/state/slices/newsSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsDetailSkeleton from "../components/NewsDetailSkeleton";

const News = () => {
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { newsAll, loading: newsLoading } = useAppSelector(selectNews);

  const maxButtons = 10;
  const startPage = Math.max(
    1,
    newsAll?.pagination?.currentPage - Math.floor(maxButtons / 2)
  );
  const endPage = Math.min(
    newsAll?.pagination?.totalPages,
    startPage + maxButtons - 1
  );
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

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
  }, [currentPage]);

  useEffect(() => {
    dispatch(getAllNewsListThunk(currentPage));
  }, [currentPage]);

  const router = useNavigate();

  // const handleNavigate = (id) => {
  //   router(`/news-detail/${newsAll?._id}`);
  // };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    router(`/news?page=${pageNumber}`);
  };
  const [randomImage, setRandomImage] = useState(null);
  useEffect(() => {
    if (newsAll?.news?.length > 0) {
      const randomIndex = Math.floor(Math.random() * newsAll.news.length);
      setRandomImage(newsAll.news[randomIndex].image);
    }
  }, [newsAll]);
  return (
    <>
      <div className="flex justify-center flex-col  items-center border-b border-secondary">
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
          <h1 className="sm:text-2xl text-xl text-[#808080] font-bold">News</h1>
          <div className="bg-[#DCDCDC] w-full max-w-[1200px] h-[442px] mx-auto mb-[40px] ">
            {randomImage && (
              <img
                src={randomImage}
                alt="news"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {!isDataLoading && newsAll
            ? newsAll?.news?.map((item) => (
                <>
                  <div className="mt-4" key={item._id}>
                    <div
                      className={`grid sm:grid-cols-[100px,auto]  gap-[10px] border-t-[1px]  border-t-[#E6E6E6] border-b-[#E6E6E6] pt-6 pb-2 cursor-pointer  ${newsAll.news.indexOf(item) === newsAll.news.length - 1 && "border-b-[1px] pb-6"}`}
                      onClick={() => router(`/news-detail/${item?._id}`)}
                    >
                      <h1 className="sm:text-[#808080] sm:text-[14px] sm:font-[400] font-[500] text-[12px]">
                        {/* {item.news_date} */}
                        {new Date(item?.delivery_date)
                          .toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\//g, "-")}
                      </h1>
                      <div className="flex gap-2 flex-col">
                        <p className="sm:text-[#808080] text-[#255BB3] sm:text-[14px] sm:font-[400] font-[700] text-[12px]">
                          <span className=" font-bold ">{item?.news_title}</span>
                        </p>
                        <p className="sm:col-start-2 text-[#808080] sm:text-[14px] text-[12px] sm:font-[400] font-[500] ">
                          <span className="line-clamp-1 ">{item?.news_comment}</span>
                      
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))
            : newsAll?.news?.map(() => <NewsDetailSkeleton />)}
          {newsAll?.news?.length > 0 && (
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
              {endPage < newsAll?.pagination?.totalPages && (
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
          <div className="flex justify-center my-[108px]">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#808080] text-sm font-bold text-[#FFFFFF] px-8 py-2 w-full  max-w-[263px]"
            >
              戻る
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
