// types.ts

// Form Types
export interface SignUpFormData {
  email: string;
  password: string;
}
export interface SignInFormData {
  email: string;
  password: string;
}

export interface MemberRegForm {
  name01: string;
  email: string;
  email_mobile: string;
  notification_email_1: string;
  notification_email_2: string;
  notification_email_3: string;
  notification_email_4: string;
  notification_email_5: string;
  business_id: string;
  password: string;
  cpassword: string;
  kana01: string;
  profile_img: string;
  img1: string;
  img2: string;
  img3: string;
  zip01: string;
  zip02: string;
  pref: string;
  addr01: string;
  addr02: string;
  tele01: string;
  tele02: string;
  tele03: string;
  fax01: string;
  fax02: string;
  fax03: string;
  establishment_year: any;
  establishment_month: any;
  establishment_day: any;
  establishment_date: any;
  open_time_hours: any;
  open_time_minutes: any;
  close_time_hours: any;
  close_time_minutes: any;
  delegate_position: string;
  delegate_name01: string;
  delegate_name02: string;
  delegate_kana01: string;
  delegate_kana02: string;
  charge_name01: string;
  charge_name02: string;
  charge_kana01: string;
  charge_kana02: string;
  classified01: string;
  classified02: string;
  classified03: string;
  classified04: string;
  classified05: string;
  capital: string;
  business_content: string;
  regular_holiday: string;
  holiday_flg1: number;
  holiday_flg2: number;
  holiday_flg3: number;
  holiday_flg4: number;
  holiday_flg5: number;
  holiday_flg6: number;
  holiday_flg7: number;
  corporate_url: string;
  employees_number: string;
  main_customer: string;
  transaction_bank: string;
  corporate_bank_name: string;
  corporate_branch_name: string;
  corporate_deposit_type: number;
  corporate_account_number: string;
  corporate_account_holder: string;
  [key: string]: any;
}

export interface ProcessRegForm {
  img1: File | null;
  img2: File | null;
  img3: File | null;
  name: string;
  maker_name: string;
  years_type: number;
  pref: string;
  mun: string;
  capacity: string;
  equipment_size: string;
  process_explanation: string;
  delivery_date: string;
  unit_price: string;
  parent_category: string;
  child_category: string;
  tags: string;
  remarks_column: string;
  availability: any;
  calStatus: string;
  status: string;
  [key: string]: any;
}

export interface NewsItem {
  _id: string;
  news_date: Date;
  rank: number;
  news_title: string;
  news_comment: string;
  news_select: string;
  creator_id: string;
  create_date: Date;
  image: File | null;
  del_flg: number;
  shop_id: number;
  delivery_flag: boolean;
  delivery_date: string;
  news_url: string;
  __v: number;
}

// Dashboard Reg Form
export interface DashBoard {
  partner_flag: boolean;
}
//Returned Data Types
export interface User {
  name: string;
  email: string;
  password: string;
}

// Error Types
export interface ErrorType {
  code: number;
}
export interface BadRequest extends ErrorType {
  message: string;
}
export interface ServerError extends ErrorType {
  message: string;
}
export interface Unauthorized extends ErrorType {
  message: string;
}
export interface Other extends ErrorType {
  message: string;
}

// File Types

export enum ErrorCode {
  FileInvalidType = "file-invalid-type",
  FileTooLarge = "file-too-large",
  FileTooSmall = "file-too-small",
  TooManyFiles = "too-many-files",
}
export interface FileError {
  message: string;
  code: ErrorCode | string;
}

// Category Types
export interface Category {
  _id?: string;
  category_id: number;
  category_name: string | null;
  parent_id?: number;
  mapping_id?: number | null;
  level: number;
  rank?: number | null;
  creator_id?: number | null;
  deleted: number;
  shop_id?: number;
  category_code?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Subcategory = {
  _id?: string;
  category_id: number;
  category_name: string | null;
  parent_id?: number;
  mapping_id?: number | null;
  level: number;
  rank?: number | null;
  creator_id?: number | null;
  deleted: number;
  shop_id?: number;
  category_code?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CityPivot = {
  state: string | null;
  area: string | null;
  city: string | null;
};

export type ThreeDSErrorType = {
  error: string;
  details: [
    {
      errCode: string;
      errInfo: string;
    }
  ];
};

export type ThreeDSResponseType = {
  success: { acs: string; redirectUrl: string };
};

export interface PaymentInput {
  cardNumber: "";
  cardholderName: "";
  expiryMonth: "";
  expiryYear: "";
  securityCode: "";
  paymentType: "card";
  transactionId: string;
  amount: string;
}

export interface searchDataType {
  transactionId: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  status: string;
  processName: string;
  startDate: string;
  endDate: string;
  pageSize?: number;
}

export type OrderNodesType = {
  nodes: {
    id: string;
    no: string;
    Ordering_company_ID: string;
    Order_company_ID: string;
    Process_name: string;
    Status: string;
    Period: string;
  }[];
};

export type MailType = {
  _id?: string;
  template: string;
  subject: string;
  header: string;
  footer: string;
  detail: string;
};
