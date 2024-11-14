import axios from "axios";
// export const BASE_URL = "https://asnaro-backend-test.onrender.com";
export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const addProcess = async (processData: FormData, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/process/add`,
      processData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProcessAdmin = async (processData: FormData) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo).token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/process/add-admin`,
      processData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProcessesByUser = async (token: string, page: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/process/user-processes?page=${page}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProcessesReleased = async (token: string, page: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/process/released-processes?page=${page}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProcessesPrivate = async (token: string, page: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/process/private-processes?page=${page}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeProcessStatus = async (
  token: string,
  id: any,
  status: any
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/process/update-process-status`,
      { processId: id, status },
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProcessById = async (token: string, id: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/process/get-by-id/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProcess = async (
  token: string,
  id: any,
  processData: FormData
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/process/update/${id}`,
      processData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProcessAdmin = async (id: any, processData: FormData) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo).token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${BASE_URL}/process/update-admin/${id}`,
      processData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProcess = async (page: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/process/get-all-processes?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProcessWithUser = async (uid, currentPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/process/users/${uid}?page=${currentPage}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRecommendedProcess = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/process/recommended-processes`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsageProcess = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/user/current-usage-history`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const totalProcessCount = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/process/total-processes`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const processSearch = async (
//   startDate: string,
//   endDate: string,
//   keyword: string,
//   cat: string[],
//   subCat: string,
//   pref: string[],
//   mun: string[],
//   page: number,
//   pageSize: number
// ) => {
//   try {
//     const formattedMun =
//       mun && mun.length > 0 ? mun.map((m) => encodeURI(m)) : "";
//     const formattedPref =
//       pref && pref.length > 0 ? pref.map((p) => encodeURI(p)) : "";
//     const formattedCat =
//       cat && cat.length > 0 ? cat.map((c) => encodeURI(c)) : "";

//     const response = await axios.post(
//       `${BASE_URL}/process/search?startDate=${
//         startDate === "Invalid Date" ? "" : startDate
//       }&endDate=${endDate === "Invalid Date" ? "" : endDate}&keyword=${
//         keyword && keyword
//       }&cat=${formattedCat}&subCat=${subCat}&pref=${formattedPref}&mun=${formattedMun}&page=${page}&pageSize=${pageSize}`
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const processSearch = async (
  startDate?: string,
  endDate?: string,
  keyword?: string,
  cat?: string[],
  subCat?: string,
  pref?: string[],
  mun?: string[],
  page?: number,
  pageSize?: number
) => {
  try {
    const body = {
      startDate: startDate === "Invalid Date" ? "" : startDate,
      endDate: endDate === "Invalid Date" ? "" : endDate,
      keyword: keyword,
      cat: cat, // Assuming cat is already an array of strings
      subCat: subCat,
      pref: pref, // Assuming pref is already an array of strings
      mun: mun, // Assuming mun is already an array of strings
      page: page,
      pageSize: pageSize,
    };
    const response = await axios.post(`${BASE_URL}/process/search`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
