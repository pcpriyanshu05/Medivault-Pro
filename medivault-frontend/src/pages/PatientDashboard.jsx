import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";
import { AuthContext } from "../context/AuthContext";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-container-patient">
      <aside className="sidebar-patient">
        <div className="brand-patient">🏥 MEDIVAULT PRO</div>
        <nav className="nav-patient">
          <button className="nav-item-patient">Dashboard</button>
          <button className="nav-item-patient">My Appointments</button>
          <button className="nav-item-patient">Prescriptions</button>
          <button className="nav-item-patient">Health Records</button>
        </nav>
      </aside>
      <main className="main-patient">
        <header className="topbar-patient">
          <span>Welcome, Patient 🧾</span>
          <button className="logout-btn-patient" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="content-patient">
          <h1>Your Patient Dashboard</h1>
          <p>See your upcoming appointments and medical info</p>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
