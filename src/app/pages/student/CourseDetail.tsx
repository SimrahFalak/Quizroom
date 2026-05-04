import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Clock, FileQuestion, Calendar, Trophy } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';
import { fetchStudentQuizzes, fetchStudentAttempts } from '../../store/quizSlice';
import { getStudentCourses } from '../../store/courseSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'quizzes' | 'results'>('quizzes');

  const { quizzes, attempts, loading, error } = useSelector((state: RootState) => state.quiz);
  const { courses: enrolledCourses } = useSelector((state: RootState) => state.course);
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch quizzes for the course
  useEffect(() => {
    if (user?.id && courseId) {
      dispatch(fetchStudentQuizzes({ studentId: user.id, courseId }));
    }
  }, [dispatch, user?.id, courseId]);

  // Fetch student attempts
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchStudentAttempts(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStudentCourses(user.id));
    }
  }, [dispatch, user?.id]);

  const selectedCourse = enrolledCourses.find((course: any) => String(course._id) === String(courseId));

  // Derive course information from enrolled course data first, then fall back to quizzes
  const courseQuizzes = courseId
    ? quizzes.filter((q: any) => String(q.course?._id || q.course) === String(courseId))
    : quizzes;

  const firstQuiz = courseQuizzes[0];
  const courseRef = firstQuiz?.course as
    | string
    | { _id?: string; title?: string; name?: string; description?: string }
    | undefined;
  const teacherRef = firstQuiz?.teacher as
    | string
    | { _id?: string; name?: string }
    | undefined;
  const courseTitle = selectedCourse?.title || (typeof courseRef === 'string' ? 'Course' : courseRef?.title || courseRef?.name || 'Course');
  const courseDescription = selectedCourse?.description || (typeof courseRef === 'string' ? '' : courseRef?.description || '');
  const instructorName = selectedCourse?.teacher?.name || (typeof teacherRef === 'string' ? 'Instructor' : teacherRef?.name || 'Instructor');

  const courseData = {
    id: parseInt(courseId || (typeof courseRef === 'string' ? courseRef : courseRef?._id || '1')),
    title: courseTitle,
    instructor: instructorName,
    description: courseDescription,
  };

  // Helper to check attempts for quizzes in this course
  const courseQuizIds = new Set(courseQuizzes.map((q: any) => String(q._id)));

  const isQuizAttempted = (quizId: string) => {
    return attempts.some((attempt: any) => {
      const attQuizId = String(attempt.quiz?._id || attempt.quiz);
      return attQuizId === String(quizId);
    });
  };

  // Get attempt for a quiz
  const getQuizAttempt = (quizId: string) => {
    return attempts.find((attempt: any) => String(attempt.quiz?._id || attempt.quiz) === String(quizId));
  };

  const courseStats = {
    totalQuizzes: quizzes.length,
    completedQuizzes: 0,
    averageScore: 0,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'missed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Build course results from student's attempts (filtered by course)
  const courseResults = attempts
    .filter((att: any) => {
      // attempt.quiz may be an object or an id
      const quizCourse = att.quiz?.course || att.quiz?.course?._id;
      // If quiz.course is an object id or string, compare to courseId
      if (!courseId) return false;
      try {
        return String(quizCourse) === String(courseId) || String(att.quiz?._id) === String(courseId);
      } catch {
        return false;
      }
    })
    .map((att: any) => {
      const feedback = (att.responses || [])
        .map((r: any) => r.remarks)
        .filter(Boolean)
        .join('\n');

      return {
        id: att._id,
        quizTitle: att.quiz?.title || 'Quiz',
        score: att.score ?? 0,
        totalMarks: att.maxScore ?? att.quiz?.totalMarks ?? 0,
        percentage: Math.round(att.percentage ?? 0),
        passFail: (att.percentage ?? 0) >= 50 ? 'Pass' : 'Fail',
        attemptDate: att.createdAt ? new Date(att.createdAt).toLocaleDateString() : '',
        feedback: feedback || 'No feedback provided yet.',
        raw: att,
      };
    });

  const reviewedCourseResults = courseResults.filter((result: any) => result.raw?.reviewedAt);

  courseStats.completedQuizzes = new Set(
    reviewedCourseResults.map((result: any) => String(result.raw?.quiz?._id || result.raw?.quiz))
  ).size;

  courseStats.averageScore = reviewedCourseResults.length > 0
    ? Math.round(
        reviewedCourseResults.reduce(
          (sum: number, result: any) => sum + (result.percentage || 0),
          0
        ) / reviewedCourseResults.length
      )
    : 0;

  return (
    <div className="space-y-8 min-h-screen">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{courseData.title}</h1>
          <p className="text-gray-600">by {courseData.instructor}</p>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#6C4EFF] mb-2">{courseStats.totalQuizzes}</div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{courseStats.completedQuizzes}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{courseStats.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
        {(['quizzes', 'results'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-6 cursor-pointer rounded-lg font-medium transition-all capitalize ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quizzes Tab */}
      {activeTab === 'quizzes' && (
        <div className="grid gap-6">
          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            // Error state
            <Card className="p-8 text-center border-red-200 bg-red-50">
              <p className="text-red-700 font-semibold">{error}</p>
            </Card>
          ) : quizzes.length === 0 ? (
            // Empty state
            <Card className="p-8 text-center">
              <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes available</h3>
              <p className="text-gray-500">No quizzes have been published for this course yet.</p>
            </Card>
          ) : (
            // Quizzes list
            quizzes.map((quiz: any) => {
              const isPublished = quiz.isPublished;
              const attempted = isQuizAttempted(quiz._id);
              const status = attempted ? 'completed' : isPublished ? 'published' : 'draft';
              
              return (
                <Card key={quiz._id} className="hover:shadow-xl transition-all">
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileQuestion className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{quiz.title}</h3>
                          <p className="text-sm text-gray-500">{courseData.title}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          attempted
                            ? 'bg-green-100 text-green-700'
                            : isPublished 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {status === 'completed' ? 'Completed' : status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{quiz.durationMinutes || 30} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileQuestion className="w-4 h-4" />
                          <span>{(quiz.questions?.length || 0)} questions</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{quiz.deadline ? new Date(quiz.deadline).toLocaleDateString() : 'No deadline'}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">{quiz.totalMarks || 0}</span> total marks
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      {attempted ? (
                        <Button
                          onClick={() => {
                            const attempt = getQuizAttempt(quiz._id);
                            navigate(`/student/results/${attempt?._id}`, { state: { attempt, quiz } });
                          }}
                          className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
                        >
                          View Results
                        </Button>
                      ) : isPublished ? (
                        <Button onClick={() => navigate(`/student/quiz/${quiz._id}`)}>
                          Start Quiz
                        </Button>
                      ) : (
                        <Button variant="ghost" disabled>
                          Not Published
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {courseResults.map((result) => (
            <Card key={result.id} className="hover:shadow-xl transition-all">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF]">
                  <Trophy className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{result.quizTitle}</h3>
                      <p className="text-sm text-gray-500">{result.attemptDate}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-semibold ${
                      result.passFail === 'Pass' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {result.passFail}
                    </span>
                  </div>

                  {/* Score Display */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Your Score</span>
                        <span className="text-2xl font-bold text-gray-800">
                          {result.score}/{result.totalMarks}
                        </span>
                      </div>
                      <ProgressBar percentage={result.percentage} />
                    </div>

                    {/* Feedback */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Teacher Feedback</p>
                      <p className="text-sm text-gray-600">{result.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {courseResults.length === 0 && (
            <Card className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No results yet. Complete some quizzes to see your results here.</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
