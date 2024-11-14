import axios from "axios";

// export const BASE_URL = "https://asnaro-backend-test.onrender.com";
export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const get_approval = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/user/get-user`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const post_approval = async (token: string) => {
//     try {
//       console.log(token, "api call");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.post(
//         `${BASE_URL}/admin/apply-for-partner`,
//         null,  // Data to be sent in the request body, set to null if there's no data
//         config
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   export const loginUser = async (userData: SignUpFormData) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/user/login`, userData, {
//         withCredentials: true, // This is important
//       });
//       console.log(response, BASE_URL, "response from login");
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

// export const post_approval = async (token) => {
//     try {
//       console.log(token, "api call");
//       const config = {
//         withCredentials: true,  // Add this line      headers: {
//           Authorization: `Bearer ${token}`,
//         }

//       const response = await axios.get(
//         `${BASE_URL}/admin/apply-for-partner`,
//         // Data to be sent in the request body, set to null if there's no data
//         config
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
