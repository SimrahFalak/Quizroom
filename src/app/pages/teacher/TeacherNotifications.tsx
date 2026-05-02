import { Check, FileQuestion } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useEffect } from 'react';
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
  const { teacher } = useSelector((state: RootState) => state.profile);
  const { items: notifications } = useSelector((state: RootState) => state.notifications);
  // announcement UI removed — notifications are generated automatically by events

  useEffect(() => {
    if (teacher?.id || teacher?._id) {
      const id = teacher.id || teacher._id;
      dispatch(fetchTeacherNotifications(String(id)));
    }
  }, [dispatch, teacher]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAll = () => {
    const id = teacher?.id || teacher?._id;
    if (id) {
      dispatch(markAllNotificationsRead({ recipientType: 'Teacher', recipientId: String(id) }));
    }
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
                          onClick={() => dispatch(markNotificationAsRead({ notificationId: notification._id, recipientId: String(teacher?.id || teacher?._id) }))}
                          className="text-sm text-[#6C4EFF] hover:underline font-medium"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => dispatch(deleteNotification({ notificationId: notification._id, recipientId: String(teacher?.id || teacher?._id) }))}
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

        {notifications.length === 0 && (
          <Card className="text-center py-16">
            <FileQuestion className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
