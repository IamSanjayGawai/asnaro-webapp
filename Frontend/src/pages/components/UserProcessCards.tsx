import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/state/hooks";
import { ChangeProcessStatusThunk } from "@/state/thunks/processThunks";
import StatCalendar from "../../components/static/StatCalender";
import { EditCalendarAction } from "@/state/slices/processSlice";
import No_Image_Available from "../../assets/compnay/No_Image_Available.jpg";

const UserProcessCards = ({ value, index, loading }) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const [image, setImage] = useState(value?.img1);

  useEffect(() => {
    if (value?.img1) {
      setImage(value.img1);
    }
  }, [value]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = No_Image_Available; // Fallback image
  };


  return (
    <div
      key={index}
      className="col-span-12 border border-secondary md:min-h-[300px] lg:min-h-[450px] shadow-md p-[15px] w-full"
    >
      <div className="flex xs:flex-col lg:flex-row justify-center items-start xs:gap-3 md:gap-5 w-full h-full overflow-hidden">
        <div className="xs:w-full lg:w-[30%] md:h-[70%] flex flex-col gap-1">
          <div className="h-[70%] bg-secondary">
            {loading ? (
              <div className="w-full h-full"></div>
            ) : (
              <img
                className="w-full h-full cursor-pointer"
                src={image}
                alt="process-image"
                onError={handleImageError}
              />
            )}
          </div>
          <div className="h-[30%] flex gap-1">
            <div className="w-1/2 bg-secondary">
              {loading ? (
                <div className="w-full h-full"></div>
              ) : (
                <img
                  className="w-full h-full cursor-pointer"
                  src={value.img1}
                  alt="process-image"
                  onClick={() => setImage(value.img1)}
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="w-1/2 bg-secondary">
              {loading ? (
                <div className="w-full h-full"></div>
              ) : (
                <img
                  className="w-full h-full cursor-pointer"
                  src={value.img2}
                  alt="process-image"
                  onClick={() => setImage(value.img2)}
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="w-1/2 bg-secondary">
              {loading ? (
                <div className="w-full h-full"></div>
              ) : (
                <img
                  className="w-full h-full cursor-pointer"
                  src={value.img3}
                  alt="process-image"
                  onClick={() => setImage(value.img3)}
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
        </div>
        <div className="xs:w-full lg:w-[40%] flex flex-col justify-center gap-2">
          <p className="text-[16px] text-primary font-bold">{value.name}</p>
          <p
            className={`${
              value.status === "release" ? "text-[#00E676] " : "text-fifth"
            } text-[10px]`}
          >
            ● {value.status === "release" ? "公開中" : "非公開"}
          </p>
          <div className="flex items-center text-[10px] text-fourth gap-2">
            {value.tags &&
              value.tags.length > 0 &&
              value.tags.map((tag, index) => (
                <div key={index} className="rounded-md bg-[#FFF4DF] px-1">
                  <p className="">{tag}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-2 text-[12px] h-full">
            <div className="flex items-start gap-2">
              <div className="w-[15%] bg-secondary">
                <p className="text-center">工程</p>
              </div>
              <div className="w-[85%]">
                <p className=" line-clamp-3">{value.process_explanation}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-[15%] bg-secondary ">
                <p className="text-center">能力</p>
              </div>
              <div className="w-[85%] max-w-[85%] overflow-hidden">
                <p className="line-clamp-5 ">{value.capacity}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-[15%] bg-secondary">
                <p className="text-center">納期</p>
              </div>
              <div className="w-[85%] max-w-[85%] overflow-hidden ">
                <p className=" line-clamp-1"> { value.delivery_date} </p>
              </div>
            </div>
            <div
              className={`flex  gap-3 mt-4  bg-[#FFF4DF] w-full  py-2 px-2  items-center`}
            >
              <h2 className="bg-[#FFAA00] text-center font-[500] p-1 sm:text-[18px] text-[12px] text-[#fff] w-[80px] py-1">
                価格
              </h2>
              <div className="flex  items-center py-2  w-full">
                <h2 className="sm:text-[14px] text-[14px] font-bold text-[#FFAA00]  w-4/5  line-clamp-1 ">
                  {value?.unit_price ? value?.unit_price : "N/A"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="xs:hidden lg:block flex flex-col w-[30%] h-full">
          <div className="w-full flex gap-3 h-[10%] text-white mb-8">
            <button
              onClick={() =>
                dispatch(EditCalendarAction(true)) &&
                router(`/dashboard/process-list/edit/${value._id}`)
              }
              className="w-1/2 bg-fourth"
            >
              編集
            </button>
            <button
              onClick={() =>
                dispatch(
                  ChangeProcessStatusThunk({
                    id: value?._id,
                    status: value?.status,
                  })
                )
              }
              className="w-1/2 bg-tertiary h"
            >
              {value?.status === "release" ? "非公開にする" : "公開する"}
            </button>
          </div>
          <div>
            <StatCalendar value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProcessCards;
