import React, { useEffect, useState } from 'react';
import axios from 'axios';


const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    method: {
      email: false,
      push: false,
    },
    triggers: {
      newBook: false,
      overdue: false,
    },
  });
  const[error, setError] = useState('');
  const[message, setMessage] = useState('');

  // 🔁 Reusable fetch function
  const fetchNotificationSettings = async () => {
    try {
      const res = await axios.get('https://librarymanagement-81b2.onrender.com/user/getnotificationsetting',{withCredentials:true});
      setSettings(res.data.notificationPreferences); // make sure backend is returning only preferences
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const handleChange = (section, field) => (e) => {
    const { checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('https://librarymanagement-81b2.onrender.com/user/updatenotification', settings, { withCredentials: true });
      setSettings(settings); // update state with new settings
      setMessage(res.data.message);


      fetchNotificationSettings(); // 👈 refresh after save
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings');


      console.log('Error:', err);
    }
  };
  setTimeout(()=>{
    setMessage('');
    setError('');
  }, 2000);

  return (
    <div className="p-6 sm:p-10 lg:p-14  bg-gray-100 text-black dark:bg-gray-900 dark:text-white min-h-screen">

      <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-10 text-black dark:text-white">Notification Settings</h2>
         {message && (
        <div className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-200">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded">
          ❌ {error}
        </div>
      )}

        {/* Notification Method */}
        <div className="mb-10 border-b border-gray-700 pb-8">
          <h3 className="text-xl font-semibold mb-4">🔔 Notification Method</h3>
          <div className="flex flex-col gap-5">
            <label className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={settings.method.email}
                onChange={handleChange('method', 'email')}
                className="form-checkbox h-5 w-5 text-blue-500 rounded-full transition-all duration-200"
              />
              <span className="text-base">Email Notifications</span>
            </label>
            <label className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={settings.method.push}
                onChange={handleChange('method', 'push')}
                className="form-checkbox h-5 w-5 text-blue-500 rounded-full transition-all duration-200"
              />
              <span className="text-base">Push Notifications</span>
            </label>
          </div>
        </div>

        {/* Notification Triggers */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">📚 Notify Me For</h3>
          <div className="flex flex-col gap-5">
            <label className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={settings.triggers.newBook}
                onChange={handleChange('triggers', 'newBook')}
                className="form-checkbox h-5 w-5 text-green-500 rounded-full transition-all duration-200"
              />
              <span className="text-base">New Book Added</span>
            </label>
            <label className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={settings.triggers.overdue}
                onChange={handleChange('triggers', 'overdue')}
                className="form-checkbox h-5 w-5 text-red-500 rounded-full transition-all duration-200"
              />
              <span className="text-base">Overdue Alerts</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white font-medium transition-all duration-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;



