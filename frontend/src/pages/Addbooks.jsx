import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getImageUrl = (bufferData) => {
  if (!bufferData) return null;

  const base64 = btoa(
    new Uint8Array(bufferData.data).reduce(
      (data, byte) => data + String.fromCharCode(byte), ""
    )
  );

  return `data:image/jpeg;base64,${base64}`;
};

const Addbooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    availablecopies: "",
    totalcopies: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const[message,setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");


    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("author", formData.author);
      form.append("availablecopies", formData.availablecopies);
      form.append("totalcopies", formData.totalcopies);
      form.append("category", formData.category);
      
      form.append("image", image);

      const res = await axios.post("https://library-management-dwg7.onrender.com/book/addbook", form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
  setTimeout(() => {
    setMessage("")
    setError('')

  }, 2000);
     
    } catch (err) {
      console.error("Error adding book:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          ➕ Add New Book
        </h2>
           {message && (
        <div className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-200">
          ✅ {message}
        </div>
      )}
       {error && (
        <div className="mb-4 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded">
          ❌ {error}
        </div>
      )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium dark:text-white">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:text-white  bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-white">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:text-white bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-white">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:text-white bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-white">Total Copies</label>
            <input
              name="totalcopies"
              type="number"
              value={formData.totalcopies}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:text-white bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-white">Available Copies</label>
            <input
              name="availablecopies"
              type="number "
              value={formData.availablecopies}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:text-white bg-white"
            />
          </div>


          <div>
            <label className="block mb-1 font-medium dark:text-white">Upload Book Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:text-white bg-white"
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm mb-1 dark:text-white">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-56 object-cover rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbooks;


