
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to Your <span className="text-blue-600 block">Digital Library</span>
        </h1>

    
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover, learn, and grow with our comprehensive library management system. 
          Access thousands of books, resources, and digital content from anywhere.
        </p>

    
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search books, authors, or topics..."
              className="w-full pl-4 pr-4 py-4 text-black text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

    
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Explore Catalog →
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
