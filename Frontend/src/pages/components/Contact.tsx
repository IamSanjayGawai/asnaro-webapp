import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ContactModal from "./ContactModal";
import { useNavigate } from "react-router-dom";

export type Inputs = {
  FullName: string;
  CompanyName: string;
  Email: string;
  TelephoneNumber: string;
  Title: string;
  Message: string;
  ContactFile: File | null;
};

const Contact = () => {
  const [data, setData] = useState<Inputs>({
    FullName: "",
    CompanyName: "",
    Email: "",
    TelephoneNumber: "",
    Title: "",
    Message: "",
    ContactFile: null,
  });
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();
  const [show, setShow] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const router = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);



  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newData = { ...data, ContactFile: file };
    setData(newData);
    console.log(newData);
    setShow(true);
    reset();
  };

  const handleNavigate = () => {
    router("/");
  };

  return (
    <>
      <div className="flex justify-center flex-col  items-center border-b border-secondary">
        <div className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6 mb-[8em]">
          <h1 className="text-2xl  text-[#255BB3] font-bold  text-center my-[2em]">
            お問い合わせ
          </h1>
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:w-[80%] w-full mx-auto flex flex-col gap-4 ">
              <div className="grid grid-cols-[130px,auto] items-center   sm:gap-x-6">
                <h1 className="lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]">氏名</h1>
                <input
                  {...register("FullName", {
                    required: true,
                    validate: (value) => value !== "null",
                  })}
                  className="border border-[#E6E6E6]  outline-none p-2 w-4/5"
                />

                {errors.FullName && (
                  <span className="text-red-500 col-start-2 row-start-2">
                    {errors.FullName.type !== "validate" && "回答必須項目です"}
                    {errors.FullName.type === "validate" &&
                      "Please provide a valid Name"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[130px,auto] items-center   sm:gap-x-6">
                <h1 className="lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]">会社名</h1>
                <input
                  {...register("CompanyName", {
                    required: true,
                    validate: (value) => value !== "null",
                  })}
                  type="text"
                  className="border border-[#E6E6E6]  outline-none p-2 w-4/5"
                />

                {errors.CompanyName && (
                  <span className="text-red-500 col-start-2 row-start-2">
                    {errors.CompanyName.type !== "validate" &&
                      "回答必須項目です"}
                    {errors.CompanyName.type === "validate" &&
                      "Please provide a valid CompanyName"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[130px,auto] items-center   sm:gap-x-6">
                <h1 className="lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]">
                  メールアドレス
                </h1>
                <input
                  {...register("Email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    validate: (value) => value !== "null",
                  })}
                  type="email"
                  className="border border-[#E6E6E6]  outline-none p-2 w-4/5"
                />

                {errors.Email && (
                  <span className="text-red-500 col-start-2 row-start-2">
                    {errors.Email.type !== "validate" && "回答必須項目です"}
                    {errors.Email.type === "validate" &&
                      "Please provide a valid Email"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[130px,auto] items-center   sm:gap-x-6">
                <h1 className="lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]">電話番号</h1>
                <input
                  {...register("TelephoneNumber", {
                    required: true,
                    validate: (value) =>
                      (/^[0-9]+$/.test(value) && value !== "null") ||
                      "Only numeric values are allowed",
                  })}
                  type="text"
                  className="border border-[#E6E6E6]  outline-none p-2 w-4/5"
                />

                {errors.TelephoneNumber && (
                  <span className="text-red-500 col-start-2 row-start-2">
                    {errors.TelephoneNumber.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[130px,auto] items-center   sm:gap-x-6">
                <h1 className="lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]">件名</h1>
                <input
                  {...register("Title", {
                    required: true,
                    validate: (value) => value !== "null",
                  })}
                  type="text"
                  className="border border-[#E6E6E6]  outline-none p-2 w-4/5"
                />

                {errors.Title && (
                  <span className="text-red-500 col-start-2 row-start-2">
                    {errors.Title.type !== "validate" && "回答必須項目です"}
                    {errors.Title.type === "validate" &&
                      "Please provide a valid Title"}
                  </span>
                )}
              </div>

              <div className="grid lg:grid-cols-[130px,auto] xs:grid-cols-[100px,auto] items-center sm:gap-x-6">
                <h1
                  className={`${
                    fileName ? "lg:mb-0 xs:mb-5" : "mb-0"
                  } lg:text-[18px] xs:text-[14px] font-[500] text-[#808080] `}
                >
                  添付ファイル
                </h1>
                <div className="flex lg:gap-4 xs:gap-1 xs:flex-col lg:flex-row items-center">
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer border lg:text-[18px] xs:text-[14px] font-[500] text-[#808080] p-2"
                  >
                    ファイルを選択する
                    {/* <input
                      {...register("ContactFile", {
                        required: true,
                        validate: (value) => value !== null,
                      })}
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          setFile(e.target.files[0]);
                          setFileName(e.target.files[0].name);
                        }
                      }}
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
                    /> */}
                      <input
  {...register("ContactFile", {
    required: true,
    validate: (value) => value !== null,
  })}
  onChange={(e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 6 * 1024 * 1024) {
        alert("ファイルサイズが6MBの制限を超えています");
        return;
      }
      setFile(selectedFile);
          setFileName(selectedFile.name);
        }
      }}
  type="file"
  id="fileInput"
  className="hidden"
  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
/>
                  </label>
                  {fileName && (
                    <span className={`  text-xs font-[500] text-[#808080]`}>
                      {fileName}
                    </span>
                  )}
                </div>

                {errors.ContactFile && (
                  <span className="lg:ml-0 xs:ml-5 text-red-500 col-start-2 row-start-2">
                    {errors.ContactFile.type !== "validate" &&
                      "回答必須項目です"}
                    {errors.ContactFile.type === "validate" &&
                      "有効なファイルを指定してください"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-[130px,auto] items-start  sm:gap-6">
                <h1 className="lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]">
                  メッセージ
                </h1>
                <textarea
                  {...register("Message", { required: false })}
                  className="border border-[#E6E6E6]  outline-none p-2 w-4/5  resize-none h-[360px] "
                />
                {/* {errors.Message && (
                  <span className="text-red-500 col-start-2 row-start-2">
                    {errors.Message.type !== "validate" &&
                      "This field is required"}
                    {errors.Message.type === "validate" &&
                      "Please provide a valid Message"}
                  </span>
                )} */}
              </div>

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  onClick={() => setShow(true)}
                  className="bg-[#FFAA00] text-white px-[6em] py-2 w-[348px]  font-[700] lg:text-[18px] xs:text-[14px]"
                >
                  送信する
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleNavigate}
                  className="bg-[#808080] text-white px-[3.5em] font-[700] py-2 w-[348px]  lg:text-[18px] xs:text-[14px]"
                >
                  トップページに戻る
                </button>
              </div>
            </div>
          </form>

          {isSubmitSuccessful && ( // Conditionally render the ContactModal
            <ContactModal
              showContactModal={show}
              setShowContactModal={setShow}
              contactForm={data}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
