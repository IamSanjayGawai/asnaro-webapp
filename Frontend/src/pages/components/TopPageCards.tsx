import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import No_Image_Available from "../../assets/compnay/No_Image_Available.jpg";
import CardSkeleton from "./CardSkeleton";
import { selectProcess } from "@/state/slices/processSlice";
import { useAppSelector } from "@/state/hooks";

interface TopPageCardsProps {
  process?: any;
}

const TopPageCards: React.FC<TopPageCardsProps> = ({ process }) => {
  const navigate = useNavigate();
  const { loading } = useAppSelector(selectProcess);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = No_Image_Available; // Fallback image
  };

  const isDataLoading = loading || isLoading;

  return (
    <>
      <div>
        <div
          className="w-full gap-10 border-[1px]   items-start cursor-pointer   "
          onClick={() => navigate(`/process/details/${process?._id}`)}
        >
          <div>
            {isDataLoading ? (
              <CardSkeleton />
            ) : (
              <img
                src={process?.img1 || No_Image_Available}
                alt="ProcessImg"
                className="object-cover h-[200px] w-full border-[1px] border-[#d9d9d9] shadow-inner "
                onError={handleImageError}
              />
            )}
          </div>

          {!isDataLoading && (
            <div className="px-4 mt-4">
              <h1
                className="text-[#255BB3] cursor-pointer sm:text-[14px] lg:text-[16px] font-[700] line-clamp-1 hover:underline"
                onClick={() => navigate(`/process/details/${process?._id}`)}
              >
                {process?.name}
              </h1>

              <h1 className="text-[#FA0] pt-2 font-bold">
                &#9733; {process?.totalRatingSum || 0}
                <span className="text-[#808080] text-[14px]">
                  &nbsp; &nbsp; ({process?.totalReviews || 0})
                </span>
              </h1>

              <p className="text-[#808080] lg:text-[18px] font-[400] mt-[6px] mb-[12px] break-words max-w-lg line-clamp-1">
                {process?.maker_name}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopPageCards;
