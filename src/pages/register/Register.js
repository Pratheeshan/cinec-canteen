import React from "react";
import "./Register.css";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="title-section">
        <div className="register-title">Account Login/Register</div>
        <div className="canteen-name">CINEC Campus Canteen</div>
      </div>
      <div className="form-section">
        <form className="register-form-signup">
          <div className="form-title-root">
            <div className="form-title-signup">Sign Up</div>
          </div>
          <div className="form-group half-width">
            <div>
              <label>First Name</label>
              <input type="text" name="first-name" required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="last-name" required />
            </div>
          </div>
          <div className="form-group">
            <label>User ID <span>(Enter your Campus ID)</span></label>
            <input type="text" name="user-id" required />
          </div>
          <div className="form-group half-width">
            <div>
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" name="confirm-password" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Phone Number <span>(WhatsApp Number)</span></label>
            <input type="tel" name="contact-number" required />
          </div>
          <button type="submit" className="register-button">Register</button>
          <div className="form-footer">
            <p>I have an account</p>
            <a href="/Login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;