import axios from "axios";

const API_URL = "http://localhost:5000/api";

const notificationAPI = {
  getStudentNotifications: (studentId: string) =>
    axios.get(`${API_URL}/students/${studentId}/notifications`),
  getTeacherNotifications: (teacherId: string) =>
    axios.get(`${API_URL}/teachers/${teacherId}/notifications`),
  markAsRead: (notificationId: string, recipientId: string) =>
    axios.patch(`${API_URL}/notifications/${notificationId}/read`, { recipientId }),
  markAllRead: (recipientType: string, recipientId: string) =>
    axios.patch(`${API_URL}/notifications/mark-all-read`, { recipientType, recipientId }),
  deleteNotification: (notificationId: string, recipientId: string) =>
    axios.delete(`${API_URL}/notifications/${notificationId}`, { data: { recipientId } }),
  announce: (payload: any) => axios.post(`${API_URL}/notifications/announce`, payload),
};

export default notificationAPI;
