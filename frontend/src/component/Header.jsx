

import axios from 'axios';
import { Menu } from 'lucide-react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Header = ({ userName, toggleSidebar }) => {
  const navigate = useNavigate();
  const[error,setError] = useState('');
  const[message,setMessage] = useState('');
  const getTitle = () => {
    const path = window.location.pathname.split("/")[2];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
  };
    const createcard  = async ()=>{
      try{
        const res = await axios.post('http://localhost:3000/library/createcard',{}, {
          withCredentials: true})
          
        setMessage(res.data.message || 'Library card created successfully');
      }
      catch(err){
        console.error('Error creating library card:', err);
        setError(err.response?.data?.message|| 'Something went wrong');

      }
    }

     const logouthandler = async()=>{
      try{
        const res = await axios.get('http://localhost:3000/user/logout', {
          withCredentials: true
        });
        navigate('/login');

      }
      catch(err){
        console.error('Error logging out:', err);
        setError(err.response?.data?.message || 'Something went wrong');
      }
     
     }
    useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <>
      {(message || error) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          {message && (
            <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-3 rounded shadow-md text-sm font-semibold">
              ✅ {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-3 rounded shadow-md text-sm font-semibold">
              ❌ {error}
            </div>
          )}
        </div>
      )}

      <header className="bg-white shadow-sm border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sticky top-0 z-20">
        {/* LEFT: Hamburger + Title */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-gray-600" onClick={toggleSidebar}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
        </div>

        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <p className="text-black text-base sm:text-lg font-bold">
            Welcome back <span className="font-semibold text-gray-800">{userName}</span>
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all text-sm sm:text-base w-full sm:w-auto text-center" onClick={createcard}>
            Create Card
          </button> 
           
              <button
              onClick={logouthandler}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all text-sm sm:text-base w-full sm:w-auto text-center"
          >
            Logout
          </button>


 
        </div>
      </header>
    </>
    );
  }

export default Header;
