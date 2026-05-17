import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import { updateTask, deleteTask, getTasks } from "../api/taskApi";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      console.log("Dashboard fetched tasks:", data);

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
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <TaskForm onTaskAdded={fetchTasks} />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && tasks.length === 0 && (
        <p>No tasks found. Add one to get started.</p>
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
    </div>
  );
}

export default Dashboard;
