
import React, { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import axios from 'axios';
import { requestPermissionAndGetToken } from '../firebase/requestPermission'; // Import the function
// Import the function
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/user/login', formData, {
        withCredentials: true
      });

      const role = response.data.role;
      const isActive = response.data.isActive;

     


    
      if (role === 'admin') {
         await requestPermissionAndGetToken();
        navigate('/admin');
      } else {
         await requestPermissionAndGetToken();
        navigate('/user');
      }
    } catch (err) {
      console.log('Login Error:', err);
        console.log('Error Response:', err.response?.data); 
        if (err.response?.data?.deactivated) {
          setError('Your account is deactivated. Please contact support.');
          setTimeout(()=>{
            navigate('/reactivateaccount');
          },3000)




  } else {
    setError(err.response?.data?.message || 'Something went wrong');
  }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:shadow-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-800 dark:text-gray-300 mb-6 font-bold">
          Login to your LibraryNS account
        </p>

        <form className="space-y-4 text-black dark:text-white" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              required
            />
          </div>

          {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
              Register
            </a>
          </p>
          <p  className='text-center font-semibold text-blue-700'>   <NavLink to = '/' className='mb-6' >Back To Home</NavLink></p>
    
        </form>
      </div>
    </div>
  );
};

export default Login;
