import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function TeacherQuizDetail() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'submissions' | 'results'>('details');

  // Mock quiz data
  const quizData = {
    id: parseInt(quizId || '1'),
    title: 'Web Development Quiz 1',
    duration: 30,
    totalMarks: 100,
    questionsCount: 20,
    createdDate: 'March 5, 2026',
    deadline: 'March 15, 2026',
  };

  // Mock questions
  const questions = [
    {
      id: 1,
      question: 'What is the correct syntax for a React functional component?',
      type: 'mcq',
      marks: 5,
    },
    {
      id: 2,
      question: 'Which of the following are React hooks?',
      type: 'multiple',
      marks: 5,
    },
    {
      id: 3,
      question: 'React is a JavaScript library for building user interfaces.',
      type: 'truefalse',
      marks: 5,
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
      quiz: 'Web Development Quiz 1',
      score: 0,
      totalMarks: 100,
      submissionTime: '1 hour ago',
      status: 'Pending',
    },
    {
      student: 'Charlie Davis',
      quiz: 'Web Development Quiz 1',
      score: 88,
      totalMarks: 100,
      submissionTime: '30 minutes ago',
      status: 'Graded',
    },
    {
      student: 'Diana Prince',
      quiz: 'Web Development Quiz 1',
      score: 0,
      totalMarks: 100,
      submissionTime: '5 minutes ago',
      status: 'Pending',
    },
  ];

  // Mock results
  const results = [
    {
      id: 1,
      student: 'Alice Johnson',
      score: 92,
      totalMarks: 100,
      percentage: 92,
      passFail: 'Pass',
      attemptDate: '2 hours ago',
      feedback: 'Excellent work! Keep it up.',
    },
    {
      id: 2,
      student: 'Bob Smith',
      score: 78,
      totalMarks: 100,
      percentage: 78,
      passFail: 'Pass',
      attemptDate: '1 day ago',
      feedback: 'Good effort. Review fundamentals.',
    },
    {
      id: 3,
      student: 'Charlie Davis',
      score: 88,
      totalMarks: 100,
      percentage: 88,
      passFail: 'Pass',
      attemptDate: '2 days ago',
      feedback: 'Great performance!',
    },
  ];

  const stats = {
    totalSubmissions: submissions.length,
    pendingGrading: submissions.filter(s => s.status === 'Pending').length,
    averageScore: Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length),
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{quizData.title}</h1>
          <p className="text-gray-600">{quizData.totalMarks} marks • {quizData.questionsCount} questions • {quizData.duration} minutes</p>
        </div>
      </div>

      {/* Quiz Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#6C4EFF] mb-2">{stats.totalSubmissions}</div>
            <div className="text-sm text-gray-600">Total Submissions</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingGrading}</div>
            <div className="text-sm text-gray-600">Pending Grading</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
        {(['details', 'submissions', 'results'] as const).map((tab) => (
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

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quiz Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Deadline</p>
                <p className="text-gray-800">{quizData.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Created Date</p>
                <p className="text-gray-800">{quizData.createdDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-gray-800">{quizData.duration} minutes</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Questions ({questions.length})</h2>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="pb-4 border-b border-gray-100 last:border-0">
                  <p className="font-medium text-gray-800 mb-2">
                    Q{index + 1}. {question.question}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{question.type}</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">{question.marks} marks</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Submissions Tab */}
      {activeTab === 'submissions' && (
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quiz Submissions</h2>
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{submission.student}</h3>
                    <p className="text-sm text-gray-500">{submission.submissionTime}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {submission.status === 'Pending' ? '-' : `${submission.score}/${submission.totalMarks}`}
                      </div>
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

                    <button
                      onClick={() =>
                        navigate(
                          `/teacher/course/${courseId}/quiz/${quizId}/attempt/${encodeURIComponent(submission.student)}`,
                          { state: { submission } },
                        )
                      }
                      className="px-6 py-3 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      {submission.status === 'Pending' ? 'Grade Now' : 'View Submission'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {results.map((result) => (
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
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{result.student}</h3>
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
                        <span className="text-sm text-gray-600">Score</span>
                        <span className="text-2xl font-bold text-gray-800">
                          {result.score}/{result.totalMarks}
                        </span>
                      </div>
                      <ProgressBar percentage={result.percentage} />
                    </div>

                    {/* Feedback */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Your Feedback</p>
                      <p className="text-sm text-gray-600">{result.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
