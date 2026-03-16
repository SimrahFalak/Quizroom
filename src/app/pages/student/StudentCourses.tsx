import { Search, Filter, BookOpen, Plus } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';

export default function StudentCourses() {
  const COURSE_COLOR = '#6C4EFF';

  const courses = [
    {
      id: 1,
      title: 'Web Development',
      instructor: 'Yerbolat Yerkebulan',
      nextQuiz: 'March 15, 2026',
    },
    {
      id: 2,
      title: 'Data Science',
      instructor: 'Manarbek Adilet',
      nextQuiz: 'March 20, 2026',
    },
    {
      id: 3,
      title: 'Mobile Development',
      instructor: 'Sarah Johnson',
      nextQuiz: 'March 18, 2026',
    },
    {
      id: 4,
      title: 'Graphic Design',
      instructor: 'Ashley Akhmetov',
      nextQuiz: 'March 22, 2026',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">Explore your enrolled courses and upcoming quizzes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-5 py-4 rounded-lg cursor-pointer bg-[#6C4EFF] text-white hover:bg-[#5a3fe0] font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-7">
            <DialogHeader className="mb-6">
              <DialogTitle>Enroll in a Course</DialogTitle>
              
            </DialogHeader>

            <Input
              type="text"
              label="Course Code"
              placeholder="e.g. WEB-2026-01"
              className="h-11"
            />

            <DialogFooter className="mt-4 gap-3">
              <Button className="h-11 cursor-pointer px-6 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">
                Enroll Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      {/* <div className="flex gap-4">
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
      </div> */}

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} hover className="relative overflow-hidden">
            {/* Color accent */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: COURSE_COLOR }}
            />

            <div className="pt-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500">by {course.instructor}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${COURSE_COLOR}20` }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: COURSE_COLOR }} />
                </div>
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
                    style={{ backgroundColor: COURSE_COLOR }}
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
