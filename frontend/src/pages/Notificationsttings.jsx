import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notificationsettings = () => {
  const [preferences, setPreferences] = useState({
    push: false,
    email: false,
    notifyOnDue: false,
    notifyOnIssue: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('https://your-backend-url/user/notification-settings', {
          withCredentials: true,
        });
        setPreferences(res.data);
      } catch (err) {
        console.error("Error fetching settings", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://your-backend-url/user/notification-settings', preferences, {
        withCredentials: true,
      });
      alert("Settings saved!");
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 text-center">Notification Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notification Method */}
          <div>
            <label className="block font-semibold mb-2">Notification Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" name="push" checked={preferences.push} onChange={handleChange}
                  className="mr-2" />
                Push
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="email" checked={preferences.email} onChange={handleChange}
                  className="mr-2" />
                Email
              </label>
            </div>
          </div>

          {/* Notify Triggers */}
          <div>
            <label className="block font-semibold mb-2">Notify me for:</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" name="notifyOnDue" checked={preferences.notifyOnDue} onChange={handleChange}
                  className="mr-2" />
                Overdue Books
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="notifyOnIssue" checked={preferences.notifyOnIssue} onChange={handleChange}
                  className="mr-2" />
                Book Issued
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notificationsettings;
