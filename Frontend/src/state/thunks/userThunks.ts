import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  passwordReset,
  confirmResetPassword,
  termsAccepted,
  termsAcceptedResponse,
  deleteUser,
  getUserById,
  post_approval,
  registerUserAdmin,
} from "@/api/authApi";
import {
  User,
  ErrorType,
  BadRequest,
  Unauthorized,
  ServerError,
  Other,
  SignInFormData,
} from "@/types/types";
import { RootState } from "../store";
import { updateUser } from "../../api/authApi";
import { ContactAdmin } from "@/api/admin";

export const userRegisterThunk = createAsyncThunk<
  User,
  FormData,
  { rejectValue: ErrorType }
>("user/register", async (userData, thunkAPI) => {
  try {
    const data = await registerUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const userRegisterAdminThunk = createAsyncThunk<
  User,
  FormData,
  { rejectValue: ErrorType }
>("user/register-admin", async (userData, thunkAPI) => {
  try {
    const data = await registerUserAdmin(userData);
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

export const userLoginThunk = createAsyncThunk<
  User,
  SignInFormData,
  { rejectValue: ErrorType }
>("user/login", async (userData: any, thunkAPI) => {
  try {
    const data = await loginUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const userLogOutThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("user/logout", async ({}, thunkAPI) => {
  try {
    localStorage.removeItem("userInfo");
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

export interface PasswordResetFormData {
  email: string;
}

export interface PasswordResetSuccessResponse {
  message: string;
}
export const PasswordResetThunk = createAsyncThunk<
  PasswordResetSuccessResponse, // Expected success response type
  PasswordResetFormData, // Expected input data type
  { rejectValue: ErrorType }
>("user/passwordReset", async (userData, thunkAPI) => {
  try {
    const data = await passwordReset(userData);
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

export interface ResetPasswordConfirmFormData {
  resetToken: string;
  newPassword: string;
}

// Define the expected response type for password reset confirmation
export interface ResetPasswordConfirmSuccessResponse {
  message: string;
}

export const resetPasswordConfirmThunk = createAsyncThunk<
  ResetPasswordConfirmSuccessResponse, // Expected success response type
  ResetPasswordConfirmFormData, // Expected input data type
  { rejectValue: ErrorType } // Type for rejectWithValue
>("user/resetPasswordConfirm", async (userData, thunkAPI) => {
  try {
    const data = await confirmResetPassword(userData);
    return data;
  } catch (error: Error | any) {
    if (error?.response?.status === 400) {
      return thunkAPI.rejectWithValue(error?.response?.data as BadRequest);
    } else if (error?.response?.status === 401) {
      return thunkAPI.rejectWithValue(error?.response?.data as Unauthorized);
    } else if (error?.response?.status === 500) {
      return thunkAPI.rejectWithValue(error?.response?.data as ServerError);
    } else {
      return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
});

export const termsAcceptedResponseThunk = createAsyncThunk<
  User,
  boolean,
  { rejectValue: ErrorType }
>("user/termsAcceptedResponse", async (input, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await termsAccepted(input, user?.user?.token);
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

export const termsAcceptedGetThunk = createAsyncThunk<
  User,
  any,
  { rejectValue: ErrorType }
>("user/termsAcceptedGetResponse", async ({}, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await termsAcceptedResponse(user?.user?.token);
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

export const updateUserThunk = createAsyncThunk<
  User,
  FormData,
  { rejectValue: ErrorType }
>("user/update", async (userData, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await updateUser(user?.user?.token, userData);
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

export const applyForPartnerThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorType }
>("user/applyForPartner", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await post_approval(user?.user?.token);
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

export const deleteUserThunk = createAsyncThunk<
  User,
  any,
  { rejectValue: ErrorType }
>("user/delete", async ({}, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await deleteUser(user?.user?.token);
    localStorage.removeItem("userInfo");
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

export const getUserByIdThunk = createAsyncThunk<
  User,
  any,
  { rejectValue: ErrorType }
>("user/getUserById", async ({}, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getUserById(user?.user?.token);
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

export const ContactThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("user/contact", async (contactData, thunkAPI) => {
  try {
    const data = await ContactAdmin(contactData);
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
