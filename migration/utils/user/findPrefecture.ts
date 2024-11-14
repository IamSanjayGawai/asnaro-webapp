import { otherFieldsType, Pref } from "../../types/userTypes";

export const findPref = (prefArray: Pref[], otherFields: otherFieldsType) => {
  const foundPref = prefArray.find(
    (prefToBeFound) => prefToBeFound.pref_id === otherFields.pref
  );
  return foundPref;
};
