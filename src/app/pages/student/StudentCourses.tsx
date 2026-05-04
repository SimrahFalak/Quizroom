import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Search, Filter, BookOpen, Plus } from 'lucide-react';
=======
import { BookOpen, Plus } from 'lucide-react';
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
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
import { joinCourse, getStudentCourses, clearSuccess } from '../../store/courseSlice';
<<<<<<< HEAD
=======
import { fetchStudentQuizzes, fetchStudentAttempts } from '../../store/quizSlice';
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a

interface CourseDisplay {
  _id: string;
  title: string;
  instructor: string;
  nextQuiz: string;
<<<<<<< HEAD
=======
  nextQuizId?: string;
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
  teacher?: any;
}

export default function StudentCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const COURSE_COLOR = '#6C4EFF';

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const { courses, loading, success, error, message } = useSelector(
    (state: RootState) => state.course
  );
<<<<<<< HEAD
=======
  const { quizzes, attempts } = useSelector((state: RootState) => state.quiz);
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
  const { user } = useSelector((state: RootState) => state.auth);

  // Mock courses - replace with Redux courses later
  const mockCourses: CourseDisplay[] = [
    {
      _id: '1',
      title: 'Web Development',
      instructor: 'Yerbolat Yerkebulan',
      nextQuiz: 'March 15, 2026',
    },
    {
      _id: '2',
      title: 'Data Science',
      instructor: 'Manarbek Adilet',
      nextQuiz: 'March 20, 2026',
    },
    {
      _id: '3',
      title: 'Mobile Development',
      instructor: 'Sarah Johnson',
      nextQuiz: 'March 18, 2026',
    },
    {
      _id: '4',
      title: 'Graphic Design',
      instructor: 'Ashley Akhmetov',
      nextQuiz: 'March 22, 2026',
    },
  ];

<<<<<<< HEAD
  // Transform API courses to display format
  const transformedCourses: CourseDisplay[] = courses.map((course) => ({
    _id: course._id,
    title: course.title,
    instructor: course.instructor || (course.teacher?.name || 'Instructor'),
    nextQuiz: course.nextQuiz || 'TBD',
    teacher: course.teacher,
  }));
=======
  const now = new Date();

  // Transform API courses to display format with nearest upcoming quiz per course
  const transformedCourses: CourseDisplay[] = courses.map((course) => {
    const courseId = String(course._id);
    const attemptedQuizIds = new Set(
      (attempts || []).map((attempt: any) => String(attempt.quiz?._id || attempt.quiz))
    );

    const courseQuizzes = quizzes
      .filter((quiz: any) => {
        const quizCourseId = typeof quiz.course === 'string' ? quiz.course : quiz.course?._id;
        return String(quizCourseId) === courseId;
      })
      .filter((quiz: any) => Boolean(quiz.deadline))
      .filter((quiz: any) => new Date(quiz.deadline) >= now)
      .filter((quiz: any) => !attemptedQuizIds.has(String(quiz._id || quiz)))
      .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    const nearestQuiz = courseQuizzes[0];

    return {
      _id: course._id,
      title: course.title,
      instructor: course.instructor || (course.teacher?.name || 'Instructor'),
      nextQuiz: nearestQuiz?.deadline
        ? new Date(nearestQuiz.deadline).toLocaleString()
        : '',
      nextQuizId: nearestQuiz?._id,
      teacher: course.teacher,
    };
  });
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a

  useEffect(() => {
    if (user?.id) {
      dispatch(getStudentCourses(user.id));
<<<<<<< HEAD
=======
      dispatch(fetchStudentQuizzes({ studentId: user.id }));
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (success && message.includes('Successfully joined')) {
      setCourseCode('');
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
        // Don't auto-close the dialog - let user close it manually
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, message, dispatch]);

  const handleJoinCourse = async () => {
    if (!courseCode.trim()) {
      alert('Please enter a course code');
      return;
    }

    if (!user?.id) {
      alert('User not authenticated');
      return;
    }

    await dispatch(
      joinCourse({
        studentId: user.id,
        payload: { courseCode },
      })
    );
  };

  // Show mock courses only while loading, otherwise show real courses
  const displayCourses = loading ? mockCourses : transformedCourses;

  // Loader skeleton component
  const CourseLoader = () => (
    <div className="grid md:grid-cols-2 gap-6 ">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="relative overflow-hidden cursor-pointer">
          <div
            className="absolute top-0 left-0 right-0 h-2"
            
          />
          <div className="p-6 bg-white rounded-lg border border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((j) => (
                <div key={j}>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
          <p className="text-gray-600">Explore your enrolled courses and upcoming quizzes</p>
        </div>
        <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
          <DialogTrigger asChild>
            <Button className="px-5 py-4 rounded-lg cursor-pointer bg-[#6C4EFF] text-white hover:bg-[#5a3fe0] font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-6 h-6" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-7">
            <DialogHeader className="mb-6">
              <DialogTitle>Enroll in a Course</DialogTitle>
              <DialogDescription>
                Enter the course code provided by your instructor to join a course.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Code *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. ABCD-2026"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                  className="h-11"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && message.includes('Successfully joined') && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">{message}</p>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 gap-3">
              <DialogClose asChild>
                <Button className="h-11 cursor-pointer px-6 bg-white border-2 border-gray-300 text-gray-800 hover:bg-gray-50">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleJoinCourse}
                disabled={loading || !courseCode.trim()}
                className="h-11 cursor-pointer px-6 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Enroll Course'}
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
      {loading ? (
        <CourseLoader />
      ) : transformedCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {transformedCourses.map((course) => (
            <Card
              key={course._id}
              hover
              className="relative overflow-hidden cursor-pointer"
              onClick={() => navigate(`/student/course/${course._id}`)}
            >
            {/* Color accent */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: COURSE_COLOR }}
            />

            <div className="pt-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-500">
                    by {course.teacher?.name || course.instructor}
                  </p>
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
                  {course.nextQuiz ? (
                    <>
                      <p className="text-xs text-gray-500 mb-1">Next Quiz</p>
                      <p className="text-sm font-semibold text-gray-800">{course.nextQuiz}</p>
                    </>
                  ) : null}
                </div>
                <div className="text-right">
<<<<<<< HEAD
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white text-sm hover:shadow-lg transition-all"
                    style={{ backgroundColor: COURSE_COLOR }}
                  >
                    Continue
                  </button>
=======
                  {course.nextQuizId ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/student/quiz/${course.nextQuizId}`);
                      }}
                      className="px-4 py-2 rounded-lg font-medium text-white text-sm hover:shadow-lg transition-all"
                      style={{ backgroundColor: COURSE_COLOR }}
                    >
                      Attempt Quiz
                    </button>
                  ) : null}
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
                </div>
              </div>
            </div>
          </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-gray-600 text-lg">No courses yet</p>
          <p className="text-gray-500">Click "Add Course" to enroll in a course using a course code</p>
        </div>
      )}
    </div>
  );
}
