import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-container-admin">
      <aside className="sidebar-admin">
        <div className="brand-admin">🏥 MEDIVAULT PRO</div>
        <nav className="nav-admin">
          <button className="nav-item-admin">Dashboard</button>
          <button className="nav-item-admin">Manage Users</button>
          <button className="nav-item-admin">System Logs</button>
          <button className="nav-item-admin">Settings</button>
        </nav>
      </aside>
      <main className="main-admin">
        <header className="topbar-admin">
          <span>Welcome, Admin 👔</span>
          <button className="logout-btn-admin" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="content-admin">
          <h1>Your Admin Dashboard</h1>
          <p>Overview and administrative tools</p>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
