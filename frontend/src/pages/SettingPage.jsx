import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Settings
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          to="/accountsettings"
          className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 text-center font-medium text-gray-800 dark:text-gray-200 transition"
        >
          Account
        </Link>

        <Link
          to="/notificationsettings"
          className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 text-center font-medium text-gray-800 dark:text-gray-200 transition"
        >
          Notifications
        </Link>

        <Link
          to="/securitysettings"
          className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 text-center font-medium text-gray-800 dark:text-gray-200 transition"
        >
          Security
        </Link>

        <Link
          to="/helpsettings"
          className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 text-center font-medium text-gray-800 dark:text-gray-200 transition"
        >
          Help
        </Link>

        <Link
          to="/aisettings"
          className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 text-center font-medium text-gray-800 dark:text-gray-200 transition"
        >
          AI Settings
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;

