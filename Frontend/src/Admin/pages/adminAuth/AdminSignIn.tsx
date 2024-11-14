import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignInFormData } from "@/types/types";
import Spinner from "@/components/static/Spinner";
import { adminLoginThunk } from "@/state/thunks/adminThunks";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignInProps {
  setAuth: (auth: boolean) => void;
}

const AdminSignIn: React.FC<SignInProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const { login, loginErr } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const router = useNavigate();


const [show, ] = useState(false);
const notification = () => {
  toast.error(`${loginErr.message}`, {
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


useEffect(() => {
  // Add null checks for loginErr and admin.newUser.isVerified
  if (
    loginErr &&
    (loginErr.message?.includes("No customer exists") ||
      loginErr.message === "Please verify your email first" ||
      loginErr.message === "Incorrect password" ||
      loginErr.message === "no user found")
  ) {
    notification();


  }
}, [login, loginErr, router]);
const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
  try {
    const response = await dispatch(adminLoginThunk(data)); // Wait for the login attempt to complete
    if (response.payload) {
      router("/admin/dashboard");
    } else {
      router("/admin/login");
    }
    reset();
  } catch (error) {
    console.log(error);
    console.log("error from admin login");
  }
};

  

  return (
    <>
      <div className="md:mx-auto md:w-[600px] md:h-[520px] bg-light mt-[150px] mb-[100px] xs:mx-4 xs:h-[375px] ">
        <div className="h-full">
          <div className="md:w-[390px] md:mx-auto md:py-[50px] xs:py-[20px] xs:mx-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="text-[#808080]] font-bold text-center text-[20px] ">
                管理者ログイン
              </div>
              <div className="md:mt-[50px] xs:mt-[24px]">
                <label className="text-base text-tertiary">
                  メールアドレス
                </label>
              </div>
              <div className="mt-[10px]">
                <input
                  className="md:h-[45px] xs:h-[39px] w-full outline-none border border-secondary placeholder-secondary px-4"
                  type="email"
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
              <div className="md:mt-[11px] xs:mt-[14px]">
                <label className="text-base text-tertiary">パスワード</label>
              </div>
              <div className="mt-[10px]">
                <input
                  className="md:h-[45px] xs:h-[39px] w-full outline-none border border-secondary placeholder-secondary px-4"
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              <button
                className="w-full btn h-[50px] flex place-items-center justify-center	bg-[#808080] text-white xs:mt-[32px] md:mt-[29px] font-bold"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <Spinner /> : "ログイン"}
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

export default AdminSignIn;
