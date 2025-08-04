import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    age: '',
    experienceYears: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    // Patient fields
    age: '',
    gender: '',
    address: '',
    contactNumber: '',
    medicalHistory: '',
    // Doctor fields
    licenseNumber: '',
    specialization: '',
    hospitalId: '',
    experienceYears: '',
    // Hospital fields
    hospitalName: '',
    location: '',
    city: '',
    state: '',
    pinCode: '',
    hospitalPhone: '',
    hospitalEmail: ''
  });

  const validateNumberInput = (name, value) => {
    if (value === '') return true;
    
    const numValue = Number(value);
    if (isNaN(numValue)) {
      setErrors(prev => ({ ...prev, [name]: `Please enter a valid number` }));
      return false;
    }
    
    if (numValue <= 0) {
      setErrors(prev => ({
        ...prev,
        [name]: name === 'age' 
          ? 'Age must be greater than 0' 
          : 'Experience must be greater than 0'
      }));
      return false;
    }
    
    return true;
  };

  const validateCommonFields = () => {
    if (!formData.name.trim()) {
      alert('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return false;
    }
    if (!formData.password) {
      alert('Please enter a password');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'age' || name === 'experienceYears') {
      if (value !== '' && !validateNumberInput(name, value)) {
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    if (!validateCommonFields()) return;
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert('Please select a role');
      return;
    }
    if (!validateCommonFields()) return;
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCommonFields()) return;

    if (formData.role === 'patient') {
      if (!formData.age || !formData.gender || !formData.contactNumber) {
        alert('Please fill all patient details');
        return;
      }
      if (errors.age) return;
    } else if (formData.role === 'doctor') {
      if (!formData.licenseNumber || !formData.specialization || !formData.experienceYears) {
        alert('Please fill all doctor details');
        return;
      }
      if (errors.experienceYears) return;
    } else if (formData.role === 'hospital') {
      if (!formData.hospitalName || !formData.location || !formData.pinCode) {
        alert('Please fill all hospital details');
        return;
      }
    }

    try {
      setLoading(true);
      const response = await fetch('https://medivault-backend-ndak.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      navigate('/login', {
        state: {
          prefilledEmail: formData.email,
          prefilledPassword: formData.password
        }
      });

    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleForm = () => {
    switch(formData.role) {
      case 'patient':
        return (
          <div className="role-form">
            <h3 className="role-form-title patient-title">Patient Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input 
                  type="number" 
                  name="age" 
                  placeholder="Enter your age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  min="1"
                  onKeyDown={(e) => {
                    if (e.key === '-' || (e.key === '0' && !formData.age)) {
                      e.preventDefault();
                    }
                  }}
                  required 
                />
                {errors.age && <div className="input-error-message show">{errors.age}</div>}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                placeholder="Enter your address" 
                value={formData.address} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input 
                type="tel" 
                name="contactNumber" 
                placeholder="Enter contact number" 
                value={formData.contactNumber} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Medical History</label>
              <input 
                type="text" 
                name="medicalHistory" 
                placeholder="e.g. Diabetes, Hypertension" 
                value={formData.medicalHistory} 
                onChange={handleChange} 
              />
            </div>
          </div>
        );
      case 'doctor':
        return (
          <div className="role-form">
            <h3 className="role-form-title doctor-title">Doctor Information</h3>
            <div className="form-group">
              <label>Your License Number</label>
              <input 
                type="text" 
                name="licenseNumber" 
                placeholder="Enter your medical license number" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Your Field</label>
              <input 
                type="text" 
                name="specialization" 
                placeholder="Enter your specialization" 
                value={formData.specialization} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Hospital ID</label>
                <input 
                  type="text" 
                  name="hospitalId" 
                  placeholder="Enter hospital ID" 
                  value={formData.hospitalId} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Years in Practice</label>
                <input 
                  type="number" 
                  name="experienceYears" 
                  placeholder="Enter years in practice" 
                  value={formData.experienceYears} 
                  onChange={handleChange} 
                  min="1"
                  onKeyDown={(e) => {
                    if (e.key === '-' || (e.key === '0' && !formData.experienceYears)) {
                      e.preventDefault();
                    }
                  }}
                  required 
                />
                {errors.experienceYears && <div className="input-error-message show">{errors.experienceYears}</div>}
              </div>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input 
                type="tel" 
                name="contactNumber" 
                placeholder="Enter contact number" 
                value={formData.contactNumber} 
                onChange={handleChange} 
              />
            </div>
          </div>
        );
      case 'hospital':
        return (
          <div className="role-form">
            <h3 className="role-form-title hospital-title">Hospital Information</h3>
            <div className="form-group">
              <label>Hospital Name</label>
              <input 
                type="text" 
                name="hospitalName" 
                placeholder="Enter hospital name" 
                value={formData.hospitalName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                name="location" 
                placeholder="Enter hospital address" 
                value={formData.location} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  placeholder="Enter city" 
                  value={formData.city} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input 
                  type="text" 
                  name="state" 
                  placeholder="Enter state" 
                  value={formData.state} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>PIN Code</label>
              <input 
                type="text" 
                name="pinCode" 
                placeholder="Enter PIN code" 
                value={formData.pinCode} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                name="hospitalPhone" 
                placeholder="Enter hospital phone" 
                value={formData.hospitalPhone} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="hospitalEmail" 
                placeholder="Enter hospital email" 
                value={formData.hospitalEmail} 
                onChange={handleChange} 
              />
            </div>
          </div>
        );
      default:
        return null;
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

        <form className="register-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
          <h2>Create Account</h2>

          {step === 1 ? (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Create a password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm your password" 
                  required 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                />
              </div>

              <div className="role-selection">
                <h3>Select Role:</h3>
                <div className="role-options">
                  <div 
                    className={`role-option hover-purple ${formData.role === 'patient' ? 'selected' : ''}`} 
                    onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
                  >
                    <div className="role-card">
                      <span className="role-emoji">🙋‍♂️</span>
                      <div className="role-title">Patient</div>
                      <div className="role-description">Manage your health records</div>
                    </div>
                  </div>
                  <div 
                    className={`role-option hover-purple ${formData.role === 'doctor' ? 'selected' : ''}`} 
                    onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
                  >
                    <div className="role-card">
                      <span className="role-emoji">🩺</span>
                      <div className="role-title">Doctor</div>
                      <div className="role-description">Access patient records</div>
                    </div>
                  </div>
                  <div 
                    className={`role-option hover-purple ${formData.role === 'hospital' ? 'selected' : ''}`} 
                    onClick={() => setFormData(prev => ({ ...prev, role: 'hospital' }))}
                  >
                    <div className="role-card">
                      <span className="role-emoji">🏥</span>
                      <div className="role-title">Hospital</div>
                      <div className="role-description">Manage institution</div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="register-btn">Next</button>

              <div className="login-link">
                Already have an account? <Link to="/login">Login here</Link>
              </div>
            </>
          ) : (
            <>
              {renderRoleForm()}
              <div className="form-actions">
                <button type="button" className="back-btn" onClick={handleBack}>Back</button>
                <button type="submit" className="register-btn">Create Account</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;