
// Librarydashboard.jsx
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Librarydashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios.get("https://library-management-dwg7.onrender.com/user/me", { withCredentials: true })
      .then((res) => setUserName(res.data.user.name))
      .catch((err) => console.log("User fetch error:", err));
  }, []);

  return (
    <div className="flex h-screen  w-full overflow-hidden bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Sidebar active={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header userName={userName} toggleSidebar={toggleSidebar} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Librarydashboard;
