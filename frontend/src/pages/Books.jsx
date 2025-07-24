


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;
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
      setMessage(res.data.message || 'Book issued successfully');
      fetchBooks(currentPage);
    } catch (error) {
      setError(error.response?.data?.message || error.response?.data?.error || 'Something went wrong');
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
  setTimeout(()=>{
    setMessage('');
    setError('');

  }, 3000);

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800 bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">📚 Book Catalog</h1>

      {message && (
        <div className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-sm">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md shadow-sm">
          ❌ {error}
        </div>
      )}

      {/* 🔍 Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-md dark:bg-gray-900 dark:text-white">
        <input
          type="text"
          placeholder="Search by title, category or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white  dark:bg-gray-900 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          🔍 Search
        </button>
      </div>

      {/* 📘 Book Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 dark:bg-gray-900 dark:text-white">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white  rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-2 flex flex-col dark:bg-gray-900 dark:text-white"
          >
            <img
            const name
              src={
      book.image?.data
        ? `data:image/jpeg;base64,${btoa(
            new Uint8Array(book.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}`
        : 'https://via.placeholder.com/150'
    }
              alt={book.title}
              className="w-full h-[260px] object-fit rounded-lg mb-3"
            />

            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate" title={book.title}>
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-white">👤 {book.author}</p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize dark:text-blue-950 dark:bg-gray-200">
                  {book.category}
                </span>
                {book.availablecopies > 0 && (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full ">
                    Available
                  </span>
                )
                
                
                }
              </div>
            
            </div>

            <button
              onClick={() => issueBook(book._id)}
              disabled={issuingBookId === book._id || book.availablecopies === 0}
              className={`mt-4 w-full py-2 rounded-md text-sm font-semibold transition ${
                issuingBookId === book._id
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : book.availablecopies > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              {issuingBookId === book._id ? 'Issuing...' : book.availablecopies > 0 ? 'Issue Book' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>

      {/* 🚫 No Results */}
      {books.length === 0 && (
        <p className="text-center text-gray-600 mt-12 text-lg font-medium">
          🚫 No books found.
        </p>
      )}

      {/* 🔢 Pagination */}
      <div className="flex justify-center mt-10 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
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