function TaskCard({ task, onDelete, onToggle }) {

  
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>
        Status:
        {task.completed ? " Completed" : " Pending"}
      </p>

      <div className="task-buttons">
        <button type="button" onClick={() =>{
          onToggle(task)
        }}>Toggle Status</button>
        <button
          type="button"
          onClick={() => {
            onDelete(task._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
    
  );
}

export default TaskCard;