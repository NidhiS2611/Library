import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Clock,
} from "lucide-react";

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
        const res = await axios.get("https://library-management-dwg7.onrender.com/user/dashboard", {
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
      gradient: "from-[#4f46e5] to-[#6366f1]",
      icon: <BookOpen size={32} />,
    },
    {
      title: "Issued Books",
      count: stats.issuedBooks,
      gradient: "from-[#059669] to-[#10b981]",
      icon: <ClipboardList size={32} />,
    },
    {
      title: "Returned Books",
      count: stats.returnedBooks,
      gradient: "from-[#9333ea] to-[#c026d3]",
      icon: <ClipboardCheck size={32} />,
    },
    {
      title: "Overdue Books",
      count: stats.overdueBooks,
      gradient: "from-[#dc2626] to-[#ef4444]",
      icon: <Clock size={32} />,
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">
        📊 Dashboard Summary
      </h1>

      <div className="w-full max-w-6xl flex flex-col gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${card.gradient} text-white rounded-2xl shadow-xl px-8 py-6 flex items-center justify-between hover:scale-[1.01] transition-transform duration-300`}
          >
            <div>
              <h2 className="text-sm font-semibold uppercase opacity-80">{card.title}</h2>
              <p className="text-4xl font-bold mt-1">{card.count}</p>
            </div>
            <div className="bg-white bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 text-gray-400 dark:text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} LibraryNS — Built with ❤️ by Nikhil
      </footer>
    </div>
  );
};

export default Dashboard;







     

