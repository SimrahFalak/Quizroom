import { Search, Filter } from 'lucide-react';
import { Card } from '../../components/ui/card';
import ProgressBar from '../../components/ui/ProgressBar';

export default function StudentCourses() {
  const courses = [
    {
      id: 1,
      title: 'Web Development',
      instructor: 'Yerbolat Yerkebulan',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextQuiz: 'March 15, 2026',
      color: '#6C4EFF',
    },
    {
      id: 2,
      title: 'Data Science',
      instructor: 'Manarbek Adilet',
      progress: 60,
      totalLessons: 30,
      completedLessons: 18,
      nextQuiz: 'March 20, 2026',
      color: '#7B61FF',
    },
    {
      id: 3,
      title: 'Mobile Development',
      instructor: 'Sarah Johnson',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextQuiz: 'March 18, 2026',
      color: '#9A7BFF',
    },
    {
      id: 4,
      title: 'Graphic Design',
      instructor: 'Ashley Akhmetov',
      progress: 80,
      totalLessons: 16,
      completedLessons: 13,
      nextQuiz: 'March 22, 2026',
      color: '#FF9B9B',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">Track your progress and upcoming quizzes</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none bg-white"
          />
        </div>
        <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl flex items-center gap-2 hover:border-[#6C4EFF] transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} hover className="relative overflow-hidden">
            {/* Color accent */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: course.color }}
            />

            <div className="pt-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500">by {course.instructor}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${course.color}20` }}
                >
                  📚
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Course Progress</span>
                  <span className="text-sm font-semibold" style={{ color: course.color }}>
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                </div>
                <ProgressBar percentage={course.progress} color={course.color} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Next Quiz</p>
                  <p className="text-sm font-semibold text-gray-800">{course.nextQuiz}</p>
                </div>
                <div className="text-right">
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white text-sm hover:shadow-lg transition-all"
                    style={{ backgroundColor: course.color }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
