import { BookOpen } from 'lucide-react';
<<<<<<< HEAD
=======
import { useNavigate } from 'react-router';
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
import { Card } from '../ui/card';

interface CourseCardProps {
  courseId?: string;
  title: string;
  instructor: string;
  rating?: number;
}

export default function CourseCard({ 
  courseId,
  title, 
  instructor, 
  rating = 5
}: CourseCardProps) {
<<<<<<< HEAD
  const COURSE_COLOR = '#6C4EFF';

  return (
    <Card className="relative overflow-hidden cursor-pointer transition-all hover:shadow-xl bg-white">
=======
  const navigate = useNavigate();
  const COURSE_COLOR = '#6C4EFF';

  return (
    <Card
      className="relative overflow-hidden cursor-pointer transition-all hover:shadow-xl bg-white"
      onClick={() => courseId && navigate(`/student/course/${courseId}`)}
    >
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: COURSE_COLOR }}
      />

      <div className="pt-2 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{instructor}</p>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${COURSE_COLOR}20` }}
        >
          <BookOpen className="w-6 h-6" style={{ color: COURSE_COLOR }} />
        </div>
      </div>
    </Card>
  );
}
