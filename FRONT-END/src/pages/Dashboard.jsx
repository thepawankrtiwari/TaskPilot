import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Dashboard page: shows charts for tasks, status, and priority
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <div className="text-center mt-10 text-red-500 text-xl">Please log in to view your dashboard.</div>;
  }

  useEffect(() => {
  if (userId) {
    fetch(`http://localhost:8080/tasks/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched tasks:", data);
        setTasks(data);
      });
  }
}, [userId]);

  // Aggregate data for charts
  const statusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const priorityCounts = tasks.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1;
    return acc;
  }, {});

  // Chart data
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: ["#fbbf24", "#3b82f6", "#10b981", "#ef4444"],
      borderWidth: 2,
    }],
  };
  const priorityData = {
    labels: Object.keys(priorityCounts),
    datasets: [{
      data: Object.values(priorityCounts),
      backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
      borderWidth: 2,
    }],
  };
  const taskCountData = {
    labels: ["Tasks"],
    datasets: [{
      label: "Total Tasks",
      data: [tasks.length],
      backgroundColor: ["#6366f1"],
      borderWidth: 2,
    }],
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen"
>
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 p-4 flex flex-col items-center" aria-label="Dashboard">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800 animate-fade-in">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <section className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl min-h-[350px]" aria-label="Task Count">
          <h2 className="text-xl font-semibold mb-6 text-blue-700">Total Tasks</h2>
          <div className="w-full flex justify-center items-center h-56">
            <Bar data={taskCountData} options={{ plugins: { legend: { display: false } }, animation: { duration: 1200 } }} aria-label="Task Count Chart" />
          </div>
        </section>
        <section className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl min-h-[350px]" aria-label="Status Chart">
          <h2 className="text-xl font-semibold mb-6 text-blue-700">Status</h2>
          <div className="w-full flex justify-center items-center h-56">
            <Pie data={statusData} options={{ animation: { duration: 1200 } }} aria-label="Status Pie Chart" />
          </div>
        </section>
        <section className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 hover:shadow-2xl min-h-[350px]" aria-label="Priority Chart">
          <h2 className="text-xl font-semibold mb-6 text-blue-700">Priority</h2>
          <div className="w-full flex justify-center items-center h-56">
            <Pie data={priorityData} options={{ animation: { duration: 1200 } }} aria-label="Priority Pie Chart" />
          </div>
        </section>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.8s ease; }
      `}</style>
    </main>
    </div>
  );
}

export default Dashboard;
