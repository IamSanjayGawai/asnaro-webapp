import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useNavigate } from "react-router-dom";
import { deleteUserThunk } from "../../state/thunks/userThunks";
import { selectUser } from "@/state/slices/userSlice";
import Asnaro_Logo_Footer from "../../assets/store_logo_sq-white1.png"


const Footer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleNavigate = (destination: string) => {
    scrollToTop();
    navigate(`/${destination}`);
  };
  return (
    <div className="xs:h-auto w-full bg-primary xs:px-4 sm:px-6 md:px-8 md:pt-[40px] xs:pt-[22px] md:pb-[34px] xs:pb-[55px]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-y-3">
        <div className="col-span-12 font-bold text-[24px] text-white">
          {/* ASNARO */}
          <img src={Asnaro_Logo_Footer} alt="Asnaro Logo" className="lg:w-[150px] lg:h-[35px] xs:w-[100px] xs:h-[30px]" />
        </div>
        <div className="md:flex xs:flex-none md:py-0 xs:py-2 items-center gap-5 col-span-12 text-white text-base">
          <div
            onClick={() => navigate("/contact")}
            className="underline cursor-pointer xs:mb-3 xs:mt-[24px] md:mt-[0px] "
          >
            お問い合わせ
          </div>
          <div
            onClick={() => handleNavigate("about")}
            className="underline cursor-pointer xs:mb-3"
          >
            運営会社
          </div>
          <div
            onClick={() => handleNavigate("service")}
            className="underline cursor-pointer xs:mb-3"
          >
            利用規約
          </div>
          <div
            onClick={() => handleNavigate("notation")}
            className="underline cursor-pointer xs:mb-3"
          >
            特定商取引法に基づく表記
          </div>
          <div
            onClick={() => handleNavigate("privacy-policy")}
            className="underline cursor-pointer xs:mb-3"
          >
            個人情報保護方針
          </div>
          {user?.newUser && (
            <div
              onClick={() => dispatch(deleteUserThunk({}))}
              className="underline cursor-pointer xs:mb-3"
            >
              Delete User
            </div>
          )}
        </div>
        <div className="col-span-12 flex items-center justify-center text-white xs:mt-[40px] xs:text-[12px] md:text-base">
          © Marubishi Manufacturing Co.
        </div>
      </div>
    </div>
  );
};

export default Footer;
