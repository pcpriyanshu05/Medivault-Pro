import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} <span>MediVault</span>. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
