import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileAPI } from "../services/profileService.js";

interface ProfileState {
  student: any | null;
  teacher: any | null;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export const fetchStudentProfile = createAsyncThunk(
  "profile/fetchStudentProfile",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getStudentProfile(studentId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateStudentProfile = createAsyncThunk(
  "profile/updateStudentProfile",
  async ({ studentId, data }: { studentId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateStudentProfile(studentId, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const fetchTeacherProfile = createAsyncThunk(
  "profile/fetchTeacherProfile",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getTeacherProfile(teacherId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateTeacherProfile = createAsyncThunk(
  "profile/updateTeacherProfile",
  async ({ teacherId, data }: { teacherId: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await profileAPI.updateTeacherProfile(teacherId, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const initialState: ProfileState = {
  student: null,
  teacher: null,
  loading: false,
  error: null,
  isSuccess: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Student Profile
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch profile";
      });

    // Update Student Profile
    builder
      .addCase(updateStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update profile";
      });

    // Fetch Teacher Profile
    builder
      .addCase(fetchTeacherProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(fetchTeacherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch profile";
      });

    // Update Teacher Profile
    builder
      .addCase(updateTeacherProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
        state.isSuccess = true;
      })
      .addCase(updateTeacherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update profile";
      });
  },
});

export const { clearError, clearSuccess } = profileSlice.actions;
export default profileSlice.reducer;
