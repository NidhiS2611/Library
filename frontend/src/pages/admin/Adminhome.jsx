


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";

const Adminhome = () => {
  const [stats, setStats] = useState({
    users: { active: 0, deactive: 0 },
    booksByMonth: [],
    issuedBooks: 0,
    returnedBooks: 0,
    totalFine: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const LINE_COLOR = "#3B82F6";
  const PIE_COLORS = ["#4CAF50", "#F44336"];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get("https://library-management-dwg7.onrender.com/admindashboard", {
          withCredentials: true
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  // ✅ Window resize listener for mobile/desktop detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const chartData = stats.booksByMonth.map(item => ({
    month: item.month,
    count: item.count
  }));

  const maxCount = chartData.length
    ? Math.max(...chartData.map(d => d.count))
    : 0;
  const step = maxCount <= 10 ? 1 : maxCount <= 50 ? 5 : 10;
  const yMax = Math.ceil(maxCount / step) * step;
  const yTicks = Array.from({ length: (yMax / step) + 1 }, (_, i) => i * step);

  const pieData = [
    { name: "Active Users", value: stats.users.active },
    { name: "Deactive Users", value: stats.users.deactive },
  ];

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h1 className="text-xl sm:text-3xl font-bold text-center dark:text-white mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full md:col-span-2">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">
            Books Created Per Month
          </h2>
          <ResponsiveContainer width="100%" height={isMobile ? 400 : 350}>
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: isMobile ? 50 : 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#374151", fontSize: 12 }}
                interval={0}
                height={isMobile ? 50 : 30}
                angle={isMobile ? -45 : 0} // ✅ Rotate only in mobile
                textAnchor={isMobile ? "end" : "middle"}
              />
              <YAxis
                tick={{ fill: "#374151", fontSize: 12 }}
                allowDecimals={false}
                ticks={yTicks}
                domain={[0, yMax]}
              />
              <Tooltip formatter={(value) => [`${value}`, "Books"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke={LINE_COLOR}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full md:col-span-1">
          <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">
            Active vs Deactive Users
          </h2>
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 90 : 65}
                dataKey="value"
                label={{ fill: "#374151", fontSize: 13 }}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">Issued Books</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.issuedBooks}</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-lg font-semibold text-gray-700">Returned Books</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.returnedBooks}</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Fine Collected</h2>
          <p className="text-2xl font-bold text-red-600">₹ {stats.totalFine}</p>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
