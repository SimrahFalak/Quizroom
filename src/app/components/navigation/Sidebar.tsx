import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileQuestion, 
  ClipboardCheck, 
  Bell, 
  Settings,
  GraduationCap,
  FileEdit
} from 'lucide-react';

interface SidebarProps {
  role: 'student' | 'teacher';
}

export default function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  
  const studentLinks = [
    { path: `/student`, label: 'Dashboard', icon: LayoutDashboard },
    { path: `/student/courses`, label: 'Courses', icon: BookOpen },
    { path: `/student/notifications`, label: 'Notifications', icon: Bell, hasUnread: true },
    { path: `/student/settings`, label: 'Settings', icon: Settings },
  ];

  const teacherLinks = [
    { path: `/teacher`, label: 'Dashboard', icon: LayoutDashboard },
    { path: `/teacher/courses`, label: 'Courses', icon: BookOpen },
    { path: `/teacher/create-quiz`, label: 'Create Quiz', icon: FileEdit },
    { path: `/teacher/notifications`, label: 'Notifications', icon: Bell, hasUnread: true },
    { path: `/teacher/settings`, label: 'Settings', icon: Settings },
  ];

  const links = role === 'student' ? studentLinks : teacherLinks;

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] flex items-center justify-center">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800">QUIZROOM</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          // Check if the current path matches the link path
          // For "Courses" link, also highlight when viewing course details or creating quiz
          const isActive = link.path === `/teacher/courses`
            ? location.pathname.startsWith(`/teacher/course`)
            : location.pathname === link.path;
          
          const Icon = link.icon;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
              {link.hasUnread && (
                <span className="ml-auto w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Illustration */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-3">
            <GraduationCap className="w-16 h-16 text-[#6C4EFF] opacity-50" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
