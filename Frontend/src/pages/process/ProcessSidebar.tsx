import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProcessSidebar = () => {
  const location = useLocation();
  const router = useNavigate();
  const { pathname } = location;

  const handleNavigate = (item: string) => {
    if (item === "売上・受注件数") {
      router("/dashboard/my-page");
    } else if (item === "受注一覧") {
      router("/dashboard/order-list");
    } else if (item === "発注一覧") {
      router("/dashboard/purchase-list");
    } else if (item === "工程一覧") {
      router("/dashboard/process-list");
    } else if (item === "会員情報") {
      router("/dashboard/edit-member");
    }
  };

  return (
    <div className="flex pt-[33px] w-full max-w-[1200px] mx-auto mb-40">
      <div className="xs:hidden md:block md:max-w-[200px] lg:max-w-[260px] w-full text-tertiary">
        <p className="md:pl-[76px] font-bold mb-[18px] text-[24px]">
          マイページ
        </p>
        {["売上・受注件数", "受注一覧", "発注一覧", "工程一覧", "会員情報"].map(
          (item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <div
                className={`h-[50px] w-full flex justify-center items-center text-[18px] ${
                  index === 0 ? "border-y" : "border-b"
                } ${
                  item === "売上・受注件数" && pathname.includes("my-page")
                    ? "bg-light"
                    : ""
                } ${
                  item === "受注一覧" && pathname.includes("order-list")
                    ? "bg-light"
                    : ""
                } ${
                  item === "発注一覧" && pathname.includes("purchase-list")
                    ? "bg-light"
                    : ""
                } ${
                  item === "工程一覧" && pathname.includes("process-list")
                    ? "bg-light"
                    : ""
                }
                ${
                  item === "会員情報" && pathname.includes("edit-member")
                    ? "bg-light"
                    : ""
                }
                 border-secondary relative cursor-pointer hover:bg-light`}
                onClick={() => handleNavigate(item)}
              >
                <p>{item}</p>
                <svg
                  className="absolute right-0 mr-[9px] cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                >
                  <g clip-path="url(#clip0_951_2656)">
                    <path
                      d="M0.256762 11.4192C0.0961559 11.2531 0.0113074 11.0607 0.00524682 10.8363C-0.000813785 10.6119 0.0840346 10.4196 0.256762 10.2534L4.84767 5.83799L0.256762 1.42256C0.0961559 1.26518 0.0113074 1.07282 -0.000813785 0.84549C-0.012935 0.618161 0.0719134 0.419976 0.24161 0.256766C0.405247 0.0906404 0.605246 0.00612051 0.84767 0.000291556C1.09009 -0.0055374 1.29312 0.076068 1.45373 0.242193L6.78706 5.3571C6.85676 5.42414 6.9113 5.49991 6.94767 5.58443C6.98403 5.66895 7.00221 5.75347 7.00221 5.84091C7.00221 5.92834 6.98403 6.01286 6.94767 6.09738C6.9113 6.1819 6.85979 6.25476 6.78706 6.32471L1.46888 11.4338C1.30828 11.5883 1.10828 11.6669 0.868883 11.6669C0.629489 11.6669 0.426459 11.5853 0.253731 11.4192H0.256762Z"
                      fill="#808080"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_951_2656">
                      <rect width="7" height="11.6667" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          )
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default ProcessSidebar;
