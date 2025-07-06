import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const [totalBooks, setTotalBooks] = useState(0);
  const [issuingBookId, setIssuingBookId] = useState(null);
  const [error, setError] = useState('');
  const[message, setMessage] = useState('');
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
     const res =  await axios.post(`http://localhost:3000/issuedbook/issuebook/${bookid}`, {}, {
        withCredentials: true,
      });
      setMessage(res.data.message || 'Book issued successfully');
      
      fetchBooks(currentPage); // 
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
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
      setTotalBooks(res.data.filterbooks.length); // page count update
    }
  } catch (error) {
    console.log("Error searching books:", error);
  }
};

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="p-4 max-w-7xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Books Catalog</h1>

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

    {/* 🔍 Search Input with Button */}
<div className="mb-6 flex flex-col sm:flex-row gap-2 ">
  <input
    type="text"
    placeholder="Search by title or category..."
    value={search}
    onChange={(e) => setSearch(e.target.value)} 
       onKeyDown={(e) => {
      if (e.key === 'Enter') handleSearch(); 
    }}
    className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
  />
   
    
  
  <button
    onClick={handleSearch}
    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
  >
    Search
  </button>
</div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-xl transition"
          >
            <img
              src={
                book.image
                  ? `data:image/png;base64,${book.image}`
                  : 'data:image/jpeg;base64,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'
              }
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
      <h2 className="text-lg font-semibold text-black mb-1">{book.title}</h2>

<p className="text-sm text-gray-600 mb-1">👤  {book.author}</p>

 <p className="inline-block max-w-max px-3 py-1 rounded-full text-xs  mb-2 bg-blue-200 text-black">
  {book.category}
</p>



<p className="text-sm text-gray-500 mb-3">📦 Available: {book.availablecopies} / {book.totalcopies}</p>

            {book.availablecopies > 0 ? (
              <button
                onClick={() => issueBook(book._id)}
                disabled={issuingBookId === book._id}
                className={`mt-auto px-4 py-2 rounded-lg text-white font-semibold ${
                  issuingBookId === book._id
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {issuingBookId === book._id ? 'Issuing...' : 'Issue Book'}
              </button>
            ) : (
              <button
                disabled
                className="mt-auto px-4 py-2 rounded-lg bg-red-400 text-white font-semibold cursor-not-allowed"
              >
                Not Available
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              currentPage === index + 1 ? 'bg-blue-600' : 'bg-gray-500'
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



