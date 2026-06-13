import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllUsers } from "../api/taskApi";
import { updateUserRole } from "../api/authApi";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.users || data?.data?.users || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await updateUserRole(user._id, newRole);
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar userLabel={localStorage.getItem("userEmail") || "Admin"} onLogout={handleLogout} />

      <main className="admin-users">
        <h1>Users</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && users.length === 0 && <p>No users found.</p>}

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleToggleRole(u)}>
                    {u.role === "admin" ? "Demote to user" : "Promote to admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AdminUsers;
