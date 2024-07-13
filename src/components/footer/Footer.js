import React from 'react';
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="/"><img src='cineclogo.svg' alt="CINEC Logo" className="flogo" /></a>
        <nav className="footer-menu">
          <a href="/Track" className="footer-item">Track your Order</a>
          <a href="/FAQ" className="footer-item">FAQ</a>
          <a href="/Privacy" className="footer-item">Privacy Policy</a>
        </nav>
        
        <p className="copyright">Designed & Developed by: <br /> <b>Pratheeshan Vijayan</b></p>
        <img src='scrolltop.svg' className="scroll" alt='scrollup' onClick={scrollToTop}/>
      </div>
    </footer>
  );
};

export default Footer;
