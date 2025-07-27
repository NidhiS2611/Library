import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Users, Settings, Home, X, BookCheck,HomeIcon ,User,Book} from 'lucide-react';


const AdminSidebar = ({ active, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: Home, path: '/admin/home' },
    { id: 'users', label: 'Manage Users', icon: Users, path: '/admin/manageuser' },
    { id: 'books', label: 'Manage Books', icon: BookCheck, path: '/admin/managebooks' },
    { id: 'settings', label: 'Profile', icon:  User, path: '/admin/Profile' },
    { id: 'addbooks', label: 'Add Book', icon:Book , path: '/admin/addbooks' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity md:hidden ${active ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-md md:w-64 w-64 fixed md:relative h-screen z-40 transition-transform duration-300 transform ${active ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Top Section */}
        <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div >
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">AdminNS</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 ">Admin Panel</p>
              </div>
          </div>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
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
                      isActive
                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-white border border-blue-200 dark:border-gray-700'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
        <div className='flex gap-4 ml-7 dark:text-gray-100 text-blue-900'>
          <HomeIcon/>
               <NavLink to = "/" className="font-bold ">Back to Home</NavLink>
        </div>
      

      </div>
    </>
  );
};

export default AdminSidebar;
