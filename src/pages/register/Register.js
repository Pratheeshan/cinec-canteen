import React, { useState } from "react";

import "./Register.css";
import Form from 'react-bootstrap/Form';

import {auth} from '../../config/Config'

import {  createUserWithEmailAndPassword  } from 'firebase/auth';

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    console.log(firstName, lastName, userId, password, confirmPassword, email, phoneNumber)

    if (password === confirmPassword) {
      console.log("password and confirm password are equal")
      // handle backend call here
      const data = {
        email: email,
        password: password
      }
      handleRegister(data)
    } else {
      console.log("password and confirm password not equal")
      // handle incorrect confirm password here
    }
  };

  const handleRegister = async(data) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  const handleInputOnChange = (event) => {
    switch (event.target.name) {
      case "firstName" : setFirstName(event.target.value)
                        break;
      case "lastName" : setLastName(event.target.value)
                        break;
      case "userId" : setUserId(event.target.value)
                        break;
      case "password" : setPassword(event.target.value)
                        break;
      case "confirmPassword" : setConfirmPassword(event.target.value)
                        break;
      case "email" : setEmail(event.target.value)
                        break;
      case "phoneNumber" : setPhoneNumber(event.target.value)
                        break;                 
      default: return;
    }
  }

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
                  name="firstName"
                  value={firstName}
                  onChange={handleInputOnChange}
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
                  name="lastName"
                  value={lastName}
                  onChange={handleInputOnChange}
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
                name="userId"
                value={userId}
                onChange={handleInputOnChange}
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
                  name="password"
                  value={password}
                  onChange={handleInputOnChange}
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
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputOnChange}
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
                name="email"
                value={email}
                onChange={handleInputOnChange}
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
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputOnChange}
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