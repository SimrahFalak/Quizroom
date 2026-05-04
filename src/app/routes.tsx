import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentSettings from "./pages/student/StudentSettings";
import QuizAttempt from "./pages/student/QuizAttempt";
import CourseDetail from "./pages/student/CourseDetail";
<<<<<<< HEAD
=======
import StudentResultDetail from "./pages/student/StudentResultDetail";
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherCourseDetail from "./pages/teacher/TeacherCourseDetail";
import TeacherQuizDetail from "./pages/teacher/TeacherQuizDetail";
import TeacherGradeAttempt from "./pages/teacher/TeacherGradeAttempt";
import CreateQuiz from "./pages/teacher/CreateQuiz";
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
      { path: "course/:courseId", Component: CourseDetail },
<<<<<<< HEAD
      { path: "quizzes", Component: StudentQuizzes },
      { path: "results", Component: StudentResults },
=======
      { path: "results/:attemptId", Component: StudentResultDetail },
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
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
      {
        path: "course/:courseId",
        Component: TeacherCourseDetail,
        children: [
          { path: "quiz/:quizId", Component: TeacherQuizDetail },
          { path: "quiz/:quizId/attempt/:studentId", Component: TeacherGradeAttempt },
          { path: "create-quiz", Component: CreateQuiz },
        ],
      },
      { path: "create-quiz", Component: CreateQuiz },
      { path: "notifications", Component: TeacherNotifications },
      { path: "settings", Component: TeacherSettings },
    ],
  },
]);