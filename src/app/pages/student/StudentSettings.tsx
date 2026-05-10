import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { User, Lock, Bell, Mail, Globe, Shield, AlertCircle, Camera } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { fetchStudentProfile, updateStudentProfile, clearError, clearSuccess } from '../../store/profileSlice.js';
import { profileAPI } from '../../services/profileService.js';
import { RootState, AppDispatch } from '../../store/store.ts';

export default function StudentSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { student, loading, error, isSuccess } = useSelector((state: RootState) => state.profile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institute: '',
    department: '',
    studentId: '',
    phone: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchStudentProfile(user.id));
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile updated successfully!');
      dispatch(clearSuccess());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        institute: student.institute || '',
        department: student.department || '',
        studentId: student.studentId || '',
        phone: student.phone || '',
        bio: student.bio || '',
      });
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    dispatch(updateStudentProfile({
      studentId: user.id,
      data: formData,
    }));
  };

  const handleErrorClose = () => {
    dispatch(clearError());
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      toast.loading('Uploading profile picture...');
      const response = await profileAPI.uploadStudentProfilePicture(user.id, file);
      
      if (response.data?.data?.profilePicture) {
        setProfilePicture(response.data.data.profilePicture);
        toast.dismiss();
        toast.success('Profile picture uploaded successfully!');
      }
    } catch (error: any) {
      toast.dismiss();
      const errorMsg = error.response?.data?.message || 'Failed to upload profile picture';
      toast.error(errorMsg);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = formData.name ? getInitials(formData.name) : 'S';
  const displayedProfilePicture = profilePicture || student?.profilePicture;
  const hasProfilePicture = !!displayedProfilePicture;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
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
      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="relative">
              {hasProfilePicture ? (
                <img
                  src={displayedProfilePicture}
                  alt={formData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] flex items-center justify-center border-4 border-gray-200">
                  <span className="text-4xl font-bold text-white">{initials}</span>
                </div>
              )}
              <button 
                type="button"
                onClick={handleCameraClick}
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors border-2 border-gray-200"
              >
                <Camera className="w-4 h-4 text-[#6C4EFF]" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

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
                value={formData.institute}
                disabled 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="Student ID" 
                name="studentId"
                value={formData.studentId}
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
              <Button onClick={handleSaveProfile} disabled={loading}>
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
              <Button>Update Password</Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
