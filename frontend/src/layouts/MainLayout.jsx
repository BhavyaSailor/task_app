import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout({ title, children }) {
  useEffect(() => { document.title = `${title} · Taskly`; }, [title]);
  const token = localStorage.getItem("token");
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Navbar />
      <main id="main" className="page">{children}</main>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Taskly</span>
        <nav>
          <Link to="/">Home</Link>
          {token ? <Link to="/dashboard">Tasks</Link> : <Link to="/login">Log in</Link>}
        </nav>
      </footer>
    </>
  );
}
