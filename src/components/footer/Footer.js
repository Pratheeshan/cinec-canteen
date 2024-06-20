import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src='cineclogo.svg' alt="CINEC Logo" className="flogo" />
        <nav className="footer-menu">
          <a href="/track-your-order" className="footer-item">Track your Order</a>
          <a href="/faq" className="footer-item">FAQ</a>
          <a href="/privacy-policy" className="footer-item">Privacy Policy</a>
        </nav>
        <a className="copyright">Designed & Developed by: </a>
        <a className="onwername"> Pratheeshan Vijayan</a>
        
      </div>
    </footer>
  );
};

export default Footer;
