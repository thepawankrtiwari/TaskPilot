import React from "react";

function Popup({ message, onClose, type = "warning" }) {
  if (!message) return null;

  // Choose icon and color based on type
  const icon =
    type === "success"
      ? "✅"
      : type === "error"
      ? "❌"
      : "⚠";
  const title =
    type === "success"
      ? "Success"
      : type === "error"
      ? "Error"
      : "Warning";
  const color =
    type === "success"
      ? "text-green-600"
      : type === "error"
      ? "text-red-600"
      : "text-yellow-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center animate-fade-in">
        <h2 className={`text-lg font-semibold mb-4 ${color}`}>
          {icon} {title}
        </h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;