import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notificationAPI from "../services/notificationService";

export interface NotificationItem {
  _id: string;
  recipientType: string;
  recipientId: string;
  eventType: string;
  message: string;
  metadata?: any;
  read?: boolean;
  createdAt?: string;
}

interface NotificationsState {
  items: NotificationItem[];
  loading: boolean;
  error?: string | null;
}

const initialState: NotificationsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchStudentNotifications = createAsyncThunk(
  "notifications/fetchStudent",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const resp = await notificationAPI.getStudentNotifications(studentId);
      return resp.data.data as NotificationItem[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTeacherNotifications = createAsyncThunk(
  "notifications/fetchTeacher",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      console.log('[fetchTeacherNotifications] Thunk called with teacherId:', teacherId);
      const resp = await notificationAPI.getTeacherNotifications(teacherId);
      console.log('[fetchTeacherNotifications] Thunk received response:', resp.data);
      return resp.data.data as NotificationItem[];
    } catch (err: any) {
      console.error('[fetchTeacherNotifications] Error:', err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markRead",
  async ({ notificationId, recipientId }: { notificationId: string; recipientId: string }, { rejectWithValue }) => {
    try {
      const resp = await notificationAPI.markAsRead(notificationId, recipientId);
      return resp.data.data as NotificationItem;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async ({ recipientType, recipientId }: { recipientType: string; recipientId: string }, { rejectWithValue }) => {
    try {
      await notificationAPI.markAllRead(recipientType, recipientId);
      return { recipientType, recipientId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async ({ notificationId, recipientId }: { notificationId: string; recipientId: string }, { rejectWithValue }) => {
    try {
      await notificationAPI.deleteNotification(notificationId, recipientId);
      return notificationId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const sendAnnouncement = createAsyncThunk(
  "notifications/announce",
  async (payload: any, { rejectWithValue }) => {
    try {
      const resp = await notificationAPI.announce(payload);
      return resp.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStudentNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTeacherNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherNotifications.fulfilled, (state, action) => {
        console.log('[notificationsSlice] Teacher notifications fulfilled:', action.payload);
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTeacherNotifications.rejected, (state, action) => {
        console.error('[notificationsSlice] Teacher notifications rejected:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((it) => (it._id === updated._id ? updated : it));
      })

      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.items = state.items.map((it) => ({ ...it, read: true }));
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.items = state.items.filter((it) => it._id !== action.payload);
      });
  },
});

export default slice.reducer;
