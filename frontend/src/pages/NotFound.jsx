import { Link } from "react-router-dom";
import Layout from "../layouts/MainLayout";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <div className="empty">
        <h1>Page not found</h1>
        <p className="mute" style={{ margin: "12px 0 24px" }}>That address doesn’t exist or has moved.</p>
        <Link className="btn pri" to="/">Go to the home page</Link>
      </div>
    </Layout>
  );
}
