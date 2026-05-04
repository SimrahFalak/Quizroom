import { Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';
import type { RootState } from '../store/store';

export default function DashboardLayout() {
  const location = useLocation();
  const role = location.pathname.startsWith('/student') ? 'student' : 'teacher';

  const { user } = useSelector((state: RootState) => state.auth);

  const displayName = user?.name || (role === 'student' ? 'Student' : 'Instructor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF]">
      <Sidebar role={role} />
      
      <div className="ml-64">
<<<<<<< HEAD
        <Navbar userName="Simrah Falak" userRole={role === 'student' ? 'Management' : 'Instructor'} />
=======
        <Navbar userName={displayName} userRole={role === 'student' ? 'Management' : 'Instructor'} />
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
        
                <main className="flex-1 p-6 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
