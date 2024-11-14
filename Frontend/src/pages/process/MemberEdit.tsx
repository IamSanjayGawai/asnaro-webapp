import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { MemberRegForm } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import Dropzone from "../../components/static/Dropzone";
import { updateUserThunk, getUserByIdThunk } from "@/state/thunks/userThunks";
import { selectUser } from "@/state/slices/userSlice";
import { getLocation } from "@/api/zipApi";
import Spinner from "@/components/static/Spinner";
// import { updateUserByIdforAdminThunk } from "@/state/thunks/adminThunks";

const MemberEdit: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { other, appErr, loading } = useAppSelector(selectUser);
  const [auto, setAuto] = React.useState<boolean>(false);
  const [prevName, setPrevName] = React.useState<boolean>(true);
  const [prevKana, setPrevKana] = React.useState<boolean>(true);
  const [prevDelPosition, setPrevDelPosition] = React.useState<boolean>(true);
  const [prevDelName01, setPrevDelName01] = React.useState<boolean>(true);
  const [prevDelName02, setPrevDelName02] = React.useState<boolean>(true);
  const [prevDelKana01, setPrevDelKana01] = React.useState<boolean>(true);
  const [prevDelKana02, setPrevDelKana02] = React.useState<boolean>(true);
  const [prevChargeName01, setPrevChargeName01] = React.useState<boolean>(true);
  const [prevChargeName02, setPrevChargeName02] = React.useState<boolean>(true);
  const [prevChargeKana01, setPrevChargeKana01] = React.useState<boolean>(true);
  const [prevChargeKana02, setPrevChargeKana02] = React.useState<boolean>(true);
  const [prevProfilePic, setPrevProfilePic] = React.useState<boolean>(true);
  const [prevImg1, setPrevImg1] = React.useState<boolean>(true);
  const [prevImg2, setPrevImg2] = React.useState<boolean>(true);
  const [prevImg3, setPrevImg3] = React.useState<boolean>(true);
  const [profilePic, setProfilePic] = React.useState<File | null>(null);
  const [img1File, setImg1File] = React.useState<File | null>(null);
  const [img2File, setImg2File] = React.useState<File | null>(null);
  const [img3File, setImg3File] = React.useState<File | null>(null);
  const [prevClassified01, setPrevClassified01] = React.useState<boolean>(true);
  const [prevClassified02, setPrevClassified02] = React.useState<boolean>(true);
  const [prevClassified03, setPrevClassified03] = React.useState<boolean>(true);
  const [prevClassified04, setPrevClassified04] = React.useState<boolean>(true);
  const [prevClassified05, setPrevClassified05] = React.useState<boolean>(true);
  const [prevZip01, setPrevZip01] = React.useState<boolean>(true);
  const [zip01, setZip01] = React.useState<string>("");
  const [prevZip02, setPrevZip02] = React.useState<boolean>(true);
  const [zip02, setZip02] = React.useState<string>("");
  const [prevPref, setPrevPref] = React.useState<boolean>(true);
  const [pref, setPref] = React.useState<string>("");
  const [prevMun, setPrevMun] = React.useState<boolean>(true);
  const [mun, setMun] = React.useState<string>("");
  const [prevAddr02, setPrevAddr02] = React.useState<boolean>(true);
  const [prevTel01, setPrevTel01] = React.useState<boolean>(true);
  const [prevFax01, setPrevFax01] = React.useState<boolean>(true);
  const [prevEmail, setPrevEmail] = React.useState<boolean>(true);
  const [prevEmailMob, setPrevEmailMob] = React.useState<boolean>(true);
  const [prevNotificationEmail1, setPrevNotificationEmail1] =
    React.useState<boolean>(true);
  const [prevNotificationEmail2, setPrevNotificationEmail2] =
    React.useState<boolean>(true);
  const [prevNotificationEmail3, setPrevNotificationEmail3] =
    React.useState<boolean>(true);
  const [prevNotificationEmail4, setPrevNotificationEmail4] =
    React.useState<boolean>(true);
  const [prevNotificationEmail5, setPrevNotificationEmail5] =
    React.useState<boolean>(true);
  const [prevBusinessId, setPrevBusinessId] = React.useState<boolean>(true);
  const [prevCapital, setPrevCapital] = React.useState<boolean>(true);
  const [prevBusinessContent, setPrevBusinessContent] =
    React.useState<boolean>(true);
  const [prevOpenTime, setPrevOpenTime] = React.useState<boolean>(true);
  const [prevCloseTime, setPrevCloseTime] = React.useState<boolean>(true);
  const [prevRegularHoliday, setPrevRegularHoliday] =
    React.useState<boolean>(true);
  const [prevEstablishmentYear, setPrevEstablishmentYear] =
    React.useState<boolean>(true);
  const [prevCorporateUrl, setPrevCorporateUrl] = React.useState<boolean>(true);
  const [prevEmployeesNumber, setPrevEmployeesNumber] =
    React.useState<boolean>(true);
  const [prevMainCustomer, setPrevMainCustomer] = React.useState<boolean>(true);
  const [PrevTransactionBank, setPrevTransactionBank] =
    React.useState<boolean>(true);
  const [prevCorporateBankName, setPrevCorporateBankName] =
    React.useState<boolean>(true);
  const [prevCorporateBranchName, setPrevCorporateBranchName] =
    React.useState<boolean>(true);
  const [prevCorporateDepositType, setPrevCorporateDepositType] =
    React.useState<boolean>(true);
  const [depositType, setDepositType] = React.useState<number>(0);
  const [prevCorporateAccountNumber, setPrevCorporateAccountNumber] =
    React.useState<boolean>(true);
  const [prevCorporateAccountHolder, setPrevCorporateAccountHolder] =
    React.useState<boolean>(true);
  const [isReset, setIsReset] = React.useState<boolean>(false);
  const [dropped, setDropped] = React.useState<boolean>(false);

  // const { uid } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MemberRegForm>();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    dispatch(getUserByIdThunk({}));
  }, []);

  React.useEffect(() => {
    setValue("zip01", "012");
    setValue("zip02", "2345");
    setValue("pref", "something");
    setValue("addr01", "something");
  }, [other]);

  React.useEffect(() => {
    if (other?.message === "User updated successfully") {
      dispatch(getUserByIdThunk({}));
      setPrevName(true);
      setPrevKana(true);
      setPrevDelPosition(true);
      setPrevDelName01(true);
      setPrevDelName02(true);
      setPrevDelKana01(true);
      setPrevDelKana02(true);
      setPrevChargeName01(true);
      setPrevChargeName02(true);
      setPrevChargeKana01(true);
      setPrevChargeKana02(true);
      setPrevProfilePic(true);
      setPrevImg1(true);
      setPrevImg2(true);
      setPrevImg3(true);
      setPrevClassified01(true);
      setPrevClassified02(true);
      setPrevClassified03(true);
      setPrevClassified04(true);
      setPrevClassified05(true);
      setPrevZip01(true);
      setPrevZip02(true);
      setPrevPref(true);
      setPrevMun(true);
      setPrevAddr02(true);
      setPrevTel01(true);
      setPrevFax01(true);
      setPrevEmail(true);
      setPrevEmailMob(true);
      setPrevNotificationEmail1(true);
      setPrevNotificationEmail2(true);
      setPrevNotificationEmail3(true);
      setPrevNotificationEmail4(true);
      setPrevNotificationEmail5(true);
      setPrevBusinessId(true);
      setPrevCapital(true);
      setPrevBusinessContent(true);
      setPrevOpenTime(true);
      setPrevCloseTime(true);
      setPrevRegularHoliday(true);
      setPrevEstablishmentYear(true);
      setPrevCorporateUrl(true);
      setPrevEmployeesNumber(true);
      setPrevMainCustomer(true);
      setPrevTransactionBank(true);
      setPrevCorporateBankName(true);
      setPrevCorporateBranchName(true);
      setPrevCorporateDepositType(true);
      setPrevCorporateAccountNumber(true);
      setPrevCorporateAccountHolder(true);
    }
  }, [other]);

  React.useEffect(() => {
    if (other?.user?.name01 && prevName) {
      setValue("name01", other.user.name01);
    }
    if (other?.user?.kana01 && prevKana) {
      setValue("kana01", other.user.kana01);
    }
    if (other?.user?.delegate_position && prevDelPosition) {
      setValue("delegate_position", other.user.delegate_position);
    }
    if (other?.user?.delegate_name01 && prevDelName01) {
      setValue("delegate_name01", other.user.delegate_name01);
    }
    if (other?.user?.delegate_name02 && prevDelName02) {
      setValue("delegate_name02", other.user.delegate_name02);
    }
    if (other?.user?.delegate_kana01 && prevDelKana01) {
      setValue("delegate_kana01", other.user.delegate_kana01);
    }
    if (other?.user?.delegate_kana02 && prevDelKana02) {
      setValue("delegate_kana02", other.user.delegate_kana02);
    }
    if (other?.user?.charge_name01 && prevChargeName01) {
      setValue("charge_name01", other.user.charge_name01);
    }
    if (other?.user?.charge_name02 && prevChargeName02) {
      setValue("charge_name02", other.user.charge_name02);
    }
    if (other?.user?.charge_kana01 && prevChargeKana01) {
      setValue("charge_kana01", other.user.charge_kana01);
    }
    if (other?.user?.charge_kana02 && prevChargeKana02) {
      setValue("charge_kana02", other.user.charge_kana02);
    }
    if (other?.user?.classified01 && prevClassified01) {
      setValue("classified01", other.user.classified01);
    }
    if (other?.user?.classified02 && prevClassified02) {
      setValue("classified02", other.user.classified02);
    }
    if (other?.user?.classified03 && prevClassified03) {
      setValue("classified03", other.user.classified03);
    }
    if (other?.user?.classified04 && prevClassified04) {
      setValue("classified04", other.user.classified04);
    }
    if (other?.user?.classified05 && prevClassified05) {
      setValue("classified05", other.user.classified05);
    }
    if (other?.user?.zip01 && prevZip01) {
      setZip01(other.user.zip01);
    }
    if (other?.user?.zip02 && prevZip02) {
      setZip02(other.user.zip02);
    }
    if (other?.user?.pref && prevPref) {
      setPref(other.user.pref);
    }
    if (other?.user?.addr01 && prevMun) {
      setMun(other.user.addr01);
    }
    if (other?.user?.addr02 && prevAddr02) {
      setValue("addr02", other.user.addr02);
    }
    if (other?.user?.tele01 && prevTel01) {
      setValue("tele01", other.user.tele01);
    }
    if (other?.user?.fax01 && prevFax01) {
      setValue("fax01", other.user.fax01);
    }
    if (other?.user?.email && prevEmail) {
      setValue("email", other.user.email);
    }
    if (other?.user?.email_mobile && prevEmailMob) {
      setValue("email_mobile", other.user.email_mobile);
    }
    if (other?.user?.notification_email_1 && prevNotificationEmail1) {
      setValue("notification_email_1", other.user.notification_email_1);
    }
    if (other?.user?.notification_email_2 && prevNotificationEmail2) {
      setValue("notification_email_2", other.user.notification_email_2);
    }
    if (other?.user?.notification_email_3 && prevNotificationEmail3) {
      setValue("notification_email_3", other.user.notification_email_3);
    }
    if (other?.user?.notification_email_4 && prevNotificationEmail4) {
      setValue("notification_email_4", other.user.notification_email_4);
    }
    if (other?.user?.notification_email_5 && prevNotificationEmail5) {
      setValue("notification_email_5", other.user.notification_email_5);
    }
    if (other?.user?.business_id && prevBusinessId) {
      const editedBusinessId = other.user.business_id.replace(/T/g, "");
      setValue("business_id", editedBusinessId);
    }
    if (other?.user?.capital && prevCapital) {
      setValue("capital", other.user.capital);
    }
    if (other?.user?.business_content && prevBusinessContent) {
      setValue("business_content", other.user.business_content);
    }
    if (other?.user?.open_time && prevOpenTime) {
      const openTime = new Date(other.user.open_time);
      setValue("open_time_hours", openTime.getHours());
      setValue(
        "open_time_minutes",
        openTime.getMinutes().toString().padStart(2, "0")
      );
    }
    if (other?.user?.close_time && prevCloseTime) {
      const closeTime = new Date(other.user.close_time);
      setValue("close_time_hours", closeTime.getHours());
      setValue(
        "close_time_minutes",
        closeTime.getMinutes().toString().padStart(2, "0")
      );
    }
    if (other?.user?.regular_holiday && prevRegularHoliday) {
      setValue("regular_holiday", other.user.regular_holiday);
    }
    if (other?.user?.establishment_date && prevEstablishmentYear) {
      const establishmentDate = new Date(other.user.establishment_date);
      setValue("establishment_year", establishmentDate.getFullYear());
      setValue("establishment_month", establishmentDate.getMonth() + 1);
      setValue("establishment_day", establishmentDate.getDate());
    }
    if (other?.user?.holiday_flg1) {
      setValue("holiday_flg1", parseInt(other.user.holiday_flg1));
    }
    if (other?.user?.holiday_flg2) {
      setValue("holiday_flg2", parseInt(other.user.holiday_flg2));
    }
    if (other?.user?.holiday_flg3) {
      setValue("holiday_flg3", parseInt(other.user.holiday_flg3));
    }
    if (other?.user?.holiday_flg4) {
      setValue("holiday_flg4", parseInt(other.user.holiday_flg4));
    }
    if (other?.user?.holiday_flg5) {
      setValue("holiday_flg5", parseInt(other.user.holiday_flg5));
    }
    if (other?.user?.holiday_flg6) {
      setValue("holiday_flg6", parseInt(other.user.holiday_flg6));
    }
    if (other?.user?.holiday_flg7) {
      setValue("holiday_flg7", parseInt(other.user.holiday_flg7));
    }
    if (other?.user?.corporate_url && prevCorporateUrl) {
      setValue("corporate_url", other.user.corporate_url);
    }
    if (other?.user?.employees_number && prevEmployeesNumber) {
      setValue("employees_number", other.user.employees_number);
    }
    if (other?.user?.main_customer && prevMainCustomer) {
      setValue("main_customer", other.user.main_customer);
    }
    if (other?.user?.transaction_bank && PrevTransactionBank) {
      setValue("transaction_bank", other.user.transaction_bank);
    }
    if (other?.user?.corporate_bank_name && prevCorporateBankName) {
      setValue("corporate_bank_name", other.user.corporate_bank_name);
    }
    if (other?.user?.corporate_branch_name && prevCorporateBranchName) {
      setValue("corporate_branch_name", other.user.corporate_branch_name);
    }
    if (other?.user?.corporate_deposit_type && prevCorporateDepositType) {
      setDepositType(parseInt(other.user.corporate_deposit_type));
    }
    if (other?.user?.corporate_account_number && prevCorporateAccountNumber) {
      setValue("corporate_account_number", other.user.corporate_account_number);
    }
    if (other?.user?.corporate_account_holder && prevCorporateAccountHolder) {
      setValue("corporate_account_holder", other.user.corporate_account_holder);
    }
  }, [
    other,
    prevName,
    prevKana,
    prevDelPosition,
    prevDelName01,
    prevDelName02,
    prevDelKana01,
    prevDelKana02,
    prevChargeName01,
    prevChargeName02,
    prevChargeKana01,
    prevChargeKana02,
    prevClassified01,
    prevClassified02,
    prevClassified03,
    prevClassified04,
    prevClassified05,
    prevZip01,
    prevZip02,
    prevPref,
    prevMun,
    prevAddr02,
    prevTel01,
    prevFax01,
    prevEmail,
    prevEmailMob,
    prevNotificationEmail1,
    prevNotificationEmail2,
    prevNotificationEmail3,
    prevNotificationEmail4,
    prevNotificationEmail5,
    prevBusinessId,
    prevCapital,
    prevBusinessContent,
    prevOpenTime,
    prevCloseTime,
    prevRegularHoliday,
    prevEstablishmentYear,
    prevCorporateUrl,
    prevEmployeesNumber,
    prevMainCustomer,
    PrevTransactionBank,
    prevCorporateBankName,
    prevCorporateBranchName,
    prevCorporateDepositType,
    prevCorporateAccountNumber,
    prevCorporateAccountHolder,
  ]);

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

  console.log(other);

  const onSubmit: SubmitHandler<MemberRegForm> = async (data) => {
    try {
      const newBusinessId = "T" + data.business_id.replace(/-/g, "");
      const newData = {
        ...data,
        zip01,
        zip02,
        pref,
        addr01: mun,
        corporate_deposit_type: depositType,
        business_id: newBusinessId,
      };

      const formData = new FormData();

      // Registering openTime and closeTime
      const openTimeObj = new Date();
      openTimeObj.setHours(
        data.open_time_hours ? data.open_time_hours : 0,
        data.open_time_minutes ? data.open_time_minutes : 0
      );

      const closeTimeObj = new Date();
      closeTimeObj.setHours(
        data.close_time_hours ? data.close_time_hours : 0,
        data.close_time_minutes ? data.close_time_minutes : 0
      );

      // Registering establishment_date
      const establishmentDate = createDate(
        data.establishment_year ? data.establishment_year : 0,
        data.establishment_month ? data.establishment_month : 0,
        data.establishment_day ? data.establishment_day : 0
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
              formData.append("open_time", openTimeObj.toISOString());
              break;
            case "close_time_hours":
              formData.append("close_time", closeTimeObj.toISOString());
              break;
            case "establishment_year":
              formData.append(
                "establishment_date",
                establishmentDate.toISOString()
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

      // Append deletion flags to formData
      formData.append("deleteProfilePic", prevProfilePic ? "0" : "1");
      formData.append("deleteImg1", prevImg1 ? "0" : "1");
      formData.append("deleteImg2", prevImg2 ? "0" : "1");
      formData.append("deleteImg3", prevImg3 ? "0" : "1");

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Append unspecified data
      formData.append("fax02", "");
      formData.append("fax03", "");
      formData.append("tele02", "");
      formData.append("tele03", "");

      // Dispatch the form data
      console.log("Dispatching form data");
      await dispatch(updateUserThunk(formData));

      console.log("Form data dispatched");

      // Log the formData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      console.log(newData);

      reset();
      setIsReset(true);
      setAuto(false);
      setZip01("");
      setZip02("");
      setPref("");
      setMun("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:max-w-6xl xs:mt-[24px] md:mt-[50px] mx-auto xs:px-4 sm:px-6 md:px-8">
          <div className="form md:max-w-[800px] mx-auto text-tertiary text-base">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-12 gap-y-3 gap-x-5">
                <h2 className="text-primary text-2xl font-bold xs:col-span-12 md:col-span-12 xs:mb-[35px] md:mb-[50px]">
                  会員情報
                </h2>
                <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
                  <div className="flex items-center xs:col-span-24 md:col-span-6">
                    <label className="flex items-center w-full">
                      企業名 <span className="text-fifth ml-auto xs:ml-16 md:ml-7">※</span>
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
                        onChange: () => setPrevName(false),
                      })}
                      name="name01"
                    />
                    {errors.name01 && (
                      <p className="text-fifth">{errors.name01.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
                  <div className="flex items-center xs:col-span-24 md:col-span-10">
                    <label className="flex items-center w-full">
                      会社名(フリガナ) <span className="text-fifth ml-2">※</span>
                    </label>
                  </div>
                  <div className="xs:col-span-24 md:col-span-14">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.kana01 ? "border-fifth" : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      placeholder="サンプルカブシキガイシャ"
                      {...register("kana01", {
                        required: "入力必須項目です",
                        onChange: () => setPrevKana(false),
                      })}
                      name="kana01"
                    />
                    {errors.kana01 && (
                      <p className="text-fifth">{errors.kana01.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-6">
                  <div className="flex items-center xs:col-span-24 md:col-span-6">
                    <label className="flex items-center w-full">
                      代表者役職 <span className="text-fifth ml-auto xs:ml-12 md:ml-2">※</span>
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
                        onChange: () => setPrevDelPosition(false),
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
                    <label className="flex items-center w-full">
                      代表者名 <span className="text-fifth ml-auto xs:ml-16 md:ml-4">※</span>
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
                          onChange: () => setPrevDelName01(false),
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
                          onChange: () => setPrevDelName02(false),
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
                          onChange: () => setPrevDelKana01(false),
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
                          onChange: () => setPrevDelKana02(false),
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
                    <label className="flex items-center w-full">
                      担当者名 <span className="text-fifth ml-auto xs:ml-16 md:ml-4">※</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-12 xs:gap-x-1 md:gap-x-2 xs:col-span-24 md:col-span-18">
                    <div className="col-span-6">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.charge_name01
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="山田"
                        {...register("charge_name01", {
                          required: "Charge Name is required",
                          onChange: () => setPrevChargeName01(false),
                        })}
                        name="charge_name01"
                      />
                    </div>
                    <div className="col-span-6">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.charge_name02
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="太郎"
                        {...register("charge_name02", {
                          required: "Charge Name is required",
                          onChange: () => setPrevChargeName02(false),
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
                          errors.charge_kana01
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="ヤマダ"
                        {...register("charge_kana01", {
                          required: "Charge Kana is required",
                          onChange: () => setPrevChargeKana01(false),
                        })}
                        name="charge_kana01"
                      />
                    </div>
                    <div className="col-span-6">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.charge_kana02
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="タロウ"
                        {...register("charge_kana02", {
                          required: "Charge Kana is required",
                          onChange: () => setPrevChargeKana02(false),
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
                      className={`bg-[#F8F8F8] ${
                        prevProfilePic
                          ? "rounded-[100%] xs:w-[120px] md:w-[150px]"
                          : ""
                      } ${
                        dropped
                          ? "rounded-[100%] xs:w-[120px] md:w-[150px] "
                          : "col-span-3"
                      } xs:h-[120px] md:h-[150px] cursor-pointer col-span-3 flex justify-center items-center border border-[#E6E6E6] relative`}
                    >
                      {prevProfilePic && other?.user?.profile_img ? (
                        <div className="w-full h-full cursor-default flex items-center justify-center">
                          <img
                            className="w-full h-full rounded-full"
                            src={other?.user?.profile_img}
                            alt="image1"
                          />
                        </div>
                      ) : (
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
                      )}
                      {prevProfilePic && other?.user?.profile_img && (
                        <svg
                          className="absolute top-0 right-0 mr-[2px] cursor-pointer"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => setPrevProfilePic(false)}
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
                <div className="grid grid-cols-24 xs:col-span-12 xs:gap-y-2 md:col-span-12">
                  <div className="flex items-center xs:col-span-24 md:col-span-3">
                    <label>会社画像</label>
                  </div>
                  <div className="grid grid-cols-12 gap-x-3 xs:col-span-24 md:col-span-21">
                    <div className="bg-[#F8F8F8] relative cursor-pointer col-span-4 flex justify-center items-center xs:h-[116px] md:h-[150px] border border-[#E6E6E6]">
                      {prevImg1 && other?.user?.img1 ? (
                        <div className="w-full h-full cursor-default flex items-center justify-center">
                          <img
                            className="w-full h-full"
                            src={other?.user?.img1}
                            alt="image1"
                          />
                        </div>
                      ) : (
                        <Dropzone
                          setValue={setValue}
                          id={1}
                          onFileSelect={(file) => handleFileSelect(file, 1)}
                          isReset={isReset}
                          {...register("img1")}
                        />
                      )}
                      {prevImg1 && other?.user?.img1 && (
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
                    <div className="bg-[#F8F8F8] cursor-pointer relative col-span-4 w-full flex justify-center items-center xs:h-[116px]150:h-[208px] border border-[#E6E6E6]">
                      {prevImg2 && other?.user?.img2 ? (
                        <div className="w-full h-full cursor-default flex items-center justify-center">
                          <img
                            className="w-full h-full"
                            src={other?.user?.img2}
                            alt="image1"
                          />
                        </div>
                      ) : (
                        <Dropzone
                          setValue={setValue}
                          id={2}
                          onFileSelect={(file) => handleFileSelect(file, 2)}
                          isReset={isReset}
                          {...register("img2")}
                        />
                      )}
                      {prevImg2 && other?.user?.img2 && (
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
                    <div className="bg-[#F8F8F8] cursor-pointer relative col-span-4 w-full flex justify-center items-center xs:h-[116px]150:h-[208px] border border-[#E6E6E6]">
                      {prevImg3 && other?.user?.img3 ? (
                        <div className="w-full h-full cursor-default flex items-center justify-center">
                          <img
                            className="w-full h-full"
                            src={other?.user?.img3}
                            alt="image1"
                          />
                        </div>
                      ) : (
                        <Dropzone
                          setValue={setValue}
                          id={3}
                          onFileSelect={(file) => handleFileSelect(file, 3)}
                          isReset={isReset}
                          {...register("img3")}
                        />
                      )}
                      {prevImg3 && other?.user?.img3 && (
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
                <div className="grid grid-cols-24 gap-x-3 gap-y-2 col-span-12">
                  <div className=" md:block xs:col-span-24 md:col-span-4">
                    <label>
                      加工内容 <span className="text-fifth ml-4">※</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8 md:col-span-6">
                    <div className="flex items-center xs:col-span-10 md:col-span-6">
                      <label>分類1</label>
                    </div>
                    <div className="flex items-center xs:col-span-14 md:col-span-10 lg:col-span-17">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.classified01
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="鋳造"
                        {...register("classified01", {
                          onChange: () => setPrevClassified01(false),
                        })}
                        name="classified01"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8 md:col-span-6">
                    <div className="flex items-center xs:col-span-10 md:col-span-6">
                      <label>分類2</label>
                    </div>
                    <div className="flex items-center xs:col-span-14 md:col-span-10 lg:col-span-17">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.classified02
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="鋳造"
                        {...register("classified02", {
                          onChange: () => setPrevClassified02(false),
                        })}
                        name="classified02"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8 md:col-span-6">
                    <div className="flex items-center xs:col-span-10 md:col-span-6">
                      <label>分類3</label>
                    </div>
                    <div className="flex items-center xs:col-span-14 md:col-span-10 lg:col-span-17">
                      <input
                        className={`h-[36px] w-full outline-none border ${
                          errors.classified03
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        type="text"
                        placeholder="鋳造"
                        {...register("classified03", {
                          onChange: () => setPrevClassified03(false),
                        })}
                        name="classified03"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-24 gap-x-3 xs:gap-y-2 col-span-24">
                    <div className="xs:hidden md:flex items-center xs:col-span-24 md:col-span-4"></div>
                    <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                      <div className="flex items-center xs:col-span-10 md:col-span-6">
                        <label>分類4</label>
                      </div>
                      <div className="flex items-center xs:col-span-14 md:col-span-10 lg:col-span-17">
                        <input
                          className={`h-[36px] w-full outline-none border ${
                            errors.classified04
                              ? "border-fifth"
                              : "border-[#E6E6E6]"
                          } placeholder-[#E6E6E6] px-1`}
                          type="text"
                          placeholder="鋳造"
                          {...register("classified04", {
                            onChange: () => setPrevClassified04(false),
                          })}
                          name="classified04"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-24 xs:gap-x-1 md:gap-x-2 xs:col-span-8  md:col-span-6">
                      <div className="flex items-center xs:col-span-10 md:col-span-6">
                        <label>分類5</label>
                      </div>
                      <div className="flex items-center xs:col-span-14 md:col-span-10 lg:col-span-17">
                        <input
                          className={`h-[36px] w-full outline-none border ${
                            errors.classified05
                              ? "border-fifth"
                              : "border-[#E6E6E6]"
                          } placeholder-[#E6E6E6] px-1`}
                          type="text"
                          placeholder="鋳造"
                          {...register("classified05", {
                            onChange: () => setPrevClassified05(false),
                          })}
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
                  <div className=" md:block xs:col-span-24 md:col-span-3">
                    <label>
                      郵便番号 <span className="text-fifth ml-4">※</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-12 gap-x-3 xs:gap-y-2 xs:col-span-24 md:col-span-21">
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
                            onChange: (e) => {
                              setPrevZip01(false);
                              setZip01(e.target.value);
                            },
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
                            onChange: (e) => {
                              setPrevZip02(false);
                              setZip02(e.target.value);
                            },
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
                      <p className=" col-span-12 text-fifth">
                        入力必須項目です
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-24 gap-y-2 col-span-12 xs:gap-y-3">
                  <div className="flex items-center xs:col-span-24 md:col-span-4">
                    <label>
                      所在地 <span className="text-fifth ml-8">※</span>
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
                            onChange: (e) => {
                              setPrevPref(false);
                              setPref(e.target.value);
                            },
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
                              errors.addr01
                                ? "border-fifth"
                                : "border-[#E6E6E6]"
                            } placeholder-[#E6E6E6] px-1`}
                            type="text"
                            name="addr01"
                            value={mun}
                            {...register("addr01", {
                              required: "Addr is required",
                              onChange: (e) => {
                                setPrevMun(false);
                                setMun(e.target.value);
                              },
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
                            onChange: () => setPrevAddr02(false),
                          })}
                        />
                      </div>
                      {(errors.pref || errors.addr01 || errors.addr02) && (
                        <p className="col-span-12 text-fifth">
                          入力必須項目です
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
                  <div className="flex items-center xs:col-span-24 md:col-span-3">
                    <label>
                      電話番号 <span className="text-fifth ml-4">※</span>
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
                          onChange: () => setPrevTel01(false),
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
                          {...register("fax01", {
                            onChange: () => setPrevFax01(false),
                          })}
                          name="fax01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
                  <div className="flex items-center xs:col-span-24 md:col-span-8">
                    <label>
                      管理者メールアドレス <span className="text-fifth ml-12">※</span>
                    </label>
                  </div>
                  <div className="flex flex-col xs:col-span-24 md:col-span-13">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.email ? "border-fifth" : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      {...register("email", {
                        required: "入力必須項目です",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "メールアドレスを入力してください",
                        },
                        onChange: () => setPrevEmail(false),
                      })}
                      name="email"
                    />
                    {errors.email && (
                      <p className="text-fifth">{errors.email.message}</p>
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
                        errors.email_mobile
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
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
                        onChange: () => setPrevEmailMob(false),
                      })}
                      name="email_mobile"
                    />
                    {errors.email_mobile && (
                      <p className="text-fifth">
                        {errors.email_mobile.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-24 col-span-12 xs:gap-y-2 md:gap-y-">
                  <div className="flex items-center xs:col-span-24 md:col-span-6">
                    <label>通知先メールアドレス１</label>
                  </div>
                  <div className="xs:col-span-24 md:col-span-15 xs:ml-0 md:ml-16">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.notification_email_1
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      {...register("notification_email_1", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "メールアドレスを入力してください",
                        },
                        onChange: () => setPrevNotificationEmail1(false),
                      })}
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
                  <div className="xs:col-span-24 md:col-span-15 xs:ml-0 md:ml-16">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.notification_email_2
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      {...register("notification_email_2", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "メールアドレスを入力してください",
                        },
                        onChange: () => setPrevNotificationEmail2(false),
                      })}
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
                  <div className="xs:col-span-24 md:col-span-15 xs:ml-0 md:ml-16">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.notification_email_3
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      {...register("notification_email_3", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "メールアドレスを入力してください",
                        },
                        onChange: () => setPrevNotificationEmail3(false),
                      })}
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
                  <div className="xs:col-span-24 md:col-span-15 xs:ml-0 md:ml-16">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.notification_email_4
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      {...register("notification_email_4", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "メールアドレスを入力してください",
                        },
                        onChange: () => setPrevNotificationEmail4(false),
                      })}
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
                  <div className="xs:col-span-24 md:col-span-15 xs:ml-0 md:ml-16">
                    <input
                      className={`h-[36px] w-full outline-none border ${
                        errors.notification_email_5
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      type="text"
                      {...register("notification_email_5", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "メールアドレスを入力してください",
                        },
                        onChange: () => setPrevNotificationEmail5(false),
                      })}
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
                        onChange: () => setPrevCapital(false),
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
                      {...register("business_content", {
                        onChange: () => setPrevBusinessContent(false),
                      })}
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
                            onChange: () => setPrevOpenTime(false),
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
                            onChange: () => setPrevOpenTime(false),
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
                            onChange: () => setPrevCloseTime(false),
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
                            onChange: () => setPrevCloseTime(false),
                          })}
                          className={`h-[36px] w-full outline-none border ${
                            errors.close_time_minutes
                              ? "border-fifth"
                              : "border-[#E6E6E6]"
                          } placeholder-[#E6E6E6] px-1`}
                          placeholder="分"
                        />
                      </div>
                      {(errors.close_time_hours ||
                        errors.close_time_minutes) && (
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
                      定休日 <span className="text-fifth ml-5">※</span>
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
                              defaultChecked={
                                other?.user[`holiday_flg${index + 1}`] !== "0"
                              }
                            />
                          </div>
                          <div className="flex items-center col-span-21">
                            <label>{day + "曜日"}</label>
                          </div>
                        </div>
                      )
                    )}
                    {(errors.holiday_flg1 ||
                      errors.holiday_flg2 ||
                      errors.holiday_flg3 ||
                      errors.holiday_flg4 ||
                      errors.holiday_flg5 ||
                      errors.holiday_flg6 ||
                      errors.holiday_flg7) && (
                      <p className="col-span-12 text-fifth">入力必須項目です</p>
                    )}
                  </div>
                  <div className="flex items-center xs:col-span-24 md:col-span-3"></div>
                  <div className="xs:col-span-24 md:col-span-21">
                    <input
                      type="text"
                      className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1"
                      placeholder="その他備考（例：GW、年末年始、夏季休暇 [〇月〇日～〇月〇日] ）"
                      {...register("regular_holiday", {
                        onChange: () => setPrevRegularHoliday(false),
                      })}
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
                            onChange: () => setPrevEstablishmentYear(false),
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
                            onChange: () => setPrevEstablishmentYear(false),
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
                            onChange: () => setPrevEstablishmentYear(false),
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
                        errors.corporate_url
                          ? "border-fifth"
                          : "border-[#E6E6E6]"
                      } placeholder-[#E6E6E6] px-1`}
                      {...register("corporate_url", {
                        validate: (value) =>
                          value === "" ||
                          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
                            value
                          ) ||
                          "URLを入力してください",
                        onChange: () => setPrevCorporateUrl(false),
                      })}
                      name="corporate_url"
                    />
                    {errors.corporate_url && (
                      <p className="text-fifth">
                        {errors.corporate_url.message}
                      </p>
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
                        className={`h-[36px] w-full outline-none border ${
                          errors.employees_number
                            ? "border-fifth"
                            : "border-[#E6E6E6]"
                        } placeholder-[#E6E6E6] px-1`}
                        {...register("employees_number", {
                          validate: (value) =>
                            value === "" ||
                            /^[0-9]+$/.test(value) ||
                            "半角数字で入力してください",
                          onChange: () => setPrevEmployeesNumber(false),
                        })}
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
                        onChange: () => setPrevBusinessId(false),
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
                      {...register("main_customer", {
                        onChange: () => setPrevMainCustomer(false),
                      })}
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
                      {...register("transaction_bank", {
                        onChange: () => setPrevTransactionBank(false),
                      })}
                      name="transaction_bank"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-24 md:gap-x-4 xs:gap-x-2 col-span-12 xs:gap-y-2 md:gap-y-0">
                  <div className="flex items-center xs:col-span-24 md:col-span-3">
                    <label>パスワード</label>
                  </div>
                  <div className="xs:col-span-24 md:col-span-8">
                    <div
                      onClick={() => navigate("/password-reset")}
                      className="bg-primary border-half border-primary h-[30px] w-full cursor-pointer flex justify-center items-center text-white"
                    >
                      パスワードを変更する
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-24 mt-3 md:mb-[120px] xs:mb-[50px] pl-[20px] pt-[16px] pr-[40px] pb-[40px] xs: gap-x-1 xs:gap-x-1 md:gap-x-2 xs:gap-y-2 lg:gap-x-8 gap-y-2 col-span-12 bg-light xs:h-[400px] md:h-[240px] w-full">
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
                        {...register("corporate_bank_name", {
                          onChange: () => setPrevCorporateBankName(false),
                        })}
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
                        {...register("corporate_branch_name", {
                          onChange: () => setPrevCorporateBranchName(false),
                        })}
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
                            value={depositType}
                            checked={
                              prevCorporateDepositType
                                ? other?.user.corporate_deposit_type === "0"
                                : depositType === 0
                            }
                            onClick={() => {
                              setPrevCorporateDepositType(false);
                              setDepositType(0);
                            }}
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
                            value={depositType}
                            checked={
                              prevCorporateDepositType
                                ? other?.user.corporate_deposit_type === "1"
                                : depositType === 1
                            }
                            onClick={() => {
                              setPrevCorporateDepositType(false);
                              setDepositType(1);
                            }}
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
                        {...register("corporate_account_number", {
                          onChange: () => setPrevCorporateAccountNumber(false),
                        })}
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
                        {...register("corporate_account_holder", {
                          onChange: () => setPrevCorporateAccountHolder(false),
                        })}
                        name="corporate_account_holder"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center h-[45px] col-span-12 text-white mb-[240px] ">
                  <button
                    type="submit"
                    className="h-full bg-fourth xs:w-full mx-[25%]"
                    disabled={isSubmitting}
                  >
                    この内容で登録する
                  </button>
                </div>
              </div>
              {appErr && <p>{appErr.message}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberEdit;
