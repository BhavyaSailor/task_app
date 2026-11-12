import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { loginUser } from "../api/authApi";
import { errMsg } from "../api/client";
import { getRoleFromToken } from "../utils/jwt";
import { useToast } from "../components/Toast";

export default function Login() {
  const nav = useNavigate();
  const toast = useToast();
  const [sp] = useSearchParams();
  const [f, setF] = useState({ email: "", password: "" });
  const [err, setErr] = useState(sp.get("expired") ? "Your session expired. Log in again." : "");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!f.email || !f.password) return setErr("Enter your email and password.");
    setErr("");
    setBusy(true);
    try {
      const d = await loginUser(f);
      localStorage.setItem("token", d.token);
      localStorage.setItem("userEmail", f.email);
      localStorage.setItem("userRole", getRoleFromToken(d.token) || "user");
      toast("Logged in");
      nav("/dashboard");
    } catch (x) {
      setErr(errMsg(x, "Could not log in. Check your connection and try again."));
    } finally { setBusy(false); }
  };

  return (
    <Layout title="Log in">
      <div className="card">
        <h2>Log in</h2>
        <form onSubmit={submit} noValidate>
          <div><label htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div><label htmlFor="pw">Password</label>
            <div className="pw">
              <input id="pw" type={show ? "text" : "password"} autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
              <button type="button" className="btn" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
            </div></div>
          {err && <p className="err" role="alert">{err}</p>}
          <button className="btn pri" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
        </form>
        <p className="alt">New here? <Link to="/register">Create an account</Link></p>
      </div>
    </Layout>
  );
}
