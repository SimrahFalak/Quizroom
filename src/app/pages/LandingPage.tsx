import { useNavigate } from 'react-router';
import { GraduationCap, BookOpen, FileQuestion, BarChart3, Users, Shield, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileQuestion,
      title: 'Interactive Quizzes',
      description: 'Create and take quizzes with multiple question types including MCQ, true/false, and descriptive answers.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track student performance with detailed analytics and progress reports.'
    },
    {
      icon: Clock,
      title: 'Timed Assessments',
      description: 'Set time limits for quizzes and exams with automatic submission.'
    },
    {
      icon: Award,
      title: 'Instant Results',
      description: 'Students receive immediate feedback and detailed explanations for their answers.'
    },
    {
      icon: Users,
      title: 'Student Management',
      description: 'Manage multiple classes, track individual progress, and provide personalized feedback.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Industry-standard security with data encryption and regular backups.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">QUIZROOM</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6C4EFF] via-[#7B61FF] to-[#9A7BFF] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Modern Online Assessment Platform for Universities
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Create, manage, and grade quizzes and exams online. Track student progress with powerful analytics and automated grading.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/register')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-[#6C4EFF]"
                >
                  Watch Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-white/80">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2K+</div>
                  <div className="text-white/80">Teachers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100K+</div>
                  <div className="text-white/80">Quizzes Created</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Web Development</div>
                      <div className="text-sm text-white/70">24 students enrolled</div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                      <FileQuestion className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Data Science Quiz</div>
                      <div className="text-sm text-white/70">Due in 2 days</div>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Performance Analytics</div>
                      <div className="text-sm text-white/70">Average: 85%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything you need for online assessments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for creating, managing, and analyzing quizzes and exams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover>
                  <div className="flex flex-col items-start">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up as a teacher or student and set up your profile in minutes.'
              },
              {
                step: '02',
                title: 'Create or Join Courses',
                description: 'Teachers create courses and quizzes, students join and start learning.'
              },
              {
                step: '03',
                title: 'Track Progress',
                description: 'Monitor performance with detailed analytics and instant feedback.'
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-[#6C4EFF] opacity-10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-[#6C4EFF] opacity-30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your online assessments?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of educators and students already using our platform
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/register')}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">QUIZROOM</span>
              </div>
              <p className="text-gray-400 text-sm">
                Modern online assessment platform for universities and institutes.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 Education Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
