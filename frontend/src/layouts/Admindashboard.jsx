import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../component/Header';


const Admindashboard = () => {
    
      
      const [userName, setUserName] = useState('');
    
    
    
      useEffect(() => {
        axios.get("http://localhost:3000/user/me", { withCredentials: true })
          .then((res) => setUserName(res.data.user.name))
          .catch((err) => console.log("User fetch error:", err));
      }, []);
  return (
    <div>
      <h3></h3>
    </div>
  )
}

export default Admindashboard





