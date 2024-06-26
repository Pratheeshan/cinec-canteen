import React, { useState } from "react";
import "./Register.css";
import Form from 'react-bootstrap/Form';


const RegisterPage = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };
  return (
    <div className="register-page">
      <div className="title-section-register">
        <div className="register-title">Account Login/Register</div>
        <div className="reg-canteen-name">CINEC Campus Canteen</div>
      </div>
      <div className="rform-section">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="register-form-signup">
            <div className="form-title-root">
              <div className="form-title-signup">Sign Up</div>
            </div>
            <div className="form-group half-width">
              <div style={{ width: "48%" }}>
                <label>First Name</label>
                {/* <input type="text" name="first-name" required /> */}
                <Form.Control
                  required
                  type="text"
                  style={{ width: "100%" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a First Name.
                </Form.Control.Feedback>
              </div>
              <div style={{ width: "48%" }}>
                <label>Last Name</label>
                {/* <input type="text" name="last-name" required /> */}
                <Form.Control
                  required
                  type="text"
                  style={{ width: "100%" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a Last Name.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-group">
              <label>User ID <span>(Enter your Campus ID)</span></label>
              {/* <input type="text" name="user-id" required /> */}
              <Form.Control
                required
                type="text"
                style={{ width: "100%" }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Campus ID.
              </Form.Control.Feedback>
            </div>
            <div className="form-group half-width">
              <div style={{ width: "48%" }}>
                <label>Password</label>
                {/* <input type="password" name="password" required /> */}
                <Form.Control
                  required
                  type="password"
                  style={{ width: "100%" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
              </div>
              <div style={{ width: "48%" }}>
                <label>Confirm Password</label>
                {/* <input type="password" name="confirm-password" required /> */}
                <Form.Control
                  required
                  type="password"
                  style={{ width: "100%" }}
                />
                <Form.Control.Feedback type="invalid">
                  Please reenter the same password.
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-group">
              <label>Email address</label>
              {/* <input type="email" name="email" required /> */}
              <Form.Control
                required
                type="email"
                style={{ width: "100%" }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Email.
              </Form.Control.Feedback>
            </div>
            <div className="form-group">
              <label>Phone Number <span>(WhatsApp Number)</span></label>
              {/* <input type="tel" name="contact-number" required /> */}
              <Form.Control
                required
                type="text"
                style={{ width: "100%" }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the Phone number.
              </Form.Control.Feedback>
            </div>
            <button type="submit" className="register-button">Register</button>
            <div className="form-footer">
              <p>----------- I have an account -----------</p>
              <a href="/Login">Login</a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;