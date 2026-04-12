import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { User, Lock, Bell, Mail, Settings as SettingsIcon, BookOpen, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { fetchTeacherProfile, updateTeacherProfile, clearError, clearSuccess } from '../../store/profileSlice.js';
import { RootState, AppDispatch } from '../../store/store.ts';

export default function TeacherSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { teacher, loading, error, isSuccess } = useSelector((state: RootState) => state.profile);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institute: '',
    department: '',
    employeeId: '',
    phone: '',
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTeacherProfile(user.id));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully!');
      dispatch(clearSuccess());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        email: teacher.email || '',
        institute: teacher.institute || '',
        department: teacher.department || '',
        employeeId: teacher.employeeId || '',
        phone: teacher.phone || '',
      });
    }
  }, [teacher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    dispatch(updateTeacherProfile({
      teacherId: user.id,
      data: formData,
    }));
  };

  const handleErrorClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and teaching preferences</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
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

      {/* Settings Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Profile Information */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

          {/* Form Fields */}
          <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">              
              <Input 
                label="Full Name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input 
                label="Phone" 
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">              
              <Input 
                label="Email Address" 
                type="email" 
                value={formData.email}
                disabled 
              />
              <Input 
                label="Institute Name" 
                value={formData?.institute || ''}
                disabled 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="Employee ID" 
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
              />
              <Input 
                label="Department" 
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button 
                onClick={handleSaveProfile} 
                disabled={loading}
                className="bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Password & Security */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Password & Security</h2>

          <div className="space-y-6">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />

            <div className="flex justify-end">
              <Button className="bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">Update Password</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
