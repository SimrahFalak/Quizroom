import { Bell, Check, Trash2, Users, FileQuestion, Award, Send } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function TeacherNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'submission',
      icon: FileQuestion,
      title: 'New Quiz Submission',
      message: '12 students have submitted Web Development Quiz 5',
      time: '1 hour ago',
      read: false,
      color: '#6C4EFF',
    },
    {
      id: 2,
      type: 'grading',
      icon: Award,
      title: 'Pending Grading',
      message: '8 submissions are waiting for manual grading',
      time: '3 hours ago',
      read: false,
      color: '#FFA500',
    },
    {
      id: 3,
      type: 'student',
      icon: Users,
      title: 'New Student Enrolled',
      message: '3 new students have enrolled in Data Science course',
      time: '5 hours ago',
      read: true,
      color: '#00D084',
    },
    {
      id: 4,
      type: 'deadline',
      icon: Bell,
      title: 'Quiz Deadline Approaching',
      message: 'Mobile Development Quiz 3 deadline is in 24 hours',
      time: '1 day ago',
      read: true,
      color: '#FF6B9D',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">
            You have <span className="font-bold text-[#6C4EFF]">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            Mark All as Read
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`hover:shadow-xl transition-all cursor-pointer ${
                  !notification.read ? 'border-2 border-[#6C4EFF]' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${notification.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: notification.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{notification.title}</h3>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <span className="w-3 h-3 bg-[#6C4EFF] rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{notification.time}</span>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <button className="text-sm text-[#6C4EFF] hover:underline font-medium">
                            Mark as Read
                          </button>
                        )}
                        <button className="text-sm text-red-500 hover:underline font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Send Announcement */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send Announcement</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none">
                  <option>All Students</option>
                  <option>Web Development Class</option>
                  <option>Data Science Class</option>
                  <option>Mobile Development Class</option>
                  <option>Graphic Design Class</option>
                </select>
              </div>

              <Input label="Subject" placeholder="Enter announcement subject" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                  rows={6}
                  placeholder="Type your announcement..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none">
                  <option>General Announcement</option>
                  <option>Quiz Reminder</option>
                  <option>Results Published</option>
                  <option>Deadline Change</option>
                  <option>Course Update</option>
                </select>
              </div>

              <Button className="w-full flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Announcement
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <h3 className="font-bold text-lg mb-4">Notification Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Sent</span>
                <span className="font-bold text-gray-800">248</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-bold text-gray-800">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-bold text-[#6C4EFF]">{unreadCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
