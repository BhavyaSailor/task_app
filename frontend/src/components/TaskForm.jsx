import { useState } from "react";

export default function TaskForm({ onAdd, inputRef }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setBusy(true);
    if (await onAdd(v)) setText("");
    setBusy(false);
  };

  return (
    <form className="add" onSubmit={submit}>
      <label className="sr" htmlFor="new-task">New task</label>
      <input id="new-task" ref={inputRef} value={text} maxLength={200}
        onChange={(e) => setText(e.target.value)} placeholder="What needs doing?" />
      <button className="btn pri" disabled={busy || !text.trim()}>Add task</button>
    </form>
  );
}
