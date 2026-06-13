import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllTasksAdmin } from "../api/taskApi";

function AdminAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getAllTasksAdmin();
      setTasks(data.tasks || data?.data?.tasks || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar userLabel={localStorage.getItem("userEmail") || "Admin"} onLogout={handleLogout} />

      <main className="admin-tasks">
        <h1>All Tasks</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && tasks.length === 0 && <p>No tasks found.</p>}

        <div className="tasks-list">
          {tasks.map((t) => (
            <div key={t._id} className="task-row">
              <h3>{t.title}</h3>
              <p>Completed: {t.completed ? "Yes" : "No"}</p>
              <p>Owner: {t.user?.name || t.user}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminAllTasks;
