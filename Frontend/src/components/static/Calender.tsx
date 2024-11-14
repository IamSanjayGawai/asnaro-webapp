import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/state/hooks";
import { selectProcess } from "@/state/slices/processSlice";
import { generateDate, months } from "../../utils/calender";
import cn from "../../utils/cn";
import optimizeArray from "@/utils/optArrayCal";

interface AvailabilityItem {
  date: string;
  selectedStatus: string;
}

export default function CustomCalendar({ register, errors, setValue }) {
  const { process } = useAppSelector(selectProcess);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDates, setSelectedDates] = useState([]);
  const [status, setStatus] = useState("Vacancies");
  const [selectedStatus] = useState("");

  const [, setIsStatusSubmitted] = useState(false);
  const [isHideCheckBox, setHideCheckBox] = useState(false);

  const { isEditCalendar } = useAppSelector(selectProcess);

  const availabilityArray = selectedDates.map((date) => ({
    date: date.format("YYYY-MM-DD"),
    selectedStatus,
  }));
  const serverAvailability = process?.processData?.availability.map((date) => ({
    ...date,
    date: dayjs(date.date).format("YYYY-MM-DD"),
  }));
  const [availability, setAvailability] = useState(availabilityArray);
  const finalArray = optimizeArray(availability);

  useEffect(() => {
    if (process?.processData?.availability) {
      setAvailability(serverAvailability);
    }
  }, [process]);

  useEffect(() => {
    setAvailability((prevAvailability) => [
      ...prevAvailability,
      ...availabilityArray,
    ]);
  }, [selectedDates, selectedStatus]);

  useEffect(() => {
    setValue("availability", finalArray);
  }, [finalArray]);

  const handleDateClick = (date: Dayjs) => {
    const today = dayjs(); // Get today's date
    const yesterday = today.subtract(1, "day"); // Get yesterday's date
    const futureLimit = today.add(3, "month"); // Get the limit date 90 days from today

    let [start, end] = selectedDates;

    // Check if the clicked date is within the allowed range
    if (date.isAfter(yesterday) && date.isBefore(futureLimit)) {
      if (!start || (start && end)) {
        // If no start date or both start and end dates are selected, set a new range starting from the clicked date.
        setSelectedDates([date]);
      } else {
        // If there is a start date but no end date, update the end date to the clicked date or adjust the range.
        if (date.isBefore(start)) {
          // If the clicked date is before the start date, swap the start and end dates.
          [start, end] = [date, start];
        } else {
          // Update the end date to the clicked date.
          end = date;
        }
        // Generate the range of dates between start and end (inclusive).
        const range: Dayjs[] = [];

        let currentDate = start.clone();
        while (currentDate.isBefore(end.add(1, "day"))) {
          range.push(currentDate);
          currentDate = currentDate.add(1, "day");
        }

        setSelectedDates(range);
      }
    }
  };

  // Function to determine if a date should be disabled
  const isDateDisabled = (date: Dayjs) => {
    const today = dayjs(); // Get today's date
    const yesterday = today.subtract(1, "day"); // Get yesterday's date
    const futureLimit = today.add(3, "month"); // Get the limit date 90 days from today
    return date.isBefore(yesterday) || date.isAfter(futureLimit); // Return true if the date is before yesterday or after 90 days from today, otherwise return false
  };

  console.log(finalArray, "finalArray");

  const handleSelectedStatus = () => {
    setIsStatusSubmitted(true);
    // Check if there are selected dates
    if (selectedDates.length > 0) {
      // Update the status for each selected date
      const updatedAvailability = availability.map((item) => {
        if (
          selectedDates.some((date) => dayjs(item.date).isSame(date, "day"))
        ) {
          return {
            ...item,
            selectedStatus: status,
          };
        }
        return item;
      });

      // Update the availability array
      setAvailability(updatedAvailability);
      setHideCheckBox(true);

      // Clear the selected dates
      setSelectedDates([]);
    } else {
      // If no dates are selected, show an error message
      alert("Please select a date");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-10 xs:h-[450px] sm:flex-row flex-col border border-secondary pt-[13px]">
        <div className="w-full h-full ">
          <div className="flex justify-center items-center">
            <div className="flex gap-10 justify-center items-center mb-[20px]">
              <svg
                className="h-5 cursor-pointer hover:scale-105 transition-all"
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
              <h1 className="select-none font-semibold text-[20px] text-tertiary">
                {today.year()}年{months[today.month()]}月
              </h1>
              <svg
                className="h-5 cursor-pointer hover:scale-105 transition-all"
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
          <div className="grid grid-cols-7 border-b border-secondary ">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className={`text-base text-center h-14 grid place-content-center ${
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

          <div className="grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth }, index) => {
                const foundObj = finalArray.find((obj: any) =>
                  dayjs(obj.date).isSame(date, "day")
                ) as unknown as { selectedStatus: string };
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-base"
                  >
                    <div
                      className={cn(
                        currentMonth ? "" : "hidden",
                        `h-10 w-10 flex ${
                          finalArray.some((obj: any) =>
                            dayjs(obj.date).isSame(date, "day")
                          )
                            ? "bg-[#FFF4DF]"
                            : ""
                        } flex-col justify-center items-center hover:bg-[#FFF4DF] transition-all cursor-pointer select-none`
                      )}
                    >
                      <p>{date.date()}</p>

                      <div className="flex justify-center items-center gap-1">
                        {isHideCheckBox &&
                        !isEditCalendar &&
                        finalArray.some(
                          (obj: AvailabilityItem) =>
                            obj.selectedStatus &&
                            dayjs(obj.date).isSame(date, "day")
                        ) ? (
                          ""
                        ) : (
                          <input
                            type="checkbox"
                            checked={selectedDates.some((d) =>
                              d.isSame(date, "day")
                            )}
                            onClick={() => handleDateClick(date)}
                            disabled={isDateDisabled(date)}
                            // onChange={() => handleDateClick(date)}
                          />
                        )}

                        {selectedDates.some((d) => d.isSame(date, "day")) ? (
                          selectedStatus === "Vacancies" ? (
                            <svg
                              className=""
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <circle
                                cx="7"
                                cy="7"
                                r="6"
                                stroke="#FF8080"
                                strokeWidth="2"
                              />
                            </svg>
                          ) : selectedStatus === "Adjustable" ? (
                            <svg
                              className=""
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#FFAA00"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="1"
                                y="1"
                                width="14"
                                height="14"
                                stroke="white"
                                stroke-width="2"
                              />
                            </svg>
                          ) : selectedStatus === "Consultation Required" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="14"
                              viewBox="0 0 17 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.61785 0.269531L0.912598 13.6154H16.3231L8.61785 0.269531ZM8.61785 3.82844L3.9947 11.836H13.241L8.61785 3.82844Z"
                                fill="#255BB3"
                              />
                            </svg>
                          ) : selectedStatus === "No Vacancies" ? (
                            <svg
                              className=""
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="16"
                              viewBox="0 0 14 16"
                              fill="#808080"
                            >
                              <path
                                d="M12.5118 1.00011L1.48817 15.0001"
                                stroke="#808080"
                                stroke-width="2"
                              />
                              <path
                                d="M1.48817 1.00011L12.5118 15.0001"
                                stroke="#808080"
                                stroke-width="2"
                              />
                            </svg>
                          ) : null
                        ) : finalArray.some((obj: any) =>
                            dayjs(obj.date).isSame(date, "day")
                          ) ? (
                          foundObj.selectedStatus === "Vacancies" ? (
                            <svg
                              className=""
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <circle
                                cx="7"
                                cy="7"
                                r="6"
                                stroke="#FF8080"
                                strokeWidth="2"
                              />
                            </svg>
                          ) : foundObj.selectedStatus === "Adjustable" ? (
                            <svg
                              className=""
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="#FFAA00"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="1"
                                y="1"
                                width="14"
                                height="14"
                                stroke="white"
                                stroke-width="2"
                              />
                            </svg>
                          ) : foundObj.selectedStatus ===
                            "Consultation Required" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="14"
                              viewBox="0 0 17 14"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.61785 0.269531L0.912598 13.6154H16.3231L8.61785 0.269531ZM8.61785 3.82844L3.9947 11.836H13.241L8.61785 3.82844Z"
                                fill="#255BB3"
                              />
                            </svg>
                          ) : foundObj.selectedStatus === "No Vacancies" ? (
                            <svg
                              className=""
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="16"
                              viewBox="0 0 14 16"
                              fill="#808080"
                            >
                              <path
                                d="M12.5118 1.00011L1.48817 15.0001"
                                stroke="#808080"
                                stroke-width="2"
                              />
                              <path
                                d="M1.48817 1.00011L12.5118 15.0001"
                                stroke="#808080"
                                stroke-width="2"
                              />
                            </svg>
                          ) : null
                        ) : !isDateDisabled(date) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="14"
                            viewBox="0 0 17 14"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.61785 0.269531L0.912598 13.6154H16.3231L8.61785 0.269531ZM8.61785 3.82844L3.9947 11.836H13.241L8.61785 3.82844Z"
                              fill="#255BB3"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[100px] bg-[#F5F5F5] flex xs:px-[20px] lg:px-[50px] justify-center items-center">
        <div className="flex flex-col justify-center gap-2 w-full text-[#808080]">
          <p>選択中の日程のステータスを変更</p>
          <div className="flex gap-2 w-full">
            <div className="xs:basis-3/5 lg:basis-4/5 flex items-center relative text-[#808080]">
              <select
                {...register("calStatus", {
                  required: true,
                  validate: (value) => {
                    if (!process?.processData) {
                      if (finalArray.length === 0) {
                        return "日付を選択してください";
                      } else if (value === "Select a status") {
                        return "ステータスを選択してください";
                      }
                    }
                  },
                  onChange: (e) => setStatus(e.target.value),
                })}
                value={status}
                className="h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 appearance-none cursor-pointer text-[#808080]"
              >
               
                <option value="Vacancies" className="text-[#808080]">空きあり</option>
                <option value="Adjustable"  className="text-[#808080]">調整可能</option>
                <option value="Consultation Required"  className="text-[#808080]">要相談</option>
                <option value="No Vacancies"  className="text-[#808080]">空きなし</option>
              </select>
              <div className="absolute right-0 mr-[9px] cursor-pointer pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                >
                  <path
                    d="M7 11L0.937822 0.5L13.0622 0.500001L7 11Z"
                    fill="#808080"
                  />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSelectedStatus}
              type="button"
              className="xs:basis-2/5 lg:basis-1/5 bg-primary text-white flex justify-center items-center"
            >
              変更
            </button>
          </div>
          {errors.calStatus && (
            <p className="text-fifth">{errors.calStatus.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// const handleDateClick = (date: Dayjs) => {
//   let [start, end] = selectedDates;

//   if (!start || (start && end)) {
//     // If no start date or both start and end dates are selected, set a new range starting from the clicked date.
//     setSelectedDates([date]);
//   } else {
//     // If there is a start date but no end date, update the end date to the clicked date or adjust the range.
//     if (date.isBefore(start)) {
//       // If the clicked date is before the start date, swap the start and end dates.
//       [start, end] = [date, start];
//     } else {
//       // Update the end date to the clicked date.
//       end = date;
//     }
//     // Generate the range of dates between start and end (inclusive).
//     const range: Dayjs[] = [];

//     let currentDate = start.clone();
//     while (currentDate.isBefore(end.add(1, "day"))) {
//       range.push(currentDate);
//       currentDate = currentDate.add(1, "day");
//     }

//     setSelectedDates(range);
//   }
// };
