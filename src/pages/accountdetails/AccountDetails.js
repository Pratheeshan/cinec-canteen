import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AccountDetails.css';

const AccountDetails = () => {
  // Initial user details
  const initialUserDetails = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    userId: 'johndoe123',
    password: 'password123',
    phoneNumber: '123-456-7890'
  };

  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Save the details to the server or localStorage here
  };

  return (
    <div className="account-details-section">
      <div className="dash-title">Account Details</div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="userId"
                value={userDetails.userId}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={userDetails.phoneNumber}
                onChange={handleInputChange}
                disabled={!editing}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="button-group">
          {editing ? (
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AccountDetails;
