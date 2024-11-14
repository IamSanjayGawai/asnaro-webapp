import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectUser } from "@/state/slices/userSlice";
import { PasswordResetThunk } from "@/state/thunks/userThunks"; // Adjust import path as necessary
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/static/Spinner";

interface FormData {
  email: string;
}

const PassReset: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { appErr, loading } = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(
        PasswordResetThunk({ email: data.email })
      );

      console.log("Response:", response); // Debugging log

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Password Reset Email Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/reset-email");
      } else {
        toast.error("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Error:", error); // Error log
      toast.error("An unexpected error occurred.");
    } finally {
      reset();
    }
  };

  return (
    <>
      <div className="md:mx-auto md:w-[600px] bg-light my-[100px] xs:mx-4">
        <div className="h-full">
          <div className="md:w-[590px] md:mx-auto md:py-[50px] xs:py-[26px] xs:mx-4 text-base">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:px-[70px] flex flex-col items-center"
            >
              <div className="text-primary font-bold text-center xs:text-[20px] md:text-2xl ">
                パスワード再設定
              </div>
              {appErr?.message === "No user found" && (
                <p className="text-red-500">{appErr.message}</p>
              )}
              <div className="text-tertiary text-base xs:mt-[28px] md:mt-[50px]">
                ご登録のメールアドレスを入力してください。パスワード再設定のご案内をお送りいたします。
              </div>
              <div className="w-full email flex flex-col place-items-start justify-center xs:mt-[25px] md:mt-[50px]">
                <label className="text-tertiary font-[500]">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full h-[45px] p-2 border border-secondary"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="xs:w-full btn p-2 flex items-center justify-center	bg-primary text-white xs:mt-[32px] md:mt-[45px] h-[45px] font-bold xs:rounded md:rounded-md"
                disabled={loading}
              >
                {loading ? <Spinner /> : "送信する"}
              </button>
            </form>
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

export default PassReset;
