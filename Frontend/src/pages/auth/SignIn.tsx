import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { userLoginThunk } from "@/state/thunks/userThunks";
import { SignInFormData } from "@/types/types";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/components/static/Spinner";

interface SignInProps {
  setAuth: (auth: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, user, loginErr } = useAppSelector((state) => state.user);
  const localPathname = localStorage.getItem("pathName");
  // const parsedLocalPathname = localPathname ? JSON.parse(localPathname) : "";
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormData>();

  useEffect(() => {
    setAuth(true);
    return () => {
      setAuth(false);
      // Only remove pathName if the component is unmounting, not just re-rendering
      if (!window.location.pathname.includes("/login")) {
        console.log("Removing pathName");
        localStorage.removeItem("pathName");
      }
    };
  }, []);

  useEffect(() => {
    console.log("User effect triggered", user);
    if (user?.newUser?.isVerified && !user?.newUser.termsAccepted) {
      console.log("Redirecting to /terms");
      router("/terms");
    } else if (
      user?.newUser?.isVerified &&
      user?.newUser.termsAccepted &&
      !localPathname
    ) {
      console.log("Redirecting to /");
      router("/");
    } else if (
      user?.newUser?.isVerified &&
      user?.newUser.termsAccepted &&
      localPathname
    ) {
      console.log("Redirecting to localPathname", localPathname);
      router(localPathname);
    }
  }, [user, router]);

  const [, setUserInfo] = useState<FormData | null>(null);
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      setUserInfo(null);
      setShow(false);
      await dispatch(userLoginThunk(data));
      reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  console.log(user, loading);
  return (
    <>
      <div className="md:mx-auto md:w-[600px] md:h-[520px] bg-light mt-[50px] mb-[100px] xs:mx-4 xs:h-[375px]">
        <div className="h-full">
          <div className="md:w-[390px] md:mx-auto md:py-[50px] xs:py-[20px] xs:mx-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="text-primary font-bold text-center text-[20px] ">
                ログイン画面
              </div>
              <div className="mt-[20px]">
                {loginErr && (
                  <p className="text-red-600 text-center">
                    {loginErr?.message}
                  </p>
                )}
              </div>
              <div className="md:mt-[50px] xs:mt-[24px]">
                <label className="text-base text-tertiary">
                  メールアドレス
                </label>
              </div>
              <div className="mt-[10px]">
                <input
                  className="md:h-[45px] p-2 xs:h-[39px] w-full outline-none border border-secondary placeholder-secondary"
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
                  className="md:h-[45px] p-2 xs:h-[39px] w-full outline-none border border-secondary placeholder-secondary "
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div className="flex-item md:mt-[24px] xs:mt-[8px]">
                <input
                  type="checkbox"
                  className="form-checkbox rounded-sm"
                  value={1}
                  onClick={() => setRemember(!remember)}
                  name="h"
                />
                <span className="ml-2 text-tertiary md:text-base">
                  メールアドレスを記憶する{" "}
                </span>
              </div>
              <button
                className="w-full btn h-[50px] flex place-items-center justify-center	bg-primary text-white xs:mt-[32px] md:mt-[29px] font-bold"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <Spinner /> : "ログイン"}
              </button>
              <div className="flex flex-row xs:mt-[16px] md:mt-[32px] font-medium	">
                <button
                  type="button"
                  onClick={() => navigate("/member-register")}
                  className="basis-4/12 text-[#4D94FF] text-base text-left  underline"
                >
                  新規会員登録
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/password-reset");
                  }}
                  className="basis-8/12 text-[#4D94FF] text-base text-right underline"
                >
                  パスワードを忘れた方はこちら
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
