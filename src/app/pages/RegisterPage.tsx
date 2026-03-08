import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institute: '',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'student' ? '/student' : '/teacher');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
            Start your learning journey today
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of students and teachers already using our platform to enhance education.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Active Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">2K+</div>
              <div className="text-white/80">Teachers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">100K+</div>
              <div className="text-white/80">Quizzes Created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/80">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <Card className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Get started with your free account</p>
          </div>

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

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Building className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                name="institute"
                label="Institute Name"
                placeholder="University Name"
                value={formData.institute}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[50px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-12"
                required
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" required />
              <span className="text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-[#6C4EFF] hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-[#6C4EFF] hover:underline">Privacy Policy</a>
              </span>
            </div>

            <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2">
              Create Account
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#6C4EFF] font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
