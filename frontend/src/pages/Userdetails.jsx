import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Userdetails = () => {
  const { userid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/user/${userid}`, {
          withCredentials: true,
        });
        console.log('User data:', res.data);
        setData(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userid]);

  if (!data) return <div className="text-center p-4">Loading...</div>;

  const { user, card, issuedbooks, returnedbooks } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* User Info */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">User Information</h2>
        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Name:</span> {user?.name}</p>
        <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Email:</span> {user?.email}</p>
      </div>

      {/* Card Info */}
      <div className="bg-blue-50 dark:bg-gray-900 shadow-md rounded-xl p-6 mb-6 ">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Library Card</h2>
        {card ? (
          <>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Card Number:</span> {card.cardnumber}</p>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Status:</span> {card.isActive ? 'Active' : 'Inactive'}</p>
            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Currently Issued:</span> {card.currentlyIssued}</p>
          </>
        ) : (
          <p className="text-red-600 dark:text-red-400">No library card assigned</p>
        )}
      </div>

      {/* Issued Books */}
      <div className="bg-green-50 dark:bg-gray-700 shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Issued Books</h2>
        {issuedbooks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No issued books.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {issuedbooks.map((bookObj, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
                <p className="font-medium text-gray-800 dark:text-white">Title: {bookObj.book?.title}</p>
                <p className="text-gray-700 dark:text-gray-300">Author: {bookObj.book?.author}</p>
                <p className="text-gray-700 dark:text-gray-300">Issued on: {new Date(bookObj.issueddate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Returned Books */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Returned Books</h2>
        {returnedbooks.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No returned books.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {returnedbooks.map((bookObj, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
                <p className="font-medium text-gray-800 dark:text-white">Title: {bookObj.book?.title}</p>
                <p className="text-gray-700 dark:text-gray-300">Author: {bookObj.book?.author}</p>
                <p className="text-gray-700 dark:text-gray-300">Returned on: {new Date(bookObj.returnDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Userdetails;

