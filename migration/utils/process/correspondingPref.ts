import { QueryResult } from "mysql2";

export const correspondingPrefFunc = (
  sqlPrefs: QueryResult,
  otherFields: any
) => {
  return (
    Array.isArray(sqlPrefs) &&
    (sqlPrefs.find((pref: any) => pref.pref_id === otherFields.pref) as any)
  );
};
