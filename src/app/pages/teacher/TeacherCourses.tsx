import { useState, useEffect } from 'react';
import { Plus, Users, FileQuestion, BarChart3, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
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
import { AppDispatch, RootState } from '../../store/store';
import { createCourse, getTeacherCourses, clearSuccess } from '../../store/courseSlice';

interface CourseDisplay {
  _id: string;
  title: string;
  studentsEnrolled: number;
  quizzesCreated: number;
  averageScore: number;
  courseCode?: string;
  description?: string;
}

export default function TeacherCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const COURSE_COLOR = '#6C4EFF';

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { courses, loading, success, message } = useSelector(
    (state: RootState) => state.course
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Transform API courses to display format
  const transformedCourses: CourseDisplay[] = courses.map((course) => ({
    _id: course._id,
    title: course.title,
    courseCode: course.courseCode,
    description: course.description,
    studentsEnrolled: course.studentsEnrolled ?? (course.students?.length || 0),
    quizzesCreated: course.quizzesCreated ?? 0,
    averageScore: course.averageScore ?? 0,
  }));

  useEffect(() => {
    if (user?.id) {
      dispatch(getTeacherCourses(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (success && message.includes('Course created')) {
      setFormData({ title: '', description: '' });
      // Don't auto-close the dialog - let user close it manually
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, message, dispatch]);

  const handleCreateCourse = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a course title');
      return;
    }

    if (!user?.id) {
      alert('User not authenticated');
      return;
    }

    const result = await dispatch(
      createCourse({
        teacherId: user.id,
        payload: {
          title: formData.title,
          description: formData.description,
        },
      })
    );

    if (result.payload && typeof result.payload === 'object' && 'courseCode' in result.payload) {
      setCourseCode((result.payload as any).courseCode);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(courseCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Loader skeleton component
  const CourseLoader = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="relative overflow-hidden cursor-pointer">
          <div
            className="absolute top-0 left-0 right-0 h-3"
            
          />
          <div className="p-6 bg-white rounded-lg border border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((j) => (
                <div key={j}>
                  <div className="h-12 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">
              <Plus className="w-5 h-5" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-7">
            {courseCode ? (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle>Course Created Successfully!</DialogTitle>
                  <DialogDescription>
                    Share this code with your students so they can join the course.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] rounded-lg">
                    <p className="text-sm text-white mb-3">Course Code</p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-3xl font-bold text-white">{courseCode}</p>
                      <button
                        onClick={copyToClipboard}
                        className="flex text-sm items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all  font-medium whitespace-nowrap"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-5 h-5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Students can use this code to enroll in your course.
                  </p>
                </div>
              </>
            ) : (
              <>
                <DialogHeader className="mb-6">
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Enter the course details to get started.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Web Development"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Description
                    </label>
                    <textarea
                      placeholder="Enter course description..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#6C4EFF] focus:outline-none resize-none h-24"
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6 gap-3">
                  <DialogClose asChild>
                    <Button className="h-11 cursor-pointer px-6 bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-50">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleCreateCourse}
                    disabled={loading}
                    className="h-11 cursor-pointer px-6 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
                  >
                    {loading ? 'Creating...' : 'Create Course'}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <CourseLoader />
      ) : transformedCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {transformedCourses.map((course) => (
            <Card
              key={course._id}
              hover
              className="relative overflow-hidden cursor-pointer"
              onClick={() => navigate(`/teacher/course/${course._id}`)}
            >
            {/* Color accent */}
            <div
              className="absolute top-0 left-0 right-0 h-3"
              style={{ backgroundColor: COURSE_COLOR }}
            />

            <div className="pt-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                  {course.courseCode && (
                    <p className="text-sm text-[#6C4EFF] font-semibold">
                      Code: {course.courseCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 my-2">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COURSE_COLOR}20` }}
                    >
                      <Users className="w-5 h-5" style={{ color: COURSE_COLOR }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {course.studentsEnrolled}
                    </div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COURSE_COLOR}20` }}
                    >
                      <FileQuestion className="w-5 h-5" style={{ color: COURSE_COLOR }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {course.quizzesCreated}
                    </div>
                    <div className="text-xs text-gray-500">Quizzes</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${COURSE_COLOR}20` }}
                    >
                      <BarChart3 className="w-5 h-5" style={{ color: COURSE_COLOR }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {course.averageScore}%
                    </div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileQuestion className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-600 text-lg">No courses yet</p>
          <p className="text-gray-500">Click "Create New Course" to get started</p>
        </div>
      )}
    </div>
  );
}
