import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color = '#6C4EFF',
  trend
}: StatCardProps) {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
          {trend && (
            <p className="text-sm text-green-500">{trend}</p>
          )}
        </div>
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
        style={{ background: `linear-gradient(to right, ${color}, ${color}AA)` }}
      />
    </Card>
  );
}
