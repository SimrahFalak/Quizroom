import { Card } from '../ui/card';

interface CourseCardProps {
  title: string;
  instructor: string;
  rating?: number;
  color?: string;
}

export default function CourseCard({ 
  title, 
  instructor, 
  rating = 5,
  color = '#6C4EFF'
}: CourseCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-xl"
      style={{ background: color }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <span className="text-2xl">📚</span>
        </div>
        <div className="flex-1 text-white">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-white/80 mb-3">Instructor: {instructor}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-300' : 'text-white/30'}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
