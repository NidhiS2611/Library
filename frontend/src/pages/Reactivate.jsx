import React, { useState } from 'react';
import axios from 'axios';

const Reactivate = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReactivate = async () => {
    try {
      const res = await axios.put('https://library-management-dwg7.onrender.com/user/reactivate', { email });
      setMessage('Account reactivated successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setMessage('Failed to reactivate account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center px-4 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold text-center mb-4">Reactivate Account</h2>
                
        <p className="text-sm text-yellow-700 text-center mb-4 dark:text-yellow-400">
          Your account is deactivated. Please enter your email to log in.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded bg-white text-black mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:focus:ring-slate-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleReactivate}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded dark:hover:bg-green-700 transition duration-200"
        >
          Reactivate
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-green-400">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Reactivate;

