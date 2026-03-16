import { Search, Download, Filter } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';

export default function StudentProgress() {
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@university.edu',
      quizzesTaken: 12,
      averageScore: 88,
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@university.edu',
      quizzesTaken: 10,
      averageScore: 75,
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'Charlie Davis',
      email: 'charlie@university.edu',
      quizzesTaken: 11,
      averageScore: 92,
      lastActive: '3 hours ago',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana@university.edu',
      quizzesTaken: 9,
      averageScore: 68,
      lastActive: '5 hours ago',
    },
  ];

  const recentSubmissions = [
    {
      student: 'Alice Johnson',
      quiz: 'Web Development Quiz 5',
      score: 92,
      totalMarks: 100,
      submissionTime: '2 hours ago',
      status: 'Graded',
    },
    {
      student: 'Bob Smith',
      quiz: 'Data Science Mid-term',
      score: 78,
      totalMarks: 100,
      submissionTime: '1 day ago',
      status: 'Graded',
    },
    {
      student: 'Charlie Davis',
      quiz: 'Mobile Development Quiz 3',
      score: 0,
      totalMarks: 100,
      submissionTime: '3 hours ago',
      status: 'Pending',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Progress</h1>
          <p className="text-gray-600">Track and monitor student performance</p>
        </div>
        <Button className="flex items-center gap-2 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">
          <Download className="w-5 h-5" />
          Export Report
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none bg-white"
          />
        </div>
        <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl flex items-center gap-2 hover:border-[#6C4EFF] transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Students List */}
      <Card>
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Students</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Student</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Quizzes Taken</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Average Score</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Last Active</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Action</th>
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
                  <td className="py-4 px-4 text-sm text-gray-600">{student.lastActive}</td>
                  <td className="py-4 px-4 text-center">
                    <button className="px-4 py-2 bg-[#6C4EFF] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Submissions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Submissions</h2>
          <button className="text-[#6C4EFF] font-semibold hover:underline">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {recentSubmissions.map((submission, index) => (
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
    </div>
  );
}
