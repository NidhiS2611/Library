// AdminHeader.jsx
import axios from 'axios';
import { Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ userName, toggleSidebar }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const getTitle = () => {
    const path = window.location.pathname.split("/")[2];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'AdminDashboard';
  };

  const logouthandler = async () => {
    try {
      await axios.get('https://librarymanagement-81b2.onrender.com/user/logout', {
        withCredentials: true
      });
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      {(message || error) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {message && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-6 py-3 rounded shadow-md text-sm font-semibold">
              ✅ {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-6 py-3 rounded shadow-md text-sm font-semibold">
              ❌ {error}
            </div>
          )}
        </div>
      )}

      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sticky top-0 z-20">
        {/* LEFT: Hamburger + Title */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{getTitle()}</h2>
        </div>

        {/* RIGHT: Welcome + Logout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <p className="text-black dark:text-white text-base sm:text-lg font-bold">
            Welcome Admin <span className="font-semibold text-gray-800 dark:text-gray-300">{userName}</span>
          </p>

          <button
            onClick={logouthandler}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;