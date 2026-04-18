import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';

interface CalendarProps {
  markedDates?: { date: number; type: 'today' | 'quiz' }[];
}

export default function Calendar({ markedDates = [] }: CalendarProps) {
  const [currentMonth] = useState('January 2020');
  
  const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'Sat', 'Sun'];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const isMarked = (day: number, type: 'today' | 'quiz') => {
    return markedDates.some(d => d.date === day && d.type === type);
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-4">Quiz calendar</h3>
        
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-medium text-gray-700">{currentMonth}</span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map(day => (
            <button
              key={day}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${isMarked(day, 'today') 
                  ? 'bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] text-white shadow-md' 
                  : isMarked(day, 'quiz')
                  ? 'bg-yellow-400 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded"></div>
            <span className="text-gray-600">today's date</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span className="text-gray-600">quiz date</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
