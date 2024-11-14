import { QueryResult } from "mysql2";
import { findPref } from "../utils/user/findPrefecture";
import { findOpenAndCloseTime } from "../utils/user/open&closetime";
import { otherFieldsType, Pref, SqlUser } from "../types/userTypes";
import User from "../models/User";

export const userMigration = async (
  sqlUsers: QueryResult,
  sqlPrefs: QueryResult
) => {
  const prefArray: Pref[] = Array.isArray(sqlPrefs)
    ? (sqlPrefs as unknown as Pref[])
    : [];
  const userArray = Array.isArray(sqlUsers)
    ? (sqlUsers as unknown as SqlUser[])
    : [];

  const truncatedUsers = userArray.map((user: SqlUser) => {
    const {
      corporate_image,
      reminder,
      remarks,
      reminder_answer,
      secret_key,
      note,
      del_flg,
      mailmaga_flg,
      shop_id,
      crank_id,
      browsing_history,
      customer_code,
      social_code,
      social_account_id,
      employees_site_area,
      create_date,
      update_date,
      status,
      fax02,
      fax03,
      ...otherFields
    } = user;

    const foundPref = findPref(prefArray, otherFields);
    const { open_time, close_time } = findOpenAndCloseTime(otherFields);
    const parsedCreateDate = create_date ? new Date(create_date) : null;
    const parsedUpdateDate = update_date ? new Date(update_date) : null;

    return {
      ...otherFields,
      fax01: otherFields.fax01 + fax02 + fax03,
      open_time,
      close_time,
      holiday_flg1: otherFields.holiday_flg1 === 0 ? "0" : "1",
      holiday_flg2: otherFields.holiday_flg2 === 0 ? "0" : "2",
      holiday_flg3: otherFields.holiday_flg3 === 0 ? "0" : "3",
      holiday_flg4: otherFields.holiday_flg4 === 0 ? "0" : "4",
      holiday_flg5: otherFields.holiday_flg5 === 0 ? "0" : "5",
      holiday_flg6: otherFields.holiday_flg6 === 0 ? "0" : "6",
      holiday_flg7: otherFields.holiday_flg7 === 0 ? "0" : "7",
      establishment_date: new Date(otherFields.establishment_date),
      email_mobile: otherFields.email,
      createdAt:
        parsedCreateDate && !isNaN(parsedCreateDate.getTime())
          ? parsedCreateDate
          : null,
      updatedAt:
        parsedUpdateDate && !isNaN(parsedUpdateDate.getTime())
          ? parsedUpdateDate
          : null,
      corporate_deposit_type: otherFields.corporate_deposit_type
        ? otherFields.corporate_deposit_type.toString()
        : "",
      partner_flg: otherFields.partner_flg === "0" ? false : true,
      isVerified: status === "1" ? false : true,
      pref: foundPref?.pref_name,
      partner_status:
        otherFields.partner_flg === "0" ? "一般会員" : "パートナー会員",
    };
  });

  const users = await Promise.all(
    truncatedUsers.map((user) => User.create(user))
  );

  return {
    users,
  };
};
