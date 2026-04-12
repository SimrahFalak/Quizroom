import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../services/authService.js";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  institute: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  status: string;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    institute: string;
    role: string;
  };
  token: string;
}

export const registerStudent = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/registerStudent",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authAPI.registerStudent(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const registerTeacher = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/registerTeacher",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authAPI.registerTeacher(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const loginStudent = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/loginStudent",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authAPI.loginStudent(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loginTeacher = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/loginTeacher",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authAPI.loginTeacher(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk<null, void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    institute: string;
    role: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  })(),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register Student
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed";
      });

    // Register Teacher
    builder
      .addCase(registerTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed";
      });

    // Login Student
    builder
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      });

    // Login Teacher
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Logout failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
