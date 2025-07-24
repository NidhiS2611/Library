import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Manageuser = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/getallusers',{ withCredentials: true });
      setUsers(response.data);
      console.log('Fetched users:', response.data);
      
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) 
    

  );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white min-h-[85vh] w-full rounded-xl shadow-md dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left dark:text-white">
        👥 Users List
      </h2>

      <div className="mb-6 flex justify-center ">
        <input
          type="text"
          placeholder="🔍 Search by name, email.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg font-medium dark:text-gray-400">
          😔 No users found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Card No</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="py-4 px-4">{user.name}</td>
                    <td className="py-4 px-4">{user.email}</td>
                    <td className="py-4 px-4 capitalize">{user.role}</td>
                    <td className="py-4 px-4">{user.cardInfo?.cardnumber || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        to={`/admin/manageuser/${user._id}`}
                        className="text-blue-600 underline hover:text-blue-800 text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {filteredUsers.map((user) => (
              <div key={user._id} className="border border-gray-200 rounded-lg p-4 shadow-sm dark:border-gray-600">
                <h3 className="font-bold text-md mb-1">{user.name}</h3>
                <p className="text-sm mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-sm mb-1"><span className="font-semibold">Role:</span> {user.role}</p>
                <p className="text-sm mb-1"><span className="font-semibold">Card No:</span> {user.cardInfo?.cardnumber || 'N/A'}</p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={`${user.status === 'Active' ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                    {user.status}
                  </span>
                </p>
                <Link
                  to={`/admin/manageuser/${user._id}`}
                  className="text-blue-600 underline text-sm hover:text-blue-800"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Manageuser;


