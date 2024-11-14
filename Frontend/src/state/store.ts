import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import processReducer from "./slices/processSlice";
import dashBoardReducer from "./slices/dashBoardSlice";
import newsReducer from "./slices/newsSlice";
import transactionReducer from "./slices/transactionSlice";
import adminReducer from "./slices/adminSlice";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    process: processReducer,
    dashBoard: dashBoardReducer,
    news: newsReducer,
    transaction: transactionReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
