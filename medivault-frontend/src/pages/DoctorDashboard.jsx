import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
import { AuthContext } from "../context/AuthContext";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-container-doctor">
      <aside className="sidebar-doctor">
        <div className="brand-doctor">MEDIVAULT </div>
        <nav className="nav-doctor">
          <button className="nav-item-doctor">Dashboard</button>
          <button className="nav-item-doctor">Appointments</button>
          <button className="nav-item-doctor">Prescriptions</button>
          <button className="nav-item-doctor">Patients</button>
        </nav>
      </aside>
      <main className="main-doctor">
        <header className="topbar-doctor">
          <span>Welcome, Doctor 🩺</span>
          <button className="logout-btn-doctor" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="content-doctor">
          <h1>Your Dashboard Content</h1>
          <p>Here you'll see all your required details doctor</p>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
