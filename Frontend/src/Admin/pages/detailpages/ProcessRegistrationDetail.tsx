import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dropzone from "../../../components/static/Dropzone";
import CustomCalendar from "../../../components/static/Calender";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getProcessDetailsThunk,
  updateProcessAdminThunk,
} from "@/state/thunks/processThunks";
import { ProcessRegForm, Category, Subcategory } from "@/types/types";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectProcess } from "@/state/slices/processSlice";
import { BASE_URL } from "@/utils/baseUrl";
import Spinner from "@/components/static/Spinner";
import { EditCalendarAction } from "@/state/slices/processSlice";

const ProcessRegistrationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { processId } = useParams();
  const dispatch = useAppDispatch();
  const { process, appErr, loading } = useAppSelector(selectProcess);
  const [prevName, setPrevName] = React.useState<boolean>(true);
  const [prevMaker, setPrevMaker] = React.useState<boolean>(true);
  const [prevImg1, setPrevImg1] = React.useState<boolean>(true);
  const [img1File, setImg1File] = React.useState<File | null>(null);
  const [prevImg2, setPrevImg2] = React.useState<boolean>(true);
  const [img2File, setImg2File] = React.useState<File | null>(null);
  const [prevImg3, setPrevImg3] = React.useState<boolean>(true);
  const [img3File, setImg3File] = React.useState<File | null>(null);
  const [prevYears, setPrevYears] = React.useState<boolean>(true);
  const [year, setYear] = React.useState<number>(
    process?.processData?.years_type
  );
  const [prevPref, setPrevPref] = React.useState<boolean>(true);
  const [prevMun, setPrevMun] = React.useState<boolean>(true);
  const [prevCapacity, setPrevCapacity] = React.useState<boolean>(true);
  const [prevProcessExp, setPrevProcessExp] = React.useState<boolean>(true);
  const [prevEquipment, setPrevEquipment] = React.useState<boolean>(true);
  const [prevDeliveryDate, setPrevDeliveryDate] = React.useState<boolean>(true);
  const [prevUnitPrice, setPrevUnitPrice] = React.useState<boolean>(true);
  const [prevParentCategory, setPrevParentCategory] =
    React.useState<boolean>(true);
  const [prevChildCategory, setPrevChildCategory] =
    React.useState<boolean>(true);
  const [prevTags, setPrevTags] = React.useState<boolean>(true);
  const [pref, setPref] = React.useState<string>(
    process?.processData?.pref || ""
  );
  const [mun, setMun] = React.useState<string>(process?.processData?.mun || "");
  const [subCategory, setSubCategory] = React.useState<string>(
    process?.processData?.child_category || ""
  );
  const [tags, setTags] = React.useState<string>("");
  const [prevRemarks, setPrevRemarks] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [subcategories, setSubcategories] = React.useState<Subcategory[]>([]);
  const [selectedStates, setStates] = React.useState<string[]>([]);
  const [selectedCity, setCities] = React.useState<string[]>([]);
  const [prevPubStatus, setPrevPubStatus] = React.useState<boolean>(true);
  const [pubStatus, setPubStatus] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<any>({});

  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get<string[]>(`${BASE_URL}/areas/states`);
        console.log(response?.data, "************");
        setStates(response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchStates();
  }, []);

  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get<string[]>(
          `${BASE_URL}/areas/cities/${encodeURIComponent(
            process?.processData?.pref
          )}`
        );
        console.log(response?.data, "************");
        setCities(response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCities();
  }, [process]);

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
  }, [process]);

  React.useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (process?.processData?.parent_category) {
          const response = await axios.get<Subcategory[]>(
            `${BASE_URL}/categories/subcategories/${process?.processData?.parent_category}`
          );
          setSubcategories(response?.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, [process]);

  React.useEffect(() => {
    if (prevName && process?.processData?.name) {
      setValue("name", process.processData.name);
    }
    if (prevMaker && process?.processData?.maker_name) {
      setValue("maker_name", process.processData.maker_name);
    }
    if (prevYears && process?.processData?.years_type) {
      setValue("years_type", process.processData.years_type);
    }
    if (prevPref && process?.processData?.pref) {
      setValue("pref", process.processData.pref);
      setPref(process.processData.pref);
    }
    if (prevMun && process?.processData?.mun) {
      setValue("mun", process.processData.mun);
      setMun(process.processData.mun);
    }
    if (prevCapacity && process?.processData?.capacity) {
      setValue("capacity", process.processData.capacity);
    }
    if (prevProcessExp && process?.processData?.process_explanation) {
      setValue("process_explanation", process.processData.process_explanation);
    }
    if (prevEquipment && process?.processData?.equipment_size) {
      setValue("equipment_size", process.processData.equipment_size);
    }
    if (prevDeliveryDate && process?.processData?.delivery_date) {
      setValue("delivery_date", process.processData.delivery_date);
    }
    if (prevUnitPrice && process?.processData?.unit_price) {
      setValue("unit_price", process.processData.unit_price);
    }
    if (prevParentCategory && process?.processData?.parent_category) {
      setValue("parent_category", process.processData.parent_category);
    }
    if (prevChildCategory && process?.processData?.child_category) {
      setValue("child_category", process.processData.child_category);
      setSubCategory(process.processData.child_category);
    }
    if (prevTags && process?.processData?.tags) {
      setValue("tags", process.processData.tags.join(","));
    }
    if (prevRemarks && process?.processData?.remarks_column) {
      setValue("remarks_column", process.processData.remarks_column);
    }
  }, [
    process,
    prevName,
    prevMaker,
    prevYears,
    prevPref,
    prevMun,
    prevCapacity,
    prevProcessExp,
    prevEquipment,
    prevDeliveryDate,
    prevUnitPrice,
    prevParentCategory,
    prevTags,
    prevRemarks,
    pref,
    mun,
    subCategory,
    redirect,
  ]);

  React.useEffect(() => {
    if (prevPubStatus && process?.processData?.status) {
      setPubStatus(process.processData.status);
    }
  }, [prevPubStatus, pubStatus, process]);

  React.useEffect(() => {
    register("availability");
  }, []);

  React.useEffect(() => {
    dispatch(getProcessDetailsThunk(processId));
    dispatch(EditCalendarAction(true));
  }, [dispatch, redirect]);
  console.log("processId details:", processId);

  // React.useEffect(() => {
  //   if (process?.message === "Process updated successfully" && redirect) {
  //     window.location.reload();
  //   }
  // }, [process, redirect, appErr]);

  let yearsArray = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= 1874; i--) {
    yearsArray.push(i);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProcessRegForm>();

  console.log("Process details:", process);
  console.log(selectedCity, "************");

  const handleFileSelect = (file: File, id: number) => {
    if (id === 1) setImg1File(file);
    else if (id === 2) setImg2File(file);
    else if (id === 3) setImg3File(file);
  };

  const handleStatesChange = async (states) => {
    try {
      setPrevPref(false);
      const response = await axios.get(
        `${BASE_URL}/areas/cities/${encodeURIComponent(states)}`
      );
      console.log("Cities fetched:", response?.data);
      setCities(response?.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    try {
      setPrevParentCategory(false);
      const response = await axios.get<Subcategory[]>(
        `${BASE_URL}/categories/subcategories/${categoryId}`
      );
      setSubcategories(response?.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const onSubmit: SubmitHandler<ProcessRegForm> = async (data) => {
    const tagsArray = data.tags.split(",");

    const newData = {
      ...data,
      tags: tagsArray,
      status: pubStatus,
    };

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
    const response = await dispatch(
      updateProcessAdminThunk({ formData, id: processId })
    );

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    setPrevImg1(true);
    setPrevImg2(true);
    setPrevImg3(true);
    setRedirect(response);
  };

  // console.log("errors", errors);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
              <label className="xs:col-span-12 md:col-span-3 flex items-center text-[#808080]">
                工程名<span className=" text-fifth ml-12">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 relative ">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  placeholder="工程名"
                  {...register("name", {
                    required: "プロセス名は必須です",
                    onChange: () => {
                      setPrevName(false);
                    },
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
              <label className="xs:col-span-12 md:col-span-3 flex items-center text-[#808080]">
                地域<span className=" text-fifth ml-16">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2">
                <div className="xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2">
                  <label className="col-span-4 md:col-span-5 flex items-center text-[#808080]">
                    都道府県
                  </label>
                  <div className="col-span-8 md:col-span-7 flex items-center relative">
                    <select
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer"
                      value={pref}
                      {...register("pref", {
                        required: "都道府県は必須です",
                        onChange: (e) => handleStatesChange(e.target.value),
                      })}
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
                  <label className="col-span-4 md:col-span-5 flex items-center text-[#808080]">
                    市区町村
                  </label>
                  <div className="col-span-8 md:col-span-7 flex items-center relative">
                    <select
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer"
                      value={mun}
                      {...register("mun", {
                        required: "市区町村は必須です",
                        onChange: (e) => {
                          setMun(e.target.value);
                          setPrevMun(false);
                        },
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
              <label className="xs:col-span-12 md:col-span-3 text-[#808080]">
                工程画像<span className=" text-fifth ml-8">{"※"}</span>
              </label>
              <div className="xs:col-span-12 xs:gap-x-2 grid grid-cols-12 md:col-span-9 md:gap-x-3">
                <div className="bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]">
                  {prevImg1 ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        className="w-full h-full"
                        src={process?.processData?.img1}
                        alt="image1"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full cursor-pointer">
                      <Dropzone
                        setValue={setValue}
                        id={1}
                        onFileSelect={(file) => handleFileSelect(file, 1)}
                        {...register("img1", {
                          required: "   3 つの画像フィールドはすべて必須です",
                        })}
                        isProcess={true}
                      />
                    </div>
                  )}
                  {prevImg1 && (
                    <svg
                      className="absolute top-0 right-0 mr-[2px] cursor-pointer"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setPrevImg1(false)}
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="10"
                        fill="black"
                        fill-opacity="0.5"
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
                <div className="bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]">
                  {prevImg2 ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        className="w-full h-full"
                        src={process?.processData?.img2}
                        alt="image1"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full cursor-pointer">
                      <Dropzone
                        setValue={setValue}
                        id={2}
                        onFileSelect={(file) => handleFileSelect(file, 2)}
                        {...register("img2", {
                          required: "   3 つの画像フィールドはすべて必須です",
                        })}
                        isProcess={true}
                      />
                    </div>
                  )}
                  {prevImg2 && (
                    <svg
                      className="absolute top-0 right-0 mr-[2px] cursor-pointer"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setPrevImg2(false)}
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="10"
                        fill="black"
                        fill-opacity="0.5"
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
                <div className="bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]">
                  {prevImg3 ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        className="w-full h-full"
                        src={process?.processData?.img3}
                        alt="image1"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full cursor-pointer">
                      <Dropzone
                        setValue={setValue}
                        id={3}
                        onFileSelect={(file) => handleFileSelect(file, 3)}
                        {...register("img3", {
                          required: "   3 つの画像フィールドはすべて必須です",
                        })}
                        isProcess={true}
                      />
                    </div>
                  )}
                  {prevImg3 && (
                    <svg
                      className="absolute top-0 right-0 mr-[2px] cursor-pointer"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setPrevImg3(false)}
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="10"
                        fill="black"
                        fill-opacity="0.5"
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
              <label className="xs:col-span-12 md:col-span-3 flex text-[#808080]">
                工程説明<span className=" text-fifth ml-8">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 relative">
                <textarea
                  className="block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  {...register("process_explanation", {
                    required: "プロセスの説明は必須です",
                    onChange: () => {
                      setPrevProcessExp(false);
                    },
                  })}
                  placeholder="　記入例）〇〇製△△加工機です。
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
              <label className="xs:col-span-12 md:col-span-3 flex text-[#808080]">
                能力<span className=" text-fifth ml-16">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 relative">
                <textarea
                  className="block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  {...register("capacity", {
                    required: "容量が必要です",
                    onChange: () => {
                      setPrevCapacity(false);
                    },
                  })}
                  placeholder="　記入例）加工可能な製品サイズ 〇〇×〇〇×〇〇
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
              <label className="xs:col-span-12 md:col-span-3  flex items-center text-[#808080]">
                設備サイズ<span className="ml-1 text-[#808080] "></span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 relative">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  {...register("equipment_size", {
                    onChange: () => {
                      setPrevEquipment(false);
                    },
                  })}
                />
                {/* {errors.equipment_size && (
                  <p className="text-fifth">
                    {errors.equipment_size.message}
                  </p>
                )} */}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center text-[#808080]">
                メーカー
              </label>
              <div className="xs:col-span-12 md:col-span-9 relative">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  placeholder="〇〇社製"
                  {...register("maker_name", {
                    onChange: () => {
                      setPrevMaker(false);
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center text-[#808080]">
                年式
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-x-2">
                <div className="col-span-5 flex items-center relative">
                  <select
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer"
                    value={year}
                    {...register("years_type", {
                      onChange: (e) => {
                        setPrevYears(false);
                        setYear(parseInt(e.target.value));
                      },
                    })}
                  >
                    {yearsArray.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-7 flex items-center text-[#808080]">
                  年製
                </div>
              </div>
            </div>

            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center text-[#808080]">
                納期の目安<span className=" text-fifth ml-4">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-5 relative">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  placeholder="　最短翌日～"
                  {...register("delivery_date", {
                    required: "お届け日は必須です",
                    onChange: () => {
                      setPrevDeliveryDate(false);
                    },
                  })}
                />
                {errors.delivery_date && (
                  <p className="text-fifth">{errors.delivery_date.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3  flex items-center text-[#808080]">
                単価(税別)<span className=" text-fifth ml-5">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-5 relative">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  placeholder="テーブルサイズ〇〇×〇〇×〇〇"
                  {...register("unit_price", {
                    required: "単価は必須です",
                    onChange: () => {
                      setPrevUnitPrice(false);
                    },
                  })}
                />
                {errors.unit_price && (
                  <p className="text-fifth">{errors.unit_price.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-12 md:col-span-3 flex items-center text-[#808080]">
                カテゴリー<span className=" text-fifth ml-4">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2">
                <div className="xs:col-span-12 md:col-span-5 lg:col-span-4 flex items-center relative">
                  <select
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer"
                    {...register("parent_category", {
                      required: "カテゴリは必須です",
                      onChange: (e) => handleCategoryChange(e.target.value),
                    })}
                  >
                    <option className="text-tertiary" value="">
                      カテゴリー
                    </option>
                    {categories.map((category) => (
                      <option
                        className="text-tertiary"
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="xs:col-span-12 md:col-span-7 lg:col-span-6 grid grid-cols-12 gap-x-2">
                  <label className="xs:col-span-12 md:col-span-6 lg:col-span-5 flex items-center text-[#808080]">
                    サブカテゴリー
                  </label>
                  <div className="xs:col-span-12 md:col-span-6 lg:col-span-7 flex items-center relative">
                    <select
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer"
                      value={subCategory}
                      {...register("child_category", {
                        onChange: (e) => {
                          setSubCategory(e.target.value);
                          setPrevChildCategory(false);
                        },
                      })}
                    >
                      <option className="text-tertiary" value="">
                        サブカテゴリー
                      </option>
                      {subcategories.map((subcategory) => (
                        <option
                          className="text-tertiary"
                          key={subcategory.category_id}
                          value={subcategory.category_id}
                        >
                          {subcategory.category_name}
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
              <label className="xs:col-span-12 md:col-span-3 flex text-[#808080]">
                タグ<span className=" text-fifth ml-16">{"※"}</span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <textarea
                  value={prevTags ? process?.processData?.tags.join(",") : tags}
                  {...register("tags", {
                    required:
                      "工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)",
                    onChange: (e) => {
                      setPrevTags(false);
                      setTags(e.target.value);
                    },
                  })}
                  className="block h-[70px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 py-1 text-[#808080]"
                  placeholder="　レーザー,三次元,形鋼,パイプ,マザック"
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
              <label className="xs:col-span-12 md:col-span-3 text-[#808080]">
                空き状況<span className="ml-1 text-fifth"></span>
              </label>
              <div className="xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-y-4">
                <div className="lg:col-span-8 xs:col-span-12">
                  <CustomCalendar
                    register={register}
                    errors={errors}
                    setValue={setValue}
                  />
                </div>
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
              <label className="xs:col-span-12 md:col-span-3 flex text-[#808080]">
                備考<span className="ml-1 text-fifth"></span>
              </label>
              <div className="xs:col-span-12 md:col-span-9 ">
                <textarea
                  className="block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]"
                  {...register("remarks_column", {
                    // required: "Remarks are required",
                    onChange: () => {
                      setPrevRemarks(false);
                    },
                  })}
                />
                {/* {errors.remarks_column && (
                  <p className="text-fifth">
                    {errors.remarks_column.message}
                  </p>
                )} */}
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12">
              <label className="xs:col-span-5 flex items-center text-[#808080]">
                公開ステータス<span className="ml-1 text-fifth">{"※"}</span>
              </label>
              <div className="xs:col-span-7 grid grid-cols-12">
                <div className="col-span-6 flex xs:justify-center md:justify-start items-center gap-1 text-[#808080]">
                  <input
                    className="h-[16px] text-[#808080]"
                    type="radio"
                    value={
                      prevPubStatus ? process?.processData?.status : pubStatus
                    }
                    onClick={() => {
                      setPrevPubStatus(false);
                      setPubStatus("release");
                    }}
                    {...register("status")}
                    checked={
                      prevPubStatus
                        ? process?.processData?.status === "release"
                        : pubStatus === "release"
                    }
                  />
                  <div>公開</div>
                </div>
                <div className="col-span-6 flex xs:justify-center md:justify-start  items-center gap-1 text-[#808080]">
                  <input
                    className="h-[16px text-[#808080]"
                    type="radio"
                    value={
                      prevPubStatus ? process?.processData?.status : pubStatus
                    }
                    onClick={() => {
                      setPrevPubStatus(false);
                      setPubStatus("private");
                    }}
                    {...register("status")}
                    checked={
                      prevPubStatus
                        ? process?.processData?.status === "private"
                        : pubStatus === "private"
                    }
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
              className="xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-[#808080] text-white"
              onClick={() => navigate("/admin/dashboard/process-management")}
            >
              戻る
            </button>
            <button
              type="submit"
              className="xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-fourth text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "この内容で登録する"}
            </button>
          </div>
        </form>
        // {/* </div> */}
      )}
    </>
  );
};

export default ProcessRegistrationDetail;
