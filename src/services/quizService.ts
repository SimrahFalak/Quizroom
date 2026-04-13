import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Question type mapping from frontend to backend
export const questionTypeMap: Record<string, string> = {
  mcq: "MCQ_SINGLE",
  multiple: "MCQ_MULTIPLE",
  truefalse: "TRUE_FALSE",
  short: "SHORT_ANSWER",
  long: "LONG_ANSWER",
  file: "FILE_UPLOAD",
  numeric: "NUMERIC",
};

// Types
export interface QuizQuestion {
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer?: string | string[] | number | null;
  points: number;
  isAutoGradable?: boolean;
  numericTolerance?: number;
  allowedFileTypes?: string[];
}

export interface CreateQuizPayload {
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  deadline?: string;
  questions: QuizQuestion[];
  isPublished: boolean;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalMarks: number;
  deadline?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Quiz API methods
export const quizAPI = {
  // Create a new quiz
  createQuiz: async (
    teacherId: string,
    courseId: string,
    quizData: CreateQuizPayload
  ) => {
    const response = await axios.post<{ status: string; data: Quiz }>(
      `${API_BASE_URL}/teachers/${teacherId}/quizzes`,
      {
        ...quizData,
        courseId,
      }
    );
    return response.data.data;
  },

  // Get all quizzes for a teacher
  getTeacherQuizzes: async (teacherId: string) => {
    const response = await axios.get<{ status: string; data: Array<Quiz> }>(
      `${API_BASE_URL}/teachers/${teacherId}/quizzes`
    );
    return response.data.data;
  },

  // Get quiz by ID
  getQuizById: async (teacherId: string, quizId: string) => {
    const response = await axios.get<{ status: string; data: Quiz }>(
      `${API_BASE_URL}/teachers/${teacherId}/quizzes/${quizId}`
    );
    return response.data.data;
  },

  // Update quiz
  updateQuiz: async (
    teacherId: string,
    quizId: string,
    quizData: Partial<CreateQuizPayload>
  ) => {
    const response = await axios.patch<{ status: string; data: Quiz }>(
      `${API_BASE_URL}/teachers/${teacherId}/quizzes/${quizId}`,
      quizData
    );
    return response.data.data;
  },

  // Publish quiz
  publishQuiz: async (teacherId: string, quizId: string) => {
    const response = await axios.patch<{ status: string; data: Quiz }>(
      `${API_BASE_URL}/teachers/${teacherId}/quizzes/${quizId}/publish`,
      { isPublished: true }
    );
    return response.data.data;
  },

  // Get student's available quizzes for a course
  getStudentQuizzes: async (studentId: string, courseId?: string) => {
    const url = courseId
      ? `${API_BASE_URL}/students/${studentId}/quizzes?courseId=${courseId}`
      : `${API_BASE_URL}/students/${studentId}/quizzes`;
    const response = await axios.get<{ status: string; data: Array<Quiz> }>(url);
    return response.data.data;
  },
};

export default quizAPI;
