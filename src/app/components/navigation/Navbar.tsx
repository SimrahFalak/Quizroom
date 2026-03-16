import { Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

interface NavbarProps {
  userName?: string;
  userRole?: string;
}

export default function Navbar({ userName = 'Simrah Falak', userRole = 'Management' }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-xl">
        
      </div>

      <div className="flex items-center gap-6 ml-8">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] flex items-center justify-center text-white font-semibold">
            {userName.charAt(0)}
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
