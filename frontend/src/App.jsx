import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx'
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Navigate } from 'react-router-dom';

import Protected from './component/Protected.jsx';
import Librarydashboard from './layouts/Librarydashboard.jsx';
import IssuedBooks from './pages/IssuedBooks.jsx';
import ReturnedBooks from './pages/Returnedbooks.jsx';
import Userdashboard from './pages/Userdashboard.jsx';
import Books from './pages/Books.jsx'
import Profile from './pages/Profile.jsx';
import Admindashboard from './layouts/Admindashboard.jsx';
import Explore from './pages/Explore.jsx';
function App() {



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user" element={<Protected><Librarydashboard /></Protected>}>
            <Route index element={<Navigate to="dashboard" />} />
              
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="Books" element={<Books />} />
            <Route path="IssuedBooks" element={<IssuedBooks />} />
            <Route path="Returnedbooks" element={<ReturnedBooks />} />
            <Route path="Profile" element={<Profile />} />
            
          </Route>
          <Route path = '/admin' element = { <Admindashboard/>}/>
          <Route path="/Explore" element={<Explore />} />

          

        </Routes>




      </Router>

    </>
  )
}

export default App
