import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAdmin,
  getAllCompanyInfo,
  admitPartnersAprroval,
  getAllProcessForAdmin,
  getAllpatnersForAdmin,
  allApprovedPartners,
  searchCompanyForAdmin,
  serachProcessForAdmin,
  adminGetAllInquries,
  deleteEnquiryForAdmin,
  getUserByIdforAdmin,
  create_news,
  createusagefeeMaster,
  createUpperLimitRate,
  createTaxRate,
  getAllUsageFee,
  updateAllUsageFee,
  deleteUsageFee,
  getAllMailtemplate,
  newsTurnOff,
  admitREmovePartnersAprroval,
  getAllCategories,
  createParentCategory,
  createSubCategory,
  deleteCategory,
  updateCategory,
  getAllTaxRate,
  updateUserByIdforAdmin,
  getLimit,
  createCommerciaAct,
  getCommercialAct,
  fetchTransactionForAdminView,
  deleteComapnyInfoAdmin,
  deleteProcessInfoAdmin,
  deleteNewsInfoAdmin,
  deleteOrderInfoAdmin,
  deletePartnerInfoAdmin,
} from "@/api/admin";
import {
  User,
  ErrorType,
  BadRequest,
  Unauthorized,
  ServerError,
  Other,
  SignInFormData,
  MailType,
} from "@/types/types";
import { RootState } from "../store";
import {
  getTransactionDetailsAdmin,
  getMailTemplates,
  makeDefaultUsageFee,
} from "../../api/admin";

export const adminLoginThunk = createAsyncThunk<
  User,
  SignInFormData,
  { rejectValue: ErrorType }
