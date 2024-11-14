import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  getProcessDetailsThunk,
  processSearchThunk,
} from "@/state/thunks/processThunks";
import {
  createTransactionThunk,
  getaverageRatingProcessThunk,
} from "@/state/thunks/transactionThunks";
import { selectProcess } from "@/state/slices/processSlice";
import {
  removeError,
  selectTransaction,
} from "@/state/slices/transactionSlice";
import StatCalendar from "@/components/static/StatCalender";
import { Link } from "react-router-dom";
import Spinner from "@/components/static/Spinner";
import { replaceWithAnchorTags } from "@/utils/replaceWithAnchorTags";
import { selectUser } from "@/state/slices/userSlice";
import RatingSystem from "../components/RatingSystem";
import No_Image_Available from "../../assets/compnay/No_Image_Available.jpg";

function ProcessDetail() {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { processId } = useParams();
  const { process, loading } = useAppSelector(selectProcess);
  const { user } = useAppSelector(selectUser);
  const [productBuyError, setProductBuyError] = useState(false);

  const {
    transaction,
    loading: TransactionLoading,
    appErr,
    getRatings_Process,
  } = useAppSelector(selectTransaction);
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState(process?.processData?.img1);
  console.log(getRatings_Process, "getRatings_Process");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (appErr) {
      dispatch(removeError());
    }
  }, []);

  useEffect(() => {
    if (transaction && redirect) {
      console.log(transaction);
      router(`/transaction/${transaction?.transaction?._id}`);
    }

    return () => {
      setRedirect(false);
    };
  }, [transaction, redirect, router]);

  useEffect(() => {
    dispatch(getProcessDetailsThunk(processId));
    dispatch(getaverageRatingProcessThunk(processId));
  }, []);

  useEffect(() => {
    if (process?.processData?.img1) {
      setImage(process.processData.img1);
    }
  }, [process]);

  console.log(process);

  console.log(getRatings_Process);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = No_Image_Available; // Fallback image
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex justify-center flex-col  items-center sm:mb-80 mb-10 ">
      <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6">
        <div className="grid sm:grid-cols-[2fr,1fr] grid-cols-1 gap-2">
          <div>
            <div className=" grid grid-cols-1 border-t-4 border-t-[#255BB3] ">
              <img
                src={image}
                alt="ProcessImg"
                className="object-cover w-full sm:min-h-[658px] min-h-[264px] mx-auto"
                onError={handleImageError}
              />

              <div className={"grid grid-cols-3 gap-3 mt-2 w-[90%] mx-auto"}>
                <img
                  src={process?.processData?.img1}
                  onClick={() => setImage(process?.processData?.img1)}
                  alt="ProcessImg"
                  className=" cursor-pointer object-cover  w-full min-h-[144px]	"
                  onError={handleImageError}
                />

                <img
                  src={process?.processData?.img2}
                  onClick={() => setImage(process?.processData?.img2)}
                  alt="ProcessImg"
                  className="cursor-pointer object-cover  w-full min-h-[144px]		"
                  onError={handleImageError}
                />

                <img
                  src={process?.processData?.img3}
                  onClick={() => setImage(process?.processData?.img3)}
                  alt="ProcessImg"
                  className="cursor-pointer object-cover  a w-full min-h-[144px]	"
                  onError={handleImageError}
                />
              </div>
            </div>

            <h1 className="mt-5 text-[#255BB3]  sm:text-[24px] text-[16px] font-[700] sm:w-[90%] w-[95%] mx-auto line-clamp-2 break-words">
              {process?.processData?.name.toUpperCase()}
            </h1>
            <h1 className="mt-3 sm:mt-1 text-[#808080]  sm:text-[14px] lg:text-[18px] font-[500] sm:w-[90%] w-[95%] mx-auto line-clamp-3 break-words">
              {process?.processData?.user?.name01}
            </h1>
            {/* <h1 className="text-[#FA0] sm:text-[24px] text-[12px] font-[700] sm:w-[90%] w-[95%] mx-auto mt-1">
              &#9733; &#9733; &#9733; &#9733; &#9734; 4.9{" "}
              <span className="text-[#808080] sm:text-[18px] text-[12px] font-[700]">
                (73)
              </span>
            </h1> */}

            <RatingSystem
              averageRating={
                getRatings_Process?.averageRating?.averageRating || 0
              }
              totalRatings={getRatings_Process?.averageRating?.ratingCount || 0}
            />

            <div className="flex flex-wrap gap-[10px] sm:w-[90%] w-[95%] mx-auto mt-2 ">
              {process?.processData?.tags &&
                process?.processData?.tags?.map((tag, index) => (
                  <h2
                    key={index}
                    className="sm:text-[14px] lg:text-[18px]  text-[#FA0] sm:font-[700] font-[500]  sm:py-[2px]  sm:px-[13px] py-1 px-2 text-center my-auto rounded-full bg-[#FFF4DF] cursor-pointer"
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
            <div className="col-span-3 md:col-start-2 md:row-start-4 mt-5 sm:w-[90%] w-[95%] mx-auto">
              <div className="border-[1px] sm:mt-0  mt-[16px] p-4  border-[#E6E6E6] w-full max-w-[660px] ">
                <div className="grid items-start sm:grid-cols-[2fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px] ">
                    工程説明
                  </h2>
                  <p
                    className="break-all max-w-lg text-[#808080] text-[18px] font-[400] flex flex-wrap"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.process_explanation &&
                        replaceWithAnchorTags(
                          process?.processData?.process_explanation
                        ),
                    }}
                  ></p>
                </div>

                <div className="grid mt-4 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px]">
                    能力
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.capacity &&
                        replaceWithAnchorTags(process?.processData?.capacity),
                    }}
                  ></p>
                </div>

                <div className="grid mt-4 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px]">
                    地域
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.mun &&
                        replaceWithAnchorTags(process?.processData?.mun),
                    }}
                  ></p>
                </div>

                <div className="grid mt-4 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px]">
                    メーカー
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.maker_name &&
                        replaceWithAnchorTags(process?.processData?.maker_name),
                    }}
                  ></p>
                </div>

                <div className="grid mt-4 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px]">
                    年式
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.years_type &&
                        replaceWithAnchorTags(process?.processData?.years_type),
                    }}
                  ></p>
                </div>

                <div className="grid mt-4 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[40px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[109px]">
                    設備サイズ
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.equipment_size &&
                        replaceWithAnchorTags(
                          process?.processData?.equipment_size
                        ),
                    }}
                  ></p>
                </div>

                <div className="grid mt-2 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px] border-b-[1px] border-[#e5e7eb] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px]">
                    納期目安
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.delivery_date &&
                        replaceWithAnchorTags(
                          process?.processData?.delivery_date
                        ),
                    }}
                  ></p>
                </div>

                <div className="grid mt-2 items-start sm:grid-cols-[1fr,auto] grid-cols-1 sm:gap-[50px] gap-[10px]  sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit">
                  <h2 className=" font-[700] p-1 text-[18px] text-[#808080] row-start-1 text-left sm:w-[100px]">
                    備考
                  </h2>
                  <p
                    className="break-words max-w-lg text-[#808080] text-[18px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html:
                        process?.processData?.remarks_column &&
                        replaceWithAnchorTags(
                          process?.processData?.remarks_column
                        ),
                    }}
                  ></p>
                </div>
                <div
                  className={`flex  gap-3 mt-4  bg-[#FFF4DF] w-full  py-2 px-2  items-center`}
                >
                  <h2 className="bg-[#FFAA00] text-center font-[500] p-1 sm:text-[18px] text-[12px] text-[#fff] w-[80px] py-1">
                    価格
                  </h2>
                  <div className="flex  items-center py-2  w-full">
                    <h2
                      className="sm:text-[18px] text-[18px] font-bold text-[#FFAA00] w-4/5  line-clamp-3 "
                      dangerouslySetInnerHTML={{
                        __html:
                          process?.processData?.unit_price &&
                          replaceWithAnchorTags(
                            process?.processData?.unit_price
                          ),
                      }}
                    ></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="sm:hidden  font-bold text-[18px] mt-[30px] ml-2 text-[#808080] ">
            空き状況
          </h1>
          <div className="sm:border-[1px] border-b-[1px] sm:mt-0  px-4 pb-6  border-[#E6E6E6] sm:w-full w-full md:h-[85%] sm:max-w-[330px] sm:border-t-4 sm:border-t-[#255BB3]">
            <div className="pt-10 px-2">
              <StatCalendar value={process?.processData} />
            </div>
            <div className="flex flex-col justify-center mt-[41px] ">
              <button
                className="bg-[#FFAA00] text-[#fff] sm:rounded-[36px] px-2 py-4  text-center w-full sm:max-w-[260px] mx-auto lg:text-[18px] xs:text-[14px] font-bold"
                onClick={async () => {
                  await dispatch(
                    createTransactionThunk({
                      seller_id: process?.processData?.user?._id,
                      process_id: process?.processData?._id,
                    })
                  );
                  if (process?.processData?.user?._id === user?.user?._id) {
                    // check if the buyer is the same as the seller
                    setProductBuyError(true);
                  } else {
                    setRedirect(true);
                  }
                }}
              >
                {TransactionLoading ? (
                  <Spinner className="h-full" />
                ) : (
                  "問い合わせ・見積依頼"
                )}
              </button>

              {appErr && !productBuyError && !user?.user?._id && (
                <p className="text-center text-fifth mt-2">
                  {appErr?.message === "jwt malformed" &&
                    "Please Log In To request quotation"}
                </p>
              )}

              {productBuyError && (
                <p className="text-center text-fifth mt-2">
                  自社製品を購入できない
                </p>
              )}

              <h1 className="text-center font-bold mt-[95px] text-[#808080] sm:block hidden text-[18px]">
                出品者プロフィール
              </h1>

              <div className="sm:flex sm:flex-col gap-[20px] grid grid-cols-[2fr,1fr] sm:justify-center  items-center mt-10 sm:mt-5 xs:w-full ">
                <div className="flex sm:flex-col flex-row gap-2 col-start-1 items-center">
                  <img
                    src={
                      process?.processData?.user?.profile_img ||
                      "https://static.thenounproject.com/png/1559146-200.png"
                    }
                    alt="img"
                    className="row-start-1 w-full  sm:max-w-[145px] max-w-[69px] rounded-full object-cover sm:w-auto"
                  />
                  <h1 className="sm:mt-1 text-[#255BB3] xs:text-[14px] lg:text-[18px] font-[700] col-span-4  sm:mx-auto sm:text-center line-clamp-1 sm:line-clamp-2">
                    {process?.processData?.user?.name01}
                  </h1>
                </div>
                <div className="flex  flex-wrap  lg:w-3/4  h-auto  xs:w-full  break-all row-start-2 col-start-1 col-end-3 lg:justify-center ">
                  <p className="text-[#808080] lg:text-[18px]  font-[400] line-clamp-5   mt-1 ">
                    {process?.processData?.user?.business_content}
                  </p>
                </div>
                <Link
                  to={`/process/company-profile/${process?.processData?.user?._id}`}
                  className="bg-[#255BB3] text-[#fff] row-start-1 col-start-2 rounded-[36px] sm:px-2 sm:py-3 px-1 py-2 sm:text-[16px] h-fit text-[18px] text-center sm:mt-5 sm:w-full sm:max-w-[230px] w-[110px] mx-auto"
                >
                  プロフィール
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessDetail;
