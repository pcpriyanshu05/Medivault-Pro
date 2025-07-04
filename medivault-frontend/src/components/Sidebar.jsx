// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>MediVault Pro</h2>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/prescriptions">Prescriptions</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
