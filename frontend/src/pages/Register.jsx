import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import { registerUser } from "../api/authApi";
import { errMsg } from "../api/client";
import { useToast } from "../components/Toast";

export default function Register() {
  const nav = useNavigate();
  const toast = useToast();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email) return setErr("Enter your name and email.");
    if (f.password.length < 6) return setErr("Use a password with at least 6 characters.");
    setErr("");
    setBusy(true);
    try {
      await registerUser(f);
      toast("Account created. Log in to continue.");
      nav("/login");
    } catch (x) {
      setErr(errMsg(x, "Could not create the account. Check your connection and try again."));
    } finally { setBusy(false); }
  };

  return (
    <Layout title="Create account">
      <div className="card">
        <h2>Create account</h2>
        <form onSubmit={submit} noValidate>
          <div><label htmlFor="name">Name</label><input id="name" autoComplete="name" value={f.name} onChange={set("name")} /></div>
          <div><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} /></div>
          <div><label htmlFor="pw">Password</label>
            <div className="pw">
              <input id="pw" type={show ? "text" : "password"} autoComplete="new-password" value={f.password} onChange={set("password")} />
              <button type="button" className="btn" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
            </div></div>
          {err && <p className="err" role="alert">{err}</p>}
          <button className="btn pri" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
        </form>
        <p className="alt">Already registered? <Link to="/login">Log in</Link></p>
      </div>
    </Layout>
  );
}
