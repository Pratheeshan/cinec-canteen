import React, { useState } from 'react';

import "./Login.css";
import Form from 'react-bootstrap/Form';

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../config/Config';

import { enqueueSnackbar } from 'notistack';
import Loading from '../../components/loading/Loading'


const Login = () => {
  const [validated, setValidated] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const data = {
      email: userId,
      password: password
    }

    handleLoginApi(data)
  };

  const handleLoginApi = async(data) => {
    try {
      console.log(data)
      setLoading(true)
      const response = await signInWithEmailAndPassword(auth, data.email, data.password)
      console.log(response)
      if (response) {
        window.location.href = "/Dashboard"
        
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      // enqueueSnackbar("Wrong Email Address or Password")
      enqueueSnackbar(`Login failed: Invalid Email or Password`, { variant: 'error' });
      setLoading(false)
    }
  }

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
          <div className='form-title-root'>
            <div className="form-title">Login</div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
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
          
            <p>----------- Don't have an account -----------</p>
            <a href="/Register">Sign up</a>
          </div>
        </div>
        </Form>
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default Login;