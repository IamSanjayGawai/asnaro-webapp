import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaAngleRight } from "react-icons/fa6";
import { useLocation, Link, useNavigate } from "react-router-dom";
// import { LuLogOut } from "react-icons/lu";
// import { useAppDispatch, useAppSelector } from "@/state/hooks";
// import { userLogOutThunk } from "@/state/thunks/userThunks";
// import { selectUser } from "@/state/slices/userSlice";
// import Asnaro_Logo from "../../assets/store_logo_sq.png";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  //   const dispatch = useAppDispatch();
  //   const { user } = useAppSelector(selectUser);
  const location = useLocation();

  //   const handleLogOut = async () => {
  //     await dispatch(userLogOutThunk({}));
  //   };

  return (
    <>
      <Sheet key="left">
        <SheetTrigger asChild>
          <svg
            width="21"
            height="16"
            viewBox="0 0 21 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H20M1 8H10.5M1 15H20"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <div onClick={() => navigate("/")} className="mr-auto pl-1">
              <p className="xs:text-[8px] lg:text-[12px] text-left text-primary w-full">
                ASNARO 管理者画面
              </p>
              {/* <p className="text-primary font-bold xs:text-[24px] text-left lg:text-[32px]">
                ASNARO
                <img
                  src={Asnaro_Logo}
                  alt="Asnaro Logo"
                  className="lg:w-[150px] lg:h-[25px] xs:w-[100px] xs:h-[20px] mt-1"
                />
              </p> */}
            </div>
          </SheetHeader>
          <SheetDescription>
            <div className="grid grid-cols-1">
              {[
                "パートナー管理",
                "企業情報一覧",
                "受発注管理",
                "工程一覧",
                "お知らせ管理",
                "マスター管理",
                "お問い合わせ管理",
                "外部連携管理",
              ].map((item, index) => (
                <SheetClose asChild>
                  <Link
                    key={index}
                    to={
                      item === "パートナー管理"
                        ? "/admin/dashboard/partner-management"
                        : item === "企業情報一覧"
                        ? "/admin/dashboard/company-information"
                        : item === "受発注管理"
                        ? "/admin/dashboard/order-management"
                        : item === "工程一覧"
                        ? "/admin/dashboard/process-management"
                        : item === "お知らせ管理"
                        ? "/admin/dashboard/notification-management"
                        : item === "マスター管理"
                        ? "/admin/dashboard/master-management"
                        : item === "お問い合わせ管理"
                        ? "/admin/dashboard/inquiry-management"
                        : "/admin/dashboard/external-collaboration-management"
                    }
                    className={`flex justify-between items-center mt-5 p-2
                  ${
                    (location.pathname ===
                      `/admin/dashboard/partner-management` &&
                      item === "パートナー管理") ||
                    (location.pathname ===
                      `/admin/dashboard/company-information` &&
                      item === "企業情報一覧") ||
                    (location.pathname ===
                      `/admin/dashboard/order-management` &&
                      item === "受発注管理") ||
                    (location.pathname ===
                      `/admin/dashboard/process-management` &&
                      item === "工程一覧") ||
                    (location.pathname ===
                      `/admin/dashboard/notification-management` &&
                      item === "お知らせ管理") ||
                    (location.pathname ===
                      `/admin/dashboard/master-management` &&
                      item === "マスター管理") ||
                    (location.pathname ===
                      `/admin/dashboard/inquiry-management` &&
                      item === "お問い合わせ管理") ||
                    (location.pathname ===
                      `/admin/dashboard/external-collaboration-management` &&
                      item === "外部連携管理")
                      ? "bg-primary text-white"
                      : "text-[#4E4D4D] text-[18px]"
                  }
                   `}
                  >
                    <h3 className="text-lg font-medium">{item}</h3>
                    <FaAngleRight />
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetDescription>
          {/* {user?.newUser?.isVerified && (
            <SheetClose asChild>
              <div
                onClick={() => handleLogOut()}
                className=" text-primary flex justify-between items-center mt-5 p-2  cursor-pointer"
              >
                <span className="text-lg font-medium">ログアウト</span>
                <LuLogOut className="text-primary" />
              </div>
            </SheetClose>
          )} */}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DashboardSidebar;
