// src/components/Topbar.js
import React from 'react';
import './Topbar.css';

function Topbar() {
  return (
    <div className="topbar">
      <span>Welcome, User</span>
      <button>Logout</button>
    </div>
  );
}

export default Topbar;
