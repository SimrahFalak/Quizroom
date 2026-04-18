import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizAPI, { CreateQuizPayload, Quiz } from "../services/quizService";

interface QuizState {
  quizzes: Quiz[];
  attempts: any[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
}

const initialState: QuizState = {
  quizzes: [],
  attempts: [],
  currentQuiz: null,
  loading: false,
  error: null,
  success: false,
  message: "",
};

// Async thunks
export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async (
    {
      teacherId,
      courseId,
      quizData,
    }: { teacherId: string; courseId: string; quizData: CreateQuizPayload },
    { rejectWithValue }
  ) => {
    try {
      const data = await quizAPI.createQuiz(teacherId, courseId, quizData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create quiz"
      );
    }
  }
);

export const fetchTeacherQuizzes = createAsyncThunk(
  "quiz/fetchTeacherQuizzes",
  async (teacherId: string, { rejectWithValue }) => {
    try {
      const data = await quizAPI.getTeacherQuizzes(teacherId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quizzes"
      );
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  "quiz/fetchQuizById",
  async (
    { teacherId, quizId }: { teacherId: string; quizId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await quizAPI.getQuizById(teacherId, quizId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quiz"
      );
    }
  }
);

export const publishQuiz = createAsyncThunk(
  "quiz/publishQuiz",
  async (
    { teacherId, quizId }: { teacherId: string; quizId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await quizAPI.publishQuiz(teacherId, quizId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to publish quiz"
      );
    }
  }
);

export const fetchStudentQuizzes = createAsyncThunk(
  "quiz/fetchStudentQuizzes",
  async (
    {
      studentId,
      courseId,
    }: { studentId: string; courseId?: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await quizAPI.getStudentQuizzes(studentId, courseId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quizzes"
      );
    }
  }
);

export const fetchQuizForAttempt = createAsyncThunk(
  "quiz/fetchQuizForAttempt",
  async (quizId: string, { rejectWithValue }) => {
    try {
      const data = await quizAPI.getQuizForAttempt(quizId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quiz"
      );
    }
  }
);

export const submitQuizAttempt = createAsyncThunk(
  "quiz/submitQuizAttempt",
  async (
    {
      studentId,
      quizId,
      answers,
      timeSpent,
    }: { studentId: string; quizId: string; answers: any; timeSpent: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await quizAPI.submitAttempt(studentId, quizId, {
        responses: answers,
        timeSpent,
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit quiz"
      );
    }
  }
);

export const fetchStudentAttempts = createAsyncThunk(
  "quiz/fetchStudentAttempts",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const data = await quizAPI.getStudentAttempts(studentId);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attempts"
      );
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
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
    // Create Quiz
    builder
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.push(action.payload);
        state.success = true;
        state.message = "Quiz created successfully";
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Teacher Quizzes
    builder
      .addCase(fetchTeacherQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchTeacherQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Quiz By ID
    builder
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Publish Quiz
    builder
      .addCase(publishQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
        state.success = true;
        state.message = "Quiz published successfully";
      })
      .addCase(publishQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Student Quizzes
    builder
      .addCase(fetchStudentQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchStudentQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Quiz For Attempt
    builder
      .addCase(fetchQuizForAttempt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizForAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(fetchQuizForAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Submit Quiz Attempt
    builder
      .addCase(submitQuizAttempt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuizAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = "Quiz submitted successfully";
      })
      .addCase(submitQuizAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Student Attempts
    builder
      .addCase(fetchStudentAttempts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentAttempts.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = action.payload;
      })
      .addCase(fetchStudentAttempts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess } = quizSlice.actions;
export default quizSlice.reducer;
