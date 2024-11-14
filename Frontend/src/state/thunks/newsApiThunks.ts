import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorType,
  BadRequest,
  Unauthorized,
  ServerError,
  Other,
} from "@/types/types";
import {
  get_notifications,
  get_news,
  getNewsById,
  update_notification,
  get_news_admin,
  serachNotificationAdmin,
  update_news,
  serachNotificationForUser,
} from "../../api/newsApi";
import { RootState } from "../store";
import { StringDecoder } from "string_decoder";

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

// get Notification
export const getNotificationThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorType }
>("news/notification", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await get_notifications(user?.user?.token);
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

export const getNewsDetailsThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("news/get-news-details", async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getNewsById(user?.user?.token, id); // Call your API function to fetch news by ID
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

export const getAdminNewsDetailsThunk = createAsyncThunk<
  any,
  string,
  { rejectValue: ErrorType }
>("news/get-admin-news-details", async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getNewsById(user?.user?.token, id); // Call your API function to fetch news by ID
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

export const updateNewsThunk = createAsyncThunk<
  FormData,
  any,
  { rejectValue: ErrorType }
>("news/update-news", async ({ formData, id }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await update_news(formData, id, user?.user?.token); // Call your API function to create news
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

// Update Notification
export const updateNotificationThunk = createAsyncThunk<
  any,
  { notificationId: string; type: "notification" | "news"; read: boolean }, // Wrap arguments in a single object
  { rejectValue: ErrorType }
>(
  "news/updateNotification",
  async ({ notificationId, type, read }, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState() as RootState;
      const data = await update_notification(
        user?.user?.token,
        notificationId,
        type,
        read
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

// Update Notification
export const serachNotificationForUserThunk = createAsyncThunk<
  any,
  { title: string; read: boolean; userId: StringDecoder }, // Wrap arguments in a single object
  { rejectValue: ErrorType }
>("news/search-notification", async ({ title, read, userId }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await serachNotificationForUser(
      { title, read, userId },
      user?.user?.token
    );
    console.log("Notification Search Results", data );
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

export const getAllNewsListThunk = createAsyncThunk<
  any,
  number,
  { rejectValue: ErrorType }
>("news/get-all-list-news", async (page, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await get_news(user?.user?.token, page);
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

export const getAllNewsListThunk_Admin = createAsyncThunk<
  any,
  { currentPage: number; limit: number },
  { rejectValue: ErrorType }
>("news/get-all-list-news-admin", async ({ currentPage, limit }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await get_news_admin(user?.user?.token, currentPage, limit);
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

export const updateNotifySocket = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorType }
>("news/notification-real-time", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await get_notifications(user?.user?.token);
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

export const serachNotificationAdminThunk = createAsyncThunk<
  any,
  { keyword: string; mod: string; currentPage: number; limit: number },
  { rejectValue: ErrorType }
>(
  "search/notification-admin",
  async ({ keyword, mod, currentPage, limit }, thunkAPI) => {
    try {
      console.log("Search process for admin");
      const { admin } = thunkAPI.getState() as RootState;
      const data = await serachNotificationAdmin(
        { keyword, mod, currentPage },
        admin?.login?.token,
        limit
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
