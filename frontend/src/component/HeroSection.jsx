
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          📚 Welcome to Your <span className="text-blue-600 dark:text-blue-400">Digital Library</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          Manage your books, members, and digital assets in one place. Experience learning without limits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/Explore">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-transform hover:scale-105">
              Explore Catalog →
            </button>
          </Link>

          <button className="border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
