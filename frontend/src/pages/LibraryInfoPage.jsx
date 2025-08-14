// LibraryInfoPage.jsx
import React from 'react';
import Navbar from '../component/Navbar.jsx';

const features = [
  { title: "Vast Collection", description: "Thousands of books across multiple genres.", icon: "📚" },
  { title: "Easy Issuing", description: "Issue and return books with just a few clicks.", icon: "📝" },
  { title: "Digital Access", description: "Read books online anytime, anywhere.", icon: "💻" },
];

const LibraryInfoPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">

        {/* Library Card */}
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow mb-12 max-w-md mx-auto text-center">
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">📖</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Library NS</h1>
        <p className="text-gray-600 dark:text-white text-sm md:text-base">
          A modern digital library offering thousands of books and easy access for all readers.
        </p>
      </div>

      {/* Features */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">Library Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4 text-blue-500">{feature.icon}</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-white text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">About Library NS</h2>
        <p className="text-gray-700 dark:text-white text-sm md:text-base">
          Library NS is designed to bring the joy of reading to everyone. From fiction to technical books, we provide a seamless experience to explore, issue, and read books digitally or offline. Join us and dive into a world of knowledge and learning.
        </p>
      </div>
      </div>
    </>
  );
};

export default LibraryInfoPage;
