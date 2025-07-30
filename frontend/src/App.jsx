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
import Books from './pages/Books.jsx';
import Profile from './pages/Profile.jsx';
import Admindashboard from './layouts/Admindashboard.jsx';
import Explore from './pages/Explore.jsx';
import Adminhome from './pages/Adminhome.jsx';
import Manageuser from './pages/Manageuser.jsx';
import Userdetails from './pages/Userdetails.jsx';
import Managebooks from './pages/Managebooks.jsx';
import Addbooks from './pages/Addbooks.jsx';
import Adminprofile from './pages/Adminprofile.jsx';

import SettingsPage from './pages/SettingPage.jsx';
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
            <Route path="settings" element={<SettingsPage />} />
           

          </Route>

          <Route path="/Explore" element={<Explore />} />

          <Route path="/admin" element={<Protected><Admindashboard /></Protected>} >
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Adminhome />} />
            <Route path="manageuser" element={<Manageuser />} />
            <Route path="manageuser/:userid" element={<Userdetails />} />
            <Route path="managebooks" element={<Managebooks />} />
            <Route path="addbooks" element={<Addbooks />} />
            <Route path="profile" element={<Adminprofile />} />
        

          </Route>


        </Routes>



      </Router>

    </>
  )
}

export default App;