import { otherFieldsType } from "../../types/userTypes";

export const findOpenAndCloseTime = (otherFields: otherFieldsType) => {
  const open_time_hours = otherFields?.open_time?.split(":")[0];
  const open_time_minutes = otherFields?.open_time?.split(":")[1];
  const openTimeObj = new Date();
  openTimeObj.setHours(
    open_time_hours ? parseInt(open_time_hours) : 0,
    open_time_minutes ? parseInt(open_time_minutes) : 0,
    0
  );

  const close_time_hours = otherFields?.close_time?.split(":")[0];
  const close_time_minutes = otherFields?.close_time?.split(":")[1];
  const closeTimeObj = new Date();
  closeTimeObj.setHours(
    close_time_hours ? parseInt(close_time_hours) : 0,
    close_time_minutes ? parseInt(close_time_minutes) : 0,
    0
  );

  return {
    open_time: openTimeObj.toString(),
    close_time: closeTimeObj.toString(),
  };
};
