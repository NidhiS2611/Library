import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Accountsettings = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // API: Deactivate Account
  const handleDeactivate = async () => {
    
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const res = await axios.put(
        `https://library-management-dwg7.onrender.com/user/deactivate`,
        {},
        { withCredentials: true }
      );

      setMessage(res.data.message || "Account deactivated successfully.");


      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong while deactivating."
      );
    } finally {
      setLoading(false);
    }
  };

  // API: Delete Account
  const handleDelete = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const res = await axios.delete(
        "https://library-management-dwg7.onrender.com/user/delete",
        { withCredentials: true }
      );

      setMessage(res.data.message || "Account deleted permanently.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong while deleting."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-white py-10 px-4 sm:px-8 md:px-16 dark:bg-gray-900 dark:text-white">
      <div className=" mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-10 dark:bg-gray-900 dark:text-white w-full ">
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2 text-black dark:text-white">
          Account Settings
        </h2>

        {/* Show Message */}
        {message && (
          <p className="text-green-400 mb-4 bg-green-900 px-4 py-2 rounded">
            {message}
          </p>
        )}

        {/* Show Error */}
        {error && (
          <p className="text-red-400 mb-4 bg-red-900 px-4 py-2 rounded">
            {error}
          </p>
        )}

        <div className="space-y-8">
          {/* Deactivate */}
          <div className="bg-gray-50 p-5 rounded-lg dark:bg-gray-900 ">
            <h3 className="text-xl font-semibold mb-2">Temporarily Deactivate</h3>
            <p className="text-black mb-4 text-sm dark:text-white">
              You can deactivate your account temporarily. You can reactivate it later by logging in again.
            </p>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded transition w-full sm:w-auto"
              onClick={handleDeactivate}
              disabled={loading}
            >
              {loading ? "Processing..." : "Deactivate Account"}
            </button>
          </div>
        

          {/* Delete */}
          <div className="bg-gray-50 p-5 rounded-lg dark:bg-gray-900  ">
            <h3 className="text-xl font-semibold mb-2">Delete Account Permanently</h3>
            <p className="text-black mb-4 text-sm dark:text-white">
              This will permanently delete your account and all data. Action cannot be undone.
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition w-full sm:w-auto"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Permanently"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountsettings;
