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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <nav className="space-y-2">
              {[
                { icon: User, label: 'Profile Information', active: true },
                { icon: Lock, label: 'Password & Security', active: false },
                { icon: BookOpen, label: 'Teaching Preferences', active: false },
                { icon: Bell, label: 'Notifications', active: false },
                { icon: Mail, label: 'Email Preferences', active: false },
                { icon: SettingsIcon, label: 'Quiz Defaults', active: false },
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
                DS
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
                <Input label="First Name" defaultValue="Dr. Sarah" />
                <Input label="Last Name" defaultValue="Johnson" />
              </div>

              <Input label="Email Address" type="email" defaultValue="sarah.johnson@university.edu" />

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Employee ID" defaultValue="INST-2024-001" disabled />
                <Input label="Department" defaultValue="Computer Science" />
              </div>

              <Input label="Institute Name" defaultValue="Alpha University" />

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
                <Input label="Office Location" placeholder="Building A, Room 305" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                  rows={4}
                  placeholder="Tell students about yourself..."
                  defaultValue="Computer Science professor with 10+ years of teaching experience. Specializing in web development and data structures."
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>

          {/* Teaching Preferences */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Teaching Preferences</h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Quiz Duration
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none">
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                    <option>120 minutes</option>
                  </select>
                </div>

                <Input label="Default Passing Percentage (%)" type="number" defaultValue="60" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Negative Marking (%)" type="number" defaultValue="0" />
                <Input label="Maximum Quiz Attempts" type="number" defaultValue="1" />
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-gray-800">Default Settings</h3>
                {[
                  { label: 'Enable randomized questions by default', defaultChecked: true },
                  { label: 'Show correct answers after submission', defaultChecked: false },
                  { label: 'Allow late submissions', defaultChecked: false },
                  { label: 'Send automatic reminders to students', defaultChecked: true },
                  { label: 'Auto-publish results after grading', defaultChecked: true },
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
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              {[
                { label: 'Email when students submit quizzes', defaultChecked: true },
                { label: 'Email for pending grading reminders', defaultChecked: true },
                { label: 'Email when new students enroll', defaultChecked: false },
                { label: 'Email for quiz deadline reminders', defaultChecked: true },
                { label: 'Daily summary of class activity', defaultChecked: true },
                { label: 'Weekly performance reports', defaultChecked: true },
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
        </div>
      </div>
    </div>
  );
}
