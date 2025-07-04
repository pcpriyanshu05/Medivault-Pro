// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // shared CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // ✅ Store token & role in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      // ✅ Redirect based on role
      switch (data.user.role) {
        case 'doctor':
          navigate('/dashboard/doctor');
          break;
        case 'patient':
          navigate('/dashboard/patient');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-link-text">
          Don't have an account? <a href="/register" className="auth-link">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
