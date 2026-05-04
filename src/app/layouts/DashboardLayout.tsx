import { Outlet, useLocation } from 'react-router';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';

export default function DashboardLayout() {
  const location = useLocation();
  const role = location.pathname.startsWith('/student') ? 'student' : 'teacher';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF]">
      <Sidebar role={role} />
      
      <div className="ml-64">
        <Navbar userName="Simrah Falak" userRole={role === 'student' ? 'Management' : 'Instructor'} />
        
                <main className="flex-1 p-6 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
