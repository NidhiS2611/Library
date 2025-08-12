import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Adminprofile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    email: '',
    profile: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  // ✅ MOVED OUTSIDE useEffect
  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://librarymanagement-81b2.onrender.com/admin/adminprofile", {
        withCredentials: true
      });
      setProfile(res.data.user);
      setUpdatedProfile({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    } catch (err) {
      console.log("Profile Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getImageUrl = (bufferData) => {
    if (!bufferData) return null;
    const base64 = btoa(
      new Uint8Array(bufferData.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:image/jpeg;base64,${base64}`;
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUpdatedProfile((prev) => ({ ...prev, profile: e.target.files[0] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', updatedProfile.name);
    formData.append('email', updatedProfile.email);
    if (updatedProfile.profile) {
      formData.append('profile', updatedProfile.profile);
    }

    try {
      const res = await axios.patch("https://librarymanagement-81b2.onrender.com/user/updateuser", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setMessage(res.data.message || "Profile updated successfully");
      await fetchProfile(); // ✅ Working now
      setEditMode(false);
    } catch (err) {
      console.error("Update Error:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("https://librarymanagement-81b2.onrender.com/admin/updatepassword", passwordData, {
        withCredentials: true,
      });
      setPasswordData({ oldPassword: '', newPassword: '' });
      setMessage(res.data.message || "Password updated successfully");
    } catch (err) {
      console.error("Password Change Error:", err);
      setError(err.response?.data?.message || "Failed to update password");
    }
  };

  // Auto-clear messages
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  if (!profile) return <div className="p-10 text-gray-500">Loading profile...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
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

      {/* Profile Card */}
      <div className="bg-indigo-600 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between shadow-md gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <img
            src={getImageUrl(profile.profile) || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-indigo-100 break-words">{profile.email}</p>
          </div>
        </div>

        <div className="w-full sm:w-auto text-center sm:text-right">
          <button
            onClick={handleEditToggle}
            className="bg-white text-indigo-700 px-4 py-2 mt-4 sm:mt-0 rounded-full shadow hover:bg-indigo-100 font-medium"
          >
            {editMode ? "Cancel" : "✏️ Edit Profile"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editMode && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded-xl mt-6 shadow space-y-4 text-black"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProfile.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={updatedProfile.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Change Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Change Password */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-white p-6 mt-6 rounded-xl shadow space-y-4 text-black"
      >
        <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            value={passwordData.oldPassword}
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Adminprofile;

