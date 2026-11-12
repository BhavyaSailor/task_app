import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminAllTasks from "./pages/AdminAllTasks";
import NotFound from "./pages/NotFound";

function Guard({ admin, children }) {
  if (!localStorage.getItem("token")) return <Navigate to="/login" replace />;
  if (admin && localStorage.getItem("userRole") !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Guard><Dashboard /></Guard>} />
      <Route path="/admin/users" element={<Guard admin><AdminUsers /></Guard>} />
      <Route path="/admin/tasks" element={<Guard admin><AdminAllTasks /></Guard>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
