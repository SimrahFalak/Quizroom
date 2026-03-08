import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../components/ui/card';
import ProgressBar from '../../components/ui/ProgressBar';

export default function StudentResults() {
  const results = [
    {
      id: 1,
      quizTitle: 'Web Development Quiz 3',
      course: 'Web Development',
      score: 85,
      totalMarks: 100,
      percentage: 85,
      passFail: 'Pass',
      attemptDate: 'March 5, 2026',
      feedback: 'Excellent work! Keep it up.',
    },
    {
      id: 2,
      quizTitle: 'Data Science Mid-term',
      course: 'Data Science',
      score: 72,
      totalMarks: 100,
      percentage: 72,
      passFail: 'Pass',
      attemptDate: 'March 3, 2026',
      feedback: 'Good effort. Review topic 5.',
    },
    {
      id: 3,
      quizTitle: 'Mobile Development Quiz 1',
      course: 'Mobile Development',
      score: 45,
      totalMarks: 100,
      percentage: 45,
      passFail: 'Fail',
      attemptDate: 'March 1, 2026',
      feedback: 'Need more practice on fundamentals.',
    },
  ];

  const overallStats = {
    totalQuizzes: 12,
    averageScore: 76,
    passRate: 83,
    improvement: '+8%',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Results</h1>
        <p className="text-gray-600">View your quiz performance and analytics</p>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-3xl font-bold text-[#6C4EFF] mb-2">{overallStats.totalQuizzes}</div>
          <div className="text-sm text-gray-600">Total Quizzes</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{overallStats.averageScore}%</div>
          <div className="text-sm text-gray-600">Average Score</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{overallStats.passRate}%</div>
          <div className="text-sm text-gray-600">Pass Rate</div>
        </Card>
        <Card className="text-center">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-green-600 mb-2">
            <TrendingUp className="w-8 h-8" />
            {overallStats.improvement}
          </div>
          <div className="text-sm text-gray-600">Improvement</div>
        </Card>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-xl transition-all">
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                result.passFail === 'Pass' 
                  ? 'bg-gradient-to-br from-green-400 to-green-600' 
                  : 'bg-gradient-to-br from-red-400 to-red-600'
              }`}>
                <Trophy className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{result.quizTitle}</h3>
                    <p className="text-sm text-gray-500">{result.course} • {result.attemptDate}</p>
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
                <div className="grid md:grid-cols-2 gap-6 mb-4">
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

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#6C4EFF] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                    View Detailed Results
                  </button>
                  {result.passFail === 'Fail' && (
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all">
                      Retake Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
