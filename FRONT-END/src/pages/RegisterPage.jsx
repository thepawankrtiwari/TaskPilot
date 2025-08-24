import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMsg, setPopupMsg] = useState(""); // popup state
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080";

  const register = () => {
    // Basic validations
    if (!username.trim()) {
      setPopupMsg("Username is required");
      return;
    }
    if (!password) {
      setPopupMsg("Password is required");
      return;
    }
    if (!confirmPassword) {
      setPopupMsg("Confirm Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setPopupMsg("Passwords do not match");
      return;
    }
    if (!dob) {
      setPopupMsg("Date of Birth is required");
      return;
    }
    if (!gender) {
      setPopupMsg("Gender is required");
      return;
    }

    // API call
    fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, dob, gender })
    })
      .then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.text();
      })
      .then(msg => {
        setPopupMsg(msg); // show success message
        // Optionally redirect after short delay
        setTimeout(() => navigate("/"), 1500);
      })
      .catch(err => setPopupMsg(err.message));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-300 via-blue-300 to-purple-300">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-8 w-96 flex flex-col items-center animate-fade-in">
        <img src="/vite.svg" alt="Logo" className="w-16 h-16 mb-4" />
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700 tracking-wide drop-shadow">
          Register
        </h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={dob}
          onChange={e => setDob(e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          onClick={register}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-green-600 hover:to-blue-600 transition mb-3"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 hover:from-gray-500 hover:to-gray-700 transition"
        >
          Back to Login
        </button>
      </div>

      {/* Popup */}
<Popup message={popupMsg} type="success" onClose={() => setPopupMsg("")} />    </div>
  );
}

export default RegisterPage;
