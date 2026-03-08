import { Bell, Check, Trash2, Mail, Calendar, Award } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function StudentNotifications() {
  const notifications = [
    {
      id: 1,
      type: 'quiz',
      icon: Calendar,
      title: 'New Quiz Available',
      message: 'Web Development Quiz 6 has been published',
      time: '2 hours ago',
      read: false,
      color: '#6C4EFF',
    },
    {
      id: 2,
      type: 'result',
      icon: Award,
      title: 'Results Published',
      message: 'Your results for Data Science Mid-term are now available',
      time: '5 hours ago',
      read: false,
      color: '#00D084',
    },
    {
      id: 3,
      type: 'reminder',
      icon: Bell,
      title: 'Quiz Deadline Reminder',
      message: 'Mobile Development Quiz 3 is due in 2 days',
      time: '1 day ago',
      read: true,
      color: '#FFA500',
    },
    {
      id: 4,
      type: 'announcement',
      icon: Mail,
      title: 'Course Announcement',
      message: 'New learning materials added to Graphic Design course',
      time: '2 days ago',
      read: true,
      color: '#FF6B9D',
    },
    {
      id: 5,
      type: 'quiz',
      icon: Calendar,
      title: 'Quiz Rescheduled',
      message: 'Data Science Quiz 8 has been rescheduled to March 25',
      time: '3 days ago',
      read: true,
      color: '#6C4EFF',
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

      {/* Notification Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-3xl font-bold text-[#6C4EFF] mb-2">{notifications.length}</div>
          <div className="text-sm text-gray-600">Total Notifications</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{unreadCount}</div>
          <div className="text-sm text-gray-600">Unread</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {notifications.filter(n => n.type === 'quiz').length}
          </div>
          <div className="text-sm text-gray-600">Quiz Notifications</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {notifications.filter(n => n.type === 'result').length}
          </div>
          <div className="text-sm text-gray-600">Results Published</div>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
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

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <Card className="text-center py-16">
          <Bell className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No notifications</h3>
          <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
        </Card>
      )}
    </div>
  );
}
