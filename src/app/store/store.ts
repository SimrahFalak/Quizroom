import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import profileReducer from "./profileSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
