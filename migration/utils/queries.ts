export const selectAllUsers = () => {
  return `SELECT * FROM dtb_customer WHERE del_flg = 0`;
};

export const selectPrefs = (pref_id?: number) => {
  if (!pref_id) return `SELECT * FROM mtb_pref`;
  else return `SELECT * FROM mtb_pref WHERE pref_id = ${pref_id}`;
};

export const selectAllProcesses = () => {
  return `SELECT * FROM dtb_process WHERE del_flg = 0`;
};

export const selectAllCategories = () => {
  return `SELECT * FROM dtb_category WHERE del_flg = 0`;
};

export const selectAllReviews = () => {
  return `SELECT * FROM dtb_process_review WHERE del_flg = 0`;
};

export const selectAllAvailabilities = () => {
  return `SELECT * FROM dtb_availability WHERE del_flg = 0`;
};
