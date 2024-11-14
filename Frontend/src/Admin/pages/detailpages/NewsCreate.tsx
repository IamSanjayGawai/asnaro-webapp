import { useState } from "react";
import { useAppSelector } from "@/state/hooks";
import Spinner from "@/components/static/Spinner";
import Dropzone from "../../../components/static/Dropzone";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { create_news } from "@/api/admin";
import { selectUser } from "@/state/slices/userSlice";
import { socket } from "@/state/store";

interface NewsItem {
  _id: string;
  news_date: Date;
  rank: number;
  news_title: string;
  news_comment: string;
  news_select: string;
  creator_id: string;
  create_date: Date;
  image: File | null;
  del_flg: number;
  shop_id: number;
  delivery_flg: number;
  delivery_date: string;
  news_url: string;
  __v: number;
  delivery_flag: boolean;
}

const NewsCreate = () => {
  const { user } = useAppSelector(selectUser);
  const router = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [,] = useState<File | null>(null);
  const [, setDropped] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [, setFormData] = useState<NewsItem>({
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
    delivery_flg: 0,
    delivery_date: "",
    news_url: "",
    delivery_flag: false,
    __v: 0,
  });
  const [imgFile, setImgFile] = useState<File | null>(null);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsItem>();

  const onSubmit: SubmitHandler<NewsItem> = async (data: NewsItem) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && imgFile) {
        formData.append("image", imgFile);
      } else {
        formData.append(key, value.toString());
      }
    });

    const response = await create_news(user?.token, formData);
    console.log("response", response);
    if (
      response &&
      response.message === "News added successfully." &&
      response.news.delivery_flag
    ) {
      socket.emit("news", response.news, () => {
        setLoading(false);
        reset();
        setImgFile(null);
        setIsReset(true);
      });
    } else {
      setLoading(false);
      reset();
      setImgFile(null);
      setIsReset(true);
    }
  };

  const handleFileSelect = (file: File, id: number) => {
    if (id === 5) {
      setImgFile(file);
    }
  };

  // console.log("user", user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className=" lg:w-[80%] xl:w-[78%] xs:w-[100%] mb-40">
          <div className="lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col mt-[50px] ">
            <div className="flex lg:gap-20 xs:gap-2 items-center">
              <h1 className="text-[#808080] font-[700] text-[20px] mb-4">
                お知らせ編集画面
              </h1>
              <h3 className="text-[#FF8080] text-[10px]">※は回答必須</h3>
            </div>
          </div>
          {/* main  container*/}
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:mx-20 md:mx-8 xs:mx-8 mt-[1rem] lg:w-[100%] xs:w-[85%] sm:w-[80%] ">
              <div className="w-full flex flex-col gap-2  ">
                <div className="flex xs:flex-col lg:flex-row">
                  <label className="text-[#808080]  gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    タイトル
                  </label>
                  <input
                    type="text"
                    className="border outline-0  lg:w-[253px]  xs:w-full h-[36px] px-5 xs:mt-[16px] lg:ml-[50px]  lg:text-[14px] xs:text-[12px] "
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
                  <label className="text-[#808080]  gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    画像
                  </label>
                  <div className="bg-light cursor-pointer col-span-4 flex justify-center items-center xs:mt-[16px] lg:w-[219px] xs:w-[114px] border border-secondary xs:h-[116px] md:h-[140px] lg:ml-[80px]">
                    <Dropzone
                      setValue={setValue}
                      onFileSelect={(file) => handleFileSelect(file, 5)}
                      isReset={isReset}
                      {...register("image", {
                        required: "images is required",
                      })}
                      isProcess={true}
                      setDropped={setDropped || (() => {})}
                    />
                    {errors?.image && (
                      <p className="text-red-500">{errors?.image?.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start xs:flex-col lg:flex-row">
                  <label className="text-[#808080]  gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    内容
                  </label>
                  <textarea
                    className="border outline-0  lg:w-[650px]  xs:w-full h-[230px] p-5 xs:mt-[16px] lg:ml-[80px] lg:text-[14px] xs:text-[12px] resize-none"
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
                      value="true"
                      {...register("delivery_flag", {
                        required: "公開ステータスは必須です",
                      })}
                      className="border outline-0 ml-[50px] xs:mt-[16px]"
                    />
                    <span className="text-[#808080] lg:text-[14px] xs:text-[12px] ml-[9px]">
                      公開
                    </span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="delivery_flag"
                      value="false"
                      {...register("delivery_flag", {
                        required: "公開ステータスは必須です",
                      })}
                      className="border outline-0 ml-[50px] xs:mt-[16px]"
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
                  <label className="text-[#808080]   gap-4 lg:text-[14px] xs:text-[12px] font-bold">
                    配信日
                  </label>
                  <input
                    type="date"
                    className="border outline-0  lg:w-[150px]  xs:w-[150px] h-[36px] px-5 xs:mt-[16px] ml-[65px] lg:text-[14px] xs:text-[12px] "
                    placeholder="20/04/2024"
                    {...register("delivery_date", {
                      required: "配信日は必須です",
                    })}
                    name="delivery_date"
                    onChange={handleChange}
                  />
                  {errors?.delivery_date && (
                    <p className="text-red-500">
                      {errors?.delivery_date?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* btns */}
            <div className="lg:w-[100%] xs:w-full flex justify-center items-center lg:gap-[46px] xs:gap-[10px] mt-[85px]">
              <button
                onClick={() => router(-1)}
                type="button"
                className="px-5 bg-[#808080] text-[#F8F8F8] xs:w-[161px] lg:w-[194px] h-[36px] lg:text-[14px] xs:text-[12px]"
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
          {/* main  container*/}
        </div>
      )}
    </>
  );
};

export default NewsCreate;
