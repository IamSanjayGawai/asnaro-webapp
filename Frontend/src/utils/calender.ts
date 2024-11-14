import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year(),
  today = dayjs()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.subtract(i + 1, "day");

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const currentDate = firstDateOfMonth.date(i);
    arrayOfDate.push({
      currentMonth: true,
      date: currentDate,
      today: currentDate.isSame(today, "day"), // Compare using isSame
    });
  }

  const remaining = 42 - arrayOfDate.length;

  // create postfix date
  for (let i = 1; i <= remaining; i++) {
    const date = lastDateOfMonth.add(i, "day");

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  return arrayOfDate;
};

export const months = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
