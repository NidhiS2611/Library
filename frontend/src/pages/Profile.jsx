
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    email: '',
    profile: null,
  });

  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://library-management-dwg7.onrender.com/user/profilesummary", {
        withCredentials: true
      });
      setProfile(res.data);
      setUpdatedProfile({ name: res.data.name, email: res.data.email });
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
        (data, byte) => data + String.fromCharCode(byte), ''
      )
    );
    return `data:image/jpeg;base64,${base64}`;
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUpdatedProfile(prev => ({ ...prev, profile: e.target.files[0] }));
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
      await axios.patch("https://library-management-dwg7.onrender.com/user/updateuser", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      await fetchProfile();
      setEditMode(false);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  if (!profile) return <div className="p-10 text-gray-500">Loading profile...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Profile Card */}
      <div className="bg-indigo-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-4 shadow-lg dark:bg-gray-900 dark:text-white">

        
        {/* Avatar + Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <img
            src={getImageUrl(profile.profile) || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm break-words">{profile.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 text-xs">
              <span className="bg-white text-purple-600 px-3 py-1 rounded-full">
                Member since {new Date(profile.joinedDate).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <span className="bg-white text-purple-600 px-3 py-1 rounded-full">
                Library ID: #{profile.cardnumber || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="w-full sm:w-auto text-center sm:text-right">
          <button
            onClick={handleEditToggle}
            className="bg-white text-purple-700 px-4 py-2 mt-4 sm:mt-0 rounded-full shadow hover:bg-purple-100 font-medium"
          >
            {editMode ? "Cancel" : "✏️ Edit Profile"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editMode && (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-xl mt-6 shadow-md space-y-4 text-black">
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
            className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Reading Statistics */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:bg-gray-900 dark:text-white">📚 Reading Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-100 text-blue-800 rounded-xl p-5 text-center shadow">
            <p className="text-3xl font-bold">{profile.stats.bookread}</p>
            <p className="mt-1">Books Read</p>
          </div>
          <div className="bg-green-100 text-green-800 rounded-xl p-5 text-center shadow">
            <p className="text-3xl font-bold">{profile.stats.currentlyReading}</p>
            <p className="mt-1">Currently Reading</p>
          </div>
          <div className="bg-pink-100 text-pink-800 rounded-xl p-5 text-center shadow">
            <p className="text-lg font-semibold">{profile.stats.favoriteGenre || "—"}</p>
            <p className="mt-1 text-sm">Favorite Genre</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;








