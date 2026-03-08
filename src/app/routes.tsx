import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import StudentResults from "./pages/student/StudentResults";
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentSettings from "./pages/student/StudentSettings";
import QuizAttempt from "./pages/student/QuizAttempt";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import CreateQuiz from "./pages/teacher/CreateQuiz";
import StudentProgress from "./pages/teacher/StudentProgress";
import TeacherNotifications from "./pages/teacher/TeacherNotifications";
import TeacherSettings from "./pages/teacher/TeacherSettings";
import DashboardLayout from "./layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/student",
    Component: DashboardLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "courses", Component: StudentCourses },
      { path: "quizzes", Component: StudentQuizzes },
      { path: "results", Component: StudentResults },
      { path: "notifications", Component: StudentNotifications },
      { path: "settings", Component: StudentSettings },
      { path: "quiz/:id", Component: QuizAttempt },
    ],
  },
  {
    path: "/teacher",
    Component: DashboardLayout,
    children: [
      { index: true, Component: TeacherDashboard },
      { path: "courses", Component: TeacherCourses },
      { path: "create-quiz", Component: CreateQuiz },
      { path: "student-progress", Component: StudentProgress },
      { path: "notifications", Component: TeacherNotifications },
      { path: "settings", Component: TeacherSettings },
    ],
  },
]);