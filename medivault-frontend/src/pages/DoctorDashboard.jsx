import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctorData, setDoctorData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [sharedRecords, setSharedRecords] = useState([]);
  const [prescription, setPrescription] = useState({
    patientId: '',
    medicines: [{ name: '', dosage: '', frequency: '' }],
    notes: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = 'https://medivault-backend-ndak.onrender.com';

  
  // 🔴 Fetch Doctor Data (Backend: /api/doctors/me)
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/doctors/me`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setDoctorData(data);
        
        // Fetch Hospital if hospital_id exists
        if (data.hospital_id) {
          const hospitalRes = await fetch(`${BASE_URL}/api/hospitals/${data.hospital_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const hospitalData = await hospitalRes.json();
          setDoctorData(prev => ({ ...prev, hospital: hospitalData }));
        }
      } catch (err) {
        console.error("Failed to fetch doctor data:", err.message);
        if (err.message.includes('401') || err.message.includes('token')){
          localStorage.clear();
          navigate('/login');
        }
      }
    };
    fetchDoctorData();
  }, [navigate]);

  // 🔴 Fetch Patients (Backend: /api/patients)
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/patients`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch patients');
        
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      }
    };
    fetchPatients();
  }, []);

  // 🔴 Fetch Shared Records (Backend: /api/shared)
  useEffect(() => {
    const fetchSharedRecords = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/shared`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch shared records');
        
        const data = await res.json();
        setSharedRecords(data);
      } catch (err) {
        console.error("Failed to fetch shared records:", err);
      }
    };
    fetchSharedRecords();
  }, []);

  // 🔴 Submit Prescription (Backend: /api/prescriptions)
  const submitPrescription = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/prescriptions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(prescription)
      });
      
      if (!res.ok) throw new Error('Failed to save prescription');
      
      alert("Prescription saved successfully!");
      setPrescription({
        patientId: '',
        medicines: [{ name: '', dosage: '', frequency: '' }],
        notes: ''
      });
    } catch (err) {
      console.error("Failed to save prescription:", err);
      alert("Failed to save prescription. Please try again.");
    }
  };

  // 🔴 Upload Report (Backend: /api/upload)
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      if (!res.ok) throw new Error('Upload failed');
      
      const data = await res.json();
      alert(`Report uploaded successfully: ${data.filename}`);
      setSelectedFile(null);
    } catch (err) {
      console.error("Failed to upload file:", err);
      alert("File upload failed. Please try again.");
    }
  };

  // 🔴 Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (!doctorData) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading dashboard...</p>
      <button
         onClick={() => {
            localStorage.clear();
            window.location.reload();
         }}
         className="retry-btn"
         >
          Refresh Page
         </button>
    </div>
  );
  return (
    <div className="doctor-dashboard">
      {/* Sidebar (MEDIVAULT Logo + Tabs) */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">M+</div>
          <h3>MEDIVAULT</h3>
        </div>
        <nav>
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>
            <li className={activeTab === 'patients' ? 'active' : ''} onClick={() => setActiveTab('patients')}>
              <i className="fas fa-user-injured"></i> View Patients
            </li>
            <li className={activeTab === 'prescriptions' ? 'active' : ''} onClick={() => setActiveTab('prescriptions')}>
              <i className="fas fa-prescription-bottle-alt"></i> Prescriptions
            </li>
            <li className={activeTab === 'records' ? 'active' : ''} onClick={() => setActiveTab('records')}>
              <i className="fas fa-file-medical"></i> Shared Records
            </li>
            {/* 🔴 New Upload Report Tab */}
            <li className={activeTab === 'upload' ? 'active' : ''} onClick={() => setActiveTab('upload')}>
              <i className="fas fa-upload"></i> Upload Report
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Bar (Welcome + Profile Pic + Logout) */}
        <div className="dashboard-topbar">
          <div className="welcome-message">
            <h2>Welcome, <span className="doctor-name">{doctorData.name}</span></h2>
            <p>{doctorData.specialization} at {doctorData.hospital?.name || 'Hospital'}</p>
          </div>
          <div className="topbar-actions">
            <div className="profile-pic">
              {doctorData.name.charAt(0)}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-users"></i></div>
                <div className="stat-value">{patients.length}</div>
                <div className="stat-label">Active Patients</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><i className="fas fa-file-medical"></i></div>
                <div className="stat-value">{sharedRecords.length}</div>
                <div className="stat-label">Shared Records</div>
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab (Table View) */}
        {activeTab === 'patients' && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Patient Records</h3>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search patients..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            
            <div className="patients-table">
              <div className="table-header">
                <div>Patient ID</div>
                <div>DOB</div>
                <div>Gender</div>
                <div>Timeline Events</div>
                <div>Actions</div>
              </div>
              
              {patients.map(patient => (
                <div key={patient._id} className="table-row">
                  <div>{patient._id}</div>
                  <div>{patient.dob}</div>
                  <div>{patient.gender}</div>
                  <div className="timeline-events">
                    {patient.timeline_events?.slice(0, 2).map((event, i) => (
                      <span key={i} className="event-tag">{event}</span>
                    ))}
                    {patient.timeline_events?.length > 2 && (
                      <span className="more-events">+{patient.timeline_events.length - 2} more</span>
                    )}
                  </div>
                  <div className="actions">
                    <button className="action-btn small">
                      <i className="fas fa-eye"></i> View Records
                    </button>
                    <button 
                      className="action-btn small primary"
                      onClick={() => {
                        setPrescription({...prescription, patientId: patient._id});
                        setActiveTab('prescriptions');
                      }}
                    >
                      <i className="fas fa-prescription-bottle-alt"></i> Prescribe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prescriptions Tab (Form) */}
        {activeTab === 'prescriptions' && (
          <div className="dashboard-content">
            <h3>Write New Prescription</h3>
            
            <div className="prescription-form">
              <div className="form-group">
                <label>Select Patient</label>
                <select 
                  name="patientId"
                  value={prescription.patientId}
                  onChange={(e) => setPrescription({...prescription, patientId: e.target.value})}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map(patient => (
                    <option key={patient._id} value={patient._id}>
                      {patient._id} ({patient.gender}, {patient.dob})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="medicines-list">
                <label>Medicines</label>
                {prescription.medicines.map((medicine, index) => (
                  <div key={index} className="medicine-row">
                    <input
                      type="text"
                      name="name"
                      placeholder="Medicine name"
                      value={medicine.name}
                      onChange={(e) => {
                        const updatedMedicines = [...prescription.medicines];
                        updatedMedicines[index].name = e.target.value;
                        setPrescription({...prescription, medicines: updatedMedicines});
                      }}
                      required
                    />
                    <input
                      type="text"
                      name="dosage"
                      placeholder="Dosage (e.g., 500mg)"
                      value={medicine.dosage}
                      onChange={(e) => {
                        const updatedMedicines = [...prescription.medicines];
                        updatedMedicines[index].dosage = e.target.value;
                        setPrescription({...prescription, medicines: updatedMedicines});
                      }}
                      required
                    />
                    <input
                      type="text"
                      name="frequency"
                      placeholder="Frequency (e.g., 2x daily)"
                      value={medicine.frequency}
                      onChange={(e) => {
                        const updatedMedicines = [...prescription.medicines];
                        updatedMedicines[index].frequency = e.target.value;
                        setPrescription({...prescription, medicines: updatedMedicines});
                      }}
                      required
                    />
                    {prescription.medicines.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-medicine"
                        onClick={() => {
                          const updatedMedicines = prescription.medicines.filter((_, i) => i !== index);
                          setPrescription({...prescription, medicines: updatedMedicines});
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-medicine"
                  onClick={() => {
                    setPrescription({
                      ...prescription,
                      medicines: [...prescription.medicines, { name: '', dosage: '', frequency: '' }]
                    });
                  }}
                >
                  <i className="fas fa-plus"></i> Add Another Medicine
                </button>
              </div>
              
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  name="notes"
                  value={prescription.notes}
                  onChange={(e) => setPrescription({...prescription, notes: e.target.value})}
                  placeholder="Enter any additional instructions or notes..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="action-btn secondary"
                  onClick={() => setPrescription({
                    patientId: '',
                    medicines: [{ name: '', dosage: '', frequency: '' }],
                    notes: ''
                  })}
                >
                  Clear Form
                </button>
                <button 
                  type="button" 
                  className="action-btn primary"
                  onClick={submitPrescription}
                  disabled={!prescription.patientId || !prescription.medicines[0].name}
                >
                  <i className="fas fa-save"></i> Save Prescription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shared Records Tab (Cards) */}
        {activeTab === 'records' && (
          <div className="dashboard-content">
            <h3>Shared Medical Records</h3>
            
            <div className="records-filter">
              <select>
                <option value="">All Patients</option>
                {patients.map(patient => (
                  <option key={patient._id} value={patient._id}>
                    {patient._id}
                  </option>
                ))}
              </select>
              <select>
                <option value="">All Record Types</option>
                <option value="report">Reports</option>
                <option value="prescription">Prescriptions</option>
                <option value="file">Files</option>
              </select>
            </div>
            
            <div className="records-list">
              {sharedRecords.map(record => (
                <div key={record._id} className="record-card">
                  <div className="record-header">
                    <h4>Patient ID: {record.patient_id}</h4>
                    <span className="record-type">{record.record_type}</span>
                  </div>
                  <div className="record-details">
                    <span className="record-id">Record ID: {record.record_id}</span>
                    <span className="shared-date">Shared on: {new Date(record.shared_on).toLocaleDateString()}</span>
                  </div>
                  <div className="record-actions">
                    <button className="action-btn small primary">
                      <i className="fas fa-eye"></i> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔴 Upload Report Tab (New) */}
        {activeTab === 'upload' && (
          <div className="dashboard-content">
            <h3>Upload Medical Report</h3>
            <form onSubmit={handleFileUpload} className="upload-form">
              <div className="form-group">
                <label>Select Patient</label>
                <select required>
                  <option value="">-- Select Patient --</option>
                  {patients.map(patient => (
                    <option key={patient._id} value={patient._id}>
                      {patient._id} ({patient.gender}, {patient.dob})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Choose File (PDF/Image)</label>
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files[0])} 
                  required 
                />
              </div>
              <button type="submit" className="action-btn primary">
                <i className="fas fa-upload"></i> Upload Report
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;