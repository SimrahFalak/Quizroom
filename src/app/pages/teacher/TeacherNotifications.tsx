import { Check, FileQuestion, RefreshCw } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  fetchTeacherNotifications,
  markAllNotificationsRead,
  markNotificationAsRead,
  deleteNotification,
} from '../../store/notificationsSlice';

export default function TeacherNotifications() {
  const dispatch = useDispatch<AppDispatch>();
  const { user: teacher } = useSelector((state: RootState) => state.auth);
  const { items: notifications, loading } = useSelector((state: RootState) => state.notifications);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // announcement UI removed — notifications are generated automatically by events

  useEffect(() => {
    console.log('[TeacherNotifications] Effect triggered, teacher object:', teacher);
    if (teacher?.id) {
      console.log('[TeacherNotifications] Fetching notifications for teacher ID:', teacher.id, 'Type:', typeof teacher.id);
      dispatch(fetchTeacherNotifications(String(teacher.id)));
    } else {
      console.warn('[TeacherNotifications] No teacher ID available. teacher =', teacher);
    }
  }, [dispatch, teacher]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAll = () => {
    if (teacher?.id) {
      dispatch(markAllNotificationsRead({ recipientType: 'Teacher', recipientId: String(teacher.id) }));
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (teacher?.id) {
      console.log('[TeacherNotifications] Manual refresh triggered for:', teacher.id);
      await dispatch(fetchTeacherNotifications(String(teacher.id)));
    }
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">
            You have <span className="font-bold text-[#6C4EFF]">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button onClick={handleMarkAll} variant="outline" className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="space-y-4 min-h-screen">
        {notifications.map((notification) => {
          const Icon = FileQuestion;
          return (
            <Card
              key={notification._id}
              className={`hover:shadow-xl transition-all cursor-pointer ${
                !notification.read ? 'border-2 border-[#6C4EFF]' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `#6C4EFF20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: `#6C4EFF` }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{notification.eventType}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <span className="w-3 h-3 bg-[#6C4EFF] rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(notification.createdAt || '').toLocaleString()}</span>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <button
                        onClick={() => dispatch(markNotificationAsRead({ notificationId: notification._id, recipientId: String(teacher?.id) }))}
                          className="text-sm text-[#6C4EFF] hover:underline font-medium"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => dispatch(deleteNotification({ notificationId: notification._id, recipientId: String(teacher?.id) }))}
                        className="text-sm text-red-500 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

<<<<<<< HEAD
              <Input label="Subject" placeholder="Enter announcement subject" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                  rows={6}
                  placeholder="Type your announcement..."
                />
              </div>

            

              <Button className="w-full flex items-center justify-center gap-2 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]">
                <Send className="w-5 h-5" />
                Send Announcement
              </Button>
            </div>
          </Card>

         
        </div>
=======
        {notifications.length === 0 && (
          <Card className="text-center py-16">
            <FileQuestion className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </Card>
        )}
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
      </div>
    </div>
  );
}
