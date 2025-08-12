// AdminHelpRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Helpsection = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [responses, setResponses] = useState({});

  const fetchHelpRequests = async () => {
    const res = await axios.get('https://librarymanagement-81b2.onrender.com/admin/helpsection', {
      withCredentials: true,
    });
    setHelpRequests(res.data.helpRequests);
  };

  const handleResolve = async (id) => {
    try {
      if (!responses[id] || responses[id].trim() === '') {
        alert('Please write a response first');
        return;
      }

      await axios.put(
        `https://librarymanagement-81b2.onrender.com/admin/resolvehelp/${id}`,
        { response: responses[id] },
        { withCredentials: true }
      );

      fetchHelpRequests();
    } catch (error) {
      console.error('Error resolving help request:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this help request?')) {
      return;
    }
    try {
      await axios.delete(`https://librarymanagement-81b2.onrender.com/help/deletehelp/${id}`, {
        withCredentials: true,
      });
      fetchHelpRequests();
    } catch (error) {
      console.error('Error deleting help request:', error);
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900  min-h-screen text-black dark:text-white ">
      <h2 className="text-xl sm:text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
        Help Requests
      </h2>

      {helpRequests.length === 0 && (
        <p className="text-sm sm:text-base text-gray-400">
          No help requests found.
        </p>
      )}

      {helpRequests.map((req) => (
        <div
          key={req._id}
          className="border border-gray-700 bg-white  dark:bg-gray-900 p-4 rounded-lg mb-4 shadow-lg text-sm sm:text-base"
        >
          <p className="mb-1">
            <strong>User:</strong> {req.user?.name} ({req.user?.email})
          </p>
          <p className="mb-1">
            <strong>Title:</strong> {req.subject}
          </p>
          <p className="mb-1">
            <strong>Description:</strong> {req.message}
          </p>
          <p className="mb-2 text-xs sm:text-sm text-gray-700 dark:text-gray-400">
            <strong>Date:</strong> {new Date(req.createdAt).toLocaleString()}
          </p>

          {req.status === 'pending' ? (
            <div className="mt-3 flex items-start gap-3">
              {/* Textarea */}
              <textarea
                placeholder="Write your response..."
                value={responses[req._id] || ''}
                onChange={(e) =>
                  setResponses({ ...responses, [req._id]: e.target.value })
                }
                className="border border-gray-200 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 min-h-[60px] text-sm sm:text-base"
              />

              {/* Buttons group */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleResolve(req._id)}
                  className="bg-green-900 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 text-sm sm:text-base"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200 text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex justify-between items-center">
              <p className="text-green-700 text-sm sm:text-base">
                ✅ Resolved
              </p>
              <button
                onClick={() => handleDelete(req._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200 text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Helpsection;






   
