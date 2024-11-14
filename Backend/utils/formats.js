export const parseIndianNumber = (numberString) => {
  if (!numberString || typeof numberString !== "string") {
    return numberString;
  }
  const parsedNumber = parseFloat(numberString.replace(/,/g, ""));
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

export function formatIndianNumber(number) {
  if (number === null) {
    return "";
  }
  return number.toLocaleString("ja-JP");
}
