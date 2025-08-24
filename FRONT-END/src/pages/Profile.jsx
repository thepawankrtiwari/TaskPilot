import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    bio: "",
    photo: null,
  });

  // ✅ Fetch profile initially
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/profile/${userId}`)
        .then((res) => {
          if (res.data) {
            setProfile(res.data);
            setForm({
              fullName: res.data.fullName || "",
              email: res.data.email || "",
              bio: res.data.bio || "",
              photo: null,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  }, [userId]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // ✅ Save profile (PUT if exists, POST if new)
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("bio", form.bio);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      const url = profile
        ? `http://localhost:8080/api/profile/${userId}` // PUT update
        : `http://localhost:8080/api/profile/upload`;   // POST create

      const method = profile ? "put" : "post";

      const res = await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Refresh photo with cache-busting
      setProfile({
        ...res.data,
        photoUrl: res.data.photoUrl
          ? res.data.photoUrl + "?t=" + Date.now()
          : null,
      });

      setEditing(false);
      alert("✅ Profile saved successfully!");
    } catch (err) {
      console.error("Profile save failed:", err);
      alert("❌ Failed to save profile");
    }
  };

  if (!profile && !editing) {
    return (
      <div className="text-center mt-6">
        <p className="mb-4 text-gray-600">
          No profile found. Create your profile now.
        </p>
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <img
        src={
          profile?.photoUrl
            ? `http://localhost:8080/${profile.photoUrl.replace(/\\/g, "/")}`
            : "/profile-placeholder.svg"
        }
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto border"
      />

      {editing ? (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded p-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded p-2"
          />
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full border rounded p-2"
          />
          <input type="file" name="photo" onChange={handleChange} />

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{profile.fullName}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <p className="mt-2">{profile.bio}</p>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            ✏ Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
