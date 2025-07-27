
import React, { useEffect, useState } from "react";
import axios from "axios";

const Managebooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 15;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    availablecopies: 0,
    category: "",
  });

  const fetchBooks = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/getallbooks?page=${page}&limit=${booksPerPage}`, {
        withCredentials: true,
      });
      setBooks(res.data.books);
      setTotalBooks(res.data.totalBooks);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/book/deletebook/${id}`, {
        withCredentials: true,
      });
      fetchBooks(currentPage); // Refresh current page
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      availablecopies: book.availablecopies,
      category: book.category || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/book/updatebook/${id}`,
        formData,
        { withCredentials: true }
      );
      setEditingBook(null);
      fetchBooks(currentPage);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">📚 Manage Books</h2>

      {/* 💻 Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm text-left border dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Available</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-b dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white">
                {editingBook === book._id ? (
                  <>
                    <td className="px-4 py-2">
                      <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="p-1 rounded border w-full dark:bg-gray-900 bg-white " />
                    </td>
                    <td className="px-4 py-2">
                      <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="p-1 rounded border w-full dark:bg-gray-900 bg-white" />
                    </td>
                    <td className="px-4 py-2">
                      <input type="number" value={formData.availablecopies} onChange={(e) => setFormData({ ...formData, availablecopies: e.target.value })} className="p-1 rounded border w-full dark:bg-gray-900 bg-white" />
                    </td>
                    <td className="px-4 py-2">
                      <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="p-1 rounded border w-full dark:bg-gray-900 bg-white" />
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => handleUpdate(book._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
                      <button onClick={() => setEditingBook(null)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.availablecopies}</td>
                    <td className="px-4 py-2">{book.category}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Update</button>
                      <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="block sm:hidden space-y-4 mt-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white dark:bg-gray-900 p-4 rounded shadow space-y-2">
            {editingBook === book._id ? (
              <>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="p-2 w-full border rounded bg-white dark:bg-gray-900 dark:text-white" placeholder="Title" />
                <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="p-2 w-full border rounded  bg-white dark:bg-gray-900 dark:text-white" placeholder="Author" />
                <input type="number" value={formData.availablecopies} onChange={(e) => setFormData({ ...formData, availablecopies: e.target.value })} className="p-2 w-full border rounded  bg-white dark:bg-gray-900 dark:text-white" placeholder="Available" />
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="p-2 w-full border rounded  bg-white dark:bg-gray-900 dark:text-white" placeholder="Category" />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(book._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
                  <button onClick={() => setEditingBook(null)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Available:</strong> {book.availablecopies}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Update</button>
                  <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      <div className="flex justify-center mt-10 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Managebooks;
