import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewPatientRecords.css";

const BASE_URL = "https://medivault-pro-7zkp.onrender.com";

const ViewPatientRecords = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/patients/${patientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch patient");
        const data = await res.json();
        setPatient(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patient details:", err);
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  if (loading) {
    return <div className="dashboard-container">Loading patient records...</div>;
  }

  if (!patient) {
    return <div className="dashboard-container">Patient not found.</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="section-header">
        <h3>Patient Records</h3>
        <div className="underline"></div>
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard/doctor#patients")}>
        ← Back to Patients
      </button>

      <div className="card-grid">
        <div className="dashboard-card">
          <h4>Patient ID</h4>
          <p>{patient._id}</p>
        </div>
        <div className="dashboard-card">
          <h4>Date of Birth</h4>
          <p>{new Date(patient.dob).toDateString()}</p>
        </div>
        <div className="dashboard-card">
          <h4>Gender</h4>
          <p>{patient.gender}</p>
        </div>
        <div className="dashboard-card">
          <h4>Address</h4>
          <p>{patient.address}</p>
        </div>
      </div>

      <h4 className="section-subtitle">Uploaded Reports</h4>
      <div className="timeline-events">
        {patient.timeline_events?.length === 0 ? (
          <p className="muted-text">No uploaded reports yet.</p>
        ) : (
          patient.timeline_events
            .filter(event => event.type === "report")
            .map((event, index) => (
              <div className="timeline-card" key={index}>
                <h5>REPORT</h5>
                <p><strong>Ref ID:</strong> {event.ref_id}</p>
                <p><strong>Date:</strong> {new Date(event.timestamp).toDateString()}</p>
              </div>
            ))
        )}
      </div>

      <h4 className="section-subtitle">Prescriptions</h4>
      <div className="timeline-events">
        {patient.timeline_events?.filter(e => e.type === "prescription").length === 0 ? (
          <p className="muted-text">No prescriptions available.</p>
        ) : (
          patient.timeline_events
            .filter(event => event.type === "prescription")
            .map((event, index) => (
              <div className="timeline-card" key={index}>
                <h5>PRESCRIPTION</h5>
                <p><strong>Ref ID:</strong> {event.ref_id}</p>
                <p><strong>Date:</strong> {new Date(event.timestamp).toDateString()}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ViewPatientRecords;
