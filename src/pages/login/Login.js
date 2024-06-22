import React from 'react';
import "./Login.css";
const Login = () => {
    return (
        <div className="login">
          <div className="title-section">
            <div className="register-title">Account Login/Register</div>
            <div className="canteen-name">CINEC Campus Canteen</div>
          </div>
          <div className="form-section">
          <form className="register-form">
            <div>
            <div className="form-title">Login</div>
            </div>
            <div className="form-group">
              <label>User ID <span>(Enter your Campus ID)</span></label>
              <input type="text" name="user-id" required />
            </div>
            <div className="form-group half-width">
                <label>Password</label>
                <input type="password" name="password" required />
            </div>
            <button type="submit" className="login-button">login</button>
            <div className="form-footer">
              <p>Don't have an account</p>
              <a href="/Register">Sign up</a>
            </div>
          </form>
          </div>
          </div>
      );
};

export default Login;