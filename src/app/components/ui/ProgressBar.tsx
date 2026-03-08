interface ProgressBarProps {
  percentage: number;
  color?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ 
  percentage, 
  color = '#6C4EFF', 
  showLabel = true 
}: ProgressBarProps) {
  const getColor = () => {
    if (percentage >= 70) return '#6C4EFF';
    if (percentage >= 50) return '#FFA500';
    return '#FF6B6B';
  };

  const barColor = color === '#6C4EFF' ? getColor() : color;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: barColor
          }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold min-w-[50px] text-right" style={{ color: barColor }}>
          {percentage}%
        </span>
      )}
    </div>
  );
}
