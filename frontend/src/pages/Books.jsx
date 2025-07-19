
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Books = () => {
  const location = useLocation();
  const isExplorePage = location.pathname === '/explore';

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const [totalBooks, setTotalBooks] = useState(0);
  const [issuingBookId, setIssuingBookId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const fetchBooks = async (page) => {
    try {
      const res = await axios.get(`http://localhost:3000/getallbooks?page=${page}&limit=${booksPerPage}`, {
        withCredentials: true,
      });
      setBooks(res.data.books);
      setTotalBooks(res.data.totalBooks);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const issueBook = async (bookid) => {
    setIssuingBookId(bookid);
    try {
      const res = await axios.post(`http://localhost:3000/issuedbook/issuebook/${bookid}`, {}, {
        withCredentials: true,
      });
      setMessage(res.data.message );
      fetchBooks(currentPage);
    } catch (error) {
      console.log(error.response?.data.error)
      setError(error.response?.data?.error);
    } finally {
      setIssuingBookId(null);
    }
  };

  const handleSearch = async () => {
    try {
      if (search.trim() === '') {
        fetchBooks(currentPage);
      } else {
        const res = await axios.get(`http://localhost:3000/search?search=${search}`, {
          withCredentials: true,
        });
        setBooks(res.data.filterbooks);
        setTotalBooks(res.data.filterbooks.length);
      }
    } catch (error) {
      console.log("Error searching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className={`p-6 ${isExplorePage ? 'w-full h-screen' : 'max-w-7xl mx-auto'} text-gray-800 dark:text-white bg-white dark:bg-gray-900`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400">📚 Book Catalog</h1>

      {message && (
        <div className="mb-4 bg-green-100 dark:bg-green-800 border border-green-300 dark:border-green-600 text-green-800 dark:text-green-200 px-4 py-3 rounded-md shadow-sm">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-100 dark:bg-red-800 border border-red-300 dark:border-red-600 text-red-800 dark:text-red-200 px-4 py-3 rounded-md shadow-sm">
          ❌ {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Search by title, category or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-900 dark:text-white bg-white"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          🔍 Search
        </button>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition p-4 flex flex-col"
          >
            <img
              src={
                book.image
                  ? `data:image/png;base64,${book.image}`
                  : 'https://via.placeholder.com/150'
              }
              alt={book.title}
              className="w-full h-44 object-cover rounded-lg mb-3"
            />

            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate" title={book.title}>
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">👤 {book.author}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full capitalize">
                  {book.category}
                </span>
                {book.availablecopies > 0 && (
                  <span className="bg-green-100 dark:bg-slate-700 text-green-700 dark:text-gray-50 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => issueBook(book._id)}
              disabled={issuingBookId === book._id || book.availablecopies === 0}
              className={`mt-4 w-full py-2 rounded-md text-sm font-semibold transition ${
                issuingBookId === book._id
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : book.availablecopies > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-900 dark:hover:bg-slate-600 '
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {issuingBookId === book._id ? 'Issuing...' : book.availablecopies > 0 ? 'Issue Book' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {books.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-12 text-lg font-medium">
          🚫 No books found.
        </p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;





