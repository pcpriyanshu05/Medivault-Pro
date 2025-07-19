import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
useEffect(() => {
const handleScroll = () => {
const header = document.querySelector('header');
if (window.scrollY > 100) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}
};


window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
<>
<header>
<nav className="nav-container">

<Link to="/" className="logo">
<div className="logo-icon">M+</div>
MEDIVAULT
</Link>
<ul className="nav-links">
<li><a href="#home">Home</a></li>
<li><a href="#about">About</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#security">Security</a></li>
<li><a href="#contact">Contact</a></li>
</ul>
<div className="auth-buttons">
<Link to="/login" className="login-btn">Login</Link>
<Link to="/register" className="signup-btn"><span>Sign Up</span></Link>
</div>
</nav>
</header>


  <section className="hero" id="home">
    <div className="floating-elements">
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
    </div>
    <div className="container">
      <div className="hero-content">
        <h1>Secure Your Medical Records in One Digital Vault</h1>
        <p>Experience the future of healthcare document management. Store, organize, and access your medical records with military-grade security and AI-powered organization.</p>
        <div className="hero-buttons">
          <Link to="/register" className="primary-btn">Start Free Trial</Link>
          <a href="#features" className="secondary-btn">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <section className="features" id="features">
    <div className="container">
      <div className="section-header">
        <h2>Why Choose MEDIVAULT?</h2>
        <p>Revolutionary features designed to transform your healthcare document management experience</p>
      </div>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>Bank-Level Security</h3>
          <p>Your medical data is protected with 256-bit encryption, multi-factor authentication, and compliance with HIPAA regulations. Your privacy is our top priority.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Access Anywhere</h3>
          <p>View and manage your medical records from any device, anywhere in the world. Your health information is always at your fingertips when you need it most.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI-Powered Organization</h3>
          <p>Our intelligent system automatically categorizes, tags, and organizes your documents, making it effortless to find what you need instantly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Seamless Integration</h3>
          <p>Connect directly with healthcare providers, labs, and hospitals for automatic document updates and streamlined appointment scheduling.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Health Analytics</h3>
          <p>Get personalized insights and trends from your medical history to make informed decisions about your health and wellness journey.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👨‍👩‍👧‍👦</div>
          <h3>Family Management</h3>
          <p>Manage medical records for your entire family with granular access controls, sharing permissions, and emergency access features.</p>
        </div>
      </div>
    </div>
  </section>

  <section className="cta-section">
    <div className="container">
      <h2>Ready to Transform Your Healthcare Experience?</h2>
      <p>Join thousands of users who have already revolutionized their medical document management with MEDIVAULT. Start your secure digital health journey today.</p>
      <div className="cta-buttons">
        <Link to="/register" className="primary-btn">Get Started Free</Link>
      </div>
    </div>
  </section>

  <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MEDIVAULT</h3>
          <p>Revolutionizing healthcare document management with secure, accessible, and intelligent solutions for modern healthcare needs.</p>
        </div>
        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">API</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MEDIVAULT. All rights reserved. | Securing healthcare, one document at a time.</p>
      </div>
    </div>
  </footer>
</>
);
};

export default Home;