import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Task Manager</h1>

      <p>
        Manage your tasks efficiently.
      </p>

      <div className="buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;