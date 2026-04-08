import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Search, Filter, Clock, FileQuestion, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';
import { Outlet } from 'react-router';

export default function TeacherCourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'quizzes' | 'students' | 'submissions'>('quizzes');

  // Mock course data
  const courseData = {
    id: parseInt(courseId || '1'),
    title: 'Web Development',
    studentsEnrolled: 48,
    quizzesCreated: 12,
    averageScore: 85,
  };

  // Mock quizzes
  const allQuizzes = [
    {
      id: 1,
      title: 'Web Development Quiz 1',
      duration: '30 min',
      totalMarks: 100,
      createdDate: 'March 5, 2026',
      questionsCount: 20,
      status: 'active',
    },
    {
      id: 2,
      title: 'HTML & CSS Basics',
      duration: '25 min',
      totalMarks: 80,
      createdDate: 'March 8, 2026',
      questionsCount: 15,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'JavaScript Fundamentals',
      duration: '45 min',
      totalMarks: 120,
      createdDate: 'March 10, 2026',
      questionsCount: 25,
      status: 'pending',
    },
    {
      id: 4,
      title: 'React Basics',
      duration: '40 min',
      totalMarks: 100,
      createdDate: 'February 28, 2026',
      questionsCount: 22,
      status: 'active',
    },
  ];

  // Mock students
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@university.edu',
      quizzesTaken: 12,
      averageScore: 88,
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@university.edu',
      quizzesTaken: 10,
      averageScore: 75,
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@university.edu',
      quizzesTaken: 11,
      averageScore: 92,
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana@university.edu',
      quizzesTaken: 9,
      averageScore: 68,
    },
  ];

  // Mock submissions
  const submissions = [
    {
      student: 'Alice Johnson',
      quiz: 'Web Development Quiz 1',
      score: 92,
      totalMarks: 100,
      submissionTime: '2 hours ago',
      status: 'Graded',
    },
    {
      student: 'Bob Smith',
      quiz: 'JavaScript Fundamentals',
      score: 0,
      totalMarks: 120,
      submissionTime: '1 hour ago',
      status: 'Pending',
    },
    {
      student: 'Charlie Davis',
      quiz: 'React Basics',
      score: 88,
      totalMarks: 100,
      submissionTime: '30 minutes ago',
      status: 'Graded',
    },
    {
      student: 'Diana Prince',
      quiz: 'HTML & CSS Basics',
      score: 0,
      totalMarks: 80,
      submissionTime: '5 minutes ago',
      status: 'Pending',
    },
  ];

  const isQuizDetail = location.pathname.includes('/quiz/');

  return (
    <div className="space-y-8">
      {isQuizDetail ? (
        <Outlet />
      ) : (
        <>
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
              <p className="text-gray-600">{courseData.studentsEnrolled} students • {courseData.quizzesCreated} quizzes</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
            {(['quizzes', 'students', 'submissions'] as const).map((tab) => (
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

          {/* Quizzes Tab */}
          {activeTab === 'quizzes' && (
            <div className="grid gap-6">
              {allQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-xl transition-all">
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
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 capitalize">
                          {quiz.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{quiz.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FileQuestion className="w-4 h-4" />
                          <span>{quiz.questionsCount} questions</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{quiz.createdDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">{quiz.totalMarks}</span> total marks
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="ml-auto flex-shrink-0">
                          <button 
                            onClick={() => navigate(`/teacher/course/${courseId}/quiz/${quiz.id}`)}
                            className="px-6 py-3 bg-[#6C4EFF] text-white rounded-lg font-medium hover:bg-[#5a3fe0] transition-all cursor-pointer"
                          >
                            View Quiz
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Enrolled Students</h2>

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
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Quiz Submissions</h2>
              </div>

              <div className="space-y-4">
                {submissions.map((submission, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{submission.student}</h3>
                        <p className="text-sm text-gray-500">{submission.quiz}</p>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">
                            {submission.status === 'Pending' ? '-' : `${submission.score}/${submission.totalMarks}`}
                          </div>
                          <div className="text-xs text-gray-500">{submission.submissionTime}</div>
                        </div>

                        <span
                          className={`px-4 py-2 rounded-full font-semibold text-sm ${
                            submission.status === 'Graded'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {submission.status}
                        </span>

                        <button className="px-6 py-3 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                          {submission.status === 'Pending' ? 'Grade Now' : 'View Submission'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
