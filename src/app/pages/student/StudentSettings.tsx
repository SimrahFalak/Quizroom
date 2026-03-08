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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-2">
              {[
                { icon: User, label: 'Profile Information', active: true },
                { icon: Lock, label: 'Password & Security', active: false },
                { icon: Bell, label: 'Notifications', active: false },
                { icon: Mail, label: 'Email Preferences', active: false },
                { icon: Globe, label: 'Language & Region', active: false },
                { icon: Shield, label: 'Privacy', active: false },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      item.active
                        ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] flex items-center justify-center text-white text-3xl font-bold">
                A
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Profile Picture</h3>
                <div className="flex gap-3">
                  <Button size="sm">Upload New</Button>
                  <Button size="sm" variant="outline">Remove</Button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="First Name" defaultValue="Adiya" />
                <Input label="Last Name" defaultValue="Akhmetova" />
              </div>

              <Input label="Email Address" type="email" defaultValue="adiya@university.edu" />

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Student ID" defaultValue="STU-2024-001" disabled />
                <Input label="Department" defaultValue="Management" />
              </div>

              <Input label="Institute Name" defaultValue="Alpha University" />

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
                <Input label="Date of Birth" type="date" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  defaultValue="Management student passionate about technology and innovation."
                />
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

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Contains at least one special character</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              {[
                { label: 'Email notifications for new quizzes', defaultChecked: true },
                { label: 'Email notifications for quiz results', defaultChecked: true },
                { label: 'Email notifications for deadline reminders', defaultChecked: true },
                { label: 'Email notifications for course announcements', defaultChecked: false },
                { label: 'Push notifications on browser', defaultChecked: true },
                { label: 'Weekly summary emails', defaultChecked: false },
              ].map((item, index) => (
                <label
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={item.defaultChecked}
                    className="w-5 h-5 rounded border-gray-300 text-[#6C4EFF] focus:ring-[#6C4EFF]"
                  />
                </label>
              ))}

              <div className="flex justify-end pt-4">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-2 border-red-200">
            <h2 className="text-2xl font-bold text-red-600 mb-6">Danger Zone</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Delete Account</h3>
                  <p className="text-sm text-gray-600">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
