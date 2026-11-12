import { useEffect, useState } from "react";
import Layout from "../layouts/MainLayout";
import { getAllTasksAdmin, getAllUsers } from "../api/taskApi";
import { errMsg } from "../api/client";

export default function AdminAllTasks() {
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState({});
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [t, u] = await Promise.all([getAllTasksAdmin(), getAllUsers()]);
        setRows(t.tasks || []);
        setUsers(Object.fromEntries((u.users || []).map((x) => [x._id, x])));
      } catch (e) { setErr(errMsg(e, "Could not load tasks.")); }
      finally { setLoading(false); }
    })();
  }, []);

  const shown = owner ? rows.filter((r) => r.user === owner) : rows;
  return (
    <Layout title="All tasks">
      <div className="head">
        <h1>All tasks</h1>
        <div>
          <label className="sr" htmlFor="owner">Filter by owner</label>
          <select id="owner" value={owner} onChange={(e) => setOwner(e.target.value)}>
            <option value="">Every owner</option>
            {Object.values(users).map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
        </div>
      </div>
      {err && <p className="err" role="alert">{err}</p>}
      {loading && <p className="empty">Loading tasks…</p>}
      {!loading && !err && !shown.length && <p className="empty">No tasks found.</p>}
      {shown.length > 0 && (
        <table className="tbl">
          <thead><tr><th>Task</th><th>Owner</th><th>Status</th><th>Created</th></tr></thead>
          <tbody>
            {shown.map((t) => (
              <tr key={t._id}>
                <td data-label="Task">{t.title}</td>
                <td data-label="Owner">{users[t.user]?.name || "Unknown user"}</td>
                <td data-label="Status"><span className="badge">{t.completed ? "Done" : "Open"}</span></td>
                <td data-label="Created">{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
