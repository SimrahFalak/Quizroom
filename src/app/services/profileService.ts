import apiClient from "./authService.js";

export const profileAPI = {
  // Student Profile
  getStudentProfile: (studentId: string) =>
    apiClient.get(`/students/${studentId}/profile`),

  updateStudentProfile: (studentId: string, data: any) =>
    apiClient.patch(`/students/${studentId}/profile`, data),

  // Teacher Profile
  getTeacherProfile: (teacherId: string) =>
    apiClient.get(`/teachers/${teacherId}/profile`),

  updateTeacherProfile: (teacherId: string, data: any) =>
    apiClient.patch(`/teachers/${teacherId}/profile`, data),
};

export default profileAPI;
