import React from "react";
import Dropzone from "../../../components/static/Dropzone";
import CustomCalendar from "../../../components/static/Calender";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProcessRegForm, Category, Subcategory } from "@/types/types";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectProcess } from "@/state/slices/processSlice";
import { BASE_URL } from "@/utils/baseUrl";
import { EditCalendarAction } from "@/state/slices/processSlice";
import { processAddAdminThunk } from "@/state/thunks/processThunks";
import { getAllUsers } from "@/api/admin";

const ProcessReg: React.FC = () => {
  const dispatch = useAppDispatch();
  const { appErr } = useAppSelector(selectProcess);
  const [isReset, setIsReset] = React.useState<boolean>(false);
  const [img1File, setImg1File] = React.useState<File | null>(null);
  const [img2File, setImg2File] = React.useState<File | null>(null);
  const [img3File, setImg3File] = React.useState<File | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [subcategories, setSubcategories] = React.useState<Subcategory[]>([]);
  const [pubStatus, setPubStatus] = React.useState<string>("");
  const [selectedStates, setStates] = React.useState<string[]>([]);
  const [selectedCity, setCities] = React.useState<string[]>([]);
  const [year, setYear] = React.useState<number>(2024);
  const [users, setUsers] = React.useState<
    {
      _id: string;
      name01: string;
    }[]
  >([]);

  React.useEffect(() => {
    dispatch(EditCalendarAction(true));
  }, [dispatch]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      const actualUsers =
        fetchedUsers &&
        fetchedUsers?.users.length > 0 &&
        fetchedUsers?.users.filter((user) => {
          return user.name01;
        });
      setUsers(actualUsers);
    };
    fetchUsers();
  }, []);

  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get<string[]>(`${BASE_URL}/areas/states`);
        setStates(response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchStates();
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${BASE_URL}/categories/all`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    register("availability");
  }, []);

  let yearsArray = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= 1874; i--) {
    yearsArray.push(i);
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProcessRegForm>();

  const handleFileSelect = (file: File, id: number) => {
    if (id === 1) setImg1File(file);
    else if (id === 2) setImg2File(file);
    else if (id === 3) setImg3File(file);
  };

  const handleCategoryChange = async (categoryId: string) => {
    try {
      const response = await axios.get<Subcategory[]>(
        `${BASE_URL}/categories/subcategories/${categoryId}`
      );
      console.log("Subcategories fetched:", response.data); // Debugging
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleStatesChange = async (states) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/areas/cities/${encodeURIComponent(states)}`
      );
      console.log("Cities fetched:", response.data);
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const onSubmit: SubmitHandler<ProcessRegForm> = async (data) => {
    const tagsArray = data.tags.split(",");

    const newData = { ...data, tags: tagsArray };

    const formData = new FormData();

    Object.keys(newData).forEach((key) => {
      if (key !== "img1" && key !== "img2" && key !== "img3") {
        if (key === "availability") {
          formData.append(key, JSON.stringify(newData[key]));
        } else if (key === "tags") {
          formData.append(key, JSON.stringify(newData[key]));
        } else {
          formData.append(key, newData[key]);
        }
      }
    });

    if (img1File) formData.append("img1", img1File);
    if (img2File) formData.append("img2", img2File);
    if (img3File) formData.append("img3", img3File);
    console.log(newData);

    await dispatch(processAddAdminThunk(formData));

    // Log the formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    console.log(newData);

    reset();
    setIsReset(true);
    setImg1File(null);
    setImg2File(null);
    setImg3File(null);
    window.location.reload();
  };

  console.log("Users:", users);

  return (
    <>
      {
        <form
          className="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          id="processForm"
        >
          <div className="lg:mx-20 md:mx-8 sm:mx-20 xs:mx-8 xs:mt-[24px] md:mt-[50px] grid grid-cols-12 xs:gap-y-2 md:gap-y-3 ">
            <div className="col-span-12 grid grid-cols-12">
              <p className="xs:col-span-5 xs:flex xs:items-center md:col-span-3 text-[24px] text-primary font-bold">
                工程登録
              </p>
              <div className="xs:col-span-7 md:col-span-9 flex items-center">
                <span className="text-[10px] text-fifth">※は回答必須</span>
              </div>
            </div>
            {appErr && (
              <div className="text-fifth grid grid-cols-12 col-span-12">
                <div className="xs:hidden md:block col-span-3"></div>
                <p className="xs:col-span-12 md:col-span-9">{appErr}</p>
              </div>
            )}
            <div className="xs:hidden md:block col-span-12"></div>
            <div className="xs:hidden md:block col-span-12"></div>

            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center">
                顧客メール<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9">
                <select
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="顧客メール"
                  {...register("user_id", {
                    required: "電子メールは必須です asdasd",
                  })}
                >
                  <option value="">顧客メール</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name01}
                    </option>
                  ))}
                </select>
                {errors.user_id && (
                  <p className="text-fifth">
                    {errors.user_id.message as unknown as React.ReactNode}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center">
                工程名<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="工程名"
                  {...register("name", {
                    required: "プロセス名は必須です",
                    minLength: {
                      value: 3,
                      message: "Process name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-fifth">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center">
                地域<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2">
                <div className="xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2">
                  <label className="col-span-4 md:col-span-5 flex items-center">
                    都道府県
                  </label>
                  <div className="col-span-8 md:col-span-7 flex items-center relative">
                    <select
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] text-tertiary placeholder-[#E6E6E6] px-1 cursor-pointer"
                      {...register("pref", {
                        required: " 都道府県は必須です",
                      })}
                      onChange={(e) => handleStatesChange(e.target.value)}
                    >
                      <option className="text-tertiary" value="">
                        都道府県
                      </option>
                      {selectedStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2">
                  <label className="col-span-4 md:col-span-5 flex items-center">
                    市区町村
                  </label>
                  <div className="col-span-8 md:col-span-7 flex items-center relative">
                    <select
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer"
                      {...register("mun", {
                        required: "市区町村は必須です",
                      })}
                    >
                      <option className="text-tertiary" value="">
                        市町村
                      </option>
                      {selectedCity.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {(errors.pref || errors.mun) && (
                <div className="text-fifth grid grid-cols-12 col-span-12">
                  <div className="xs:hidden md:block col-span-3"></div>
                  <p className="xs:col-span-12 md:col-span-9">
                    都道府県と市区町村の両方が必要です
                  </p>
                </div>
              )}
            </div>
            <div className="col-span-12 grid grid-cols-12 ">
              <label className="xs:col-span-12 md:col-span-3">
                工程画像<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 xs:gap-x-2 grid grid-cols-12 md:col-span-9 md:gap-x-3">
                <div className="bg-light cursor-pointer col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]">
                  <Dropzone
                    setValue={setValue}
                    id={1}
                    onFileSelect={(file) => handleFileSelect(file, 1)}
                    isReset={isReset}
                    {...register("img1", {
                      required: "   3 つの画像フィールドはすべて必須です",
                    })}
                    isProcess={true}
                  />
                </div>
                <div className="bg-light cursor-pointer col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]">
                  <Dropzone
                    setValue={setValue}
                    id={2}
                    onFileSelect={(file) => handleFileSelect(file, 2)}
                    isReset={isReset}
                    {...register("img2", {
                      required: "   3 つの画像フィールドはすべて必須です",
                    })}
                    isProcess={true}
                  />
                </div>
                <div className="bg-light cursor-pointer col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]">
                  <Dropzone
                    setValue={setValue}
                    id={3}
                    onFileSelect={(file) => handleFileSelect(file, 3)}
                    isReset={isReset}
                    {...register("img3", {
                      required: "   3 つの画像フィールドはすべて必須です",
                    })}
                    isProcess={true}
                  />
                </div>
              </div>
            </div>
            {(errors.img1 || errors.img2 || errors.img3) && (
              <div className="text-fifth grid grid-cols-12 col-span-12">
                <div className="xs:hidden md:block col-span-3"></div>
                <p className="xs:col-span-12 md:col-span-9">
                  3 つの画像フィールドはすべて必須です
                </p>
              </div>
            )}
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex">
                工程説明<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <textarea
                  className="block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  {...register("process_explanation", {
                    required: "プロセスの説明は必須です",
                  })}
                  placeholder="記入例）〇〇製△△加工機です。
　　　　　普段は工作機械の部品加工に使用しており、..."
                />
                {errors.process_explanation && (
                  <p className="text-fifth">
                    {errors.process_explanation.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex">
                能力<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <textarea
                  className="block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  {...register("capacity", {
                    required: "容量が必要です",
                  })}
                  placeholder="記入例）加工可能な製品サイズ 〇〇×〇〇×〇〇
　　　　　回転数〇〇rpm
　　　　　加工精度〇〇μ
　　　　　本設備には〇〇の加工が可能です。
"
                />
                {errors.capacity && (
                  <p className="text-fifth">{errors.capacity.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center">
                設備サイズ<span className="ml-1 text-fifth"></span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="テーブルサイズ〇〇×〇〇×〇〇"
                  {...register("equipment_size", {})}
                />
                {/* {errors.equipment_size && (
                    <p className="text-fifth">
                      {errors.equipment_size.message}
                    </p>
                  )} */}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center">
                メーカー
              </label>
              <div className="xs:col-span-12 md:col-span-9">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="〇〇社製"
                  {...register("maker_name")}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center">
                年式
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-x-2">
                <div className="col-span-5 flex items-center relative">
                  <select
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer"
                    {...register("years_type")}
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                  >
                    {yearsArray.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-7 flex items-center">年製</div>
              </div>
            </div>

            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center">
                納期の目安<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-5 ">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="最短翌日～"
                  {...register("delivery_date", {
                    required: "お届け日は必須です",
                  })}
                />
                {errors.delivery_date && (
                  <p className="text-fifth">{errors.delivery_date.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center">
                単価(税別)<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-5 ">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="テーブルサイズ〇〇×〇〇×〇〇"
                  {...register("unit_price", {
                    required: "単価は必須です",
                  })}
                />
                {errors.unit_price && (
                  <p className="text-fifth">{errors.unit_price.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center">
                カテゴリー<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2">
                <div className="xs:col-span-12 md:col-span-5 lg:col-span-4 flex items-center relative">
                  <select
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer"
                    {...register("parent_category", {
                      required: "カテゴリは必須です",
                    })}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option className="text-tertiary" value="">
                      カテゴリー
                    </option>
                    {categories.map((category) => (
                      <option
                        className="text-tertiary"
                        key={category.category_id}
                        value={category?.category_id}
                      >
                        {category?.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="xs:col-span-12 md:col-span-7 lg:col-span-6 grid grid-cols-12 gap-x-2">
                  <label className="xs:col-span-12 md:col-span-6 lg:col-span-5 flex items-center">
                    サブカテゴリー
                  </label>
                  <div className="xs:col-span-12 md:col-span-6 lg:col-span-7 flex items-center relative">
                    <select
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer"
                      {...register("child_category")}
                    >
                      <option className="text-tertiary" value="">
                        サブカテゴリー
                      </option>
                      {subcategories.map((subcategory) => (
                        <option
                          className="text-tertiary"
                          key={subcategory?.category_id}
                          value={subcategory?.category_id}
                        >
                          {subcategory?.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {(errors.parent_category || errors.child_category) && (
                <div className="text-fifth grid grid-cols-12 col-span-12">
                  <div className="xs:hidden md:block col-span-3"></div>
                  <p className="xs:col-span-12 md:col-span-9">
                    カテゴリとサブカテゴリの両方が必要です
                  </p>
                </div>
              )}
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex">
                タグ<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <textarea
                  {...register("tags", {
                    required:
                      "工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)",
                  })}
                  className="block h-[70px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 py-1"
                  placeholder="レーザー,三次元,形鋼,パイプ,マザック"
                />
                {errors.tags ? (
                  <p className="text-fifth">
                    {"※"}
                    {errors.tags.message}
                  </p>
                ) : (
                  <p className="text-tertiary">
                    ※工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-12"></div>
            <div className="col-span-12"></div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 ">
                空き状況<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-y-4">
                <div className="lg:col-span-8 xs:col-span-12">
                  <CustomCalendar
                    register={register}
                    errors={errors}
                    setValue={setValue}
                  />
                  <span className="w-[100%]  text-[red] ">
                    ※ &nbsp; 最大3ヶ月まで登録可能です。
                  </span>
                </div>
                {/* calendar left side availability btns */}
                <div className="lg:col-span-4 xs:col-span-12 flex justify-center items-center w-full ">
                  <div className="xs:grid xs:grid-cols-12 xs:gap-y-2 xs:gap-x-2 lg:flex lg:flex-col gap-2 lg:basis-3/4 text-white  w-full">
                    <div className="xs:col-span-6 lg:w-full bg-fifth h-[36px] flex items-center justify-center gap-2">
                      <svg
                        className=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="6"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                      <p className="">空きあり</p>
                    </div>
                    <div className="xs:col-span-6 lg:w-full bg-[#FA0] h-[36px] flex items-center justify-center gap-5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="14"
                          height="14"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                      <p>調整可能</p>
                    </div>
                    <div className="xs:col-span-6 lg:w-full bg-primary h-[36px] flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 18 15"
                        fill="none"
                      >
                        <path
                          d="M9 2L15.9282 14H2.0718L9 2Z"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                      <p>要相談</p>
                    </div>
                    <div className="xs:col-span-6 lg:w-full bg-tertiary h-[36px] flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 16"
                        fill="none"
                      >
                        <path
                          d="M12.5118 1.00011L1.48817 15.0001"
                          stroke="white"
                          stroke-width="2"
                        />
                        <path
                          d="M1.48817 1.00011L12.5118 15.0001"
                          stroke="white"
                          stroke-width="2"
                        />
                      </svg>
                      <p>空きなし</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12"></div>
            <div className="col-span-12"></div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex">
                備考<span className="ml-1 text-fifth"></span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <textarea
                  className="block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="備考"
                  {...register("remarks_column", {})}
                />
                {/* {errors.remarks_column && (
                    <p className="text-fifth">
                      {errors.remarks_column.message}
                    </p>
                  )} */}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-5 flex items-center">
                公開ステータス<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-7 grid grid-cols-12">
                <div className="col-span-6 flex xs:justify-center md:justify-start items-center gap-1">
                  <input
                    className="h-[16px]"
                    type="radio"
                    value={pubStatus}
                    onClick={() => setPubStatus("release")}
                    {...register("status", {
                      validate: (value) => {
                        if (value === "release" || value === "private")
                          return true;
                        else return "Required";
                      },
                    })}
                  />
                  <div>公開</div>
                </div>
                <div className="col-span-6 flex xs:justify-center md:justify-start  items-center gap-1">
                  <input
                    className="h-[16px]"
                    type="radio"
                    value={pubStatus}
                    onClick={() => setPubStatus("private")}
                    {...register("status", {
                      validate: (value) => {
                        if (value === "release" || value === "private")
                          return true;
                        else return "公開ステータスを選択してください";
                      },
                    })}
                  />
                  <div>非公開</div>
                </div>
              </div>
            </div>
            {errors.status && (
              <div className="text-fifth grid grid-cols-12 col-span-12">
                <div className="xs:hidden md:block md:col-span-3"></div>
                <p className="xs:col-span-12 md:col-span-9">
                  {errors.status.message}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center xs:gap-2 md:gap-10 w-full h-[45px] my-[75px]">
            <button
              type="submit"
              className="xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-fourth text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "この内容で登録する"}
            </button>
          </div>
        </form>
      }
    </>
  );
};

export default ProcessReg;
