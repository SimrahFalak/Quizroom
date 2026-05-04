# Frontend Modules and Architecture Report: Quizroom

## 1. Introduction
This report provides a comprehensive overview of the frontend architecture and module structure for the **Quizroom** project. Unlike the backend, which is heavily focused on implementing specific design patterns, the frontend is structured around functional modules, user roles, and distinct page views. Built with React and Vite, the frontend application separates concerns by dividing the interface into logical, role-based portals.

## 2. Public and Authentication Module
The public module is responsible for user onboarding, initial engagement, and secure access to the platform.

*   **Landing Page (`/`):** 
    *   The entry point of the application. It highlights the platform's features, provides navigation to authentication pages, and establishes the visual identity of Quizroom.
*   **Authentication Pages (`/login`, `/register`):** 
    *   These pages handle user verification and account creation. They include distinct flows for Students and Teachers, integrating with the backend authentication services to retrieve securely scoped access tokens.

## 3. Student Portal Module
The Student Portal is dedicated to the learning experience, allowing students to browse courses, take quizzes, and track their performance. All pages within this module are protected and wrapped within a shared `DashboardLayout`.

*   **Student Dashboard (`/student`):** 
    *   A high-level overview providing the student with immediate access to pending quizzes, recent grades, and overall course progress statistics.
*   **Course Explorer and Details (`/student/courses`, `/student/course/:courseId`):** 
    *   Allows students to view their enrolled courses and drill down into specific course details to find associated learning materials and assessments.
*   **Quiz Assessment Engine (`/student/quizzes`, `/student/quiz/:id`):** 
    *   The core interactive module where students participate in active assessments. The `QuizAttempt` page provides a focused, distraction-free environment for answering different types of questions within a specified time limit.
*   **Performance and Results (`/student/results`):** 
    *   A dedicated view for students to review their past quiz attempts, view detailed grading feedback from teachers, and analyze their overall performance trajectory.
*   **Notifications & Settings (`/student/notifications`, `/student/settings`):** 
    *   Pages managing real-time alerts (e.g., when a new quiz is published) and personal profile configurations.

## 4. Teacher Portal Module
The Teacher Portal focuses on course management, content creation, and student evaluation. Like the Student Portal, it utilizes the `DashboardLayout` but provides elevated administrative capabilities.

*   **Teacher Dashboard (`/teacher`):** 
    *   Provides educators with actionable analytics, such as class averages, recent student submissions needing review, and an overview of active courses.
*   **Course Management (`/teacher/courses`, `/teacher/course/:courseId`):** 
    *   Allows teachers to structure their classes, manage enrollments, and organize curriculum components.
*   **Quiz Creation Engine (`/teacher/create-quiz`, `/teacher/course/:courseId/quiz/:quizId`):** 
    *   A comprehensive interface allowing teachers to construct assessments. It supports adding various question types (MCQs, short answers, file uploads), defining grading strategies, and setting quiz deadlines and durations.
*   **Grading and Evaluation (`/teacher/course/:courseId/quiz/:quizId/attempt/:studentId`):** 
    *   A vital module that allows teachers to review individual student submissions. While auto-gradable questions are handled by the backend, this page provides the interface for teachers to manually grade subjective answers, adjust scores, and provide qualitative remarks.
*   **Notifications & Settings (`/teacher/notifications`, `/teacher/settings`):** 
    *   Provides teachers with alerts (e.g., when a student submits a quiz) and account management tools.

## 5. Shared Components and Layouts
To maintain visual consistency and avoid code duplication, the application employs shared structural components.

*   **Dashboard Layout (`DashboardLayout`):** 
    *   A higher-order wrapper used by both the Student and Teacher portals. It provides the persistent navigation sidebar, the top header bar (containing the user profile and notification bell), and defines the main content area where portal-specific pages are dynamically injected. This ensures a seamless and unified user experience across the entire application.

## 6. Conclusion
The frontend of the Quizroom project is systematically organized into distinct, role-based modules. By clearly separating the Student learning experience from the Teacher administrative tools, and abstracting common structural elements into shared layouts, the application ensures a scalable, maintainable, and highly intuitive user interface.
