import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorType,
  BadRequest,
  Unauthorized,
  ServerError,
  Other,
} from "@/types/types";
import { get_approval } from "../../api/dashboardApi";
import { RootState } from "../store";

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

// export const partnerAproval = createAsyncThunk<{ rejectValue: ErrorType }>(
//   "admin/post_aproval",
//    async(token) => {
//     try {
//       const response = await get_approval(token: string);
//       return response;
//     } catch (error: Error | any) {}
//   }
// );

export const partnerApproval = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorType }
>("partner/approval", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await get_approval(user?.user?.token);
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
