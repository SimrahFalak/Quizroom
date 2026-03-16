import { User, Lock, Bell, Mail, Settings as SettingsIcon, BookOpen } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function TeacherSettings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and teaching preferences</p>
      </div>

      

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

           

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="First Name" defaultValue="Dr. Sarah" />
                <Input label="Last Name" defaultValue="Johnson" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">              
              <Input label="Email Address" type="email" defaultValue="sarah.johnson@university.edu" />
                  <Input label="Institute Name" defaultValue="Alpha University" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Employee ID" defaultValue="INST-2024-001" disabled />
                <Input label="Department" defaultValue="Computer Science" />
              </div>


              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">Save Changes</Button>
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
