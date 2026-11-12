import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";

export default function Home() {
  const token = localStorage.getItem("token");
  return (
    <Layout title="Home">
      <section className="hero">
        <div>
          <h1>Keep your day in one short list.</h1>
          <p>Add tasks, tick them off, and pick up where you left off on any device.</p>
          <div className="row">
            {token ? <Link className="btn pri" to="/dashboard">Open your tasks</Link> : (
              <>
                <Link className="btn pri" to="/register">Create account</Link>
                <Link className="btn" to="/login">Log in</Link>
              </>
            )}
          </div>
        </div>
        <ul className="peek list" aria-hidden="true">
          <li className="task done"><span className="tick" aria-hidden="true">✓</span><span className="t">Send the invoice</span></li>
          <li className="task"><span className="tick" /><span className="t">Book a dentist appointment</span></li>
          <li className="task"><span className="tick" /><span className="t">Review the open pull request</span></li>
        </ul>
      </section>
    </Layout>
  );
}
