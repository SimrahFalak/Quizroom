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
        <Navbar userName="Adiya Akhmetova" userRole={role === 'student' ? 'Management' : 'Instructor'} />
        
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
