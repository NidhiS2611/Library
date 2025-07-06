import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, ClipboardCheck, ClipboardList, Clock } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    issuedBooks: 0,
    returnedBooks: 0,
    overdueBooks: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/dashboard", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    {
      title: "Total Books",
      count: stats.totalBooks,
      color: "bg-blue-500",
      icon: <BookOpen size={24} />,
    },
    {
      title: "Issued Books",
      count: stats.issuedBooks,
      color: "bg-green-500",
      icon: <ClipboardList size={24} />,
    },
    {
      title: "Returned Books",
      count: stats.returnedBooks,
      color: "bg-purple-500",
      icon: <ClipboardCheck size={24} />,
    },
    {
      title: "Overdue Books",
      count: stats.overdueBooks,
      color: "bg-red-500",
      icon: <Clock size={24} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Summary</h1>
      <div className="flex flex-col gap-5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center ${card.color} text-white p-5 rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300`}
          >
            <div>
              <h2 className="text-sm font-medium">{card.title}</h2>
              <p className="text-2xl font-bold">{card.count}</p>
            </div>
            <div>{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


     

