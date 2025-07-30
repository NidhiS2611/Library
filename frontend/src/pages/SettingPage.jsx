import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 px-4 py-10 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-center mb-10 dark:text-white">
        Settings
      </h2>

      <div className="w-full max-w-md flex flex-col space-y-5">
        <Link
          to="/accountsettings"
          className="block px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
        >
          Account Settings
        </Link>
        <Link
          to="/notificationsettings"
          className="block px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
        >
          Notification Settings
        </Link>
        <Link
          to="/securitysettings"
          className="block px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
        >
          Security Settings
        </Link>
        <Link
          to="/helpsettings"
          className="block px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
        >
          Help
        </Link>
        <Link
          to="/aisettings"
          className="block px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition text-gray-900 dark:text-gray-100"
        >
          AI Settings
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;


