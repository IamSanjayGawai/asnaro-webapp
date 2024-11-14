export type otherFieldsType = {
  pref_id?: number;
  pref?: number;
  pref_name?: string;
  open_time?: string;
  close_time?: string;

  [key: string]: any;
  customer_id: number | string;
  years_type: number;

  process_id: number | string;
};

export interface SqlUser {
  corporate_image: string;
  reminder: string;
  remarks: string;
  reminder_answer: string;
  secret_key: string;
  note: string;
  del_flg: string;
  mailmaga_flg: string;
  shop_id: string;
  crank_id: string;
  browsing_history: string;
  customer_code: string;
  social_code: string;
  social_account_id: string;
  employees_site_area: string;
  create_date: string;
  update_date: string;

  fax02: string;
  fax03: string;
  [key: string]: any;
  customer_id: number | string;
  years_type: number;
  status: number | string;
  process_id: number | string;
}

export interface Pref {
  pref_name: string;
  [key: string]: any;
  pref_id?: number;
  pref?: number;

  customer_id: number;
  years_type: number;
  status: number;
  process_id: number;
}
