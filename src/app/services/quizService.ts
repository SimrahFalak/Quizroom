import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Question types mapping for display
export const questionTypeMap: Record<string, string> = {
  MCQ_SINGLE: "Multiple Choice (Single)",
  MCQ_MULTIPLE: "Multiple Choice (Multiple)",
  TRUE_FALSE: "True/False",
  SHORT_ANSWER: "Short Answer",
  LONG_ANSWER: "Long Answer",
  FILE_UPLOAD: "File Upload",
  NUMERIC: "Numeric",
  mcq: "Multiple Choice (Single)",
  multiple: "Multiple Choice (Multiple)",
  truefalse: "True/False",
  true_false: "True/False",
  short: "Short Answer",
  short_answer: "Short Answer",
  long: "Long Answer",
  long_answer: "Long Answer",
  file: "File Upload",
  numeric: "Numeric",
};

// Question interface
export interface Question {
  type: string;
  prompt?: string;
  question?: string;
  options: string[];
  correctAnswer: string | string[] | number | null;
  points?: number;
  marks?: number;
  isAutoGradable?: boolean;
  numericTolerance?: number;
  allowedFileTypes?: string[];
}

// Quiz interface
export interface Quiz {
  _id: string;
  title: string;
  description: string;
  totalMarks: number;
  durationMinutes: number;
  questionsCount?: number;
  attemptsCount?: number;
  avgScore?: number;
  isPublished?: boolean;
  deadline?: string;
  course?: string;
  teacher?: string;
  questions?: Question[];
  gradingStrategy?: string;
}

// Create quiz payload
export interface CreateQuizPayload {
  title: string;
  description?: string;
  durationMinutes?: number;
  deadline?: string;
  gradingStrategy?: string;
  questions?: Question[];
}

// Update quiz payload
export interface UpdateQuizPayload extends Partial<CreateQuizPayload> {}

// Quiz API methods
const quizAPI = {
  // Teacher endpoints
  createQuiz: async (teacherId: string, courseId: string, payload: CreateQuizPayload) => {
    const response = await axios.post(`${API_URL}/teachers/${teacherId}/quizzes`, {
      ...payload,
      courseId,
    });
    return response.data.data;
  },

  getTeacherQuizzes: async (teacherId: string) => {
    const response = await axios.get(`${API_URL}/teachers/${teacherId}/quizzes`);
    return response.data.data;
  },

  getQuizById: async (teacherId: string, quizId: string) => {
    const response = await axios.get(`${API_URL}/teachers/${teacherId}/quizzes/${quizId}`);
    return response.data.data;
  },

  getTeacherQuizById: async (teacherId: string, quizId: string) => {
    const response = await axios.get(`${API_URL}/teachers/${teacherId}/quizzes/${quizId}`);
    return response.data.data;
  },

  updateQuiz: async (teacherId: string, quizId: string, payload: UpdateQuizPayload) => {
    const response = await axios.patch(`${API_URL}/teachers/${teacherId}/quizzes/${quizId}`, payload);
    return response.data.data;
  },

  publishQuiz: async (teacherId: string, quizId: string) => {
    const response = await axios.patch(`${API_URL}/teachers/${teacherId}/quizzes/${quizId}/publish`, {});
    return response.data.data;
  },

  addQuestionsToQuiz: async (teacherId: string, quizId: string, questions: Question[]) => {
    const response = await axios.post(`${API_URL}/teachers/${teacherId}/quizzes/${quizId}/questions`, { questions });
    return response.data.data;
  },

  getQuizAttempts: async (teacherId: string, quizId: string) => {
    const response = await axios.get(`${API_URL}/teachers/${teacherId}/quizzes/${quizId}/attempts`);
    return response.data.data;
  },

  updateQuizAttemptReview: async (
    teacherId: string,
    quizId: string,
    attemptId: string,
    responses: Array<{ questionId: string; obtainedPoints?: number; remarks?: string }>
  ) => {
    const response = await axios.patch(
      `${API_URL}/teachers/${teacherId}/quizzes/${quizId}/attempts/${attemptId}`,
      { responses }
    );
    return response.data.data;
  },

  // Student endpoints
  getStudentQuizzes: async (studentId: string, courseId?: string) => {
    let response;
    if (courseId) {
      response = await axios.get(`${API_URL}/students/${studentId}/courses/${courseId}/quizzes`);
    } else {
      response = await axios.get(`${API_URL}/students/${studentId}/quizzes`);
    }
    return response.data.data;
  },

  getPublishedQuizzes: async () => {
    const response = await axios.get(`${API_URL}/students/quizzes`);
    return response.data.data;
  },

  getPublishedQuizById: async (quizId: string) => {
    const response = await axios.get(`${API_URL}/students/quizzes/${quizId}`);
    return response.data.data;
  },

  getQuizForAttempt: async (quizId: string) => {
    const response = await axios.get(`${API_URL}/students/quizzes/${quizId}`);
    return response.data.data;
  },

  submitAttempt: async (studentId: string, quizId: string, payload: any) => {
    const response = await axios.post(`${API_URL}/students/${studentId}/quizzes/${quizId}/attempts`, {
      responses: payload.responses,
      timeSpent: payload.timeSpent,
    });
    return response.data.data;
  },

  getStudentAttempts: async (studentId: string) => {
    const response = await axios.get(`${API_URL}/students/${studentId}/attempts`);
    return response.data.data;
  },
};

export default quizAPI;
