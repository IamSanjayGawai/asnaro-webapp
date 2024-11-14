import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProcess,
  getProcessById,
  getUserProcessesPrivate,
  getUserProcessesReleased,
  changeProcessStatus,
  getAllRecommendedProcess,
  updateProcessAdmin,
  addProcessAdmin,
  getAllUsageProcess,
} from "@/api/processApi";
import {
  ErrorType,
  BadRequest,
  Unauthorized,
  ServerError,
  Other,
} from "@/types/types";
import { RootState } from "../store";
import { totalProcessCount, processSearch } from "../../api/processApi";
import {
  getProcessesByUser,
  updateProcess,
  getAllProcess,
  getAllProcessWithUser,
} from "../../api/processApi";

export const processAddThunk = createAsyncThunk<
  any,
  FormData,
  { rejectValue: ErrorType }
>("process/add", async (userData, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await addProcess(userData, user?.user?.token);
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

export const processAddAdminThunk = createAsyncThunk<
  any,
  FormData,
  { rejectValue: ErrorType }
>("process/add-admin", async (userData, thunkAPI) => {
  try {
    const data = await addProcessAdmin(userData);
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

export const UserProcessListThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-processes-by-user", async (page, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getProcessesByUser(user?.user?.token, page);
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

export const UserProcessListReleasedThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-processes-released-by-user", async (page, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getUserProcessesReleased(user?.user?.token, page);
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

export const UserProcessListPrivateThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-processes-private-by-user", async (page, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getUserProcessesPrivate(user?.user?.token, page);
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

export const ChangeProcessStatusThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/change-process-status", async ({ id, status }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const res = await changeProcessStatus(user?.user?.token, id, status);
    return res;
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

export const totalProcessCountThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorType }
>("process/total-process-count", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const res = await totalProcessCount(user?.user?.token);
    return res;
  } catch (error: Error | any) {
    return thunkAPI.rejectWithValue(error?.response?.data as Other);
  }
});

export const getProcessDetailsThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-process-details", async (id, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getProcessById(user?.user?.token, id);
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

export const updateProcessThunk = createAsyncThunk<
  any,
  { formData: FormData; id: string },
  { rejectValue: ErrorType }
>("process/update-process", async ({ formData, id }, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await updateProcess(user?.user?.token, id, formData);
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

export const updateProcessAdminThunk = createAsyncThunk<
  any,
  { formData: FormData; id: string },
  { rejectValue: ErrorType }
>("process/update-process-admin", async ({ formData, id }, thunkAPI) => {
  try {
    const data = await updateProcessAdmin(id, formData);
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

export const getAllProcessListThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-processes-by-user", async (page, thunkAPI) => {
  try {
    const data = await getAllProcess(page);
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

export const getAllProcessListThunkWithUser = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-users-processess", async ({ uid, currentPage }, thunkAPI) => {
  try {
    const data = await getAllProcessWithUser(uid, currentPage);
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

export const getAllRecommendedProcessThunk = createAsyncThunk<
  any,
  void,
  { rejectValue: ErrorType }
>("process/get-users-recommended-processess", async (_, thunkAPI) => {
  try {
    const data = await getAllRecommendedProcess();
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

export const getAllUsageProcessThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: ErrorType }
>("process/get-users-usage-processess", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState() as RootState;
    const data = await getAllUsageProcess(user?.user?.token);
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

export const processSearchThunk = createAsyncThunk<
  any,
  {
    startDate?: string;
    endDate?: string;
    keyword?: string;
    cat?: string[];
    subCat?: string;
    pref?: string[];
    mun?: string[];
    page?: number;
    pageSize?: number;
  },
  { rejectValue: ErrorType }
>(
  "process/search",
  async (
    { startDate, endDate, keyword, cat, subCat, page, pageSize, pref, mun },
    thunkAPI
  ) => {
    try {
      const data = await processSearch(
        startDate,
        endDate,
        keyword,
        cat,
        subCat,
        pref,
        mun,
        page,
        pageSize
      );
      return data;
    } catch (error: Error | any) {
      return thunkAPI.rejectWithValue(error?.response?.data as Other);
    }
  }
);
