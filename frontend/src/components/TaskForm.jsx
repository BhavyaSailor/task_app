import { useState } from "react";
import { createTask } from "../api/taskApi";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      await createTask({ title: title.trim() });
      setTitle("");
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Task creation failed", error);
      alert("Unable to add task. Please try again.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;