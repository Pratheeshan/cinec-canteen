import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { auth, db } from '../../config/Config'; // Adjust the import path if needed
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AccountDetails.css';
import Loading from '../../components/loading/Loading';

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchUserDetails = async (user) => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserDetails(user);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    setEditing(false);
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), userDetails);
        if (newPassword && newPassword === confirmNewPassword) {
          await updatePassword(user, newPassword);
        }
        setLoading(false);
        window.location.reload(); // Reload the page after saving
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="account-details-section">
      <div className="dash-title">Account Details</div>
      {userDetails ? (
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
          {editing && (
            <>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formConfirmNewPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {newPassword && newPassword !== confirmNewPassword && (
                <div className="error-message">Passwords do not match</div>
              )}
            </>
          )}
          <div className="button-group">
            {editing ? (
              <Button
                variant="success"
                onClick={handleSaveClick}
                disabled={newPassword && newPassword !== confirmNewPassword}
              >
                Save
              </Button>
            ) : (
              <Button variant="primary" onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </div>
        </Form>
      ) : (
        <div>No user details found.</div>
      )}
    </div>
  );
};

export default AccountDetails;
