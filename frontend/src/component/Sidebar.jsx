// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, BookCheck, BookX, User, Home, X } from 'lucide-react';

const Sidebar = ({ active, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/user/Userdashboard' },
    { id: 'books', label: 'All Books', icon: BookOpen, path: '/user/Books' },
    { id: 'issued', label: 'Issued Books', icon: BookCheck, path: '/user/IssuedBooks' },
    { id: 'returned', label: 'Returned Books', icon: BookX, path: '/user/Returnedbooks' },
    { id: 'profile', label: 'Profile', icon: User, path: 'profile' }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity md:hidden ${active ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`bg-white border-r shadow-md md:w-64 w-64 fixed md:relative h-screen z-40 transition-transform duration-300 transform ${active ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Top Section */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">LibraryNS</h1>
              <p className="text-sm text-gray-600">Digital Library</p>
            </div>
          </div>
          {/* Close Button on Mobile */}
          <button className="md:hidden" onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(({ id, label, icon: Icon, path }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={toggleSidebar}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
