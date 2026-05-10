import apiClient from "./authService.js";

export const profileAPI = {
  // Student Profile
  getStudentProfile: (studentId: string) =>
    apiClient.get(`/students/${studentId}/profile`),

  updateStudentProfile: (studentId: string, data: any) =>
    apiClient.patch(`/students/${studentId}/profile`, data),

  uploadStudentProfilePicture: (studentId: string, file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return apiClient.post(`/students/${studentId}/profile/picture`, formData);
  },

  // Teacher Profile
  getTeacherProfile: (teacherId: string) =>
    apiClient.get(`/teachers/${teacherId}/profile`),

  updateTeacherProfile: (teacherId: string, data: any) =>
    apiClient.patch(`/teachers/${teacherId}/profile`, data),

  uploadTeacherProfilePicture: (teacherId: string, file: File) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return apiClient.post(`/teachers/${teacherId}/profile/picture`, formData);
  },
};

export default profileAPI;
