
import React from 'react';

const AboutContact = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Our Library</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our mission is to empower learners with seamless access to educational resources.
            From physical books to digital collections, our platform ensures that every user experiences the best in library services.
          </p>
        </div>

        {/* Contact + Social Grid */}
        <div className="grid md:grid-cols-2 gap-12 text-center">
          
          {/* Contact Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">📞 Contact Us</h3>
            <ul className="space-y-3 text-gray-600 text-[16px]">
              <li><strong>Email:</strong> <a href="mailto:support@libraryms.com" className="text-blue-600 hover:underline">support@libraryms.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 9876543210</a></li>
              <li><strong>Address:</strong> 123 Knowledge Lane, CityName, India</li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">🌐 Follow Us</h3>
            <ul className="space-y-3 text-blue-600 text-[16px] font-medium">
              <li>
                <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">GitHub</a>
              </li>
              <li>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">LinkedIn</a>
              </li>
              <li>
                <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;
