import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="white-text">Medi</span>
        <span className="white-text">Vault</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/about">About</Link></li> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login" className="nav-btn login-btn " >Login</Link></li>
        <li ><Link to="/register" className="nav-btn register-btn ">Signup</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
