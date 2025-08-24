import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ userId }) {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Fetch profile data from backend
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/profile/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProfile({
              ...data,
              photoUrl: data.photoUrl
                ? data.photoUrl + "?t=" + Date.now()
                : null,
            });
          }
        })
        .catch(() => setProfile(null));
    }
  }, [userId]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 text-blue-900 shadow-lg transition-all duration-300">
      <div className="flex items-center">
        <span className="font-extrabold text-2xl tracking-wide drop-shadow">
          <Link to="/tasks">Task Manager</Link>
        </span>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="font-semibold text-lg hover:scale-105 transition-transform duration-200"
        >
          Dashboard
        </Link>

        <Link to="/profile" className="hover:scale-105 transition-transform duration-200">
          {profile?.photoUrl ? (
            <img
              src={`http://localhost:8080/${profile.photoUrl.replace(/\\/g, "/")}`}
              alt="Profile"
              className="w-8 h-8 rounded-full border"
            />
          ) : (
            <span className="font-semibold text-lg">Profile</span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className="font-semibold text-lg hover:scale-105 transition-transform duration-200"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
