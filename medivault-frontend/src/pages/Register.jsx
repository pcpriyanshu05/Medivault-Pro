// src/pages/Register.jsx
import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 👈 new loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
      alert('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true); // 👈 Start loading spinner

      // Register API call
      const response = await fetch('https://medivault-backend-ndak.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        setLoading(false); // 👈 Stop loading
        return;
      }

      // Auto login
      const loginRes = await fetch('https://medivault-backend-ndak.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert(loginData.message || 'Auto-login failed. Please login manually.');
        setLoading(false);
        navigate('/login');
        return;
      }

      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData.user));

      // Redirect to role-based dashboard
      const userRole = loginData.user.role;
      if (userRole === 'doctor') navigate('/dashboard/doctor');
      else if (userRole === 'patient') navigate('/dashboard/patient');
      else if (userRole === 'hospital' || userRole === 'admin') navigate('/dashboard/admin');
      else navigate('/');

    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false); // 👈 Ensure loading ends
    }
  };

  return (
    <div className="register-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="left-glass">
        <div className="welcome-text">
          <h1>Welcome to <span>MediVault </span></h1>
          <p>Secure your medical records with ease.</p>
        </div>
        <div className="blob-animation"></div>
        <div className="glass-float"></div>
        <div className="glass-float"></div>
        <div className="glass-float"></div>
      </div>

      <div className="form-container">
        <div className="glass-bg-effect"></div>
        <div className="glass-bg-effect"></div>
        <div className="glass-bg-effect"></div>
        <div className="glass-bg-effect"></div>
        <div className="glass-bg-effect"></div>

        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />

          <div className="role-selection">
            <h3>Select Role:</h3>
            <div className="role-options">
              <label className="role-option">
                <input type="radio" name="role" value="doctor" onChange={handleChange} />
                <div className="role-card">
                  <span className="role-emoji">🩺</span>
                  <div className="role-title">Doctor</div>
                  <div className="role-description">Manage patients & write prescriptions.</div>
                </div>
              </label>
              <label className="role-option">
                <input type="radio" name="role" value="patient" onChange={handleChange} />
                <div className="role-card">
                  <span className="role-emoji">🙋‍♂️</span>
                  <div className="role-title">Patient</div>
                  <div className="role-description">Store reports & manage appointments.</div>
                </div>
              </label>
              <label className="role-option">
                <input type="radio" name="role" value="hospital" onChange={handleChange} />
                <div className="role-card">
                  <span className="role-emoji">🏥</span>
                  <div className="role-title">Admin</div>
                  <div className="role-description">Upload reports & verify records.</div>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="register-btn">Register</button>

          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
