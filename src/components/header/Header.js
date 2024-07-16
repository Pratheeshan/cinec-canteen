import React, { useState } from "react";
import "./Header.css";

import OffcanvasCart from '../cartoffcanvas/OffcanvasCart'

import {connect} from 'react-redux'

const Header = ({cartArray}) => {
  // const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartCanvas, setShowCartCanvas] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const loginOnClick = () => {
    window.location.href = "/Login";
  };

  const aboutOnClick = () => {
    window.location.href = "/About";
  };
  

  const handleShowCartCanvas = () => {
    setShowCartCanvas(true)
  }

  const handleCloseCartCanvas = () => {
    setShowCartCanvas(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <a href="/"><img src="cineclogo.svg" alt="CINEC Logo" className="logo"  /></a>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <a href="/" className="nav-item">Home</a>
          <a href="/menu" className="nav-item">Menu</a>
          <a href="/About" className="nav-item" onClick={aboutOnClick}>About Us</a>
        </nav>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-icon"></span>
        </button>
        <div className="header-buttons">
          <button className="nav-item nav-button" onClick={loginOnClick}>
            <img src="User.svg" alt="User" className="icon" />
          </button>
          <button className="nav-item nav-button cart-button" onClick={handleShowCartCanvas}>
            <img src="cart.svg" alt="Cart" className="icon" />
            {cartArray && cartArray.length > 0 && <span className="cart-count">{cartArray.length}</span>}
          </button>
        </div>
      </div>
      <OffcanvasCart show={showCartCanvas} handleClose = {handleCloseCartCanvas}/>
    </header>
  );
};

const mapStateToProps = state => ({
  cartArray: state.cart.cart
})

export default connect(mapStateToProps)(Header);
