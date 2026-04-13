import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { teacherAPI, studentAPI } from "../services/courseService.js";

interface Course {
  _id: string;
  title: string;
  description: string;
  courseCode: string;
  status: string;
  teacher?: any;
  students?: string[];
  createdAt?: string;
  updatedAt?: string;
  // Display properties
  studentsEnrolled?: number;
  quizzesCreated?: number;
  averageScore?: number;
  instructor?: string;
  nextQuiz?: string;
}

interface CreateCoursePayload {
  title: string;
  description?: string;
  status?: string;
}

interface JoinCoursePayload {
  courseCode: string;
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  success: false,
  message: "",
};

// Teacher thunks
export const getTeacherCourses = createAsyncThunk<Course[], string>(
  "course/getTeacherCourses",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.getCourses(teacherId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
    }
  }
);

export const createCourse = createAsyncThunk<Course, { teacherId: string; payload: CreateCoursePayload }>(
  "course/createCourse",
  async ({ teacherId, payload }, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.createCourse(teacherId, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create course");
    }
  }
);

export const editCourse = createAsyncThunk<
  Course,
  { teacherId: string; courseId: string; payload: Partial<CreateCoursePayload> }
>(
  "course/editCourse",
  async ({ teacherId, courseId, payload }, { rejectWithValue }) => {
    try {
      const response = await teacherAPI.editCourse(teacherId, courseId, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to edit course");
    }
  }
);

// Student thunks
export const getStudentCourses = createAsyncThunk<Course[], string>(
  "course/getStudentCourses",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await studentAPI.getCourses(studentId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
    }
  }
);

export const joinCourse = createAsyncThunk<Course, { studentId: string; payload: JoinCoursePayload }>(
  "course/joinCourse",
  async ({ studentId, payload }, { rejectWithValue }) => {
    try {
      const response = await studentAPI.joinCourse(studentId, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to join course");
    }
  }
);

const courseSlice = createSlice({
  name: "course",
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
    // Get Teacher Courses
    builder
      .addCase(getTeacherCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.success = true;
      })
      .addCase(getTeacherCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Course
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
        state.success = true;
        state.message = "Course created successfully";
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Edit Course
    builder
      .addCase(editCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.success = true;
        state.message = "Course updated successfully";
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Student Courses
    builder
      .addCase(getStudentCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.success = true;
      })
      .addCase(getStudentCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Join Course
    builder
      .addCase(joinCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
        state.success = true;
        state.message = "Successfully joined the course";
      })
      .addCase(joinCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess } = courseSlice.actions;
export default courseSlice.reducer;
