import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { getNewsDetailsThunk } from "@/state/thunks/newsApiThunks";
import { selectNews } from "@/state/slices/newsSlice";
import moment from "moment";
import Spinner from "@/components/static/Spinner";
import No_Image_AvailableNews from "@/assets/compnay/No_Image_AvailableNews.jpg";

const NewsDetail = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate()
  const { id } = useParams();
  const { process: newsDetails, loading } = useAppSelector(selectNews);
  console.log(newsDetails, "dsdsd");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getNewsDetailsThunk(id));
  }, [dispatch, id]);

  const handleBack = () =>{
    router(-1)
  }

  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = No_Image_AvailableNews; // Fallback image
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center flex-col  items-center border-b border-secondary">
          <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
        

            {newsDetails && (


              <>
              <div className="bg-[#DCDCDC] w-full max-w-[1200px] h-[442px] mx-auto mb-[40px] ">
               <img
                  src={newsDetails.news.image || No_Image_AvailableNews}
                  alt="news"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>

                <h1 className="text-xl text-[#808080] font-bold">
                  {newsDetails.news.news_title}
                </h1>
                <h3 className="text-[18px] text-[#808080] font-bold mt-1">
                  {moment(newsDetails.news.delivery_date).format("YYYY-MM-DD")}
                </h3>
                <div className="mt-4 border-t border-t-[#DCDCDC] pt-4">
                  <p className="xs:lg-[14px] lg:text-[18px] text-[#808080] font-normal break-all">
                    {newsDetails.news.news_comment}
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-center my-[108px]">
              <button onClick={handleBack} className="bg-[#808080] xs:lg-[14px] lg:text-[18px]font-bold text-[#FFFFFF] px-8 py-2 w-full  max-w-[263px]">
                戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsDetail;
