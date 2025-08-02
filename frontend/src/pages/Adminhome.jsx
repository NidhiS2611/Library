import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalbooks: 0,
    totalusers: 0,
    totalissuedbooks: 0,
    totalreturnedbooks: 0,
    totalfine: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admindashboard", {
          withCredentials: true,});
        setStats(res.data);
        console.log("Dashboard stats:", res.data);
        
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Admin Dashboard
      </h1>

      <div className="flex flex-col space-y-4">
        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Books</h2>
          <p className="text-2xl font-bold text-blue-700">{stats.totalbooks}</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-green-600">{stats.totalusers}</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Issued Books</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.totalissuedbooks}</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Returned Books</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.totalreturnedbooks}</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Fine Collected</h2>
          <p className="text-2xl font-bold text-red-600">₹ {stats.totalfine}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;