>("admin/login", async (userData: any, thunkAPI) => {
  try {
    const data = await loginAdmin(userData);
    console.log(data, "login data>?");
    localStorage.setItem("adminInfo", JSON.stringify(data));
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const adminLogOutThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("admin/logout", async ({}, thunkAPI) => {
  try {
    localStorage.removeItem("adminInfo");
    return {};
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// get all company info
export const getAllCompanyInfoThunk = createAsyncThunk<
  any,
  { currentPage: number; limit: number },
  { rejectValue: ErrorType }
>("all/companyinfo", async ({ currentPage, limit }, thunkAPI) => {
  try {
    console.log("<><><><<<<<<<<<<<<<<<<", currentPage);
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllCompanyInfo(
      admin?.admin?.token,
      currentPage,
      limit
    );
    console.log("Get All Partners", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// search company info

export const searchCompanyInfoThunk = createAsyncThunk<
  any,
  {
    company_Id: string;
    company_name: string;
    representative_name: string;
    person_incharge_name: string;
    email: string;
    phone;
    currentPage: number;
    limit: number;
  }, // Adjust the types here
  { rejectValue: ErrorType }
>(
  "search/company-admin",
  async (
    {
      company_Id,
      company_name,
      representative_name,
      person_incharge_name,
      email,
      currentPage,
      phone,
      limit,
    },
    thunkAPI
  ) => {
    try {

      const { admin } = thunkAPI.getState() as RootState;
      const data = await searchCompanyForAdmin(
        {
          company_Id,
          company_name,
          representative_name,
          person_incharge_name,
          email,
          phone,
          currentPage,
        },
        admin?.login?.token,
        limit
      );

      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

export const currentPartnerInfoThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("all/currentpartnersData", async (page, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllpatnersForAdmin(admin?.admin?.token, page);
    // console.log("Get All Partners", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getTransactionDetailsAdminThunk = createAsyncThunk<
  { transaction: any },
  { transactionId: string },
  { rejectValue: ErrorType }
>("get/transaction-details", async ({ transactionId }, thunkAPI) => {
  try {
    const data = await getTransactionDetailsAdmin(transactionId);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const fetchTransactionForAdminViewThunk = createAsyncThunk<
  { transaction: any },
  { transactionId: string },
  { rejectValue: ErrorType }
>("get/transaction-view", async ({ transactionId }, thunkAPI) => {
  try {
    const data = await fetchTransactionForAdminView(transactionId);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const allApprovedPartnersThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("all/partnersData", async (page, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await allApprovedPartners(admin?.admin?.token, page);
    // console.log("Get All Partners", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

//  admit  or aprove partners
export const admitPartnersAprrovalThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("admit/partners", async (userId, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await admitPartnersAprroval(userId, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

//  admit  or aprove partners
export const admitREmovePartnersAprrovalThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("change/partners", async (userId, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await admitREmovePartnersAprroval(userId, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const createNewsThunk = createAsyncThunk<
  any,
  FormData,
  { rejectValue: ErrorType }
>("news/create-news", async (formData, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await create_news(user?.user?.token, formData); // Call your API function to create news
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const newsTurnOffThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorType }
>("news/create-news", async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await newsTurnOff(id, user?.user?.token); // Call your API function to create news
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// get all Processes
export const adminGetAllProcessThunk = createAsyncThunk<
  any,
  { currentPage: number; limit: number },
  { rejectValue: ErrorType }
>("all/process-admin", async ({ currentPage, limit }, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    // const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllProcessForAdmin(currentPage, limit);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const serachProcessForAdminThunk = createAsyncThunk<
  any,
  {
    process_id: string;
    process_name: string;
    status: string;
    seller_id: string;
    seller_name: string;
    currentPage: number;
    limit: number;
  },
  { rejectValue: ErrorType }
>(
  "search/process-admin",
  async (
    {
      process_id,
      process_name,
      status,
      seller_id,
      seller_name,
      currentPage,
      limit,
    },
    thunkAPI
  ) => {
    try {
      const data = await serachProcessForAdmin(
        {
          process_id,
          process_name,
          status,
          seller_id,
          seller_name,
          currentPage,
        },
        limit
      );
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

// get all inquries
export const adminGetAllInquriesThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("all/inquries-admin", async (currentPage, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    // const { admin } = thunkAPI.getState() as RootState;
    const data = await adminGetAllInquries(currentPage);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// delete enquiry
export const adminDeleteInquiryThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/enquiry-admin", async (id, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await deleteEnquiryForAdmin(id, admin?.login?.token);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});



// delete company info
export const deleteCompanyInfoThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/companyinfo-admin", async (id, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await deleteComapnyInfoAdmin(id, admin?.login?.token);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});



// delete company info
export const deleteProcessInfoThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/processinfo-admin", async (id, thunkAPI) => {
  try {
    const data = await deleteProcessInfoAdmin(id);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});



// delete news info
export const deleteNewsInfoThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/newsinfo-admin", async (id, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await deleteNewsInfoAdmin(id, admin?.login?.token);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// delete order
export const deleteOrderInfoThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/orderinfo-admin", async (id, thunkAPI) => {
  try {
    const data = await deleteOrderInfoAdmin(id);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});


// delete partener info
export const deletePartnerInfoThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/partnerinfo-admin", async (id, thunkAPI) => {
  try {
    console.log("Get All Partners success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await deletePartnerInfoAdmin(id, admin?.login?.token);
    console.log("Get All Procsses for admin", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});



export const getUserByIdforAdminThunk = createAsyncThunk<
  User,
  any,
  { rejectValue: ErrorType }
>("user/getUserById", async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getUserByIdforAdmin(id, user?.user?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    } else if (error?.response?.status === 500) {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    } else {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
});

//update user
export const updateUserByIdforAdminThunk = createAsyncThunk<
  User,
  any,
  { rejectValue: ErrorType }
>("admin/getUserById", async ({ uid, formData }, thunkAPI) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const parseAdminInfo = adminInfo ? JSON.parse(adminInfo) : null;
    console.log("parseAdminInfo", parseAdminInfo?.token);
    const data = await updateUserByIdforAdmin(
      uid,
      parseAdminInfo?.token,
      formData
    );
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    } else if (error?.response?.status === 500) {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    } else {
      localStorage.removeItem("userInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
});

//   create usage fee
export const createusagefeeMasterThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("add/rate", async (usagefeedata, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await createusagefeeMaster(usagefeedata, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// get all usage fee
export const getAllUsageFeeThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("all/usagefee", async (_, thunkAPI) => {
  try {
    console.log("Get All Usage fee success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllUsageFee(admin?.admin?.token);
    console.log("Get All Usage fee data", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// delete usage fee
export const deleteUsageFeeThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/usagefee", async (id, thunkAPI) => {
  try {
    console.log("delete Usage fee success", id);
    const { admin } = thunkAPI.getState() as RootState;
    const data = await deleteUsageFee(id, admin?.login?.token);
    console.log("Get All Usage fee data", data);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// update usage fee rate
export const updateAllUsageFeeThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("update/usagerate", async ({ id, usageData }, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await updateAllUsageFee(
      { id, usageData },
      admin?.login?.token
    );
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// add tax rate
export const createTaxRateThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("create/taxrate", async (taxdata, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await createTaxRate(taxdata, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getAllTaxRateThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/taxrate", async (_, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllTaxRate(admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// upper limit rate Thunk
export const createUpperLimitRateThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("add/upperlimitrate", async (ratedata, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await createUpperLimitRate(ratedata, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// get all mail templates
export const getUpperlimitThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/limit", async (_, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getLimit(admin?.admin?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const makeDefaultUsageFeeThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("make/default-usagefee", async ({ id, isDefault }, thunkAPI) => {
  try {
    const data = await makeDefaultUsageFee(id, isDefault);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// get all mail templates
export const getAllCategoriesThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/categories", async (_, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllCategories(admin?.admin?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const createParentCategoryThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("add/parentcategoty", async ({category_name}, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await createParentCategory(category_name, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const createSubCategoryThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>(
  "add/subcategory",
  async ({ category_name, parent_category_id }, thunkAPI) => {
    try {
      const { admin } = thunkAPI.getState() as RootState;
      const data = await createSubCategory(
        { category_name, parent_category_id },
        admin?.login?.token
      );
      console.log("token", admin?.login?.token);
      return data;
    } catch (error: Error | any) {
      if (error?.response?.status === 400)
        return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
      else if (error?.response?.status === 401)
        return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
      else if (error?.response?.status === 500)
        return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
      else return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);

// delete usage fee
export const deleteCategoryThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("delete/category", async (id, thunkAPI) => {
  try {
    console.log("delete Usage fee success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await deleteCategory(id, admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const updateCategoryThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("add/taxrate", async ({ category_name, id }, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await updateCategory(
      { category_name, id },
      admin?.login?.token
    );
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// get all mail templates
// get all mail templates
export const getAllMailTemplateThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("all/mailTemplate", async (_, thunkAPI) => {
  try {
    console.log("Get All Usage fee success");
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getAllMailtemplate(admin?.admin?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

// add commercial act
export const createCommerciaActThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("create/commericialAct", async ({ actData }, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await createCommerciaAct({ actData }, admin?.login?.token);
    console.log("token", admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getCommercialActThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("get/commercialAct", async (_, thunkAPI) => {
  try {
    const { admin } = thunkAPI.getState() as RootState;
    const data = await getCommercialAct(admin?.login?.token);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400)
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    else if (error?.response?.status === 401)
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    else if (error?.response?.status === 500)
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    else return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getMailTemplatesThunk = createAsyncThunk<
  {
    data: MailType[];
  },
  {},
  { rejectValue: ErrorType }
>("get/mailTemplates", async (_, thunkAPI) => {
  try {
    const data = await getMailTemplates();
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("adminInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    } else if (error?.response?.status === 500) {
      localStorage.removeItem("adminInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    } else {
      localStorage.removeItem("adminInfo");
      return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
});
