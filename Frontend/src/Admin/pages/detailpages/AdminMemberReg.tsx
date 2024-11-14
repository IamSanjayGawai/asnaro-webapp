import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MemberRegForm } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Dropzone from "../../../components/static/Dropzone";
import { selectUser } from "@/state/slices/userSlice";
import { getLocation } from "@/api/zipApi";
import Spinner from "@/components/static/Spinner";
import { userRegisterAdminThunk } from "@/state/thunks/userThunks";

interface RegisterProps {
  setAuth: (auth: boolean) => void;
}

const NewRegMember: React.FC<RegisterProps> = ({ setAuth }) => {
  const dispatch = useAppDispatch();
  const { registerAdminErr } = useAppSelector(selectUser);
  const errorRef = React.useRef<HTMLDivElement | null>(null);
  const [auto, setAuto] = React.useState<boolean>(false);
  const [isReset, setIsReset] = React.useState<boolean>(false);
  const [zip01, setZip01] = React.useState<string>("");
  const [zip02, setZip02] = React.useState<string>("");
  const [pref, setPref] = React.useState<string>("");
  const [mun, setMun] = React.useState<string>("");
  const [profilePic, setProfilePic] = React.useState<File | null>(null);
  const [img1File, setImg1File] = React.useState<File | null>(null);
  const [img2File, setImg2File] = React.useState<File | null>(null);
  const [img3File, setImg3File] = React.useState<File | null>(null);
  const [dropped, setDropped] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MemberRegForm>();

  React.useEffect(() => {
    setAuth(true);
    return () => {
      setAuth(false);
    };
  }, []);

  React.useEffect(() => {
    if (registerAdminErr) {
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [registerAdminErr]);

  React.useEffect(() => {
    setValue("zip01", "012");
    setValue("zip02", "0000");
    setValue("pref", "something");
    setValue("addr01", "something");
  }, []);

  //Function to handle auto-address
  const autoAddress = async () => {
    setAuto(true);
    const foundLocation = await getLocation(`${zip01}${zip02}`);
    if (foundLocation) {
      setPref(foundLocation.state);
      setMun(foundLocation.city);
    } else {
      setPref("");
      setMun("");
    }
  };

  //Function to cancel auto-address
  const cancelAutoAddress = () => {
    setAuto(false);
    setPref("");
    setMun("");
  };

  // Function to handle file selection
  const handleFileSelect = (file: File, id: number) => {
    if (id === 1) setImg1File(file);
    else if (id === 2) setImg2File(file);
    else if (id === 3) setImg3File(file);
    else if (id === 4) setProfilePic(file);
  };

  // Function to create a custom date object
  function createDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day);
  }

  const watchedHolidays = watch([
    "holiday_flg1",
    "holiday_flg2",
    "holiday_flg3",
    "holiday_flg4",
    "holiday_flg5",
    "holiday_flg6",
    "holiday_flg7",
  ]);

  //Function to handle checkbox validation
  const validateHolidays = () => {
    return (
      watchedHolidays.some((flag) => flag) ||
      "At least one holiday must be selected"
    );
  };

  const onSubmit: SubmitHandler<MemberRegForm> = async (data) => {
    const newBusinessId = "T" + data.business_id.replace(/-/g, "");
    const newData = {
      ...data,
      zip01,
      zip02,
      pref,
      addr01: mun,
      business_id: newBusinessId,
    };

    const formData = new FormData();

    //Registering openTime and closeTime
    const openTimeObj = new Date();
    openTimeObj.setHours(
      data.open_time_hours ? parseInt(data.open_time_hours) : 0,
      data.open_time_minutes ? parseInt(data.open_time_minutes) : 0
    );
    // const openTime = openTimeObj.toLocaleTimeString("ja-JP", { hour12: true });

    const closeTimeObj = new Date();
    closeTimeObj.setHours(
      data.close_time_hours ? parseInt(data.close_time_hours) : 0,
      data.close_time_minutes ? parseInt(data.close_time_minutes) : 0
    );
    // const closeTime = closeTimeObj.toLocaleTimeString("ja-JP", {
    //   hour12: true,
    // });

    //Registering establishment_date
    const establishmentDate = createDate(
      data.establishment_year ? parseInt(data.establishment_year) : 0,
      data.establishment_month ? parseInt(data.establishment_month) : 0,
      data.establishment_day ? parseInt(data.establishment_day) : 0
    );

    // Append text fields to formData
    Object.keys(newData).forEach((key) => {
      if (
        key !== "img1" &&
        key !== "img2" &&
        key !== "img3" &&
        key !== "profile_img"
      ) {
        switch (key) {
          case "holiday_flg1":
            formData.append(key, newData[key] ? "1" : "0");
            break;
          case "holiday_flg2":
            formData.append(key, newData[key] ? "2" : "0");
            break;
          case "holiday_flg3":
            formData.append(key, newData[key] ? "3" : "0");
            break;
          case "holiday_flg4":
            formData.append(key, newData[key] ? "4" : "0");
            break;
          case "holiday_flg5":
            formData.append(key, newData[key] ? "5" : "0");
            break;
          case "holiday_flg6":
            formData.append(key, newData[key] ? "6" : "0");
            break;
          case "holiday_flg7":
            formData.append(key, newData[key] ? "7" : "0");
            break;
          case "open_time_hours":
            formData.append("open_time", openTimeObj as unknown as string);
            break;
          case "close_time_hours":
            formData.append("close_time", closeTimeObj as unknown as string);
            break;
          case "establishment_year":
            formData.append(
              "establishment_date",
              establishmentDate.toDateString()
            );
            break;
          default:
            formData.append(key, newData[key]);
            break;
        }
      }
    });

    // Append file inputs to formData
    if (profilePic) formData.append("profile_img", profilePic);
    if (img1File) formData.append("img1", img1File);
    if (img2File) formData.append("img2", img2File);
    if (img3File) formData.append("img3", img3File);

    //Append unspecified data
    formData.append("fax02", "");
    formData.append("fax03", "");
    formData.append("tele02", "");
    formData.append("tele03", "");

    // Log the formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    await dispatch(userRegisterAdminThunk(formData));

    console.log(newData);

    reset();
    setIsReset(true);
    setAuto(false);
    setZip01("");
    setZip02("");
    setPref("");
    setMun("");
  };

  // Determine if all inputs are empty

  return (
    <div className="lg:mx-20 md:mx-8 sm:mx-20 xs:mx-8 xs:mt-[24px] md:mt-[50px]">
      <div className="md:max-w-6xl xs:mt-[24px] md:mt-[50px] mx-auto xs:px-4 sm:px-6 md:px-8">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-y-3 gap-x-5">
            <h2 className="text-primary text-2xl font-bold xs:col-span-12 md:col-span-12 xs:mb-[35px] md:mb-[50px]">
              新規会員登録画面
            </h2>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>
                  企業名 <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="xs:col-span-24 md:col-span-18">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.name01 ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  type="text"
                  placeholder="さんぷる株式会社"
                  {...register("name01", {
                    required: "入力必須項目です",
                  })}
                  name="name01"
                />
                {errors.name01 && (
                  <p className="text-fifth">{errors?.name01?.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-10">
                <label>
                  会社名(フリガナ) <span className="text-fifth ">※</span>
                </label>
              </div>
              <div className="xs:col-span-24 md:col-span-14">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors?.kana01 ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  type="text"
                  placeholder="サンプルカブシキガイシャ"
                  {...register("kana01", {
                    required: "入力必須項目です",
                  })}
                  name="kana01"
                />
                {errors?.kana01 && (
                  <p className="text-fifth">{errors?.kana01?.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>
                  代表者役職 <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="xs:col-span-24 md:col-span-18">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.delegate_position
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] p-1`}
                  type="text"
                  placeholder="代表取締役"
                  {...register("delegate_position", {
                    required: "入力必須項目です",
                  })}
                  name="delegate_position"
                />
                {errors.delegate_position && (
                  <p className="text-fifth">
                    {errors.delegate_position.message}
                  </p>
                )}
              </div>
            </div>
            <div className="xs:hidden md:grid grid-cols-12 col-span-6"></div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>
                  代表者名 <span className="text-fifth ">※</span>
                </label>
              </div>
              <div className="grid grid-cols-12 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-18">
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.delegate_name01
                        ? "border-fifth"
                        : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="山田"
                    {...register("delegate_name01", {
                      required: "Delegate Name is required",
                    })}
                    name="delegate_name01"
                  />
                  {(errors.delegate_name01 || errors.delegate_name02) && (
                    <p className="text-fifth">入力必須項目です</p>
                  )}
                </div>
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.delegate_name02
                        ? "border-fifth"
                        : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="一郎"
                    {...register("delegate_name02", {
                      required: "Delegate Name is required",
                    })}
                    name="delegate_name02"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-10">
                <label>
                  代表者名(フリガナ) <span className="text-fifth ">※</span>
                </label>
              </div>
              <div className="grid grid-cols-12 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-14">
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.delegate_kana01
                        ? "border-fifth"
                        : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="ヤマダ"
                    {...register("delegate_kana01", {
                      required: "Delegate Kana is required",
                    })}
                    name="delegate_kana01"
                  />
                </div>
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.delegate_kana02
                        ? "border-fifth"
                        : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="イチロウ"
                    {...register("delegate_kana02", {
                      required: "Delegate Name is required",
                    })}
                    name="delegate_kana02"
                  />
                </div>
                {(errors.delegate_kana01 || errors.delegate_kana02) && (
                  <p className="text-fifth col-span-12">入力必須項目です</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>
                  担当者名 <span className="text-fifth ">※</span>
                </label>
              </div>
              <div className="grid grid-cols-12 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-18">
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.charge_name01 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="山田"
                    {...register("charge_name01", {
                      required: "Charge Name is required",
                    })}
                    name="charge_name01"
                  />
                </div>
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.charge_name02 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="太郎"
                    {...register("charge_name02", {
                      required: "Charge Name is required",
                    })}
                    name="charge_name02"
                  />
                </div>
                {(errors.charge_name01 || errors.charge_name02) && (
                  <p className="text-fifth col-span-12">入力必須項目です</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
              <div className="flex items-center xs:col-span-24 md:col-span-10">
                <label>
                  担当者名(フリガナ) <span className="text-fifth ">※</span>
                </label>
              </div>
              <div className="grid grid-cols-12 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-14">
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.charge_kana01 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="ヤマダ"
                    {...register("charge_kana01", {
                      required: "Charge Kana is required",
                    })}
                    name="charge_kana01"
                  />
                </div>
                <div className="col-span-6">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.charge_kana02 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="タロウ"
                    {...register("charge_kana02", {
                      required: "Charge Kana is required",
                    })}
                    name="charge_kana02"
                  />
                </div>
                {(errors.charge_kana01 || errors.charge_kana02) && (
                  <p className="text-fifth col-span-12">入力必須項目です</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-12">
              <div className="flex xs:col-span-24 md:col-span-3">
                <label>プロフィール 画像</label>
              </div>
              <div className="grid grid-cols-12 gap-x-3 xs:col-span-24 md:col-span-21">
                <div
                  className={`bg-[#F8F8F8] cursor-pointer flex justify-center items-center xs:h-[120px] md:h-[150px] ${
                    dropped
                      ? "rounded-[100%] xs:w-[120px] md:w-[150px] "
                      : "col-span-3"
                  } border border-[#E6E6E6]`}
                >
                  <Dropzone
                    setValue={setValue}
                    id={4}
                    onFileSelect={(file) => handleFileSelect(file, 4)}
                    isReset={isReset}
                    {...register("profile_img")}
                    isProcess={true}
                    dropped={dropped}
                    setDropped={setDropped}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-12">
              <div className="flex xs:col-span-24 md:col-span-3">
                <label>会社画像</label>
              </div>
              <div className="grid grid-cols-12 gap-x-3 xs:col-span-24 md:col-span-21">
                <div className="bg-[#F8F8F8] cursor-pointer col-span-4 flex justify-center items-center xs:h-[116px] md:h-[150px] border border-[#E6E6E6]">
                  <Dropzone
                    setValue={setValue}
                    id={1}
                    onFileSelect={(file) => handleFileSelect(file, 1)}
                    isReset={isReset}
                    {...register("img1")}
                  />
                </div>
                <div className="bg-[#F8F8F8] cursor-pointer col-span-4 w-full flex justify-center items-center xs:h-[116px] md:h-[150px] border border-[#E6E6E6]">
                  <Dropzone
                    setValue={setValue}
                    id={2}
                    onFileSelect={(file) => handleFileSelect(file, 2)}
                    isReset={isReset}
                    {...register("img2")}
                  />
                </div>
                <div className="bg-[#F8F8F8] cursor-pointer col-span-4 w-full flex justify-center items-center xs:h-[116px] md:h-[150px] border border-[#E6E6E6]">
                  <Dropzone
                    setValue={setValue}
                    id={3}
                    onFileSelect={(file) => handleFileSelect(file, 3)}
                    isReset={isReset}
                    {...register("img3")}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 gap-x-3 gap-y-2 col-span-12">
              <div className="xs:flex xs:flex-col md:block xs:col-span-24 md:col-span-3 lg:col-span-4">
                <label>
                  加工内容 <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                <div className="flex items-center xs:col-span-10 md:col-span-6">
                  <label>分類1</label>
                </div>
                <div className="flex items-center xs:col-span-14 md:col-span-12 lg:col-span-17">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.classified01 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="鋳造"
                    {...register("classified01", {
                      required: "入力必須項目です",
                    })}
                    name="classified01"
                  />
                </div>
              </div>
              <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                <div className="flex items-center xs:col-span-10 md:col-span-6">
                  <label>分類2</label>
                </div>
                <div className="flex items-center xs:col-span-14 md:col-span-12 lg:col-span-17">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.classified02 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="鋳造"
                    {...register("classified02")}
                    name="classified02"
                  />
                </div>
              </div>
              <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                <div className="flex items-center xs:col-span-10 md:col-span-6">
                  <label>分類3</label>
                </div>
                <div className="flex items-center xs:col-span-14 md:col-span-12 lg:col-span-17">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.classified03 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    placeholder="鋳造"
                    {...register("classified03")}
                    name="classified03"
                  />
                </div>
              </div>
              <div className="grid grid-cols-24 gap-x-3 xs:gap-y-2 col-span-24">
                <div className="xs:hidden md:flex items-center xs:col-span-24 md:col-span-3 lg:col-span-4"></div>
                <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                  <div className="flex items-center xs:col-span-10 md:col-span-6">
                    <label>分類4</label>
                  </div>
                  <div className="flex items-center xs:col-span-14 md:col-span-12 lg:col-span-17">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.classified04
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      placeholder="鋳造"
                      {...register("classified04")}
                      name="classified04"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                  <div className="flex items-center xs:col-span-10 md:col-span-6">
                    <label>分類5</label>
                  </div>
                  <div className="flex items-center xs:col-span-14 md:col-span-12 lg:col-span-17">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.classified05
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      placeholder="鋳造"
                      {...register("classified05")}
                      name="classified05"
                    />
                  </div>
                </div>
                {(errors.classified01 ||
                  errors.classified02 ||
                  errors.classified03 ||
                  errors.classified04 ||
                  errors.classified05) && (
                  <>
                    <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-7 lg:col-span-6"></div>
                    <div className="xs:hidden md:flex items-center xs:col-span-24 md:col-span-3 lg:col-span-4"></div>
                    <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6 text-fifth">
                      <div className="col-span-24">入力必須項目です</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 xs:xs:gap-x-1 md:gap-x-2 xs:gap-y-2 col-span-12">
              <div className="xs:flex xs:flex-col md:block xs:col-span-24 md:col-span-3">
                <label>
                  郵便番号 <span className="text-fifth">※</span>
                </label>
              </div>
              <div
                className={`grid grid-cols-12 gap-x-3 ${
                  errors.zip01 || errors.zip02 ? "xs:gap-y-0" : "xs:gap-y-2"
                } xs:col-span-24 md:col-span-21`}
              >
                <div className="grid grid-cols-24 xs:gap-y-1 xs:gap-x-1 md:gap-x-2 col-span-24">
                  <div className="md:col-span-6 xs:col-span-11">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.zip01 ? "border-fifth" : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="string"
                      name="zip01"
                      value={zip01}
                      {...register("zip01", {
                        required: "Zip01 is required",
                        maxLength: 3,
                        onChange: (e) => setZip01(e.target.value),
                      })}
                      placeholder="000"
                      maxLength={3}
                    />
                  </div>
                  <div className="flex items-center col-span-2 place-content-center">
                    <svg
                      width="8"
                      height="1"
                      viewBox="0 0 8 1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line y1="0.5" x2="8" y2="0.5" stroke="#808080" />
                    </svg>
                  </div>
                  <div className="md:col-span-6 xs:col-span-11">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.zip02 ? "border-fifth" : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="string"
                      name="zip02"
                      value={zip02}
                      {...register("zip02", {
                        required: "Zip02 is required",
                        maxLength: 4,
                        onChange: (e) => setZip02(e.target.value),
                      })}
                      placeholder="0000"
                      maxLength={4}
                    />
                  </div>
                  <div className="md:col-span-10 xs:col-span-24 flex items-center">
                    {!auto ? (
                      <div
                        onClick={autoAddress}
                        className="bg-[#F8F8F8] border-half border-[#e8e8e8] h-[30px] w-full cursor-pointer flex justify-center items-center"
                      >
                        住所自動入力
                      </div>
                    ) : (
                      <div
                        onClick={cancelAutoAddress}
                        className="bg-primary border-half border-primary h-[30px] w-full cursor-pointer flex justify-center items-center text-white"
                      >
                        自動入力をキャンセルする
                      </div>
                    )}
                  </div>
                </div>
                <div className="xs:hidden xs:col-span-12 md:col-span-4 flex justify-center items-center">
                  <button className="bg-[#F8F8F8] border-half border-[#e8e8e8] h-[30px] xs:w-3/4 md:w-1/2">
                    住所自動入力
                  </button>
                </div>
                {(errors.zip01 || errors.zip02) && (
                  <p className=" col-span-12 text-fifth">入力必須項目です</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 gap-y-2 col-span-12 xs:gap-y-3">
              <div className="flex items-center xs:col-span-24 md:col-span-4">
                <label>
                  所在地 <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-0 xs:gap-y-2 xs:col-span-24 md:col-span-17">
                <div className="flex items-center xs:col-span-24 md:col-span-5">
                  <label>都道府県</label>
                </div>
                <div className=" grid grid-cols-24 gap-x-3 xs:gap-y-2 xs:col-span-24 md:col-span-19">
                  <div className="xs:col-span-24 md:col-span-10">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.pref ? "border-fifth" : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      name="pref"
                      value={pref}
                      {...register("pref", {
                        required: "Pref is required",
                        onChange: (e) => setPref(e.target.value),
                      })}
                    />
                  </div>
                  <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-14 xs:gap-y-2 md:gap-y-0">
                    <div className="flex items-center xs:col-span-24 md:col-span-6">
                      <label>市区町村</label>
                    </div>
                    <div className="xs:col-span-24 md:col-span-18">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.addr01 ? "border-fifth" : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        name="addr01"
                        value={mun}
                        {...register("addr01", {
                          required: "Addr is required",
                          onChange: (e) => setMun(e.target.value),
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-24 col-span-24">
                <div className="xs:hidden md:flex items-center col-span-4"></div>
                <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-0 xs:col-span-24 md:col-span-17">
                  <div className="flex items-center xs:col-span-24 md:col-span-5">
                    <label>番地・建物名</label>
                  </div>
                  <div className="xs:col-span-24 md:col-span-19">
                    <input
                      type="text"
                      className={`h-[36px] w-full outline-none border ${
                        errors.addr02 ? "border-fifth" : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      {...register("addr02", {
                        required: "Addr is required",
                      })}
                    />
                  </div>
                  {(errors.pref || errors.addr01 || errors.addr02) && (
                    <p className="col-span-12 text-fifth">入力必須項目です</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>
                  電話番号 <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="grid grid-cols-24 xs:col-span-24 xs:gap-x-1 xs:gap-y-2 md:gap-x-5 md:col-span-18">
                <div className="xs:col-span-24 md:col-span-10">
                  <input
                    className={`h-[36px] w-full outline-none border ${
                      errors.tele01 ? "border-fifth" : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    type="text"
                    {...register("tele01", {
                      required: "Tele is required",
                    })}
                    name="tele01"
                  />
                  {errors.tele01 && (
                    <p className="text-fifth">入力必須項目です</p>
                  )}
                </div>
                <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-14 xs:gap-y-2 md:gap-y-0">
                  <div className="flex items-center xs:col-span-24 md:col-span-5">
                    <label>FAX番号</label>
                  </div>
                  <div className="xs:col-span-24 md:col-span-19">
                    <input
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                      type="text"
                      {...register("fax01")}
                      name="fax01"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-8">
                <label>
                  管理者メールアドレス <span className="text-fifth">※</span>
                </label>
              </div>
              <div
                ref={errorRef}
                className="flex flex-col xs:col-span-24 md:col-span-13"
              >
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.email || registerAdminErr?.message
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  type="text"
                  {...register("email", {
                    required: "入力必須項目です",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                  })}
                  name="email"
                />
                {errors.email && (
                  <p className="text-fifth">{errors.email.message}</p>
                )}
                {registerAdminErr && (
                  <p className="text-red-600">{registerAdminErr?.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-8">
                <label>
                  管理者メールアドレス(確認用){" "}
                  <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="flex flex-col xs:col-span-24 md:col-span-13">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.email_mobile ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  type="text"
                  {...register("email_mobile", {
                    required: "入力必須項目です",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                    validate: (value) =>
                      value === watch("email") ||
                      "管理者メールアドレスと同じメールアドレスを入力してください",
                  })}
                  name="email_mobile"
                />
                {errors.email_mobile && (
                  <p className="text-fifth">{errors.email_mobile.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>通知先メールアドレス１</label>
              </div>
              <div className="xs:col-span-24 md:col-span-15">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.notification_email_1
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("notification_email_1", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                  })}
                  type="text"
                />
                {errors.notification_email_1 && (
                  <p className="text-fifth">
                    {errors.notification_email_1.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>通知先メールアドレス2</label>
              </div>
              <div className="xs:col-span-24 md:col-span-15">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.notification_email_2
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("notification_email_2", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                  })}
                  type="text"
                />
                {errors.notification_email_2 && (
                  <p className="text-fifth">
                    {errors.notification_email_2.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>通知先メールアドレス3</label>
              </div>
              <div className="xs:col-span-24 md:col-span-15">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.notification_email_3
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("notification_email_3", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                  })}
                  type="text"
                />
                {errors.notification_email_3 && (
                  <p className="text-fifth">
                    {errors.notification_email_3.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>通知先メールアドレス4</label>
              </div>
              <div className="xs:col-span-24 md:col-span-15">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.notification_email_4
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("notification_email_4", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                  })}
                  type="text"
                />
                {errors.notification_email_4 && (
                  <p className="text-fifth">
                    {errors.notification_email_4.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-6">
                <label>通知先メールアドレス5</label>
              </div>
              <div className="xs:col-span-24 md:col-span-15">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.notification_email_5
                      ? "border-fifth"
                      : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("notification_email_5", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "メールアドレスを入力してください",
                    },
                  })}
                  type="text"
                />
                {errors.notification_email_5 && (
                  <p className="text-fifth">
                    {errors.notification_email_5.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>資本金</label>
              </div>
              <div className="xs:col-span-20 md:col-span-8">
                <input
                  className={`h-[36px] w-full outline-none border ${
                    errors.capital ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  type="text"
                  {...register("capital", {
                    validate: (value) =>
                      value === "" ||
                      /^[0-9]+$/.test(value) ||
                      "半角数字で入力してください",
                  })}
                  name="capital"
                />
                {errors.capital && (
                  <p className="text-fifth">{errors.capital.message}</p>
                )}
              </div>
              <div className="ml-4 col-span-4 flex items-center">万円</div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>事業内容</label>
              </div>
              <div className="xs:col-span-24 md:col-span-21">
                <textarea
                  {...register("business_content")}
                  name="business_content"
                  className="h-[100px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                />
                {errors.business_content && (
                  <p className="text-red-600">
                    {errors.business_content.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>営業時間</label>
              </div>
              <div className="grid grid-cols-24 gap-x-5 xs:col-span-24 md:col-span-21">
                <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:gap-y-2 col-span-8">
                  <div className="col-span-8">
                    <input
                      type="text"
                      {...register("open_time_hours", {
                        validate: (value) =>
                          value === "" ||
                          (/^[0-9]+$/.test(value) &&
                            value >= 0 &&
                            value <= 24) ||
                          "半角数字で入力してください",
                      })}
                      className={`h-[36px] w-full outline-none border ${
                        errors.open_time_hours
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      placeholder="時"
                    />
                  </div>
                  <div className="flex items-center justify-center col-span-1">
                    :
                  </div>
                  {/* Input for Minutes */}
                  <div className="col-span-15">
                    <input
                      type="text"
                      {...register("open_time_minutes", {
                        validate: (value) =>
                          value === "" ||
                          (/^[0-9]+$/.test(value) &&
                            value >= 0 &&
                            value <= 59) ||
                          "半角数字で入力してください",
                      })}
                      className={`h-[36px] w-full outline-none border ${
                        errors.open_time_minutes
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      placeholder="分"
                    />
                  </div>
                  {(errors.open_time_hours || errors.open_time_minutes) && (
                    <p className="text-fifth col-span-24">
                      半角数字で入力してください
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-center col-span-1">
                  ～
                </div>
                <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:gap-y-2 col-span-8">
                  <div className="col-span-8">
                    <input
                      type="text"
                      {...register("close_time_hours", {
                        validate: (value) =>
                          value === "" ||
                          (/^[0-9]+$/.test(value) &&
                            value >= 0 &&
                            value <= 24) ||
                          "半角数字で入力してください",
                      })}
                      className={`h-[36px] w-full outline-none border ${
                        errors.close_time_hours
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      placeholder="時"
                    />
                  </div>
                  <div className="flex items-center justify-center col-span-1">
                    :
                  </div>
                  {/* Input for Minutes */}
                  <div className="col-span-15">
                    <input
                      type="text"
                      {...register("close_time_minutes", {
                        validate: (value) =>
                          value === "" ||
                          (/^[0-9]+$/.test(value) &&
                            value >= 0 &&
                            value <= 59) ||
                          "半角数字で入力してください",
                      })}
                      className={`h-[36px] w-full outline-none border ${
                        errors.close_time_minutes
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      placeholder="分"
                    />
                  </div>
                  {(errors.close_time_hours || errors.close_time_minutes) && (
                    <p className="text-fifth col-span-24">
                      半角数字で入力してください
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 gap-y-3 col-span-12">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>
                  定休日 <span className="text-fifth"></span>
                </label>
              </div>
              <div className="grid grid-cols-24 gap-x-4 xs:col-span-24 md:col-span-21">
                {["月", "火", "水", "木", "金", "土", "日"].map(
                  (day, index) => (
                    <div
                      className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:gap-y-2 xs:col-span-8 md:col-span-3"
                      key={index}
                    >
                      <div className="col-span-3">
                        <input
                          type="checkbox"
                          className={`form-checkbox ${
                            errors[`holiday_flg${index + 1}`]
                              ? "border-fifth"
                              : "border-[#E6E6E6]"
                          }`}
                          {...register(`holiday_flg${index + 1}`, {
                            validate: validateHolidays,
                          })}
                          value={index + 1}
                          name={`holiday_flg${index + 1}`}
                        />
                      </div>
                      <div className="flex items-center col-span-21">
                        <label>{day + "曜日"}</label>
                      </div>
                    </div>
                  )
                )}
                {/* {(errors.holiday_flg1 ||
                  errors.holiday_flg2 ||
                  errors.holiday_flg3 ||
                  errors.holiday_flg4 ||
                  errors.holiday_flg5 ||
                  errors.holiday_flg6 ||
                  errors.holiday_flg7) && (
                  <p className="col-span-12 text-fifth">入力必須項目です</p>
                )} */}
              </div>
              <div className="flex items-center xs:col-span-24 md:col-span-3"></div>
              <div className="xs:col-span-24 md:col-span-21">
                <input
                  type="text"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  placeholder="その他備考（例：GW、年末年始、夏季休暇 [〇月〇日～〇月〇日] ）"
                  {...register("regular_holiday")}
                />
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>設立日</label>
              </div>
              <div className="grid grid-cols-24 gap-x-3 xs:col-span-24 md:col-span-11">
                <div className="grid grid-cols-24 gap-x-1 col-span-10">
                  <div className="col-span-18">
                    <input
                      type="text"
                      className={`h-[36px] w-full outline-none border ${
                        errors.establishment_year
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      {...register("establishment_year", {
                        validate: (value) =>
                          value === "" ||
                          /^[0-9]+$/.test(value) ||
                          "半角数字で入力してください",
                      })}
                    />
                  </div>
                  <div className="flex items-center col-span-6">
                    <label>年</label>
                  </div>
                </div>
                <div className="grid grid-cols-24 gap-x-1 col-span-7">
                  <div className="col-span-18">
                    <input
                      type="text"
                      className={`h-[36px] w-full outline-none border ${
                        errors.establishment_month
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      {...register("establishment_month", {
                        validate: (value) =>
                          value === "" ||
                          /^[0-9]+$/.test(value) ||
                          "半角数字で入力してください",
                      })}
                    />
                  </div>
                  <div className="flex items-center col-span-6">
                    <label>月</label>
                  </div>
                </div>
                <div className="grid grid-cols-24 gap-x-1 col-span-7">
                  <div className="col-span-18">
                    <input
                      type="text"
                      className={`h-[36px] w-full outline-none border ${
                        errors.establishment_day
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      {...register("establishment_day", {
                        validate: (value) =>
                          value === "" ||
                          /^[0-9]+$/.test(value) ||
                          "半角数字で入力してください",
                      })}
                    />
                  </div>
                  <div className="flex items-center col-span-6">
                    <label>日</label>
                  </div>
                </div>
                {(errors.establishment_year ||
                  errors.establishment_month ||
                  errors.establishment_day) && (
                  <p className="col-span-24 text-fifth">
                    半角数字で入力してください
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>会社URL</label>
              </div>
              <div className="xs:col-span-24 md:col-span-21">
                <input
                  type="text"
                  className={`h-[36px] w-full outline-none border ${
                    errors.corporate_url ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("corporate_url", {
                    validate: (value) =>
                      value === "" ||
                      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
                        value
                      ) ||
                      "URLを入力してください",
                  })}
                  name="corporate_url"
                />
                {errors.corporate_url && (
                  <p className="text-fifth">{errors.corporate_url.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>従業員数</label>
              </div>
              <div className="grid grid-cols-24 gap-x-3 xs:col-span-24 md:col-span-21">
                <div className="xs:col-span-20 md:col-span-6">
                  <input
                    type="text"
                    {...register("employees_number", {
                      validate: (value) =>
                        value === "" ||
                        /^[0-9]+$/.test(value) ||
                        "半角数字で入力してください",
                    })}
                    className={`h-[36px] w-full outline-none border ${
                      errors.employees_number
                        ? "border-fifth"
                        : "border-[#E6E6E6]"
                    } placeholder-[#E6E6E6] px-1`}
                    name="employees_number"
                  />
                  {errors.employees_number && (
                    <p className="text-fifth">
                      {errors.employees_number.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center xs:col-span-4 md:col-span-4">
                  名
                </div>
              </div>
            </div>
            <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-2 col-span-12 xs:gap-y-2 md:gap-y-0">
              <div className="flex items-center xs:col-span-24 md:col-span-5">
                <label>適格請求書発行事業者 登録番号</label>
              </div>
              <div className="xs:col-span-24 md:col-span-19">
                <input
                  type="text"
                  className={`h-[36px] w-full outline-none border ${
                    errors.business_id ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("business_id", {
                    required: "※Tを除いた13桁の数字を入力してください",
                    validate: (value) =>
                      (/^[0-9]+$/.test(value) && value.length === 13) ||
                      "※Tを除いた13桁の数字を入力してください",
                  })}
                />
                {errors.business_id && (
                  <p className="text-fifth">{errors.business_id.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-2 col-span-12 xs:gap-y-2 md:gap-y-0">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>主要取引先</label>
              </div>
              <div className="xs:col-span-24 md:col-span-21">
                <input
                  type="string"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  {...register("main_customer")}
                  name="main_customer"
                />
              </div>
            </div>
            <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-2 col-span-12 xs:gap-y-2 md:gap-y-0">
              <div className="flex items-center xs:col-span-24 md:col-span-3">
                <label>取引銀行</label>
              </div>
              <div className="xs:col-span-24 md:col-span-21">
                <input
                  type="string"
                  className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                  {...register("transaction_bank")}
                  name="transaction_bank"
                />
              </div>
            </div>
            <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-2 col-span-12 xs:gap-y-2 md:gap-y-0">
              <div className="flex items-center xs:col-span-24 md:col-span-5">
                <label>
                  パスワード <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="xs:col-span-24 md:col-span-19">
                <input
                  type="password"
                  className={`h-[36px] w-full outline-none border ${
                    errors.password ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("password", {
                    required: "入力必須項目です",
                    minLength: {
                      value: 8,
                      message: "パスワードは8文字以上でなければなりません",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-fifth">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-2 col-span-12 xs:gap-y-2 md:gap-y-0">
              <div className="flex items-center xs:col-span-24 md:col-span-5">
                <label>
                  パスワード(確認用) <span className="text-fifth">※</span>
                </label>
              </div>
              <div className="xs:col-span-24 md:col-span-19">
                <input
                  type="password"
                  className={`h-[36px] w-full outline-none border ${
                    errors.cpassword ? "border-fifth" : "border-[#E6E6E6]"
                  } placeholder-[#E6E6E6] px-1`}
                  {...register("cpassword", {
                    required: "入力必須項目です",
                    validate: (value) =>
                      value === watch("password") ||
                      "同じパスワードを入力してください",
                  })}
                />
                {errors.cpassword && (
                  <p className="text-fifth">{errors.cpassword.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-24 mt-3 md:mb-[120px] xs:mb-[50px] pl-[20px] pt-[16px] pr-[40px] pb-[40px] xs: gap-x-1 xs:gap-x-1 md:gap-x-2 xs:gap-y-2 lg:gap-x-8 gap-y-2 col-span-12 bg-light xs:h-[400px] md:h-[300px] w-full">
              <div className="col-span-24 h-[30px] font-bold text-[16px]">
                口座情報
              </div>
              <div className="grid grid-cols-24 xs:col-span-24 md:col-span-12  xs:gap-y-1 md:gap-y-0">
                <div className="flex items-center xs:col-span-24 md:col-span-6">
                  <label>金融機関</label>
                </div>
                <div className="xs:col-span-24 md:col-span-18">
                  <input
                    type="text"
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                    {...register("corporate_bank_name")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-24 xs:col-span-24 md:col-span-12  xs:gap-y-1 md:gap-y-0">
                <div className="flex items-center xs:col-span-24 md:col-span-6">
                  <label>支店名</label>
                </div>
                <div className="xs:col-span-24 md:col-span-18">
                  <input
                    type="text"
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                    {...register("corporate_branch_name")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-24 xs:col-span-24 md:col-span-12  xs:gap-y-1 md:gap-y-0">
                <div className="flex items-center xs:col-span-8 md:col-span-6">
                  <label>預金種別</label>
                </div>
                <div className="grid grid-cols-24 xs:col-span-16 md:col-span-18">
                  <div className="grid grid-cols-24 col-span-10">
                    <div className="flex items-center col-span-5">
                      <input
                        type="radio"
                        className="w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                        {...register("corporate_deposit_type")}
                        value={0}
                      />
                    </div>
                    <div className="flex items-center col-span-19">
                      <label>普通預金</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-24 col-span-10">
                    <div className="flex items-center col-span-5">
                      <input
                        type="radio"
                        className="w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                        {...register("corporate_deposit_type")}
                        value={1}
                      />
                    </div>
                    <div className="flex items-center col-span-19">
                      <label>当座預金</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xs:hidden md:grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-"></div>
              <div className="grid grid-cols-24 xs:col-span-24 md:col-span-12  xs:gap-y-1 md:gap-y-0">
                <div className="flex items-center xs:col-span-24 md:col-span-6">
                  <label>口座番号</label>
                </div>
                <div className="xs:col-span-24 md:col-span-18">
                  <input
                    type="text"
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                    {...register("corporate_account_number")}
                    name="corporate_account_number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-24 xs:col-span-24 md:col-span-12  xs:gap-y-1 md:gap-y-0">
                <div className="flex items-center xs:col-span-24 md:col-span-6">
                  <label>口座名義</label>
                </div>
                <div className="xs:col-span-24 md:col-span-18">
                  <input
                    type="text"
                    className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                    {...register("corporate_account_holder")}
                    name="corporate_account_holder"
                  />
                </div>
              </div>

              <div className="grid grid-cols-24 xs:col-span-24 md:col-span-12 xs:gap-y-1 md:gap-y-0 mt-6  ">
                <div className="flex items-center xs:col-span-8 md:col-span-6 w-full">
                  <label>メール認証</label>
                </div>
                <div className="grid grid-cols-24 xs:col-span-16 md:col-span-18 ">
                  <div className="grid grid-cols-24 col-span-10">
                    <div className="flex items-center col-span-5">
                      <input
                        type="radio"
                        className="w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                        {...register("email_verification", {
                          required: "このフィールドは必須です",
                        })}
                        value={1}
                      />
                    </div>
                    <div className="flex items-center col-span-19">
                      <label>はい</label>
                    </div>
                  </div>
                  <div className="grid grid-cols-24 col-span-10">
                    <div className="flex items-center col-span-5">
                      <input
                        type="radio"
                        className="w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                        {...register("email_verification", {
                          required: "このフィールドは必須です",
                        })}
                        value={0}
                      />
                    </div>
                    <div className="flex items-center col-span-19">
                      <label>いいえ</label>
                    </div>
                  </div>
                </div>
                {errors["email_verification"] && (
                  <span className="text-red-500 text-sm mt-2 col-span-24 ">
                    {`このフィールドは必須です`}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center h-[45px] col-span-12 text-white mb-[240px] ">
              <button
                type="submit"
                className="h-full bg-fourth xs:w-full mx-[25%]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner className="h-full" />
                ) : (
                  "この内容で登録する"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRegMember;
