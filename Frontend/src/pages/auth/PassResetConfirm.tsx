import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../state/hooks";
import { resetPasswordConfirmThunk } from "@/state/thunks/userThunks"; // Adjust import path as necessary
import Spinner from "@/components/static/Spinner";

interface FormData {
  password: string;
  passwordConfirm: string;
}

const PassResetConfirm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const resetToken = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();

  useEffect(() => {
    if (!resetToken) {
      toast.error("Password reset token is invalid or has expired.");
      navigate("/password-reset");
    }
  }, [resetToken, navigate]);

  // const password = watch('password');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    console.log(data.password, "111111111111");
    console.log(resetToken, "111111111111");
    // Dispatch the password reset confirmation thunk with the resetToken and new password
    if (resetToken) {
      const response = await dispatch(
        resetPasswordConfirmThunk({
          resetToken,
          newPassword: data.password,
        })
      );

      if (resetPasswordConfirmThunk.fulfilled.match(response)) {
        toast.success("Your password has been reset successfully.");
        navigate("/reset-success");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="md:mx-auto md:w-[600px] bg-light my-[100px] xs:mx-4">
        <div className="h-full">
          <div className="md:w-[590px] md:mx-auto md:py-[50px] xs:py-[26px] xs:mx-4 text-base">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:px-[70px]"
            >
              <div className="text-primary font-bold text-center xs:text-[20px] md:text-2xl ">
                パスワード再設定
              </div>
              <div className="text-tertiary text-left text-base xs:mt-[28px] md:mt-[50px] mb-[25px]">
                再設定後のパスワードを入力してください。
              </div>
              <div className="w-full password flex flex-col place-items-start justify-center xs:mt-[2px] xs:mb-[7px] md:mt-1 md:mb-[10px]">
                <label className="text-tertiary font-[500]">パスワード</label>
                <input
                  type="password"
                  className="w-full h-[45px] p-2 border border-secondary"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div className="w-full cpassword flex flex-col place-items-start justify-center xs:mb-[15px] md:mb-[30px]">
                <label className="text-tertiary font-[500]">
                  パスワード(再入力)
                </label>
                <input
                  type="password"
                  className="w-full h-[45px] p-2 border border-secondary"
                  {...register("passwordConfirm", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.passwordConfirm && (
                  <p className="text-red-600">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
              <button
                className="w-full btn p-2flex place-items-center justify-center	bg-primary text-white h-[45px] font-bold xs:rounded md:rounded-md"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner className="h-full" />
                ) : (
                  "パスワードを再設定する"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassResetConfirm;
