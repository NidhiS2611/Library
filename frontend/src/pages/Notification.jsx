import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{Delete} from 'lucide-react'

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:3000/notifications/getnotifications', {
        withCredentials: true,
      });
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (id) => {
    try {
      await axios.put(
        `https://library-management-dwg7.onrender.com/notifications/user/${id}/mark-as-read`,
        {},
        { withCredentials: true }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://library-management-dwg7.onrender.com/notifications/user/${id}/delete`, {
        withCredentials: true,
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-center">No notifications available.</p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`relative cursor-pointer w-full h-auto px-4 py-2 rounded-md shadow-sm border transition-all duration-200 hover:shadow-md ${
                notification.isRead
                  ? 'bg-gray-200 border-gray-400 dark:bg-gray-800 dark:border-gray-600'
                  : 'bg-blue-100 border-blue-400 dark:bg-blue-900 dark:border-blue-600'
              }`}
              onClick={() => handleNotificationClick(notification._id)}
            >
              {/* Delete button top-right */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // stop parent onClick
                  handleDelete(notification._id);
                }}
                className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700 font-bold"
                title="Delete"
              >
                <Delete />
              </button>

              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-black dark:text-white">
                <span role="img" aria-label="book">📚</span> {notification.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate">
                {notification.body}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;

