import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "@/state/hooks";
import { selectUser } from "@/state/slices/userSlice";
import "react-toastify/dist/ReactToastify.css";

const EmailSent: React.FC = () => {
  const { user, appErr } = useAppSelector(selectUser);
  const router = useNavigate();
  const toastRef = React.useRef(true);
  const notification = () => {
    toast.success("Email Sent Successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  React.useEffect(() => {
    if (appErr?.message.includes("User already exists")) {
      router("/member-register");
    }
  }, [user, appErr, router]);

  React.useEffect(() => {
    if (toastRef.current) {
      notification();
      toastRef.current = false;
    }
  }, []);

  const handleBack = () => {
    router(-1);
  };

  return (
    <>
      <div className="md:mx-auto md:w-[600px] bg-light my-[100px] xs:mx-4">
        <div className="h-full">
          <div className="md:w-[590px] md:mx-auto md:py-[50px] xs:py-[26px] xs:mx-4 text-base">
            <div className="w-full md:px-[70px] flex flex-col items-center">
              <div className="text-primary font-bold text-center xs:text-[20px] md:text-2xl ">
                メールを送信しました
              </div>
              <div className="text-tertiary text-center text-base xs:mt-[28px] md:mt-[50px]">
                ご登録いただいたメールアドレス宛てに登録メールを送信いたしました。
                メールに記載のリンクをクリックしていただき、登録を完了してください。
              </div>
              <button
                className="xs:w-full btn p-2 flex items-center justify-center	bg-tertiary text-white xs:mt-[32px] md:mt-[47px] h-[45px] font-bold xs:rounded md:rounded-md"
                onClick={handleBack}
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default EmailSent;
