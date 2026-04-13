import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  courseCode: string;
  status: string;
  teacher?: string;
  students?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface CreateCoursePayload {
  title: string;
  description?: string;
  status?: string;
}

interface JoinCoursePayload {
  courseCode: string;
}

const teacherAPI = {
  getCourses: (teacherId: string) =>
    axios.get(`${API_URL}/teachers/${teacherId}/courses`),
  getCourseById: (teacherId: string, courseId: string) =>
    axios.get(`${API_URL}/teachers/${teacherId}/courses/${courseId}`),
  createCourse: (teacherId: string, payload: CreateCoursePayload) =>
    axios.post(`${API_URL}/teachers/${teacherId}/courses`, payload),
  editCourse: (teacherId: string, courseId: string, payload: Partial<CreateCoursePayload>) =>
    axios.patch(`${API_URL}/teachers/${teacherId}/courses/${courseId}`, payload),
};

const studentAPI = {
  getCourses: (studentId: string) =>
    axios.get(`${API_URL}/students/${studentId}/courses/enrolled`),
  joinCourse: (studentId: string, payload: JoinCoursePayload) =>
    axios.post(`${API_URL}/students/${studentId}/courses/join`, payload),
};

export { teacherAPI, studentAPI };
