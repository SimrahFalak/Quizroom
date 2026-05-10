import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, FileQuestion, Trophy, TrendingUp } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCard from '../../components/dashboard/StatCard';
import CourseCard from '../../components/dashboard/CourseCard';
import { Card } from '../../components/ui/card';
import Calendar from '../../components/dashboard/Calendar';
import { getStudentCourses } from '../../store/courseSlice';
import { fetchStudentAttempts, fetchStudentQuizzes } from '../../store/quizSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { courses } = useSelector((state: RootState) => state.course);
  const { quizzes, attempts } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStudentCourses(user.id));
      dispatch(fetchStudentQuizzes({ studentId: user.id }));
      dispatch(fetchStudentAttempts(user.id));
    }
  }, [dispatch, user?.id]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const hasEnrolledCourses = courses.length > 0;
  const studentCourseIds = new Set(courses.map((course: any) => String(course._id)));

  // Keep only quizzes that belong to the student's enrolled courses.
  const studentQuizzes = hasEnrolledCourses
    ? quizzes.filter((quiz: any) => {
        const courseId = String(quiz.courseId || quiz.course?._id || quiz.course || '');
        return studentCourseIds.has(courseId);
      })
    : [];

  const studentQuizIds = new Set(studentQuizzes.map((quiz: any) => String(quiz._id)));

  // Keep only attempts for the student's enrolled-course quizzes.
  const studentAttempts = hasEnrolledCourses
    ? attempts.filter((attempt: any) => {
        const attemptQuizId = String(attempt.quiz?._id || attempt.quiz || '');
        if (studentQuizIds.has(attemptQuizId)) {
          return true;
        }

        const attemptCourseId = String(
          attempt.quiz?.course?._id || attempt.quiz?.course || ''
        );
        return studentCourseIds.has(attemptCourseId);
      })
    : [];

  const attemptedQuizIds = new Set(
    studentAttempts.map((attempt: any) => String(attempt.quiz?._id || attempt.quiz))
  );

  const upcomingQuizzes = studentQuizzes
    .filter((quiz: any) => Boolean(quiz.deadline))
    .filter((quiz: any) => new Date(quiz.deadline) >= now)
    .filter((quiz: any) => !attemptedQuizIds.has(String(quiz._id || quiz)))
    .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const nearestQuiz = upcomingQuizzes[0];
  const nearestQuizDate = nearestQuiz?.deadline ? new Date(nearestQuiz.deadline) : null;

  const totalQuizzes = studentQuizzes.length;

  const averageScore =
    studentAttempts.length > 0
      ? Math.round(
          studentAttempts.reduce((sum: number, attempt: any) => sum + Number(attempt.percentage || 0), 0) /
            studentAttempts.length
        )
      : 0;

  const stats = [
    { title: 'Total Courses', value: courses.length, icon: BookOpen, color: '#6C4EFF' },
    { title: 'Total Quizzes', value: totalQuizzes, icon: FileQuestion, color: '#FFA500' },
    { title: 'Quizzes Completed', value: studentAttempts.length, icon: TrendingUp, color: '#FF6B9D' },
    { title: 'Average Score', value: `${averageScore}%`, icon: Trophy, color: '#00D084' },
  ];

  const dashboardCourses = courses.slice(0, 4).map((course: any) => ({
    courseId: course._id,
    title: course.title,
    instructor: course.teacher?.name ? `by ${course.teacher.name}` : 'by Instructor',
    rating: 5,
  }));

  const quizDaySet = new Set(
    upcomingQuizzes
      .filter((quiz: any) => Boolean(quiz.deadline))
      .map((quiz: any) => new Date(quiz.deadline))
      .filter((date: Date) => date.getMonth() === currentMonth && date.getFullYear() === currentYear)
      .map((date: Date) => date.getDate())
  );

  const calendarDates = [
    { date: now.getDate(), type: 'today' as const },
    ...Array.from(quizDaySet).map((day) => ({ date: day, type: 'quiz' as const })),
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner userName={user?.name || 'Student'} role="student" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">

  {/* Next Quiz Deadline */}
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 py-3">
            <div className="flex items-center justify-between">
              {nearestQuiz && nearestQuizDate ? (
                <>
                  <div>
                    <div className="text-5xl font-bold text-[#FF6B9D] mb-2">
                      {nearestQuizDate.getDate()}
                    </div>
                    <div className="text-sm text-gray-600">
                      of {nearestQuizDate.toLocaleString('default', { month: 'long' })}
                    </div>
                  </div>
                  <div className="flex-1 ml-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Next quiz deadline</h3>
                    <p className="text-gray-600">{nearestQuiz.title}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/student/quiz/${nearestQuiz._id}`)}
                    className="px-6 py-3 bg-[#FF6B9D] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Attempt Quiz
                  </button>
                </>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Next quiz deadline</h3>
                  <p className="text-gray-600">No upcoming quizzes yet.</p>
                </div>
              )}
            </div>
          </Card>

          {/* My Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">My courses</h2>
              <button className="text-[#6C4EFF] font-semibold hover:underline">
                More
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {dashboardCourses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>

        

         

        
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
         
          {/* Calendar */}
          <Calendar markedDates={calendarDates} />
 
        </div>
      </div>
    </div>
  );
}
