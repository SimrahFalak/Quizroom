import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Clock, FileQuestion, Plus } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';
import { Outlet } from 'react-router';
import {
  fetchCourseDetails,
  fetchCourseQuizzes,
  fetchCourseEnrolledStudents,
} from '../../store/courseDetailSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function TeacherCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'quizzes' | 'students'>('quizzes');

  const { courseDetails, quizzes, students, loading, error } = useSelector(
    (state: RootState) => state.courseDetail
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (courseId && user?.id) {
      dispatch(fetchCourseDetails({ teacherId: user.id, courseId }));
      dispatch(fetchCourseQuizzes({ teacherId: user.id, courseId }));
      dispatch(fetchCourseEnrolledStudents({ teacherId: user.id, courseId }));
    }
  }, [courseId, user?.id, dispatch]);

  const isQuizDetail = location.pathname.includes('/quiz/');
  const isCreateQuiz = location.pathname.includes('/create-quiz');
  const isChildRoute = isQuizDetail || isCreateQuiz;

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="h-32 bg-gray-200 rounded-xl animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="space-y-8 min-h-screen">
      {isChildRoute ? (
        <Outlet />
      ) : (
        <>
          {/* Header with Back Button and Create Quiz Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1">
              {courseDetails ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{courseDetails.title}</h1>
                  <p className="text-gray-600">{courseDetails.studentsEnrolled} students enrolled</p>
                </>
              ) : (
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              )}
            </div>
            <Button
              onClick={() => navigate(`/teacher/course/${courseId}/create-quiz`)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white"
            >
              <Plus className="w-4 h-4" />
              Create Quiz
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
            {(['quizzes', 'students'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 cursor-pointer rounded-lg font-medium transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
            <div className="grid gap-6">
              {loading && activeTab === 'quizzes' ? (
                <LoadingSkeleton />
              ) : quizzes.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes yet</h3>
                  <p className="text-gray-500 mb-4">Create your first quiz to get started</p>
                  <Button
                    onClick={() => navigate(`/teacher/course/${courseId}/create-quiz`)}
                    className="bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white"
                  >
                    Create Quiz
                  </Button>
                </Card>
              ) : (
                quizzes.map((quiz) => (
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
                            <p className="text-sm text-gray-500">{quiz.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            quiz.isPublished
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {quiz.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>

                        <div className="grid grid-cols-6 gap-4 items-center">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{quiz.durationMinutes} min</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileQuestion className="w-4 h-4" />
                            <span>{quiz.questionsCount} q's</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">{quiz.totalMarks}</span> marks
                          </div>
                          <div className="text-sm text-gray-600">
                            {quiz.attemptsCount} attempts
                          </div>
                          <div className="text-sm text-gray-600">
                            Avg: {quiz.avgScore.toFixed(1)}%
                          </div>

                          {/* Action Button */}
                          <button 
                            onClick={() => navigate(`/teacher/course/${courseId}/quiz/${quiz._id}`)}
                            className="px-6 py-2 bg-[#6C4EFF] text-white rounded-lg font-medium hover:bg-[#5a3fe0] transition-all cursor-pointer text-sm whitespace-nowrap"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              {loading && activeTab === 'students' ? (
                <LoadingSkeleton />
              ) : students.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No students enrolled yet</h3>
                  <p className="text-gray-500">When students join your course, they'll appear here</p>
                </Card>
              ) : (
                <Card>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Enrolled Students ({students.length})</h2>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Student</th>
                          <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Email</th>
                          <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Quizzes Taken</th>
                          <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Average Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded-full flex items-center justify-center text-white font-semibold">
                                  {student.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-800">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-600">{student.email}</td>
                            <td className="py-4 px-4 text-center">
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {student.quizzesTaken}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="w-48">
                                <ProgressBar percentage={student.averageScore} showLabel />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}


        </>
      )}
    </div>
  );
}
