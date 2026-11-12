import { useRef, useState } from "react";

export default function TaskCard({ task, onToggle, onRename, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [v, setV] = useState(task.title);
  const [sure, setSure] = useState(false);
  const cancelled = useRef(false);

  const save = () => {
    setEdit(false);
    const n = v.trim();
    if (!cancelled.current && n && n !== task.title) onRename(task, n);
    else setV(task.title);
    cancelled.current = false;
  };

  return (
    <li className={`task${task.completed ? " done" : ""}`}>
      <button className="tick" aria-pressed={task.completed}
        aria-label={task.completed ? "Mark as open" : "Mark as done"} onClick={() => onToggle(task)}>
        {task.completed && "✓"}
      </button>
      {edit ? (
        <input className="t" autoFocus value={v} aria-label="Task title" onChange={(e) => setV(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
            if (e.key === "Escape") { cancelled.current = true; e.target.blur(); }
          }} />
      ) : <span className="t">{task.title}</span>}
      <div className="acts">
        {sure ? (
          <>
            <button className="btn sm bad" onClick={() => onDelete(task)}>Confirm delete</button>
            <button className="btn sm" onClick={() => setSure(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn sm" onClick={() => setEdit(true)}>Edit</button>
            <button className="btn sm" onClick={() => setSure(true)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
