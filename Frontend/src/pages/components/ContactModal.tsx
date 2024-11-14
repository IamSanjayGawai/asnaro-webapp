import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { ContactThunk } from "@/state/thunks/userThunks";
import { Inputs } from "./Contact";
import { selectUser } from "@/state/slices/userSlice";
import Spinner from "@/components/static/Spinner";
interface DataProps {
  showContactModal: boolean;
  setShowContactModal: (showModal: boolean) => void;
  contactForm: Inputs;
}

const ContactModal = ({
  showContactModal,
  setShowContactModal,
  contactForm,
}: DataProps) => {
  const dispatch = useAppDispatch();
  const [send, setSend] = useState(false);
  const { loading } = useAppSelector(selectUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSend(true);
    const formData = new FormData();
    formData.append("name", contactForm.FullName);
    formData.append("email", contactForm.Email);
    formData.append("company", contactForm.CompanyName);
    formData.append("phone", contactForm.TelephoneNumber);
    formData.append("subject", contactForm.Title);
    formData.append("message", contactForm.Message);
    formData.append("file", contactForm.ContactFile as Blob);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await dispatch(ContactThunk(formData));
  };

  return (
    <>
      {showContactModal ? (
        <form onSubmit={handleSubmit}>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
            bg-[#00000080]
            "
          >
            {!send ? (
              <div className="relative  xs:w-4/4 sm:w-3/4  md:w-3/4   my-6 mx-auto max-w-3xl">
                <div className="border-0  shadow-lg relative flex gap-5 flex-col  p-8 bg-white outline-none focus:outline-none ">
                  <div className="grid grid-cols-24   ">
                    <div className="col-span-24 lg:text-[18px] xs:text-[14px]  text-center mb-[43px] font-bold text-[#255BB3]">
                      内容確認
                    </div>
                    <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8  ">
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
                        氏名
                      </div>
                      <div className="lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
                        {contactForm.FullName}
                      </div>
                    </div>
                    <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
                        会社名
                      </div>
                      <div className="lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
                        {contactForm.CompanyName}
                      </div>
                    </div>
                    <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
                        Email
                      </div>
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-17 lg:col-span-18 flex flex-col justify-center xs:p-[16px]">
                        <div className="text-[#808080]">
                          {contactForm.Email}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
                        電話番号
                      </div>
                      <div className="lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
                        {contactForm.TelephoneNumber}
                      </div>
                    </div>
                    <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
                        タイトル
                      </div>
                      <div className="lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]">
                        {contactForm.Title}
                      </div>
                    </div>
                    <div className="col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ">
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white">
                        メッセージ
                      </div>
                      <div className="lg:text-[18px] xs:text-[14px]  xs:col-span-17 text-[#808080] lg:col-span-18 flex flex-wrap items-center break-all xs:p-[16px]">
                        {contactForm.Message}
                      </div>
                    </div>
                  </div>
                  <div className="mt-[50px] gap-4 flex justify-center items-center">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowContactModal(false)}
                        className="bg-[#808080] text-white xs:w-[150px] md:w-[200px] w-[200px] font-[700] py-2  lg:text-[18px] xs:text-[14px] "
                      >
                        戻る
                      </button>
                    </div>

                    <div className="flex justify-center ">
                      <button
                        type="submit"
                        className="bg-[#FFAA00] text-white xs:w-[150px] md:w-[200px] w-[200px] py-2  font-[700] lg:text-[18px] xs:text-[14px] "
                      >
                        {loading ? (
                          <div className="w-full justify-center items-center">
                            <Spinner className="h-full" contactSpinner={true} />
                          </div>
                        ) : (
                          "送信する"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white">
                <div className="px-[180px] pt-[85px] pb-[105px]">
                  <div className="lg:text-[18px] xs:text-[14px]  text-center mb-[43px] font-bold text-[#255BB3]">
                    お問い合わせありがとうございます
                  </div>
                  <p className="text-tertiary mb-[43px]">
                    お問い合わせ内容を送信しました。追って担当者よりご連絡いたしますので、いましばらくお待ちください。
                  </p>
                  <div className="flex justify-center ">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="bg-tertiary text-white w-[200px] py-2  font-[700] lg:text-[18px] xs:text-[14px] "
                    >
                      戻る
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      ) : null}
    </>
  );
};

export default ContactModal;
