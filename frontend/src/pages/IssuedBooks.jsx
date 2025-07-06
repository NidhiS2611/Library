import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IssuedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('');
  const[error,setError] = useState('')

  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/issuedbooks', {
        withCredentials: true,
      });

      console.log('Fetched books:', res.data);
      setBooks(res.data.issuedbook || []);
    } catch (err) {
      console.error('Error fetching issued books:', err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (issuedbookid) => {
    console.log('Returning book with ID:', issuedbookid);
    
    try {
     const res=  await axios.put(`http://localhost:3000/issuedbook/returnbook/${issuedbookid}`,
        {},
        { withCredentials: true }
      );
      setMessage(res.data.message || 'Book returned successfully');
      fetchIssuedBooks();
    } catch (err) {
      console.error('Error returning book:', err);
      setError(err.response?.data?.message || 'something went wrong');
    }
  };
  

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white min-h-[85vh] w-full rounded-xl shadow-md">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
        📚 Issued Books
      </h2>
      {message && (
        <div className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded">
          ❌ {error}
        </div>
      )}
      

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : books.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg font-medium">
          😔 No books issued.
        </div>
      ) : (
        <>
          
          <div className="hidden sm:block overflow-x-auto text-black">
            <table className="w-full text-left border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm sm:text-base">
                <tr>
                  <th className="py-3 px-4">Book</th>
                  <th className="py-3 px-4">Author name</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  if (!book || !book.book) return null;

                  const issued = book.issueddate
                    ? new Date(book.issueddate).toLocaleDateString()
                    : 'N/A';
                  const due = book.returnDate
                    ? new Date(book.returnDate).toLocaleDateString()
                    : 'N/A';
                  const isOverdue = new Date() > new Date(book.returnDate);

                  return (
                    <tr key={book._id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 px-4">
                        <div className="font-semibold">{book.book.title}</div></td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-500">{book.book.author}</div></td>
                      
                      <td className="py-4 px-4">{issued}</td>
                      <td className="py-4 px-4">{due}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            isOverdue
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {isOverdue ? 'Overdue' : 'Active'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleReturn(book._id)}
                          className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition"
                        >
                          Return Book
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          
          <div className="sm:hidden space-y-4 text-black">
            {books.map((book) => {
              if (!book || !book.book) return null;

              const issued = book.issueddate
                ? new Date(book.issueddate).toLocaleDateString()
                : 'N/A';
              const due = book.returnDate
                ? new Date(book.returnDate).toLocaleDateString()
                : 'N/A';
              const isOverdue = new Date() > new Date(book.returnDate);

              return (
                <div
                  key={book._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <h3 className="font-bold text-md mb-1"><span className="font-semibold">Book Title:</span>{book.book.title}</h3>
                  <p className="text-sm text-gray-500 mb-2"> <span className="font-semibold">Author name:</span>{book.book.author}</p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Issued:</span> {issued}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Due:</span> {due}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Status:</span>{' '}
                    <span
                      className={`font-semibold ${
                        isOverdue ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {isOverdue ? 'Overdue' : 'Active'}
                    </span>
                  </p>
                  <button
                    onClick={() => handleReturn(book._id)}
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                  >
                    Return Book
                  </button>
                </div>
              );
            })}
          </div>
        </>

      )}
    </div>
  );
};

export default IssuedBooks;






