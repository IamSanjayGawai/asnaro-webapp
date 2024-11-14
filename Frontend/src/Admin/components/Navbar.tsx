import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { adminLogOutThunk } from "@/state/thunks/adminThunks";
import { useAppDispatch } from "@/state/hooks";
import MobileAdminSidebar from "./MobileAdminSidebar";
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(adminLogOutThunk({}));
    navigate("/admin/login");
  };

  return (
    <Disclosure as="nav" className="bg-[#808080] fixed top-0 w-full z-50">
      <>
        <div className="mx-auto max-w-8xl px-2 sm:px-6 ">
          <div className="relative flex h-16 items-center justify-between  text-white">
            <div className="md:hidden flex p-4 cursor-pointer">
              <MobileAdminSidebar />
            </div>
            <span className="text-[24px] mr-2">ASNARO</span> 管理者画面
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* empty div*/}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                onClick={handleLogout}
                className="relative p-1 flex justify-center items-center text-white hover:text-white focus:outline-none"
              >
                <svg
                  className="mr-2"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 18C1.1 18 0.75 17.85 0.45 17.55C0.15 17.25 0 16.9 0 16.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H8.775V1.5H1.5V16.5H8.775V18H1.5ZM13.65 13.375L12.575 12.3L15.125 9.75H6.375V8.25H15.075L12.525 5.7L13.6 4.625L18 9.025L13.65 13.375Z"
                    fill="white"
                  />
                </svg>
                ログアウト
              </button>

              {/* Profile dropdown */}
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    </Disclosure>
  );
}
