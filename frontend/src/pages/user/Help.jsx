import React, { useState } from "react";
import axios from "axios";

const Help = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://library-management-dwg7.onrender.com/help/help", formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setFormData({ subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  // Clear messages after 3s
  setTimeout(() => {
    setMessage("");
    setError("");
  }, 3000);

  return (
    <div className="max-w-md mx-auto text-black dark:text-white mt-10">
      {/* Help Form */}
      <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-center">📩 Help Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Enter subject"
              className="w-full p-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Describe your issue..."
              className="w-full p-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-400">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Contact Section */}
      <div className="mt-10 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-300 dark:border-gray-700 text-center">
        <h3 className="text-xl font-semibold mb-2">📞 Contact Us</h3>
        <p className="text-sm">If you need further assistance, feel free to reach out:</p>
        <div className="mt-2">
          <p>Email: <a href="mailto:nikhildhuriya26@gmail.com" className="text-blue-600 hover:underline">nikhildhuriya26@gmail.com</a></p>
          <p>Phone: <a href="tel:+919999999999" className="text-blue-600 hover:underline">+91 99999 99999</a></p>
        </div>
      </div>
    </div>
  );
};

export default Help;


