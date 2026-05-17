function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        Status:
        {task.completed ? " Completed" : " Pending"}
      </p>

      <div className="task-buttons">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;