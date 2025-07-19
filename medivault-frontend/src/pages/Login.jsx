import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // <-- loader state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const res = await axios.post(
        "https://medivault-backend-ndak.onrender.com/api/auth/login",
        { email, password }
      );

      const { token, user } = res.data;
      const userId = user.id || user._id;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", userId);
      console.log("Login Success - Saved:", { 
      token: token.substring(0, 10) + "...", 
      role: user.role,
      userId 
      });

      // Navigate based on role
      if (user.role === "doctor") {
         navigate("/dashboard/doctor");
      } else if (user.role === "patient") {
         navigate("/dashboard/patient");
      } else if (user.role === "admin") {
         navigate("/dashboard/admin");
      } else {
         navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // Stop loader regardless of success or failure
    }
  };

  return (
    <div className="container">
      {/* Left: Login Section */}
      <div className="login-section">
        <div className="login-card">
          <h2>Login to MediVault</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="links">
              <a href="#">Forgot Password?</a><br />
              Don’t have an account? <a href="/register">Register here</a>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back to <span>MediVault</span></h1>
          <p>Your health, organized and always accessible.</p>
        </div>
        <div className="blob"></div>
        <div className="blob"></div>
        <div className="blob"></div>
      </div>
    </div>
  );
};

export default Login;
