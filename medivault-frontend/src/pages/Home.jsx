import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Scroll to top on page load & prevent scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Auto-hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const halfwayPoint = window.innerHeight / 2;
      if (currentScrollPos < 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(
          prevScrollPos > currentScrollPos ||
          currentScrollPos < halfwayPoint
        );
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Intersection Observer for animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll lock for ALL devices (including iOS)
  useEffect(() => {
    let scrollY;
    if (isMobileMenuOpen) {
      // Add to <body> and <html>
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      // iOS scroll fix: save scroll position and fix body
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100vw';
    } else {
      // Remove lock and restore position
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      const y = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (y) window.scrollTo(0, parseInt(y || '0') * -1);
    }
    return () => {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="home">
      {/* Navigation */}
      <nav className={
        `navbar ${isNavVisible ? '' : 'navbar-hidden'} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`
      }>
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo-3d">M+</div>
            <span className="logo-text">MEDIVAULT</span>
          </div>
          {/* Desktop Nav */}
          <div className="nav-links">
            <a href="/" className="nav-link" onClick={handleNavLinkClick}>Home</a>
            <a href="/about" className="nav-link" onClick={handleNavLinkClick}>About</a>
            <a href="/features" className="nav-link" onClick={handleNavLinkClick}>Features</a>
            <a href="/security" className="nav-link" onClick={handleNavLinkClick}>Security</a>
            <a href="/contact" className="nav-link" onClick={handleNavLinkClick}>Contact</a>
          </div>
          <div className="auth-buttons">
            <a href="/login" className="btn-login" onClick={handleNavLinkClick}>Login</a>
            <a href="/register" className="btn-signup glass-btn" onClick={handleNavLinkClick}>Sign Up</a>
          </div>
          {/* Hamburger Button */}
          <button
            className={`mobile-menu-button ${isMobileMenuOpen ? "open" : ""}`}
            aria-label="Toggle Mobile Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="menu-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
        {/* Mobile Nav */}
        <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="/" className="nav-link" onClick={handleNavLinkClick}>Home</a>
          <a href="/about" className="nav-link" onClick={handleNavLinkClick}>About</a>
          <a href="/features" className="nav-link" onClick={handleNavLinkClick}>Features</a>
          <a href="/security" className="nav-link" onClick={handleNavLinkClick}>Security</a>
          <a href="/contact" className="nav-link" onClick={handleNavLinkClick}>Contact</a>
          <div className="mobile-auth-buttons">
            <a href="/login" className="btn-login" onClick={handleNavLinkClick}>Login</a>
            <a href="/register" className="btn-signup glass-btn" onClick={handleNavLinkClick}>Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Rest of Home content */}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="hero-content fade-up">
          <h1 className="hero-title">
            Secure Your Medical<br />
            Records in One<br />
            Digital Vault
          </h1>
          <p className="hero-description">
            Experience the future of healthcare document management. Store,
            organize, and access your medical records with military-grade security
            and AI-powered organization.
          </p>
          <div className="hero-buttons">
            <a href="/register" className="btn-primary glass-btn">
              Start Now
            </a>
            <a href="#features" className="btn-secondary glass-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
            <div className="section-header">
                <h2>Why Choose MEDIVAULT?</h2>
            </div>
            <div className="section-header">
                <p>Revolutionary features designed to transform your healthcare document management experience</p>
            </div>
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon fade-up">📱</div>
                    <h3>Access Anywhere</h3>
                    <p>View and manage your medical records from any device, anywhere in the world. Your health information is always at your fingertips when you need it most.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon fade-up">🔄</div>
                    <h3>Seamless Integration</h3>
                    <p>Connect directly with healthcare providers, labs, and hospitals for automatic document updates.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon fade-up">📊</div>
                    <h3>Health Analytics</h3>
                    <p>Get personalized insights and trends from your medical history to make informed decisions about your health and wellness journey.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon fade-up">👨‍👩‍👧‍👦</div>
                    <h3>Family Management</h3>
                    <p>Manage medical records for your entire family with granular access controls, sharing permissions, and emergency access features.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon fade-up">🔐</div>
                    <h3>Bank-Level Security</h3>
                    <p>Your medical data is protected with 256-bit encryption, multi-factor authentication, and compliance with HIPAA regulations. Your privacy is our top priority.</p>
                </div>
            </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content fade-up">
          <h2>Ready to Transform Your Healthcare Experience?</h2>
          <p>Join thousands of users who have already revolutionized their<br />medical document management with MEDIVAULT. Start your<br />secure digital health journey today.</p>
          <a href="/register" className="btn-cta glass-btn">Get Started </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>MEDIVAULT</h3>
              <p>Revolutionizing healthcare document management with secure, accessible, and intelligent solutions for modern healthcare needs.</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <div className="link-list">
                  <a href="/features">Features</a>
                  <a href="/security">Security</a>
                  <a href="/pricing">Pricing</a>
                  <a href="/api">API</a>
                </div>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <div className="link-list">
                  <a href="/help">Help Center</a>
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/terms">Terms of Service</a>
                  <a href="/contact">Contact Us</a>
                </div>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <div className="link-list">
                  <a href="/about">About Us</a>
                  <a href="/careers">Careers</a>
                  <a href="/press">Press</a>
                  <a href="/blog">Blog</a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 MEDIVAULT. All rights reserved. | Securing healthcare, one document at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
