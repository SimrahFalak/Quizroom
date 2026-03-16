import { User, Lock, Bell, Mail, Globe, Shield } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function StudentSettings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

           

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="First Name" defaultValue="Simrah" />
                <Input label="Last Name" defaultValue="Falak" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
              <Input label="Email Address" type="email" defaultValue="Simrah@university.edu" />
              <Input label="Institute Name" defaultValue="Alpha University" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Student ID" defaultValue="STU-2024-001" disabled />
                <Input label="Department" defaultValue="Management" />
              </div>

              

             
              

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
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
