import React from 'react';
import './FeaturesSection.css';

const features = [
  {
    title: 'Centralized Records',
    description: 'Access all your medical history, prescriptions, and reports in one secure place.',
    icon: '📁'
  },
  {
    title: 'Smart Dashboard',
    description: 'Real-time health stats, appointments, and insights at your fingertips.',
    icon: '📊'
  },
  {
    title: 'Doctors & Patients',
    description: 'A single platform to connect patients and doctors seamlessly.',
    icon: '👩‍⚕️'
  },
  {
    title: '24x7 Secure Access',
    description: 'Your data is always encrypted and available — anytime, anywhere.',
    icon: '🔒'
  }
];

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <h2 className="features-heading">Explore Our Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
