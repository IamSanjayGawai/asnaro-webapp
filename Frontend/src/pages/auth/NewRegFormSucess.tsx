import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewRegFormSucess: React.FC = () => {
  const router = useNavigate();
  const toastRef = useRef(true);
  const hardcodedUrl = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const response = await axios.put(
          `${hardcodedUrl}/user/confirm-email?token=${token}`
        );
        console.log(response, ":: response url");
        if (toastRef.current) {
          toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          toastRef.current = false;
        }
      } catch (error) {
        if (toastRef.current) {
          toast.error("Email verification failed. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          toastRef.current = false; // Mark toast as shown
        }
      }
    };

    verifyEmail();
  }, []);

  const handleLogin = () => {
    router("/login");
  };

  return (
    <>
      <div className="md:mx-auto md:w-[600px] bg-light my-[100px] xs:mx-4">
        <div className="h-full">
          <div className="md:w-[590px] md:mx-auto md:py-[50px] xs:py-[26px] xs:mx-4 text-base">
            <div className="w-full md:px-[70px] flex flex-col items-center">
              <div className="text-primary font-bold text-center xs:text-[20px] md:text-2xl ">
                会員登録が完了しました
              </div>
              <div className="text-tertiary text-center text-base xs:mt-[28px] md:mt-[50px]">
                会員登録が完了しました。
                ログイン画面に戻り、再度ログインをお願いいたします。
              </div>
              <button
                className="xs:w-full btn p-2 flex items-center justify-center	bg-tertiary text-white xs:mt-[32px] md:mt-[47px] h-[45px] font-bold xs:rounded md:rounded-md"
                onClick={() => handleLogin()}
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

export default NewRegFormSucess;
