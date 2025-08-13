import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx'
import Homepage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Navigate } from 'react-router-dom';

import Protected from './component/Protected.jsx';
import Librarydashboard from './layouts/Librarydashboard.jsx';
import IssuedBooks from './pages/user/IssuedBooks.jsx';
import ReturnedBooks from './pages/user/Returnedbooks .jsx'
import Userdashboard from './pages/user/Userdashboard.jsx';
import Books from './pages/user/Books.jsx';
import Profile from './pages/user/Profile.jsx';
import Admindashboard from './layouts/Admindashboard.jsx';
import Explore from './pages/Explore.jsx';
import Adminhome from './pages/admin/Adminhome.jsx';
import Manageuser from './pages/admin/Manageuser.jsx';
import Userdetails from './pages/admin/Userdetails.jsx';
import Managebooks from './pages/admin/Managebooks.jsx';
import Addbooks from './pages/admin/Addbooks.jsx';
import Adminprofile from './pages/admin/Adminprofile.jsx';

import SettingsPage from './pages/user/SettingPage.jsx';
import Accountsettings from './pages/user/Accountsettings.jsx';
import Reactivate from './pages/Reactivate.jsx';
import Notificationsttings from './pages/user/Notificationsttings.jsx';
import NotificationListener from './component/NotificationListener.jsx';
import Notification from './pages/Notification.jsx';
import Help from './pages/user/Help.jsx';
import Helpsection from './pages/admin/Helpsection.jsx';
function App() {


  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('✅ Service Worker Registered:', registration);
        })
        .catch((err) => {
          console.error('❌ SW registration failed:', err);
        });
    }
  }, []);




  return (
    <>
      <Router>
        <NotificationListener />
        <Routes>
          
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reactivateaccount" element={<Reactivate />} />
        
<Route path="/notification" element={<Notification />} />
          <Route path="/user" element={<Protected><Librarydashboard /></Protected>}>
            <Route index element={<Navigate to="dashboard" />} />
            

            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="Books" element={<Books />} />
            <Route path="IssuedBooks" element={<IssuedBooks />} />
            <Route path="Returnedbooks" element={<ReturnedBooks />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="settings/accountsettings" element={<Accountsettings />} />
            <Route path="settings/notificationsettings" element={<Notificationsttings />} />
            <Route path="settings/help" element={<Help />} />

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
          
            <Route path="helpsection" element={<Helpsection />} />

          </Route>


        </Routes>



      </Router>

    </>
  )
}

export default App;