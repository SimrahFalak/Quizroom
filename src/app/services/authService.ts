import axios, { AxiosInstance } from "axios";

const API_BASE_URL: string = ((import.meta as any).env).VITE_API_URL || "http://localhost:5000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For FormData, remove the Content-Type header to let axios set it automatically with the boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  registerStudent: (data: any) =>
    apiClient.post("/auth/student/register", data),
  
  registerTeacher: (data: any) =>
    apiClient.post("/auth/teacher/register", data),
  
  loginStudent: (data: any) =>
    apiClient.post("/auth/student/login", data),
  
  loginTeacher: (data: any) =>
    apiClient.post("/auth/teacher/login", data),
  
  logout: () =>
    apiClient.post("/auth/logout"),

  verifyToken: () =>
    apiClient.get("/auth/verify"),
};

export default apiClient;
