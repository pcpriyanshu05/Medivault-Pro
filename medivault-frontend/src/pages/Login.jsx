import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.prefilledEmail) {
      setEmail(location.state.prefilledEmail);
    }
    if (location.state?.prefilledPassword) {
      setPassword(location.state.prefilledPassword);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
       e.preventDefault();
       setLoading(true);

       try {
    const res = await axios.post(
    "https://medivault-backend-ndak.onrender.com/api/auth/login",
    { email, password }
    );


    const { token, user, redirectPath } = res.data;
    const userId = user.id || user._id;
    const role = user.role || (email === process.env.REACT_APP_ADMIN_EMAIL ? "admin" : "");

    // Store user data
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userData", JSON.stringify({ ...user, role }));

    console.log("Login Success - Saved:", {
      token: token.substring(0, 10) + "...",
      role,
      userId,
    });

    // Redirect based on role
    const redirectTo =
      redirectPath ||
      (role === "doctor"
        ? "/dashboard/doctor"
        : role === "patient"
        ? "/dashboard/patient"
        : role === "hospital"
        ? "/dashboard/hospital"
        : role === "admin"
        ? "/dashboard/admin"
        : "/");

    navigate(redirectTo);
    } catch (err) {
    console.error("Login error:", err);
    alert(err?.response?.data?.message || "Login failed");
    } finally {
    setLoading(false);
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
              Don't have an account? <a href="/register">Register here</a>
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