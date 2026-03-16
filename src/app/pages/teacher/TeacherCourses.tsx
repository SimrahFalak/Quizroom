import { Plus, Users, FileQuestion, BarChart3 } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function TeacherCourses() {
  const COURSE_COLOR = '#6C4EFF';

  const courses = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn modern web development with React, Node.js, and more',
      studentsEnrolled: 48,
      quizzesCreated: 12,
      averageScore: 85,
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Master data analysis, machine learning, and visualization',
      studentsEnrolled: 52,
      quizzesCreated: 10,
      averageScore: 72,
    },
    {
      id: 3,
      title: 'Mobile Development',
      description: 'Build native and cross-platform mobile applications',
      studentsEnrolled: 45,
      quizzesCreated: 8,
      averageScore: 78,
    },
    {
      id: 4,
      title: 'Graphic Design',
      description: 'Create stunning visuals and user interfaces',
      studentsEnrolled: 38,
      quizzesCreated: 6,
      averageScore: 88,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>
        <Button className="flex items-center gap-2 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">
          <Plus className="w-5 h-5" />
          Create New Course
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} hover className="relative overflow-hidden">
            {/* Color accent */}
            <div
              className="absolute top-0 left-0 right-0 h-3"
              style={{ backgroundColor: COURSE_COLOR }}
            />

            <div className="pt-3">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 my-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COURSE_COLOR}20` }}
                    >
                      <Users className="w-5 h-5" style={{ color: COURSE_COLOR }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{course.studentsEnrolled}</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COURSE_COLOR}20` }}
                    >
                      <FileQuestion className="w-5 h-5" style={{ color: COURSE_COLOR }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{course.quizzesCreated}</div>
                  <div className="text-xs text-gray-500">Quizzes</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COURSE_COLOR}20` }}
                    >
                      <BarChart3 className="w-5 h-5" style={{ color: COURSE_COLOR }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{course.averageScore}%</div>
                  <div className="text-xs text-gray-500">Avg Score</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: COURSE_COLOR }}
                >
                  View Course
                </button>
                <button className="flex-1 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                  Edit Course
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
