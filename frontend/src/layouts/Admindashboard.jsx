
// AdminDashboard.jsx
import AdminSidebar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios.get("http://localhost:3000/user/me", { withCredentials: true })
      .then((res) => setAdminName(res.data.user.name))
      .catch((err) => console.log("Admin fetch error:", err));
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <AdminSidebar active={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <AdminHeader userName={adminName} toggleSidebar={toggleSidebar} />
        <main className="p-4">
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;





