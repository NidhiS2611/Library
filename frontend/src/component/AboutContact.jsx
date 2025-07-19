import React from 'react';

const AboutContact = () => {
  return (
    <div className="min-h-screen py-10 px-4 md:px-16 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      
      {/* About Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">
          📚 About Our Library
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 text-center max-w-4xl mx-auto">
          Welcome to <span className="font-semibold">Your Digital Library</span>, where knowledge meets convenience!
          We aim to make reading and learning easier and more accessible than ever before.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Feature text="🕒 24x7 Access: Read anytime, anywhere with our round-the-clock library access." />
          <Feature text="💳 Library Card Facility: Get your personal library card and start issuing books." />
          <Feature text="📖 Wide Collection: From academics to fiction, access a vast range of books." />
          <Feature text="🌐 User-Friendly Interface: Fully responsive and mobile-ready experience." />
          <Feature text="🧘‍♂️ Quiet Reading Zones: Peaceful zones at physical branches for focused reading." />
          <Feature text="📈 Track Reading History: Stay updated with your past and current reads." />
          <Feature text="🤝 Student-Friendly Environment: Supportive and engaging space for learners." />
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-50 dark:bg-gray-900 p-6 rounded-2xl shadow-md max-w-5xl mx-auto transition-colors duration-500">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-400 mb-4 text-center">
          📞 Contact Us
        </h2>
        <div className="md:flex justify-between gap-8">
          {/* Contact Info */}
          <div className="space-y-3">
            <p className="text-gray-800 dark:text-gray-300">
              📧 Email: <a href="mailto:library@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">library@example.com</a>
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              📞 Phone: <a href="tel:+919999999999" className="text-blue-600 dark:text-blue-400 hover:underline">+91 99999 99999</a>
            </p>
            <p className="text-gray-800 dark:text-gray-300">
              🏫 Address: 123 Knowledge Street, Education City
            </p>
          </div>

          {/* Social Media */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">🌐 Social Links</h3>
            <ul className="space-y-2">
              <li>
                🔗 <a href="https://github.com/yourusername" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub</a>
              </li>
              <li>
                🔗 <a href="https://instagram.com/yourusername" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Instagram</a>
              </li>
              <li>
                🔗 <a href="https://linkedin.com/in/yourusername" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature box with dark mode
const Feature = ({ text }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition">
    <p className="text-gray-800 dark:text-gray-200 text-base">{text}</p>
  </div>
);

export default AboutContact;

