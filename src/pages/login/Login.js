import React, { useState, useEffect } from 'react';
import "./Login.css";
import Form from 'react-bootstrap/Form';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/Config';
import { enqueueSnackbar } from 'notistack';
import Loading from '../../components/loading/Loading';
import { connect } from 'react-redux';
import { storeLoginResponse } from '../../redux/actions/authAction';

const Login = ({ storeLoginResponse }) => {
  const [validated, setValidated] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        window.location.href = "/Dashboard";
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (userId && password) {
      const data = {
        email: userId,
        password: password
      };
      handleLoginApi(data);
    }
  };

  const handleLoginApi = async (data) => {
    try {
      setLoading(true);

      // Check for special admin credentials
      if (data.email === 'admin@gmail.com' && data.password === 'zxcvbnm') {
        // Redirect to /admindashboard for admin credentials
        storeLoginResponse({ user: { email: data.email } }); // Mocking login response
        window.location.href = "/admindashboard";
        setLoading(false);
        return;
      }

      // Normal login process
      const response = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log(response)
      if (response) {
        //storeLoginResponse({ user: { email: data.email, firstName: "Pratheeshan", userId: "2436304" } });
        storeLoginResponse(response);
        window.location.href = "/Dashboard";
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      enqueueSnackbar(`Login failed: Invalid Email or Password`, { variant: 'error' });
      setLoading(false);
    }
  };

  const handleUserIdOnChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

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
              <Form.Control
                required
                type="email"
                placeholder=""
                value={userId}
                onChange={handleUserIdOnChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the email address.
              </Form.Control.Feedback>
            </div>
            <div className="form-group half-width">
              <label>Password</label>
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
            <button className="login-button" type='submit'>Login</button>
            <div className="form-footer">
              <p>----------- Don't have an account -----------</p>
              <a href="/Register">Sign up</a>
            </div>
          </div>
        </Form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    storeLoginResponse: data => { dispatch(storeLoginResponse(data)) }
  };
};

export default connect(null, mapDispatchToProps)(Login);
