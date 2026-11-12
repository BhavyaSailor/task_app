import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { getRoleFromToken } from "../utils/jwt";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", formData.email);

      // extract role from token and save for UI decisions
      const role = getRoleFromToken(data.token);
      if (role) localStorage.setItem("userRole", role);

      console.log(data);
      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
