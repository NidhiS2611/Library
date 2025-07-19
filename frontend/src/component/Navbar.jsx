




import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Darkmodecontext } from '../context/Darkmodecontext'; // 👈 Import context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, Toggletheme } = useContext(Darkmodecontext); // ✅ updated keys

  return (
    <nav className="bg-white text-black border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700 shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide text-blue-500 dark:text-blue-400">
            📚 LibraryNS
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="transition-colors font-medium px-3 py-1 rounded text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-white dark:hover:text-blue-300 dark:hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg font-semibold transition-all shadow-sm bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Register
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={Toggletheme}
              className="ml-4 px-2 py-1 border rounded text-sm transition-all hover:bg-blue-100 dark:hover:bg-gray-800"
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl focus:outline-none"
            >
              {isOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-700">
            <Link
              to="/login"
              className="block font-medium transition-colors text-gray-800 hover:text-blue-600 dark:text-white dark:hover:text-blue-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 rounded-md font-medium text-center transition-all bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Register
            </Link>
            <button
              onClick={Toggletheme}
              className="block w-full text-sm border mt-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-800"
            >
              {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
