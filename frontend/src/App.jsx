import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx'
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import Protected from './component/Protected.jsx';
import Librarydashboard from './layouts/Librarydashboard.jsx';
import IssuedBooks from './pages/IssuedBooks.jsx';
import ReturnedBooks from './pages/ReturnedBooks.jsx';
import Userdashboard from './pages/Userdashboard.jsx';
import Books from './pages/Books.jsx'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user" element={<Protected><Librarydashboard /></Protected>}>
            <Route path="Userdashboard" element={<Userdashboard />} />
            <Route path="Books" element={<Books />} />
            <Route path="IssuedBooks" element={<IssuedBooks />} />
            <Route path="Returnedbooks" element={<ReturnedBooks />} />
            
          </Route>

          {/* Add more routes as needed */}

        </Routes>




      </Router>
    </>
  )
}

export default App
