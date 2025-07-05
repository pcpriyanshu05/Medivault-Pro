import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1>
          Your Health <span className="highlight">One Vault</span>
        </h1>
        <p>Medivault  is a trusted digital vault for all your medical records.</p>
        <Link to="/register" className="hero-button">
          Get Started
        </Link>
      </div>
      <div className="hero-right">
        <img
          src="https://cdn.pixabay.com/photo/2024/05/19/00/39/cigarette-8771248_960_720.png"
          alt="Medical Illustration"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default HeroSection;
