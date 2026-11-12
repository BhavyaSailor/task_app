import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearSession } from "../api/client";

const link = (to, text) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>{text}</NavLink>
);

export default function Navbar() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(document.documentElement.dataset.theme === "dark");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const email = localStorage.getItem("userEmail");

  const flip = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* ignore */ }
  };
  const logout = () => { clearSession(); nav("/login"); };

  return (
    <header className="bar">
      <Link className="logo" to={token ? "/dashboard" : "/"}><i>✓</i>Taskly</Link>
      <button className="btn sm menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="nav" className={`nav${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {token ? (
          <>
            {link("/dashboard", "Tasks")}
            {role === "admin" && <>{link("/admin/tasks", "All tasks")}{link("/admin/users", "Users")}</>}
            <span className="who">{email}</span>
            <button className="btn sm" onClick={logout}>Log out</button>
          </>
        ) : (
          <>{link("/login", "Log in")}{link("/register", "Create account")}</>
        )}
        <button className="btn sm" onClick={flip} aria-pressed={dark}>{dark ? "Light mode" : "Dark mode"}</button>
      </nav>
    </header>
  );
}
