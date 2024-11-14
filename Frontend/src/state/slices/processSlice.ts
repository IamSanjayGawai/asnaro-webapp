import {
  getProcessDetailsThunk,
  processAddThunk,
  updateProcessThunk,
  UserProcessListThunk,
  getAllProcessListThunkWithUser,
  UserProcessListReleasedThunk,
  UserProcessListPrivateThunk,
  ChangeProcessStatusThunk,
  totalProcessCountThunk,
  getAllRecommendedProcessThunk,
  getAllUsageProcessThunk,
  processSearchThunk,
  updateProcessAdminThunk,
  processAddAdminThunk,
} from "../thunks/processThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProcessState {
  loading?: boolean;
  adminProcessLoading?: boolean;
  adminProcess?: any | null;
  process?: any | null;
  processCount?: any | null;
  recommended?: any | null;
  usageProcess?: any | null;
  search?: any | null;
  status?: any | null;
  appErr?: any | null;
  serverErr?: any | null;
  isEditCalendar?: boolean;
  processloadings?: boolean;
}

const searchLocale = localStorage.getItem("search");
const searchInfo = searchLocale ? JSON.parse(searchLocale) : null;

const initialState: ProcessState = {
  search: searchInfo,
};

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    SearchAction: (state, action: PayloadAction<any>) => {
      state.search = action.payload;
      localStorage.setItem("search", JSON.stringify(action.payload));
    },
    EditCalendarAction: (state, action: PayloadAction<boolean>) => {
      state.isEditCalendar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(processAddThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      processAddThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      processAddThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(processAddAdminThunk.pending, (state) => {
      state.adminProcessLoading = true;
    });
    builder.addCase(
      processAddAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.adminProcessLoading = false;
        state.adminProcess = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      processAddAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.adminProcessLoading = false;
        state.adminProcess = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(UserProcessListThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      UserProcessListThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      UserProcessListThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getProcessDetailsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProcessDetailsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getProcessDetailsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(updateProcessThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateProcessThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      updateProcessThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(updateProcessAdminThunk.pending, (state) => {
      state.adminProcessLoading = true;
    });
    builder.addCase(updateProcessAdminThunk.fulfilled, (state) => {
      state.adminProcessLoading = false;
      state.appErr = null;
    });
    builder.addCase(
      updateProcessAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.adminProcessLoading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllProcessListThunkWithUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllProcessListThunkWithUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllProcessListThunkWithUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(UserProcessListReleasedThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      UserProcessListReleasedThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      UserProcessListReleasedThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(UserProcessListPrivateThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      UserProcessListPrivateThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      UserProcessListPrivateThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(ChangeProcessStatusThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      ChangeProcessStatusThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      ChangeProcessStatusThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(totalProcessCountThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      totalProcessCountThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.processCount = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      totalProcessCountThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.processCount = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllRecommendedProcessThunk.pending, (state) => {
      state.processloadings = true;
    });
    builder.addCase(
      getAllRecommendedProcessThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.processloadings = false;
        state.recommended = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllRecommendedProcessThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.recommended = null;
        state.appErr = action.payload;
      }
    );
    
    builder.addCase(getAllUsageProcessThunk.pending, (state) => {
      state.processloadings = true;
    });
    builder.addCase(
      getAllUsageProcessThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.processloadings = false;
        state.usageProcess = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllUsageProcessThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.usageProcess = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(processSearchThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      processSearchThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      processSearchThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );
  },
});

export const { SearchAction, EditCalendarAction } = processSlice.actions;
export const selectProcess = (state: RootState) => state.process;
export default processSlice.reducer;
