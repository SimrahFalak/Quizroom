import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseDetailAPI, {
  CourseDetails,
  Quiz,
  EnrolledStudent,
  Submission,
} from "../../services/courseDetailService";

interface CourseDetailState {
  courseDetails: CourseDetails | null;
  quizzes: Quiz[];
  students: EnrolledStudent[];
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
}

const initialState: CourseDetailState = {
  courseDetails: null,
  quizzes: [],
  students: [],
  submissions: [],
  loading: false,
  error: null,
  success: false,
  message: "",
};

// Async thunks
export const fetchCourseDetails = createAsyncThunk(
  "courseDetail/fetchCourseDetails",
  async (
    { teacherId, courseId }: { teacherId: string; courseId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await courseDetailAPI.getCourseDetails(teacherId, courseId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course details"
      );
    }
  }
);

export const fetchCourseQuizzes = createAsyncThunk(
  "courseDetail/fetchCourseQuizzes",
  async (
    { teacherId, courseId }: { teacherId: string; courseId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await courseDetailAPI.getCourseQuizzes(teacherId, courseId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quizzes"
      );
    }
  }
);

export const fetchCourseEnrolledStudents = createAsyncThunk(
  "courseDetail/fetchCourseEnrolledStudents",
  async (
    { teacherId, courseId }: { teacherId: string; courseId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await courseDetailAPI.getCourseEnrolledStudents(
        teacherId,
        courseId
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);

export const fetchCourseSubmissions = createAsyncThunk(
  "courseDetail/fetchCourseSubmissions",
  async (
    { teacherId, courseId }: { teacherId: string; courseId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await courseDetailAPI.getCourseSubmissions(
        teacherId,
        courseId
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch submissions"
      );
    }
  }
);

const courseDetailSlice = createSlice({
  name: "courseDetail",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch Course Details
    builder
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.courseDetails = action.payload;
        state.success = true;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Course Quizzes
    builder
      .addCase(fetchCourseQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
        state.success = true;
      })
      .addCase(fetchCourseQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Enrolled Students
    builder
      .addCase(fetchCourseEnrolledStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseEnrolledStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.success = true;
      })
      .addCase(fetchCourseEnrolledStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Course Submissions
    builder
      .addCase(fetchCourseSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
        state.success = true;
      })
      .addCase(fetchCourseSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess } = courseDetailSlice.actions;
export default courseDetailSlice.reducer;
