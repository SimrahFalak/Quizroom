import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import profileReducer from "./profileSlice.js";
import courseReducer from "./courseSlice.js";
import courseDetailReducer from "./courseDetailSlice.js";
import quizReducer from "./quizSlice.js";
<<<<<<< HEAD
=======
import notificationsReducer from "./notificationsSlice";
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    course: courseReducer,
    courseDetail: courseDetailReducer,
    quiz: quizReducer,
<<<<<<< HEAD
=======
    notifications: notificationsReducer,
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
