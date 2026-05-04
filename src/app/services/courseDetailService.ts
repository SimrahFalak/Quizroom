import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Types
export interface CourseDetails {
  _id: string;
  title: string;
  description: string;
  courseCode: string;
  teacher: {
    _id: string;
    name: string;
    email: string;
  };
  studentsEnrolled: number;
  students: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  totalMarks: number;
  durationMinutes: number;
  questionsCount: number;
  attemptsCount: number;
  avgScore: number;
  isPublished: boolean;
  deadline?: string;
}

export interface EnrolledStudent {
  _id: string;
  name: string;
  email: string;
  quizzesTaken: number;
  averageScore: number;
}

export interface Submission {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  quiz: {
    _id: string;
    title: string;
    totalMarks: number;
  };
  obtainedMarks: number;
  percentage: number;
  isGraded: boolean;
  createdAt: string;
}

// Teacher API methods
export const courseDetailAPI = {
  // Get course details
  getCourseDetails: async (teacherId: string, courseId: string) => {
    const response = await axios.get<{ status: string; data: CourseDetails }>(
      `${API_BASE_URL}/teachers/${teacherId}/courses/${courseId}`
    );
    return response.data.data;
  },

  // Get quizzes for a course
  getCourseQuizzes: async (teacherId: string, courseId: string) => {
    const response = await axios.get<{ status: string; results: number; data: Array<Quiz> }>(
      `${API_BASE_URL}/teachers/${teacherId}/courses/${courseId}/quizzes`
    );
    return response.data.data;
  },

  // Get enrolled students for a course
  getCourseEnrolledStudents: async (teacherId: string, courseId: string) => {
    const response = await axios.get<{ status: string; results: number; data: Array<EnrolledStudent> }>(
      `${API_BASE_URL}/teachers/${teacherId}/courses/${courseId}/students`
    );
    return response.data.data;
  },

  // Get submissions for a course
  getCourseSubmissions: async (teacherId: string, courseId: string) => {
    const response = await axios.get<{ status: string; results: number; data: Array<Submission> }>(
      `${API_BASE_URL}/teachers/${teacherId}/courses/${courseId}/submissions`
    );
    return response.data.data;
  },
};

export default courseDetailAPI;
