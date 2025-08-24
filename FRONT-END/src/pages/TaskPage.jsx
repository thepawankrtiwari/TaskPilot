import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [editStatus, setEditStatus] = useState("Pending");

  const navigate = useNavigate();
  const API_URL = "http://localhost:8080";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/");
    } else {
      getTasks();
    }
  }, []);

  const getTasks = () => {
    fetch(`${API_URL}/tasks/${userId}`)
      .then(res => res.json())
      .then(setTasks);
  };

  const addTask = () => {
    fetch(`${API_URL}/tasks/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: taskTitle,
        status,
        priority,
        user: { id: userId }
      })
    }).then(() => getTasks());
  };

  const deleteTask = (taskId) => {
    fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" })
      .then(() => getTasks());
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditPriority(task.priority || "Low");
    setEditStatus(task.status);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditPriority("Low");
    setEditStatus("Pending");
  };

  const saveEdit = (taskId) => {
    fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        status: editStatus,
        priority: editPriority,
        user: { id: userId }
      })
    }).then(() => {
      getTasks();
      cancelEdit();
    });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        priority: task.priority,
        status: newStatus,
        user: { id: userId }
      })
    }).then(() => getTasks());
  };

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Add Task Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Add Task</h2>
          <input
            className="w-full p-3 border border-blue-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            placeholder="Enter task title..."
            onChange={e => setTaskTitle(e.target.value)}
          />
          <div className="flex gap-3 mb-3">
            <select
              className="flex-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select
              className="flex-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={e => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In progress</option>
              <option>Completed</option>
            </select>
          </div>
          <button
            onClick={addTask}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Your Tasks</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-3 border border-blue-100">Todo Item</th>
                <th className="p-3 border border-blue-100">Status</th>
                <th className="p-3 border border-blue-100">Priority</th>
                <th className="p-3 border border-blue-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id} className="hover:bg-blue-50 transition-all">
                  {editId === t.id ? (
                    <>
                      <td className="p-3 border">
                        <input
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value={editTitle}
                          onChange={e => setEditTitle(e.target.value)}
                        />
                      </td>
                      <td className="p-3 border">
                        <select
                          className="w-full p-2 border rounded-lg"
                          value={editStatus}
                          onChange={e => setEditStatus(e.target.value)}
                        >
                          <option>Pending</option>
                          <option>In progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td className="p-3 border">
                        <select
                          className="w-full p-2 border rounded-lg"
                          value={editPriority}
                          onChange={e => setEditPriority(e.target.value)}
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </td>
                      <td className="p-3 border flex gap-2">
                        <button
                          onClick={() => saveEdit(t.id)}
                          className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-lg hover:from-green-500 hover:to-green-600 transition-all"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400 transition-all"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 border">{t.title}</td>
                      <td className="p-3 border">
                        <span className={`px-3 py-1 rounded-full text-white text-sm ${t.status === "Completed" ? "bg-green-500" : t.status === "In progress" ? "bg-yellow-500" : "bg-gray-400"}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3 border">
                        <span className={`px-3 py-1 rounded-full text-white text-sm ${t.priority === "High" ? "bg-red-500" : t.priority === "Medium" ? "bg-orange-400" : "bg-blue-400"}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="p-3 border flex gap-2">
                        <button
                          onClick={() => startEdit(t)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition-all"
                        >
                          ✏ Edit
                        </button>
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                        >
                          🗑 Delete
                        </button>
                        <button
                          onClick={() => updateTaskStatus(t.id, "Completed")}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all"
                        >
                          ✅ Finish
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
