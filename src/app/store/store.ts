import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import profileReducer from "./profileSlice.js";
import courseReducer from "./courseSlice.js";
import courseDetailReducer from "./courseDetailSlice.js";
import quizReducer from "./quizSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    courseDetail: courseDetailReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
