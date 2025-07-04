import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css';

function CTASection() {
  return (
    <section className="cta-section">
      <h2>Your Health, One Click Away</h2>
      <p>Join MediVault Pro today and manage your medical records with ease.</p>
      <Link to="/register" className="cta-button">Get Started</Link>
    </section>
  );
}

export default CTASection;
