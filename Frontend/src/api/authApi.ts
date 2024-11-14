// authApi.ts

import axios from "axios";
import { SignUpFormData } from "../types/types";

// export const BASE_URL = "https://asnaro-backend-test.onrender.com";
export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const registerUser = async (userData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUserAdmin = async (userData: FormData) => {
  try {
    const adminInfo = localStorage.getItem("adminInfo");
    const token = adminInfo ? JSON.parse(adminInfo).token : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/user/register-user-by-admin`,
      userData,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: SignUpFormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, userData, {
      withCredentials: true, // This is important
    });
    console.log(response, BASE_URL, "response from login");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface PasswordResetFormData {
  email: string;
}

export const passwordReset = async (userData: PasswordResetFormData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/request-reset-password`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface ResetPasswordConfirmFormData {
  resetToken: string;
  newPassword: string;
}

export const confirmResetPassword = async (
  userData: ResetPasswordConfirmFormData
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/resetpassword`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const termsAcceptedResponse = async (token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/api/v1/auth/member/terms-accepted-get`,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const termsAccepted = async (termsAccepted: boolean, token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/terms-accepted`,
      { Terms_accepted: termsAccepted },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (token: string, userData: FormData) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/update-user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/delete-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post_approval = async (token: string) => {
  try {
    console.log(token, "post_approval");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/user/apply-for-partner`,
      config
    );
    console.log(response, "response from post_approval");
    return response.data;
  } catch (error) {
    throw error;
  }
};
