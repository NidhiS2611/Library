
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,NavLink } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('https://librarymanagement-81b2.onrender.com/user/register', formData, {
        withCredentials: true
      });

      setMessage(res.data.message);

      if (res.status === 201) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:shadow-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Your Account
        </h2>
        <p className="text-center text-gray-800 dark:text-gray-300 mb-4 font-bold">
          Register to access LibraryMS
        </p>

        {message && <p className="text-green-600 dark:text-green-400 font-semibold text-center">{message}</p>}
        {error && <p className="text-red-600 dark:text-red-400 font-semibold text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-black dark:text-white">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Register
          </button>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Login
            </a>
          </p>
          <p  className='text-center font-semibold text-blue-700'>   <NavLink to = '/' className='mb-6' >Back To Home</NavLink></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
