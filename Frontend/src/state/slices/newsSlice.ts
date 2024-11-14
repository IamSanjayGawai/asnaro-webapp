import {
  getNotificationThunk,
  getAllNewsListThunk,
  getNewsDetailsThunk,
  updateNotificationThunk,
  getAdminNewsDetailsThunk,
  serachNotificationAdminThunk,
  updateNewsThunk,
  serachNotificationForUserThunk,
  getAllNewsListThunk_Admin
} from "../thunks/newsApiThunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NewsState {
  loading: boolean;
  notificationLoading: boolean;
  process: any | null;
  news: any | null;
  processCount: any | null;
  status: any | null;
  appErr: any | null;
  serverErr: any | null;
  newsAll: any | null;
  adminNewsDetails : any| null;
  newNotification: boolean;
  newsSearchData: any | null;

}
const initialState: NewsState = {
  loading: false,
  notificationLoading: false,
  process: null,
  news: null,
  newsAll: null,
  adminNewsDetails:null,
  newNotification:false,
  processCount: null,
  status: null,
  appErr: null,
  serverErr: null,
  newsSearchData:null
};
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewNotification:(state,action)=>{
       state.newNotification=action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationThunk.pending, (state) => {
      state.notificationLoading = true;
    });
    builder.addCase(
      getNotificationThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.news = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getNotificationThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.news = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(serachNotificationAdminThunk.pending, (state) => {
      state.notificationLoading = true;
    });
    builder.addCase(
      serachNotificationAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.newsSearchData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      serachNotificationAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.newsSearchData = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllNewsListThunk_Admin.pending, (state) => {
      state.notificationLoading = true;
    });
    builder.addCase(
      getAllNewsListThunk_Admin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.newsSearchData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllNewsListThunk_Admin.rejected,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.newsSearchData = null;
        state.appErr = action.payload;
      }
    );

    //update notification mark as read
    builder.addCase(updateNotificationThunk.pending, (state) => {
      state.notificationLoading = true;
    });
    
    builder.addCase(
      updateNotificationThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        // Update the state for the specific notification that was marked as read
        if (state.news && action.payload) {
          const updatedNotificationIndex = state.news.data.findIndex(
            (notification) => notification._id === action.payload._id
          );
          if (updatedNotificationIndex !== -1) {
            state.news.data[updatedNotificationIndex] = action.payload;
          }
        }
        state.appErr = null;
      }
    );
    
    builder.addCase(
      updateNotificationThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.notificationLoading = false;
        state.appErr = action.payload;
      }
    );
    // top page news thunk
    builder.addCase(getAllNewsListThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllNewsListThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.newsAll = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllNewsListThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.newsAll = null;
        state.appErr = action.payload;
      }
    );
    builder.addCase(getNewsDetailsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getNewsDetailsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getNewsDetailsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.process = null;
        state.appErr = action.payload;
      }
    );
    builder.addCase(serachNotificationForUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      serachNotificationForUserThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.news = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      serachNotificationForUserThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.news = null;
        state.appErr = action.payload;
      }
    );
    builder.addCase(getAdminNewsDetailsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAdminNewsDetailsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminNewsDetails = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAdminNewsDetailsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminNewsDetails = null;
        state.appErr = action.payload;
      }
    );


    builder.addCase(  updateNewsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        updateNewsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminNewsDetails = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
        updateNewsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminNewsDetails = null;
        state.appErr = action.payload;
      }
    );

  
  },

});
export const {setNewNotification} = newsSlice.actions;
export const selectNews = (state: RootState) => state.news;
export default newsSlice.reducer;
