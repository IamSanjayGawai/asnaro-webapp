import { useState, useEffect } from "react";
import { selectNews } from "@/state/slices/newsSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Spinner from "@/components/static/Spinner";
import Dropzone from "../../../components/static/Dropzone";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewsItem } from "@/types/types";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminNewsDetailsThunk } from "@/state/thunks/newsApiThunks";
import { updateNewsThunk } from "@/state/thunks/newsApiThunks"; // Make sure to define this thunk in your application

const NotificationManagementDetail = () => {
  const { adminNewsDetails, loading } = useAppSelector(selectNews);
  const [prevImg1, setPrevImg1] = useState<boolean>(true);
  const [img1File, setImg1File] = useState<File | null>(null);
  const [dropzoneImg, setDropzoneImg] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewsItem>({
    _id: "",
    news_date: new Date(),
    rank: 0,
    news_title: "",
    news_comment: "",
    news_select: "",
    creator_id: "",
    create_date: new Date(),
    image: null,
    del_flg: 0,
    shop_id: 0,
    delivery_flag: false,
    delivery_date: "",
    news_url: "",
    __v: 0,
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsItem>();

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAdminNewsDetailsThunk(id));
  }, [dispatch, id, refresh]);

  useEffect(() => {
    if (adminNewsDetails?.news) {
      setValue("news_title", adminNewsDetails.news.news_title);
      setValue("news_comment", adminNewsDetails.news.news_comment);
      setValue(
        "delivery_date",
        new Date(adminNewsDetails.news?.delivery_date)
          .toISOString()
          .split("T")[0]
      );
      setValue("delivery_flag", adminNewsDetails?.news?.delivery_flag);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...adminNewsDetails.news,
        delivery_flag: adminNewsDetails?.news?.delivery_flag || false,
        delivery_date: new Date(adminNewsDetails.news?.delivery_date)
          .toISOString()
          .split("T")[0],
      }));
    }
  }, [adminNewsDetails, setValue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<NewsItem> = async (data: NewsItem) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        img1File
          ? formData.append("image", img1File)
          : formData.append(
              "noImage",
              prevImg1 || dropzoneImg ? "false" : "true"
            );
      } else {
        formData.append(key, value.toString());
      }
    });

    await dispatch(
      updateNewsThunk({ formData, id: adminNewsDetails?.news?._id })
    );
    reset();
    setPrevImg1(true);
    setRefresh(!refresh);
  };

  const handleFileSelect = (file: File, id: number) => {
    if (id === 1) {
      setImg1File(file);
      setValue("image", file);
    }
  };

  const handleRadioChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      delivery_flag: value,
    }));
  };

  // console.log("adminNewsDetails", adminNewsDetails);
  console.log("prevImg1", prevImg1);
  console.log("dropZoneImg", dropzoneImg);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="lg:w-[80%] xl:w-[78%] xs:w-[100%] mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex flex-col mt-[50px]">
            <div className="flex lg:gap-20 xs:gap-2 items-center">
              <h1 className="text-[#808080] font-[700] text-[20px] mb-4">
                お知らせ編集画面
              </h1>
              <h3 className="text-[#FF8080] text-[10px]">※は回答必須</h3>
            </div>
          </div>
          <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[1rem] lg:w-[100%] xs:w-[85%] sm:w-[80%] ">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col gap-2">
                <div className="flex xs:flex-col lg:flex-row">
                  <label className="text-[#808080] gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    タイトル
                  </label>
                  <input
                    type="text"
                    className="border outline-0 lg:w-[253px] xs:w-full h-[36px] px-5 xs:mt-[16px] lg:ml-[50px] lg:text-[14px] xs:text-[12px]"
                    {...register("news_title", {
                      required: "タイトルは必須です",
                    })}
                    name="news_title"
                    onChange={handleChange}
                  />
                  {errors?.news_title && (
                    <p className="text-red-500">
                      {errors?.news_title?.message}
                    </p>
                  )}
                </div>
                <div className="flex items-start xs:flex-col lg:flex-row">
                  <label className="text-[#808080] gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    画像
                  </label>

                  <div className="bg-light relative cursor-pointer col-span-4 flex justify-center items-center xs:mt-[16px] lg:w-[219px] xs:w-[114px] border border-secondary xs:h-[116px] md:h-[140px] lg:ml-[80px]">
                    {prevImg1 && adminNewsDetails?.news?.image ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          className="object-cover w-full h-full"
                          src={adminNewsDetails?.news?.image}
                          alt="image1"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full cursor-pointer">
                        <Dropzone
                          setValue={setValue}
                          id={1}
                          onFileSelect={(file) => handleFileSelect(file, 1)}
                          {...register("image")}
                          isProcess={true}
                          setDropZoneImg={setDropzoneImg}
                        />
                      </div>
                    )}
                    {prevImg1 && adminNewsDetails?.news?.image && (
                      <svg
                        className="absolute top-0 right-0 mr-[2px] cursor-pointer"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setPrevImg1(false);
                          setDropzoneImg(false);
                        }}
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="10"
                          fill="black"
                          fillOpacity="0.5"
                        />
                        <line
                          x1="14.3536"
                          y1="5.35355"
                          x2="5.35355"
                          y2="14.3536"
                          stroke="white"
                        />
                        <line
                          y1="-0.5"
                          x2="12.7279"
                          y2="-0.5"
                          transform="matrix(0.707107 0.707107 0.707107 -0.707107 6 5)"
                          stroke="white"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex items-start xs:flex-col lg:flex-row">
                  <label className="text-[#808080] gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    内容
                  </label>
                  <textarea
                    className="border outline-0 lg:w-[650px] xs:w-full h-[230px] p-5 xs:mt-[16px] lg:ml-[80px] lg:text-[14px] xs:text-[12px] resize-none"
                    {...register("news_comment", {
                      required: "内容は必須です",
                    })}
                    name="news_comment"
                    onChange={handleChange}
                  />
                  {errors?.news_comment && (
                    <p className="text-red-500">
                      {errors?.news_comment?.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <label className="text-[#808080] flex gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    公開ステータス
                    <span className="text-[#FF8080]">※</span>
                  </label>
                  <div>
                    <input
                      type="radio"
                      name="delivery_flag"
                      checked={formData?.delivery_flag === true}
                      value="true"
                      {...register("delivery_flag", {
                        required: "公開ステータスは必須です",
                      })}
                      className="border outline-0 ml-[50px] xs:mt-[16px]"
                      onChange={() => handleRadioChange(true)}
                    />
                    <span className="text-[#808080] lg:text-[14px] xs:text-[12px] ml-[9px]">
                      公開
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="delivery_flag"
                      checked={formData?.delivery_flag === false}
                      value="false"
                      {...register("delivery_flag", {
                        required: "公開ステータスは必須です",
                      })}
                      className="border outline-0 ml-[50px] xs:mt-[16px]"
                      onChange={() => handleRadioChange(false)}
                    />
                    <span className="text-[#808080] lg:text-[14px] xs:text-[12px] ml-[9px]">
                      非公開
                    </span>
                  </div>
                  {errors?.delivery_flag && (
                    <p className="text-red-500">
                      {errors?.delivery_flag?.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <label className="text-[#808080] gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    配信日
                  </label>
                  <input
                    type="date"
                    className="border outline-0 lg:w-[150px] xs:w-[150px] h-[36px] px-5 xs:mt-[16px] ml-[65px] lg:text-[14px] xs:text-[12px]"
                    placeholder="20"
                    {...register("delivery_date", {
                      required: "配信日は必須です",
                    })}
                    name="delivery_date"
                    value={formData.delivery_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="lg:w-[100%] xs:w-full flex justify-center items-center lg:gap-[46px] xs:gap-[10px] mt-[85px]">
                <button
                  type="button"
                  className="px-5 bg-[#808080] text-[#F8F8F8] xs:w-[161px] lg:w-[194px] h-[36px] lg:text-[14px] xs:text-[12px]"
                  onClick={() => {
                    router("/admin/dashboard/notification-management");
                  }}
                >
                  戻る
                </button>
                <button
                  type="submit"
                  className="px-2 bg-[#FFAA00] text-[#F8F8F8] xs:w-[161px] lg:w-[194px] h-[36px] lg:text-[14px] xs:text-[12px]"
                >
                  この内容で登録する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationManagementDetail;
