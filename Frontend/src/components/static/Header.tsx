import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { selectUser } from "../../state/slices/userSlice";
import { userLogOutThunk } from "@/state/thunks/userThunks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderMenu from "@/pages/components/HeaderMenu";
import NotificationBox from "./NotificationBox";
import { SearchAction } from "@/state/slices/processSlice";
import { getNotificationThunk } from "../../state/thunks/newsApiThunks";
import { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import DashboardSidebar from "./DashboardSidebar";
import Asnaro_Logo from "../../assets/store_logo_sq1.png";
import { selectNews, setNewNotification } from "@/state/slices/newsSlice";
import { socket } from "@/state/store";
import dayjs from "dayjs";
import { processSearchThunk } from "@/state/thunks/processThunks";

registerLocale("ja", ja);
interface HeaderProps {
  auth: boolean;
}

const Header: React.FC<HeaderProps> = ({ auth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { user } = useAppSelector(selectUser);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { newNotification, news, loading } = useAppSelector(selectNews);
  const [keyword, setKeyword] = React.useState<string>(
    queryParams.get("keyword") ? queryParams.get("keyword") : ""
  );
  const [isRead, setIsRead] = useState(true);

  const newsRead = news?.data?.filter(
    (item) =>
      item?.readBy?.length === 0 ||
      item?.readBy?.filter(
        (item) => item?.user_id === user?.newUser?.id && item?.read === true
      ).length === 0
  );

  useEffect(() => {
    async function fetchData() {
      if (user && user.token) {
        await dispatch(getNotificationThunk());
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user?.newUser?.id) {
      console.log("User joined", user?.newUser?.id);
      socket.emit("join", user?.newUser?.id);
    }

    const handleNewMessageNotification = (data) => {
      if (data?.receiver_id === user?.newUser?.id) {
        console.log("New notification received:", data);
        dispatch(setNewNotification(true));
      }
    };

    const handleNewNews = (data) => {
      console.log("New notification received:", data);
      dispatch(setNewNotification(true));
    };

    const handleNewNewsToggle = (data) => {
      if (data.flag) dispatch(setNewNotification(true));
    };

    const handleRatingNotification = (data) => {
      console.log("Rating notification received:", data);
      if (data?.id === user?.newUser?.id) {
        console.log("New notification received:", data);
        dispatch(setNewNotification(true));
      }
    };

    socket.on("newMessageNotification", handleNewMessageNotification);
    socket.on("newNews", handleNewNews);
    socket.on("newNewsToggle", handleNewNewsToggle);
    socket.on("newRatingNotification", handleRatingNotification);

    return () => {
      socket.off("newMessageNotification", handleNewMessageNotification);
      socket.off("newNews", handleNewNews);
    };
  }, [user]);

  useEffect(() => {
    if (newsRead?.length > 0) {
      setIsRead(false);
    }
  }, [newsRead, news]);

  console.log("News Read", newsRead);
  // console.log("Is Read", isRead);
  // console.log("news", news);
  // console.log("loading", loading);
  // console.log("user", user);

  const toggleNotification = async () => {
    setNotificationOpen(!isNotificationOpen);
    await dispatch(getNotificationThunk());
    dispatch(setNewNotification(false));
  };

  const handleLogOut = async () => {
    navigate("/");
    await dispatch(userLogOutThunk({}));
  };

  // const currentDate = new Date();

  const [startDate, setStartDate] = React.useState<Date | string>(
    queryParams.get("startDate") ? new Date(queryParams.get("startDate")) : ""
  );
  const [endDate, setEndDate] = React.useState<Date | string>(
    queryParams.get("endDate") ? new Date(queryParams.get("endDate")) : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate > endDate && endDate !== "") {
      alert("Start date cannot be greater than end date");
      return;
    }
    dispatch(
      processSearchThunk({
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        keyword,
        pageSize: 12,
      })
    );
    navigate(
      `/process/search-results?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  const SearchForSmallerDevices = (e: React.FormEvent) => {
    e.preventDefault();
    const searchData = {
      keyword: keyword,
    };
    dispatch(SearchAction(searchData));
    navigate(
      `/process/search-results?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center border-b border-secondary">
        <div
          className="md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3
        md:py-5 lg:py-6"
        >
          <div className="grid xs:grid-cols-24 md:grid-cols-24 xs:gap-x-2 lg:gap-x-2 xs:place-items-center ">
            <div className="md:hidden col-span-3">
              <DashboardSidebar />
            </div>
            <div
              onClick={() => navigate("/")}
              className="xs:col-span-9 md:col-span-4 cursor-pointer"
            >
              {/* <p className="xs:text-[8px] lg:text-[12px] text-primary w-full">
                  工場の「困った」イマを解決する
                </p> */}
              {/* <p className="text-primary font-bold xs:text-[24px] lg:text-[32px]">
                  ASNARO
                </p> */}
              <img
                src={Asnaro_Logo}
                alt="Asnaro Logo"
                className="lg:w-[150px] lg:h-[35px] xs:w-[100px] xs:h-[30px] mt-1"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="xs:hidden md:max-w-8xl md:col-span-15 md:grid md:grid-cols-12 md:text-base md:text-sm w-full bg-[#F8F8F8] "
            >
              <div className="grid grid-cols-24 col-span-11 text-base text-[#929292] font-thin border border-[#D9D9D9] rounded-l-md py-1">
                <div className="md:col-span-11 grid grid-cols-24 w-full place-items-center border-r border-[#E6E6E6] md:h-[36px]">
                  <div className="md:col-span-11 flex flex-col items-center">
                    <p
                      className="md:text-[12px] cursor-pointer w-full text-center"
                      onClick={() => {
                        setStartDateOpen(!startDateOpen);
                        setEndDateOpen(false);
                      }}
                    >
                      From
                    </p>
                    <div className="relative">
                      <DatePicker
                        placeholderText="Start Date"
                        className="md:text-[12px] text-center lg:text-base w-full bg-[#F8F8F8] outline-none cursor-pointer"
                        selected={startDate as unknown as any}
                        onChange={(date) => setStartDate(date)}
                        dateFormat={"yyyy/MM/dd"}
                        locale="ja"
                        onClickOutside={() => setStartDateOpen(false)}
                        open={startDateOpen}
                        onCalendarOpen={() => setStartDateOpen(true)}
                        onCalendarClose={() => setStartDateOpen(false)}
                        onSelect={() => setStartDateOpen(false)}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-1 flex flex-col items-center">
                    ー
                  </div>
                  <div className="md:col-span-11 flex flex-col items-center">
                    <p
                      className="md:text-[12px]  cursor-pointer w-full text-center"
                      onClick={() => {
                        setEndDateOpen(!endDateOpen);
                        setStartDateOpen(false);
                      }}
                    >
                      To
                    </p>
                    <div className="relative">
                      <DatePicker
                        placeholderText="End Date"
                        className="md:text-[12px] text-center lg:text-base w-full bg-[#F8F8F8] outline-none cursor-pointer z-[100]"
                        selected={endDate as unknown as any}
                        onChange={(date) => setEndDate(date)}
                        minDate={startDate as unknown as any}
                        dateFormat={"yyyy/MM/dd"}
                        locale="ja"
                        onClickOutside={() => setEndDateOpen(false)}
                        open={endDateOpen}
                        onCalendarOpen={() => setEndDateOpen(true)}
                        onCalendarClose={() => setEndDateOpen(false)}
                        onSelect={() => setEndDateOpen(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-24 md:col-span-13">
                  <div className="col-span-17 md:text-[10px] lg:text-base  flex justify-center items-center border-r border-secondary">
                    <input
                      className="bg-[#F8F8F8] outline-none md:text-base lg:text-base"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="キーワード[例：切削加工]"
                    />
                  </div>
                  <div className="col-span-7 md:text-[10px] lg:text-base  flex justify-center items-center">
                    <div
                      onClick={() => navigate("/process/advance-search")}
                      className="cursor-pointer"
                    >
                      絞り込む
                      <button className="h-3 ml-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 8L0.669873 0.499999L9.33013 0.5L5 8Z"
                            fill="#808080"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* onClick={() => handleSearchSubmit()} */}
              <div className="text-white flex justify-center items-center col-span-1 bg-primary border border-primary w-full h-full xs:rounded-r md:rounded-r-md lg:text-base">
                <button type="submit" className="cursor-pointer w-full h-full">
                  検索
                </button>
              </div>
            </form>
            {user?.newUser?.isVerified ? (
              <div className="xs:col-span-12 md:col-span-5 sm:w-full ml-auto grid grid-cols-2 sm:grid-cols-3 text-base">
                <div
                  className="col-span-1 sm:border-x border-r border-[#808080] flex flex-col justify-around md:justify-center md:gap-1 items-center cursor-pointer pr-4 sm:pr-0"
                  onClick={() => navigate("/dashboard/my-page")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_812_10095)">
                      <path
                        d="M10.368 10.2255C8.8737 10.2255 7.65265 9.75221 6.70487 8.79978C5.7571 7.84734 5.28612 6.62028 5.28612 5.11859C5.28612 3.61691 5.7571 2.384 6.70487 1.43157C7.65265 0.479138 8.8737 0 10.368 0C11.8624 0 13.0951 0.479138 14.0545 1.43157C15.0139 2.384 15.4965 3.61691 15.4965 5.11859C15.4965 6.62028 15.0139 7.84734 14.0545 8.79978C13.0951 9.75221 11.8682 10.2255 10.368 10.2255ZM3.07659 21.0938C2.30325 21.0938 1.65202 20.825 1.12871 20.2874C0.605405 19.7498 0.34375 19.1012 0.34375 18.3416V17.5528C0.34375 16.6939 0.564703 15.9401 1.00079 15.2915C1.43689 14.6429 2.01253 14.1463 2.72772 13.8132C4.06506 13.2113 5.36171 12.7556 6.61184 12.4517C7.86197 12.1479 9.1121 11.996 10.368 11.996C11.624 11.996 12.9264 12.1537 14.1591 12.4634C15.3976 12.7731 16.671 13.223 17.9909 13.8073C18.7294 14.117 19.3166 14.602 19.7644 15.2564C20.2121 15.9109 20.433 16.6763 20.433 17.5528V18.3416C20.433 19.1012 20.1714 19.7498 19.6423 20.2874C19.1131 20.825 18.4561 21.0938 17.6711 21.0938H3.07659Z"
                        fill="#255BB3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_812_10095">
                        <rect
                          width="20.0893"
                          height="21.0938"
                          fill="white"
                          transform="translate(0.34375)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-center xs:text-[10px] text-primary">
                    マイページ
                  </span>
                </div>
                <div className="relative">
                  <div
                    onClick={toggleNotification}
                    id="notification"
                    className={`col-span-1 flex flex-col justify-around md:justify-center md:gap-1 items-center cursor-pointer`}
                  >
                    <div className="relative flex justify-center  w-[40px] ">
                      <svg
                        className={newNotification ? "animate-swing" : ""}
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="22"
                        viewBox="0 0 17 22"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_812_10089)">
                          <path
                            d="M1.12346 18.0557C0.793848 18.0557 0.519949 17.9421 0.311042 17.7198C0.102136 17.4975 -0.00463867 17.2159 -0.00463867 16.88C-0.00463867 16.5441 0.102136 16.2625 0.311042 16.0402C0.519949 15.8179 0.789206 15.7043 1.11417 15.7043H2.1587V8.8377C2.1587 7.32112 2.57187 5.94286 3.40286 4.69799C4.2292 3.45311 5.34337 2.66765 6.73608 2.33173V1.74881C6.73608 1.23999 6.89856 0.820095 7.22817 0.489116C7.55778 0.158137 7.95702 -0.00488281 8.43054 -0.00488281C8.90406 -0.00488281 9.30331 0.158137 9.63291 0.489116C9.96252 0.820095 10.125 1.23999 10.125 1.74881V2.33173C11.5316 2.66765 12.6551 3.45805 13.4907 4.69799C14.3263 5.94286 14.7442 7.32112 14.7442 8.8377V15.7043H15.7655C16.0719 15.7043 16.3365 15.8179 16.5547 16.0402C16.7729 16.2625 16.8796 16.5441 16.8796 16.88C16.8796 17.2159 16.7729 17.4975 16.5547 17.7198C16.3365 17.9421 16.0765 18.0557 15.7655 18.0557H1.12346ZM8.43518 21.0938C7.88738 21.0938 7.40458 20.8814 6.99605 20.4615C6.58752 20.0416 6.37861 19.5278 6.37861 18.9202H10.4871C10.4871 19.5278 10.2875 20.0465 9.8836 20.4664C9.47972 20.8863 8.99691 21.0987 8.43054 21.0987L8.43518 21.0938Z"
                            // fill="#255BB3"
                            fill={isNotificationOpen ? "#808080" : "#255BB3"}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_812_10089">
                            <rect
                              width="16.875"
                              height="21.0938"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      {!loading && (newNotification || !isRead) ? (
                        <span
                          className={`absolute notification-indicator  top-1 right-2 block h-2 w-2 rounded-full ring-2 ring-red-500 bg-red-500`}
                        >
                          {/* 🔴 */}
                        </span> // Display red dot indicator
                      ) : null}
                    </div>
                    <span
                      className={`text-center xs:text-[10px] ${
                        isNotificationOpen ? "text-[#808080]" : "text-primary"
                      }`}
                    >
                      お知らせ
                    </span>
                  </div>
                  {isNotificationOpen && (
                    <div className="absolute top-20 sm:right-0 right-[-0.1rem] bg-[#FFFFFF] sm:w-[451px] w-[350px] z-50">
                      <NotificationBox
                        notificationData={{
                          avatar:
                            "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg",
                          label: "重要",
                          message:
                            "通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト通知テキスト",
                          title: "ASNARO",
                        }}
                        onClose={toggleNotification}
                        setNotificationOpen={setNotificationOpen}
                        setNewNotification={setNewNotification}
                      />
                    </div>
                  )}
                </div>
                <div
                  onClick={() => handleLogOut()}
                  className="col-span-1 border-x border-[#808080] sm:flex flex-col cursor-pointer justify-around md:justify-center md:gap-1 items-center hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                  >
                    <path
                      d="M9.225 20V18.3333H16.5V1.66667H9.225V0H16.5C16.9 0 17.25 0.166667 17.55 0.5C17.85 0.833333 18 1.22222 18 1.66667V18.3333C18 18.7778 17.85 19.1667 17.55 19.5C17.25 19.8333 16.9 20 16.5 20H9.225ZM7.275 14.8611L6.2 13.6667L8.75 10.8333H0V9.16667H8.7L6.15 6.33333L7.225 5.13889L11.625 10.0278L7.275 14.8611Z"
                      fill="#255BB3"
                    />
                  </svg>
                  <span className="text-center xs:text-[10px] text-primary">
                    ログアウト
                  </span>
                </div>
              </div>
            ) : (
              <div className="xs:col-span-12 md:col-span-5 w-full grid xs:grid-cols-12 md:grid-cols-12 gap-x-2 xs:text-base md:text-base xs:h-[36px] md:h-auto ">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center justify-center xs:col-span-5 md:col-span-5 w-full bg-[#D9D9D9] text-tertiary xs:rounded  md:rounded-md xs:h-auto py-1 border border-[#D9D9D9]"
                >
                  <div className="flex items-center justify-center md:h-[36px]">
                    ログイン
                  </div>
                </button>
                <button
                  onClick={() => navigate("/member-register")}
                  className="xs:col-span-7 md:col-span-7 w-full bg-[#FFAA00] text-white xs:rounded  md:rounded-md xs:h-auto border border-[#FFAA00]"
                >
                  <div className="flex items-center justify-center md:h-[36px]">
                    新規会員登録
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {!auth && (
        <form
          onSubmit={SearchForSmallerDevices}
          className="md:hidden py-[20px] px-[20px] text-base border-b border-[#E6E6E6] shadow-lg"
        >
          <div className="grid grid-cols-24 gap-x-0 text-[#929292]">
            <input
              className="col-span-20 h-[50px] xs:rounded-l md:rounded-l-md border bg-light border-[#D9D9D9] px-[10px] py-[5px] flex items-center justify-center text-left outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="キーワード[例：切削加工]"
            />
            <button
              type="submit"
              className="col-span-4 h-[50px] xs:rounded-r md:rounded-r-md border bg-primary border-primary px-[10px] py-[5px] flex justify-center items-center text-white"
            >
              検索
            </button>
          </div>
          <div
            className="h-[50px] grid grid-cols-24 gap-x-0 text-base bg-primary text-white xs:rounded md:rounded-md mt-2"
            onClick={() => navigate("/process/advance-search")}
          >
            <div className="col-span-24 flex justify-center items-center cursor-pointer">
              絞り込む
            </div>
          </div>
        </form>
      )}
      <HeaderMenu />
    </>
  );
};

export default Header;
