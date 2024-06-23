import React, { useState } from 'react';

import "./Login.css";
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };

  const handleUserIdOnChange = (e) => {
    setUserId(e.target.value)
  }

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="login">
      <div className="title-section">
        <div className="register-title">Account Login/Register</div>
        <div className="canteen-name">CINEC Campus Canteen</div>
      </div>
      <div className="form-section">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="register-form">
          <div>
            <div className="form-title">Login</div>
          </div>
          <div className="form-group">
            <label>User ID <span>(Enter your Campus ID)</span></label>
            {/* <input type="text" name="user-id" required /> */}
            <Form.Control
            required
              type="text"
              placeholder=""
              value={userId}
              onChange={handleUserIdOnChange}
            />
            <Form.Control.Feedback type="invalid">
                  Please enter the userId.
                </Form.Control.Feedback>
          </div>
          <div className="form-group half-width">
            <label>Password</label>
            {/* <input type="password" name="password" required /> */}
            <Form.Control
            required
              type="password"
              placeholder=""
              value={password}
              onChange={handlePasswordOnChange}
            />
            <Form.Control.Feedback type="invalid">
                  Please enter the password.
                </Form.Control.Feedback>
          </div>
          <button className="login-button" type='submit'>login</button>
          <div className="form-footer">
            <p>Don't have an account</p>
            <a href="/Register">Sign up</a>
          </div>
        </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;