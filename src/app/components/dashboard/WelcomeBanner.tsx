import { Card } from '../ui/card';

interface WelcomeBannerProps {
  userName: string;
  role: 'student' | 'teacher';
}

export default function WelcomeBanner({ userName, role }: WelcomeBannerProps) {
  const message = role === 'student' 
    ? "Ready to ace your next quiz? Check out your upcoming assignments and track your progress."
    : "Manage your courses, create quizzes, and track student performance all in one place.";

  return (
    <Card gradient className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1 z-10">
          <h1 className="text-3xl font-bold mb-3">Welcome back {userName}!</h1>
          <p className="text-white/90 max-w-lg leading-relaxed">
            {message}
          </p>
        </div>
        
        {/* Illustration */}
        <div className="hidden lg:block">
          <svg width="300" height="180" viewBox="0 0 300 180" className="opacity-90">
            {/* Books Stack */}
            <rect x="50" y="100" width="80" height="15" rx="3" fill="white" opacity="0.3" transform="rotate(-5 90 107)" />
            <rect x="50" y="85" width="80" height="15" rx="3" fill="white" opacity="0.4" transform="rotate(-2 90 92)" />
            <rect x="50" y="70" width="80" height="15" rx="3" fill="white" opacity="0.5" />
            
            {/* Person 1 */}
            <circle cx="180" cy="80" r="20" fill="#FFD93D" />
            <rect x="165" y="100" width="30" height="50" rx="5" fill="#4ECDC4" />
            
            {/* Person 2 */}
            <circle cx="240" cy="90" r="18" fill="#FF6B9D" />
            <rect x="227" y="108" width="26" height="45" rx="5" fill="#95E1D3" />
            
            {/* Floating Elements */}
            <circle cx="140" cy="40" r="6" fill="white" opacity="0.6" />
            <circle cx="220" cy="50" r="8" fill="white" opacity="0.5" />
            <circle cx="270" cy="35" r="5" fill="white" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute right-8 top-8">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full opacity-30"></div>
          ))}
        </div>
      </div>
    </Card>
  );
}
