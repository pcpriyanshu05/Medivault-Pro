// src/pages/Dashboard.js
import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo-text">MediVault <span>Pro</span></span>
        </div>
        <nav className="sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Patients</a>
          <a href="#">Reports</a>
          <a href="#">Appointments</a>
          <a href="#">Logout</a>
        </nav>
      </aside>
      <main className="dashboard-main">
        <div className="welcome-banner">
          <h2>Welcome, User</h2>
        </div>
        <div className="vault-intro">
          <h3>Your Health Vault</h3>
          <div className="underline" />
          <p>This is your centralized medical record system.</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
