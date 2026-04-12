import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { GraduationCap, Mail, Lock, ArrowRight, BookOpen, BarChart2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { loginStudent, loginTeacher, clearError } from '../store/authSlice';
import { RootState, AppDispatch } from '../store/store';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && user) {
      navigate(user.role === 'student' ? '/student' : '/teacher');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const payload = { email, password };
    
    if (role === 'student') {
      dispatch(loginStudent(payload));
    } else {
      dispatch(loginTeacher(payload));
    }
  };

  const handleErrorClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C4EFF] via-[#7B61FF] to-[#9A7BFF] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-white hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <span className="text-3xl font-bold">QUIZROOM</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome back to the future of learning
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Access your courses, take quizzes, and track your progress all in one place.
          </p>

          {/* Floating cards illustration */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">50+ Courses Available</div>
                  <div className="text-sm text-white/70">Expand your knowledge</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Track Your Progress</div>
                  <div className="text-sm text-white/70">Real-time analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
              <button
                onClick={handleErrorClose}
                className="text-red-600 hover:text-red-800 text-xl font-bold"
              >
                ×
              </button>
            </div>
          )}

          {/* Role Selection */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                role === 'student'
                  ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                role === 'teacher'
                  ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                label="Email Address"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                
              </label>
              <a href="#" className="text-[#6C4EFF] hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#6C4EFF] font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
