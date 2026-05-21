import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, FiCheckCircle, FiAlertCircle, FiCalendar, 
  FiAward, FiTrash2, FiCheck, FiInfo
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Quiz Completed!', message: 'You scored 92% on JavaScript Quiz', time: '2 hours ago', read: false },
    { id: 2, type: 'reminder', title: 'Assignment Due', message: 'React project due in 2 days', time: '5 hours ago', read: false },
    { id: 3, type: 'achievement', title: 'New Badge Earned!', message: 'You earned "Quiz Master" badge', time: '1 day ago', read: true },
    { id: 4, type: 'info', title: 'Study Reminder', message: 'Time for your daily study session', time: '2 days ago', read: true },
    { id: 5, type: 'warning', title: 'Low Study Streak', message: "You haven't studied today. Keep your streak alive!", time: '2 days ago', read: true },
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <FiCheckCircle className="text-green-500" size={20} />;
      case 'reminder': return <FiCalendar className="text-blue-500" size={20} />;
      case 'achievement': return <FiAward className="text-purple-500" size={20} />;
      case 'warning': return <FiAlertCircle className="text-orange-500" size={20} />;
      default: return <FiInfo className="text-gray-500" size={20} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Marked as read');
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
              <FiBell /> Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition"
            >
              Mark all read
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg transition-all ${!notification.read ? 'border-l-4 border-l-purple-600' : 'opacity-70'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{notification.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <button onClick={() => markAsRead(notification.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button onClick={() => deleteNotification(notification.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Settings Card */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked className="toggle-switch" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked className="toggle-switch" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Quiz Reminders</span>
              <input type="checkbox" defaultChecked className="toggle-switch" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Study Streak Alerts</span>
              <input type="checkbox" defaultChecked className="toggle-switch" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;