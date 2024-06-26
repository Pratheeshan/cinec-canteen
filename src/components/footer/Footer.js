import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <a href="/"><img src='cineclogo.svg' alt="CINEC Logo" className="flogo" /></a>
        <nav className="footer-menu">
          <a href="/track-your-order" className="footer-item">Track your Order</a>
          <a href="/faq" className="footer-item">FAQ</a>
          <a href="/privacy-policy" className="footer-item">Privacy Policy</a>
        </nav>
        <p className="copyright">Designed & Developed by: <br /> <b>Pratheeshan Vijayan</b>  </p>
        
      </div>
    </footer>
  );
};

export default Footer;
