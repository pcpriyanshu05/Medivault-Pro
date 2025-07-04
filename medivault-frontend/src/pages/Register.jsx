// src/pages/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [role, setRole] = useState('');

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create an Account</h2>
        <form>
          <input type="text" placeholder="Full Name" className="auth-input" required />
          <input type="email" placeholder="Email" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
          <input type="password" placeholder="Confirm Password" className="auth-input" required />

          {/* Role Dropdown */}
          <select
            className="auth-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-link-text">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
