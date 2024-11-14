import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { partnerApproval } from "../thunks/dashBoardThunks";
import { RootState } from "../store";

interface DashBoardState {
  loading: boolean;
  approval?: any;
  approvalResponse?: any;
  appErr: any | null;
  serverErr: any | null;
}
let initialState: DashBoardState = {
  loading: false,
  appErr: null,
  serverErr: null,
};

export const dashBoardSlice = createSlice({
  name: "dashBoard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(partnerApproval.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      partnerApproval.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.approval = action.payload?.user?.partner_flg;
        state.appErr = null;
      }
    );
    builder.addCase(
      partnerApproval.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.approval = null;
        state.appErr = action.payload?.message;
      }
    );
  },
});

export const {} = dashBoardSlice.actions;
export const selectDashboard = (state: RootState) => state.dashBoard;
export default dashBoardSlice.reducer;
