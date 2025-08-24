import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupMsg, setPopupMsg] = useState(""); // for popup messages
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080";

  const login = () => {
    if (!username.trim()) {
      setPopupMsg("Username is required");
      return;
    }
    if (!password) {
      setPopupMsg("Password is required");
      return;
    }

    fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then(data => {
        if (data.id) {
          localStorage.setItem("userId", data.id);
          navigate("/tasks");
        } else {
          setPopupMsg("Login failed");
        }
      })
      .catch(err => setPopupMsg(err.message));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-8 w-96 flex flex-col items-center animate-fade-in">
        <img src="/public/icon.jpeg" alt="Logo" className="w-26 h-26 mb-4" />
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700 tracking-wide drop-shadow">
          Task Manager
        </h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition mb-3"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-green-500 hover:to-teal-500 transition"
        >
          Register
        </button>
      </div>

      {/* Popup */}
      <Popup message={popupMsg} onClose={() => setPopupMsg("")} />
    </div>
  );
}

export default LoginPage;
