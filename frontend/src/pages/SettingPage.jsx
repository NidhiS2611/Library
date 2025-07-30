import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">Settings</h2>
        <div className="flex flex-col space-y-4">
          <Link
            to="/accountsettings"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Account
          </Link>
          <Link
            to="/notificationsettings"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Notifications
          </Link>
          <Link
            to="/securitysettings"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Security
          </Link>
          <Link
            to="/helpsettings"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Help
          </Link>
          <Link
            to="/aisettings"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            AI Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
