import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../layouts/MainLayout";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import { errMsg } from "../api/client";
import { useToast } from "../components/Toast";

const TABS = [["all", "All"], ["false", "Open"], ["true", "Done"]];

export default function Dashboard() {
  const toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ pages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const addRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    const t = setTimeout(() => { setSearch(q.trim()); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const p = { page, limit: 6, sort };
      if (tab !== "all") p.completed = tab;
      if (search) p.search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const d = await getTasks(p);
      setTasks(d.tasks || []);
      setMeta({ pages: d.totalPages || 1, total: d.totalTasks || 0 });
    } catch (e) {
      setErr(errMsg(e, "Could not load your tasks. Check your connection and try again."));
    } finally {
      setLoading(false);
    }
  }, [page, tab, search, sort]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const k = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.metaKey || e.ctrlKey) return;
      if (e.key === "n") { e.preventDefault(); addRef.current?.focus(); }
      if (e.key === "/") { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const add = async (title) => {
    try { await createTask({ title }); toast("Task added"); setPage(1); load(); return true; }
    catch (e) { toast(errMsg(e, "Could not add the task."), "error"); return false; }
  };
  const toggle = async (t) => {
    setTasks((a) => a.map((x) => (x._id === t._id ? { ...x, completed: !x.completed } : x)));
    try { await updateTask(t._id, { completed: !t.completed }); }
    catch (e) { toast(errMsg(e, "Could not update the task."), "error"); load(); }
  };
  const rename = async (t, title) => {
    try {
      await updateTask(t._id, { title });
      setTasks((a) => a.map((x) => (x._id === t._id ? { ...x, title } : x)));
      toast("Task renamed");
    } catch (e) { toast(errMsg(e, "Could not rename the task."), "error"); }
  };
  const remove = async (t) => {
    try {
      await deleteTask(t._id);
      toast("Task deleted");
      if (tasks.length === 1 && page > 1) setPage(page - 1); else load();
    } catch (e) { toast(errMsg(e, "Could not delete the task."), "error"); }
  };

  const filtered = tab !== "all" || search;
  return (
    <Layout title="Tasks">
      <div className="head">
        <div>
          <h1>Your tasks</h1>
          <p className="mute">{meta.total} {filtered ? "matching" : "in total"}. Press N to add, / to search.</p>
        </div>
      </div>
      <TaskForm onAdd={add} inputRef={addRef} />
      <div className="tools">
        <div className="tabs" role="group" aria-label="Filter by status">
          {TABS.map(([v, l]) => (
            <button key={v} aria-pressed={tab === v} onClick={() => { setTab(v); setPage(1); }}>{l}</button>
          ))}
        </div>
        <label className="sr" htmlFor="q">Search tasks</label>
        <input id="q" ref={searchRef} type="search" placeholder="Search tasks" value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="sr" htmlFor="sort">Sort</label>
        <select id="sort" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="-createdAt">Newest first</option>
          <option value="createdAt">Oldest first</option>
          <option value="title">A to Z</option>
        </select>
      </div>
      {err && <p className="err" role="alert">{err} <button className="btn sm" onClick={load}>Try again</button></p>}
      {loading && !tasks.length && <p className="empty">Loading tasks…</p>}
      {!loading && !err && !tasks.length && (
        <p className="empty">{filtered ? "No tasks match. Clear the search or filter." : "No tasks yet. Add your first one above."}</p>
      )}
      <ul className="list">
        {tasks.map((t) => <TaskCard key={t._id} task={t} onToggle={toggle} onRename={rename} onDelete={remove} />)}
      </ul>
      {meta.pages > 1 && (
        <div className="pager">
          <button className="btn sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {meta.pages}</span>
          <button className="btn sm" disabled={page >= meta.pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </Layout>
  );
}
