import { Users, FileQuestion, Award, Clock } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCard from '../../components/dashboard/StatCard';
import { Card } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function TeacherDashboard() {
  const stats = [
    { title: 'Total Students', value: '245', icon: Users, color: '#6C4EFF' },
    { title: 'Quizzes Created', value: '42', icon: FileQuestion, color: '#FFA500' },
    { title: 'Average Score', value: '78%', icon: Award, color: '#00D084', trend: '+3% this week' },
    { title: 'Pending Grading', value: '12', icon: Clock, color: '#FF6B9D' },
  ];

  const classPerformance = [
    { course: 'Web Dev', average: 85 },
    { course: 'Data Sci', average: 72 },
    { course: 'Mobile', average: 68 },
    { course: 'Design', average: 90 },
  ];

  const scoreDistribution = [
    { range: 'A (90-100)', count: 45, color: '#00D084' },
    { range: 'B (80-89)', count: 78, color: '#6C4EFF' },
    { range: 'C (70-79)', count: 62, color: '#FFA500' },
    { range: 'D (60-69)', count: 35, color: '#FF9B9B' },
    { range: 'F (<60)', count: 25, color: '#FF6B6B' },
  ];

  const recentQuizzes = [
    {
      title: 'Web Development Quiz 5',
      course: 'Web Development',
      participants: 48,
      avgScore: 85,
      date: 'March 7, 2026',
    },
    {
      title: 'Data Science Mid-term',
      course: 'Data Science',
      participants: 52,
      avgScore: 72,
      date: 'March 6, 2026',
    },
    {
      title: 'Mobile Development Quiz 3',
      course: 'Mobile Development',
      participants: 45,
      avgScore: 68,
      date: 'March 5, 2026',
    },
  ];

  return (
    <div className="space-y-8">
      <WelcomeBanner userName="Dr. Sarah" role="teacher" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Class Performance Chart */}
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Class Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="course" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="average" fill="#6C4EFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Score Distribution */}
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Score Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, count }) => `${range}: ${count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Quizzes */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Quizzes</h2>
          <button className="text-[#6C4EFF] font-semibold hover:underline">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {recentQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.course} • {quiz.date}</p>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{quiz.participants}</div>
                    <div className="text-xs text-gray-500">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6C4EFF]">{quiz.avgScore}%</div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    View Results
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card hover className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Create New Quiz</h3>
          <p className="text-sm text-gray-600">Build a new assessment for your students</p>
        </Card>

        <Card hover className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Manage Students</h3>
          <p className="text-sm text-gray-600">View and track student progress</p>
        </Card>

        <Card hover className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Grade Submissions</h3>
          <p className="text-sm text-gray-600">Review and grade pending submissions</p>
        </Card>
      </div>
    </div>
  );
}
