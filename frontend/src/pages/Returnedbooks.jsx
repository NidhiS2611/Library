import React, { useEffect, useState } from "react";
import axios from "axios";

const capitalizeTitle = (title = "") =>
  title
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");


const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

const Returnedbooks = () => {
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/returnedbooks", {
          withCredentials: true,
        });
      
        setReturnedBooks(res.data.returndbook);
      } catch (error) {
        console.error("Failed to fetch returned books:", error);
      }
    };

    fetchReturnedBooks();
  }, []);

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold text-black mb-8 border-b border-gray-300 pb-2 dark:text-white">
        Returned Books
      </h2>

      {returnedBooks.length === 0 ? (
        <p className="text-gray-600 text-center italic">No books have been returned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900 dark:text-white">
          {returnedBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 dark:bg-gray-900"
            >
              <h3 className="text-lg font-semibold  mb-1">
                {capitalizeTitle(book.book?.title || "Untitled")}
              </h3>
              <p className="text-sm  mb-3">
                {book.book?.author || "Unknown Author"}
              </p>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium ">Issued:</span>{" "}
                  {book.issueddate ? formatDate(book.issueddate) : "N/A"}
                </p>
                <p>
                  <span className="font-medium ">Returned:</span>{" "}
                  {book.returnDate ? formatDate(book.returnDate) : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Returnedbooks;




