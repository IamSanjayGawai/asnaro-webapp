import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PassResetSuccess: React.FC = () => {
  const router = useNavigate();
  const toastRef = React.useRef(true);
  const notification = () => {
    toast.success("Password Reset Successful!", {
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
    if (toastRef.current) {
      notification();
      toastRef.current = false;
    }
  }, []);

  const handleBack = () => {
    router("/login");
  };

  return (
    <>
      <div className="md:mx-auto md:w-[600px] bg-light my-[100px] xs:mx-4">
        <div className="h-full">
          <div className="md:w-[590px] md:mx-auto md:py-[50px] xs:py-[26px] xs:mx-4 text-base">
            <div className="w-full md:px-[70px] flex flex-col items-center">
              <div className="text-primary font-bold text-center xs:text-[20px] md:text-2xl ">
                パスワードの再設定が 完了しました
              </div>
              <div className="text-tertiary text-center text-base xs:mt-[28px] md:mt-[50px]">
                パスワードの再設定が完了しました。
                ログイン画面に戻り、再度ログインをお願いいたします。
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

export default PassResetSuccess;
