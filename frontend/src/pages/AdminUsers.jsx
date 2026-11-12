import { useCallback, useEffect, useState } from "react";
import Layout from "../layouts/MainLayout";
import { getAllUsers } from "../api/taskApi";
import { updateUserRole } from "../api/authApi";
import { errMsg } from "../api/client";
import { parseJwt } from "../utils/jwt";
import { useToast } from "../components/Toast";

export default function AdminUsers() {
  const toast = useToast();
  const me = parseJwt(localStorage.getItem("token"))?.id;
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [ask, setAsk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try { setUsers((await getAllUsers()).users || []); }
    catch (e) { setErr(errMsg(e, "Could not load users.")); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const change = async (u) => {
    const role = u.role === "admin" ? "user" : "admin";
    try { await updateUserRole(u._id, role); toast(`${u.name} is now ${role === "admin" ? "an admin" : "a regular user"}`); setAsk(null); load(); }
    catch (e) { toast(errMsg(e, "Could not change the role."), "error"); }
  };

  const s = q.trim().toLowerCase();
  const shown = users.filter((u) => !s || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
  return (
    <Layout title="Users">
      <div className="head">
        <h1>Users</h1>
        <div>
          <label className="sr" htmlFor="uq">Search users</label>
          <input id="uq" type="search" placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      {err && <p className="err" role="alert">{err}</p>}
      {loading && <p className="empty">Loading users…</p>}
      {!loading && !err && !shown.length && <p className="empty">No users found.</p>}
      {shown.length > 0 && (
        <table className="tbl">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {shown.map((u) => (
              <tr key={u._id}>
                <td data-label="Name">{u.name}</td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Role"><span className="badge">{u.role}</span></td>
                <td data-label="Action">
                  {u._id === me ? <span className="mute">You</span> : ask === u._id ? (
                    <span className="acts">
                      <button className="btn sm bad" onClick={() => change(u)}>Confirm</button>
                      <button className="btn sm" onClick={() => setAsk(null)}>Cancel</button>
                    </span>
                  ) : (
                    <button className="btn sm" onClick={() => setAsk(u._id)}>{u.role === "admin" ? "Make regular user" : "Make admin"}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
