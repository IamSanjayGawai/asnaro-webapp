import axios from "axios";
import { searchDataType, SignUpFormData } from "../types/types";

// export const BASE_URL = "https://asnaro-backend-test.onrender.com";
export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const ContactAdmin = async (contactData: FormData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/contact-email`,
      contactData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// admin login
export const loginAdmin = async (userData: SignUpFormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, userData, {
      withCredentials: true, // This is important
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCompanyInfo = async (
  token: string,
  page: number,
  limit: number
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${BASE_URL}/admin/get-all-componies?page=${page}&limit=${limit}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllpatnersForAdmin = async (token: string, page: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/get-all-partners?page=${page}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const allApprovedPartners = async (token: string, page: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/get-all-approved-partners?page=${page}`,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const admitPartnersAprroval = async (userId, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/apply-for-partners-admin`,

      { userId },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const admitREmovePartnersAprroval = async (userId, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/applyremove-partners-admin`,

      { userId },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactionDetailsAdmin = async (transactionId: string) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/get-transaction-details/${transactionId}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTransactionForAdminView = async (transactionId: string) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/fetch-transaction-view/${transactionId}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderSearchAdmin = async (
  searchData: searchDataType,
  page: any
) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/search-orders?page=${page}`,
      searchData,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeTransactionDetailsAdmin = async (
  transactionId: string,
  status: number,
  previousStatus: number
) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/admin/change-transaction-details/${transactionId}`,
      {
        transaction_status: status,
        prevStatus: previousStatus,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrdersAdmin = async (page: any) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/get-all-orders?page=${page}`,
      { pageSize: 5 },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProcessForAdmin = async (currentPage, limit) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/process/get-all-processes-admin?page=${currentPage}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// search comapny info for admin
// export const serachCompanyForAdmin = async ({ company_Id, company_name, representative_name, person_incharge_name, email, phone, currentPage }, token: string,limit) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await axios.post(
//       `${BASE_URL}/admin/search-companyinfo-admin?page=${currentPage}&limit=${limit}`

//       { company_Id, company_name, representative_name, person_incharge_name, email, phone  },
//       config
//     );
//     console.log("search process for admin", response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const searchCompanyForAdmin = async (
  {
    company_Id,
    company_name,
    representative_name,
    person_incharge_name,
    email,
    phone,
    currentPage,
  },
  token,
  limit
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/search-comapnyinfo-admin?page=${currentPage}&limit=${limit}`,
      {
        company_Id,
        company_name,
        representative_name,
        person_incharge_name,
        email,
        phone,
      },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const serachProcessForAdmin = async (
  { process_id, process_name, status, seller_id, seller_name, currentPage },
  limit: number
) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo) : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/search-process-admin?page=${currentPage}&limit=${limit}`,
      { process_id, process_name, status, seller_id, seller_name },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create_news = async (token: string, formData: FormData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure correct content type for form data
      },
    };

    const response = await axios.post(
      `${BASE_URL}/admin/add-news-admin`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update_news = async (
  formData: FormData,
  id: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure correct content type for form data
      },
    };

    const response = await axios.post(
      `${BASE_URL}/admin/update-news-admin/${id}`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newsTurnOff = async (id: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/update-news/privacy/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminGetAllInquries = async (currentPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/admin/all/inquiries?page=${currentPage}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete enquiry
export const deleteEnquiryForAdmin = async (id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/delete/enquiry/${id}`,

      id,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete company info
export const deleteComapnyInfoAdmin = async (id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/delete/company-info`,
      { id },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete process
export const deleteProcessInfoAdmin = async (id) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo) : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/delete/process`,
      {id},
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete news
export const deleteNewsInfoAdmin = async (id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/delete/news-info/${id}`,

      id,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete Order
export const deleteOrderInfoAdmin = async (id) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo).token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/delete/order-info`,
      { id },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete Order
export const deletePartnerInfoAdmin = async (id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/delete/partner-info/${id}`,

      id,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdforAdmin = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/get-user-by-id-admin/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserByIdforAdmin = async (id, token, formData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/admin/update-user/${id}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// create usage rate master api

export const createusagefeeMaster = async (usagefeedata, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/default-usage`,
      usagefeedata,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get all usage rate master api

export const getAllUsageFee = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/default-usages`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMailtemplate = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/mail-templates`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMailTemplate = async (data: {
  data: {
    template: string;
    subject: string;
    header: string;
    footer: string;
    detail: string;
  };
}) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/admin/update-mail-template`,
      JSON.stringify(data),
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//create  upper limit rate api

export const createUpperLimitRate = async (upperlimitData, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/upper-amount-limit`,

      upperlimitData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLimit = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/get-upperlimits`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//create tax rate api

export const createTaxRate = async (taxRate, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/add-tax`,

      taxRate,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTaxRate = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}/admin/get-tax`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//update usage rate master api

export const updateAllUsageFee = async ({ id, usageData }, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(
      `${BASE_URL}/admin/update-usage/${id}`,
      usageData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete usage rate master api
export const deleteUsageFee = async (id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${BASE_URL}/admin/delete-usage/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makeDefaultUsageFee = async (id, isDefault) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/make-default-usage/${id}`,
      { isDefault },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/getall-categories`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//create tax rate api

export const createParentCategory = async (category_name, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/create-categories`,
      {category_name, rank : 1},
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSubCategory = async (
  { category_name, parent_category_id },
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/create-subcategorie`,

      { category_name, parent_category_id },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${BASE_URL}/admin/category-delete/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async ({ category_name, id }, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/edit-categories/${id}`,

      { category_name },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCommerciaAct = async ({ actData }, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/create-commercial-act`,

      { actData },
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommercialAct = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/get-commercial-act`,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMailTemplates = async () => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/admin/mail-templates`,
      config
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo)?.token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/admin/get-all-users`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
