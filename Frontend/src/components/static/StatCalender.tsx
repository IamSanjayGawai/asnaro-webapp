import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months } from "../../utils/calender";
import cn from "../../utils/cn";

interface CalenderProps {
  value?: any;
}

export default function StatCalendar({ value }: CalenderProps) {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const availabilityArray = value?.availability;

  return (
    <div className="flex flex-col">
      <div className="flex gap-10 sm:flex-row flex-col justify-start ">
        <div className="w-full h-full flex flex-col gap-4 justify-start">
          <div className="flex justify-between items-start w-full ">
            {/* calender left btn */}
            <div className="flex justify-start transition-all w-1/5">
              <svg
                className="cursor-pointer "
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
              >
                <path d="M0 0H40V20H0V0Z" fill="#E6E6E6" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M39.1667 0.833333H0.833333V19.1667H39.1667V0.833333ZM0 0V20H40V0H0Z"
                  fill="#808080"
                />
                <path
                  d="M13.9998 9.99721L22.9998 4.80105L22.9998 15.1934L13.9998 9.99721Z"
                  fill="#808080"
                />
              </svg>
            </div>
            <h1 className="basis-2/3 select-none font-semibold text-base text-tertiary text-center  ">
              {today.year()}年{months[today.month()]}月
            </h1>
            {/* calender right btn */}
            <div className="flex justify-end transition-all w-1/5">
              <svg
                className="cursor-pointer "
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
              >
                <path d="M0 0H40V20H0V0Z" fill="#FFF4DF" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M39.1667 0.833333H0.833333V19.1667H39.1667V0.833333ZM0 0V20H40V0H0Z"
                  fill="#FFAA00"
                />
                <path
                  d="M26 10.0008L17 15.197L17 4.80469L26 10.0008Z"
                  fill="#FFAA00"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-7 h-full border-b border-secondary w-full ">
              {days.map((day, index) => {
                return (
                  <h1
                    key={index}
                    className={`text-base text-center h-full grid place-content-center ${
                      day === "日"
                        ? "text-fifth"
                        : day === "土"
                        ? "text-[#4D94FF]"
                        : "text-tertiary"
                    } select-none`}
                  >
                    {day}
                  </h1>
                );
              })}
            </div>
            {/* Calender Div */}
            <div className="grid grid-cols-7">
              {generateDate(today.month(), today.year()).map(
                ({ date, currentMonth }, index) => {
                  const foundObj = availabilityArray?.find((obj: any) =>
                    dayjs(obj.date).isSame(date, "day")
                  );
                  return (
                    <div
                      key={index}
                      className="p-2 mt-2.5  text-center h-7 grid place-content-center text-base  "
                    >
                      <div
                        className={cn(
                          currentMonth ? "" : "hidden",
                          `h-1 flex flex-col justify-center items-center transition-all select-none relative text-[14px] `
                        )}
                      >
                        <p className="absolute bottom-[2px] ">{date.date()}</p>
                        <p
                          className={`${
                            foundObj &&
                            foundObj?.selectedStatus === "Adjustable"
                              ? "text-fourth font-black  text-[1rem]"
                              : foundObj?.selectedStatus === "Vacancies"
                              ? "text-fifth font-black  text-[1rem] "
                              : foundObj?.selectedStatus ===
                                "Consultation Required"
                              ? "text-primary font-black  text-[1rem] "
                              : foundObj?.selectedStatus === "No Vacancies"
                              ? "text-tertiary font-black  text-[1rem]"
                              : "text-white font-black  text-[1rem]"
                          } absolute -top-[2px] `}
                        >
                          {foundObj && foundObj?.selectedStatus === "Adjustable"
                            ? "☐"
                            : foundObj?.selectedStatus === "Vacancies"
                            ? "〇"
                            : foundObj?.selectedStatus ===
                              "Consultation Required"
                            ? "△"
                            : foundObj?.selectedStatus === "No Vacancies"
                            ? "×"
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-2 text-[10px] ml-4 mt-4">
        <div className="col-span-12 grid grid-cols-12">
          <p className="col-span-6 text-fifth font-black text-[0.8rem]">
            〇：空きあり
          </p>
          <p className="col-span-6 text-primary font-black text-[0.8rem]">
            △：要確認
          </p>
        </div>
        <div className="col-span-12 grid grid-cols-12">
          <p className="col-span-6 text-fourth font-black text-[0.8rem]">
            ☐：調整可能
          </p>
          <p className="col-span-6 text-tertiary font-black text-[0.8rem]">
           ✕：空きなし
          </p>
        </div>
      </div>
    </div>
  );
}
