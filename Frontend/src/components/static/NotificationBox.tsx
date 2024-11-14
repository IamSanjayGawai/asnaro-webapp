import React from "react";
import { selectNews } from "@/state/slices/newsSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  updateNotificationThunk,
  serachNotificationForUserThunk,
  getNotificationThunk,
} from "@/state/thunks/newsApiThunks"; // Corrected spelling here
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/state/slices/userSlice";

interface NotificationProps {
  avatar?: string;
  label: string;
  message: string;
  title: string;
}
interface NotificationInputProps {
  title?: string;
  read?: boolean; // Changed to optional
}

interface NotificationBoxProps {
  onClose?: () => void;
  notificationData: NotificationProps;
  setNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({
  setNotificationOpen,
}) => {
  const router = useNavigate();
  const { news, notificationLoading } = useAppSelector(selectNews);
  const { user } = useAppSelector(selectUser);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { register, watch } = useForm<NotificationInputProps>();
  const userId = user?.newUser?.id;

  const handleNotificationClick = async (
    id?: {
      notificationId: string;
      transactionId: string;
    },
    type?: "notification" | "news",
    read?: boolean
  ) => {
    try {
      setNotificationOpen(false);
      await dispatch(
        updateNotificationThunk({
          notificationId: id?.notificationId,
          type,
          read,
        })
      );

      type === "notification" && id?.transactionId
        ? router(`/transaction/${id?.transactionId}`)
        : router(`/news-detail/${id?.notificationId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  React.useEffect(() => {
    const subscription = watch((value) => {
      if (value.title || value.read) {
        dispatch(
          serachNotificationForUserThunk({
            title: value.title,
            read: value.read === true ? true : undefined,
            userId,
          })
        );
      } else {
        dispatch(getNotificationThunk());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch, userId]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const notificationElement = document.getElementById("notification");
      if (
        notificationRef.current &&
        notificationElement &&
        !notificationRef.current.contains(event.target as Node) &&
        !notificationElement.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef, setNotificationOpen]);

  return (
    <>
      {notificationLoading ? (
        <div className="h-[200px] cursor-pointer transition-all duration-300 w-full shadow-md z-50 bg-white flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div
          ref={notificationRef}
          className="cursor-pointer transition-all duration-300 w-full shadow-md z-50 "
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-3 items-center gap-6 mx-5 mt-5"
          >
            <input
              type="text"
              className="bg-[#F8F8F8] border border-[#E6E6E6] text-[#808080] outline-none p-2 col-span-2"
              placeholder="キーワードで絞り込み"
              {...register("title")}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 p-2 cursor-pointer"
                {...register("read")}
              />
              <p className="text-[#808080] text-sm font-[500]">未読のみ</p>
            </div>
          </form>
          <div className="bg-white px-4 rounded-md shadow-md max-h-[500px] overflow-y-auto scroll-smooth">
            <div className="mt-3 pb-4 ">
              {news?.data &&
                news?.data.map((notification) => {
                  return (
                    <div
                      key={notification?._id}
                      className={`flex items-start gap-4 mt-2 border-b border-b-[#E6E6E6] pb-4 ${
                        notification?.readBy.length > 0 &&
                        notification?.readBy.find(
                          (user) => user.user_id === userId
                        ) !== undefined
                          ? "opacity-30"
                          : ""
                      }`}
                      onClick={() =>
                        handleNotificationClick(
                          notification.id,
                          notification.type,
                          true
                        )
                      }
                    >
                      <div className="flex items-start gap-2 mt-4 pb-4">
                        {notification && notification?.image ? (
                          <img
                            src={notification?.image}
                            alt=""
                            className="w-16 h-16 rounded-full  flex items-center justify-center "
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center"></div>
                        )}
                      </div>
                      <div className="my-auto w-[80%] ">
                        <div className="flex justify-between items-start mb-1 w-full">
                          <h2 className="text-sm font-semibold text-[#808080] w-2/3 line-clamp-2">
                            {notification?.title}
                          </h2>
                          <h2 className="text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] w-fit text-center rounded-full bg-[#FFF4DF]">
                            {notification?.labels}
                          </h2>
                        </div>
                        <p className="text-[#808080] font-normal text-[12px] line-clamp-2">
                          {notification?.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

              {news?.data?.length === 0 && (
                <div className="flex items-center justify-center mt-4">
                  <p className="text-[#808080] text-sm">
                    未読の通知はありません
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBox;
