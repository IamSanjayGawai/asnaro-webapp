import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  userRegisterThunk,
  userLoginThunk,
  PasswordResetThunk,
  termsAcceptedResponseThunk,
  termsAcceptedGetThunk,
  userLogOutThunk,
  deleteUserThunk,
  getUserByIdThunk,
  updateUserThunk,
  applyForPartnerThunk,
  ContactThunk,
  userRegisterAdminThunk,
} from "../thunks/userThunks";
import type { RootState } from "../store";

export interface UserState {
  loading?: boolean;
  otherLoading?: boolean;
  user?: any | null;
  adminRegisteredUser?: any | null;
  partnerResponse?: any | null;
  other?: any | null;
  contact?: any | null;
  termsAccepted?: any | null;
  passwordReset?: any | null;
  appErr?: any | null;
  registerAdminErr?: any | null;
  registerErr?: any | null;
  loginErr?: any | null;
  serverErr?: any | null;
}

const localStorageUser = localStorage.getItem("userInfo");
const userInfo = localStorageUser ? JSON.parse(localStorageUser) : null;

const initialState: UserState = {
  user: userInfo,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetContact: (state) => {
      state.contact = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegisterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userRegisterThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.registerErr = null;
      }
    );
    builder.addCase(
      userRegisterThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.registerErr = action.payload;
      }
    );

    builder.addCase(userRegisterAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userRegisterAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.adminRegisteredUser = action.payload;
        state.registerAdminErr = null;
      }
    );
    builder.addCase(
      userRegisterAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.registerAdminErr = action.payload;
      }
    );

    builder.addCase(userLoginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userLoginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        state.loginErr = null;
      }
    );
    builder.addCase(
      userLoginThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.loginErr = action.payload;
      }
    );
    builder.addCase(userLogOutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogOutThunk.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.appErr = null;
    });
    builder.addCase(
      userLogOutThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(PasswordResetThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      PasswordResetThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.passwordReset = action.payload;
      }
    );
    builder.addCase(
      PasswordResetThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(termsAcceptedResponseThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      termsAcceptedResponseThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.termsAccepted = action.payload;
      }
    );
    builder.addCase(
      termsAcceptedResponseThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(termsAcceptedGetThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      termsAcceptedGetThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.termsAccepted = action.payload;
      }
    );
    builder.addCase(
      termsAcceptedGetThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUserThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(
      deleteUserThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserByIdThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.other = action.payload;
      }
    );
    builder.addCase(
      getUserByIdThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(updateUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUserThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.other = action.payload;
      }
    );
    builder.addCase(
      updateUserThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(applyForPartnerThunk.pending, (state) => {
      state.otherLoading = true;
    });
    builder.addCase(
      applyForPartnerThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.otherLoading = false;
        state.partnerResponse = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      applyForPartnerThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.otherLoading = false;
        state.partnerResponse = null;
        state.appErr = action.payload?.message;
      }
    );

    builder.addCase(ContactThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      ContactThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.contact = action.payload;
      }
    );
    builder.addCase(
      ContactThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
  },
});

export const { resetContact } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
