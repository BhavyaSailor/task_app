import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import { updateTask, deleteTask, getTasks } from "../api/taskApi";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "User";

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks();
      const tasksFromApi = data.tasks ?? data?.data?.tasks ?? [];
      setTasks(tasksFromApi);
    } catch (error) {
      console.error(
        "Failed to load tasks",
        error.response?.data || error.message || error,
      );
      setError("Unable to load tasks. Please log in and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!taskId) {
      console.warn("Delete attempted without a valid task ID");
      return;
    }

    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error(
        "Delete failed",
        error.response?.data || error.message || error,
      );
    }
  };

  const handleToggle = async (task) => {
    try {
      await updateTask(task._id, {
        completed: !task.completed,
      });
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="dashboard">
      <Navbar userLabel={userEmail} onLogout={handleLogout} />

      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Your Task Dashboard</h1>
          <p className="dashboard-copy">
            Manage your daily tasks, update status quickly, and stay focused on what matters.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>
      </section>

      <section className="task-panel">
        <div className="panel-header">
          <h2>Tasks</h2>
          <p>Track your active tasks and mark them as complete at any time.</p>
        </div>

        <TaskForm onTaskAdded={fetchTasks} />

        {loading && <p className="loading-text">Loading tasks...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && tasks.length === 0 && (
          <p className="empty-state">No tasks found. Add one to get started.</p>
        )}

        <div className="tasks-container">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
