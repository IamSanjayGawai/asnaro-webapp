import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const router = useNavigate();
  const { pathname } = location;

  const handleNavigate = (item: string) => {
    if (item === "パートナー管理") {
      router("/admin/dashboard/partner-management");
    } else if (item === "企業情報一覧") {
      router("/admin/dashboard/company-information");
    } else if (item === "受発注管理") {
      router("/admin/dashboard/order-management");
    } else if (item === "工程一覧") {
      router("/admin/dashboard/process-management");
    } else if (item === "お知らせ管理") {
      router("/admin/dashboard/notification-management");
    } else if (item === "マスター管理") {
      router("/admin/dashboard/master-management");
    } else if (item === "お問い合わせ管理") {
      router("/admin/dashboard/inquiry-management");
    } else if (item === "外部連携管理") {
      router("/admin/dashboard/external-collaboration-management");
    }
  
  };

  return (
    <div className="flex w-full mx-auto justify-start h-full">
      <div className="  bg-[#F8F8F8] h-screen sticky top-0">
        <div className="xs:hidden mt-[6rem] md:block md:max-w-[200px] lg:max-w-[260px]  text-tertiary h-auto ">
          <p
            className="font-bold mb-[18px] cursor-pointer ml-[3rem] "
            onClick={() => router("/admin/dashboard")}
          >
            TOP
          </p>
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
            <div
              key={index}
              className="flex flex-col justify-center items-center "
            >
              <div
                className={`h-[50px] md:w-[200px] lg:w-[200px]  pl-[3rem]  flex items-center ${
                  index === 0 ? "border-y" : "border-b "
                } ${
                  item === "パートナー管理" &&
                  pathname.includes("partner-management")
                    ? "bg-white"
                    : ""
                } ${
                  item === "企業情報一覧" &&
                  pathname.includes("company-information")
                    ? "bg-white"
                    : ""
                } ${
                  item === "受発注管理" && pathname.includes("order-management")
                    ? "bg-white"
                    : ""
                }
              
                 ${
                   item === "工程一覧" &&
                   pathname.includes("process-management")
                     ? "bg-white"
                     : ""
                 }
                ${
                  item === "お知らせ管理" &&
                  pathname.includes("notification-management")
                    ? "bg-white"
                    : ""
                }
                ${
                  item === "マスター管理" &&
                  pathname.includes("master-management")
                    ? "bg-white"
                    : ""
                }
              
                ${
                  item === "お問い合わせ管理" &&
                  pathname.includes("inquiry-management")
                    ? "bg-white"
                    : ""
                }
                  ${
                    item === "外部連携管理" &&
                    pathname.includes("external-collaboration-management")
                      ? "bg-white"
                      : ""
                  }
                  ${
                    item === " 通知ポスト" &&
                    pathname.includes("notification-post")
                      ? "bg-white"
                      : ""
                  }
                 

                 border-secondary relative cursor-pointer hover:bg-white`}
                onClick={() => handleNavigate(item)}
              >
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminSidebar;

// import { Outlet, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const AdminSidebar = () => {
//   const location = useLocation();
//   const router = useNavigate();
//   const { pathname } = location;

//   const handleNavigate = (item: string) => {
//     if (item === "パートナー管理") {
//       router("/admin/dashboard/partner-management");
//     } else if (item === "企業情報一覧") {
//       router("/admin/dashboard/company-information");
//     } else if (item === "受発注管理") {
//       router("/admin/dashboard/order-management");
//     } else if (item === "工程一覧") {
//       router("/admin/dashboard/process-management");
//     } else if (item === "お知らせ管理") {
//       router("/admin/dashboard/notification-management");
//     } else if (item === "マスター管理") {
//       router("/admin/dashboard/master-management");
//     } else if (item === "お問い合わせ管理") {
//       router("/admin/dashboard/inquiry-management");
//     } else if (item === "外部連携管理") {
//       router("/admin/dashboard/external-collaboration-management");
//     }
//   };

//   return (
//     <div className="flex w-full mx-auto justify-start h-full">
//       <div className="  bg-[#F8F8F8] md:fixed top-20 left-0 h-full w-[260px]">
//         <div className="xs:hidden mt-[6rem] md:block md:max-w-[200px] lg:max-w-[260px]  text-tertiary h-auto">
//           <p
//             className="font-bold mb-[18px] cursor-pointer ml-[3rem] "
//             onClick={() => router("/admin/dashboard")}
//           >
//             TOP
//           </p>
//           {[
//             "パートナー管理",
//             "企業情報一覧",
//             "受発注管理",
//             "工程一覧",
//             "お知らせ管理",
//             "マスター管理",
//             "お問い合わせ管理",
//             "外部連携管理",
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col justify-center items-center "
//             >
//               <div
//                 className={`h-[50px] md:w-[200px] lg:w-[200px]  pl-[3rem]  flex items-center ${
//                   index === 0 ? "border-y" : "border-b "
//                 } ${
//                   item === "パートナー管理" &&
//                   pathname.includes("partner-management")
//                     ? "bg-white"
//                     : ""
//                 } ${
//                   item === "企業情報一覧" &&
//                   pathname.includes("company-information")
//                     ? "bg-white"
//                     : ""
//                 } ${
//                   item === "受発注管理" && pathname.includes("order-management")
//                     ? "bg-white"
//                     : ""
//                 }

//                  ${
//                    item === "工程一覧" &&
//                    pathname.includes("process-management")
//                      ? "bg-white"
//                      : ""
//                  }
//                 ${
//                   item === "お知らせ管理" &&
//                   pathname.includes("notification-management")
//                     ? "bg-white"
//                     : ""
//                 }
//                 ${
//                   item === "マスター管理" &&
//                   pathname.includes("master-management")
//                     ? "bg-white"
//                     : ""
//                 }

//                 ${
//                   item === "お問い合わせ管理" &&
//                   pathname.includes("inquiry-management")
//                     ? "bg-white"
//                     : ""
//                 }
//                   ${
//                     item === "外部連携管理" &&
//                     pathname.includes("external-collaboration-management")
//                       ? "bg-white"
//                       : ""
//                   }
//                   ${
//                     item === " 通知ポスト" &&
//                     pathname.includes("notification-post")
//                       ? "bg-white"
//                       : ""
//                   }

//                  border-secondary relative cursor-pointer hover:bg-white`}
//                 onClick={() => handleNavigate(item)}
//               >
//                 <p>{item}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="md:ml-[260px]">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
