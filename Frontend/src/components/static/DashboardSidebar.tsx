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
import { LuLogOut } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { userLogOutThunk } from "@/state/thunks/userThunks";
import { selectUser } from "@/state/slices/userSlice";
import Asnaro_Logo from "../../assets/store_logo_sq.png"

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const location = useLocation();

  const handleLogOut = async () => {
    await dispatch(userLogOutThunk({}));
  };

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
              stroke="#232D42"
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
                工場の「困った」イマを解決する
              </p>
              <p className="text-primary font-bold xs:text-[24px] text-left lg:text-[32px]">
              {/* ASNARO */}
              <img src={Asnaro_Logo} alt="Asnaro Logo" className="lg:w-[150px] lg:h-[25px] xs:w-[100px] xs:h-[20px] mt-1" />
              </p>
            </div>
          </SheetHeader>
          <SheetDescription>
            <div className="grid grid-cols-1">
              {[
                "売上・受注件数",
                "受注一覧",
                "発注一覧",
                "工程一覧",
                "会員情報",
              ].map((item, index) => (
                <SheetClose asChild>
                  <Link
                    key={index}
                    to={
                      item === "売上・受注件数"
                        ? "/dashboard/my-page"
                        : item === "受注一覧"
                        ? "/dashboard/order-list"
                        : item === "発注一覧"
                        ? "/dashboard/purchase-list"
                        : item === "工程一覧"
                        ? "/dashboard/process-list"
                        : "/dashboard/edit-member"
                    }
                    className={`flex justify-between items-center mt-5 p-2
                  ${
                    (location.pathname === `/dashboard/my-page` &&
                      item === "売上・受注件数") ||
                    (location.pathname === `/dashboard/order-list` &&
                      item === "受注一覧") ||
                    (location.pathname === `/dashboard/purchase-list` &&
                      item === "発注一覧") ||
                    (location.pathname === `/dashboard/process-list` &&
                      item === "工程一覧") ||
                    (location.pathname === `/dashboard/edit-member` &&
                      item === "会員情報")
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
          {user?.newUser?.isVerified && (
            <SheetClose asChild>
              <div
                onClick={() => handleLogOut()}
                className=" text-primary flex justify-between items-center mt-5 p-2  cursor-pointer"
              >
                <span className="text-lg font-medium">ログアウト</span>
                <LuLogOut className="text-primary" />
              </div>
            </SheetClose>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DashboardSidebar;
