import { BookOpen, FileQuestion, Trophy, TrendingUp } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCard from '../../components/dashboard/StatCard';
import CourseCard from '../../components/dashboard/CourseCard';
import { Card } from '../../components/ui/card';
import ProgressBar from '../../components/ui/ProgressBar';
import Calendar from '../../components/dashboard/Calendar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  const stats = [
    { title: 'Total Courses', value: '8', icon: BookOpen, color: '#6C4EFF' },
    { title: 'Quizzes Completed', value: '24', icon: FileQuestion, color: '#FFA500' },
    { title: 'Average Score', value: '85%', icon: Trophy, color: '#00D084', },
    { title: 'Ranking', value: '#12', icon: TrendingUp, color: '#FF6B9D' },
  ];

  const courses = [
    { title: 'Web development', instructor: 'Yerbolat Yerkebulan', rating: 5 },
     { title: 'Data science', instructor: 'Manarbek Adilet', rating: 5 },
     { title: 'Graphic Design', instructor: 'Ashley Akhmetov', rating: 4 },
      { title: 'UI/UX Design', instructor: 'Ashley Akhmetov', rating: 4 },

  ];

  const quizResults = [
    { name: 'Quiz 1', subject: 'Web development', score: 74.5, color: '#6C4EFF' },
    { name: 'Quiz 2', subject: 'Data science', score: 54.0, color: '#FFA500' },
    { name: 'Quiz 5', subject: 'Mobile development', score: 25.0, color: '#FF6B6B' },
    { name: 'Quiz 1', subject: 'Networks and security', score: 67.0, color: '#6C4EFF' },
  ];

  const performanceData = [
    { week: 'Q1', score: 60 },
    { week: 'Q2', score: 45 },
    { week: 'Q3', score: 70 },
    { week: 'Q4', score: 55 },
    { week: 'Q5', score: 85 },
  ];

  const calendarDates = [
    { date: 15, type: 'today' as const },
    { date: 25, type: 'quiz' as const },
    { date: 31, type: 'quiz' as const },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner userName="Simrah" role="student" />

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
              <div>
                <div className="text-5xl font-bold text-[#FF6B9D] mb-2">25</div>
                <div className="text-sm text-gray-600">of January</div>
              </div>
              <div className="flex-1 ml-8">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Next quiz deadline</h3>
                <p className="text-gray-600">Introduction to Computer Science</p>
              </div>
              <button className="px-6 py-3 bg-[#FF6B9D] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Start
              </button>
            </div>
          </Card>

          {/* My Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My courses</h2>
              <button className="text-[#6C4EFF] font-semibold hover:underline">
                More →
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>

          {/* Latest Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Latest results</h2>
              <button className="text-[#6C4EFF] font-semibold hover:underline">
                More →
              </button>
            </div>
            <Card>
              <div className="space-y-4">
                {quizResults.map((result, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-800">{result.name}</span>
                        <span className="text-sm text-gray-500">- {result.subject}</span>
                      </div>
                      <ProgressBar percentage={result.score} color={result.color} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

         

        
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
         
          {/* Calendar */}
          <Calendar markedDates={calendarDates} />
 {/* Average Quizzes */}
            <Card>
              <h3 className="font-bold text-lg mb-4">Average % of quizzes</h3>
              <div className="flex items-center justify-center py-8">
                <div className="relative w-40 h-40">
                  <svg className="transform -rotate-90 w-40 h-40">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#f0f0f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#FFA500"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${75 * 4.4} ${100 * 4.4}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800">75.0%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p className="mb-1">798 points</p>
                <p>you are in the top <span className="font-bold text-[#6C4EFF]">5%</span> students</p>
              </div>
            </Card>
         
        </div>
      </div>
    </div>
  );
}
