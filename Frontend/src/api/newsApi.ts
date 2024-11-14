import axios from "axios";

// export const BASE_URL = "https://asnaro-backend-test.onrender.com";
export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

// export const get_notifications = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/news/all-news`
//       );
//       console.log('Get All News',response.data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

export const get_notifications = async (userToken: string) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : null;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken ? userToken : token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/news/news-notification`,
      config
    );
    console.log("Get All News with token", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get_news = async (token: string, page: number) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/news/all-news?page=${page}`,
      config
    );
    console.log(response.data, ">>>>>>>>>>>");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const get_news_admin = async (
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
      `${BASE_URL}/news/all-news-admin?page=${page}&limit=${limit}`,
      config
    );
    console.log(response.data, ">>>>>>>>>>>");
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
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      `${BASE_URL}/admin/update-news-admin/${id}`,
      formData,
      config
    );

    console.log("News created", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsById = async (token: string, id: any) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/news/get-by-id/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update_notification = async (
  token: string,
  notificationId: string,
  type: "notification" | "news",
  read: boolean
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const requestBody = { type, read }; // Create the request body object

    const response = await axios.put(
      `${BASE_URL}/news/update-notification/${notificationId}`,
      requestBody, // Pass the request body
      config
    );

    console.log("Notification updated", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const serachNotificationAdmin = async (
  { keyword, mod, currentPage },
  token: string,
  limit: number
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/news/search-notification-admin?page=${currentPage}&limit=${limit}`,
      { keyword, mod },
      config
    );
    console.log("search notification for admin", response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const serachNotificationForUser = async (
  { title, read, userId },
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/news/search-notification-user`,
      { title, read, userId },
      config
    );
    console.log("search notification for user", response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
