import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { auth, db } from '../../config/Config'; // Adjust the import path if needed
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedbacks.css';

const Feedback = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const fetchUserDetails = async (user) => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserDetails(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentDate = new Date();
      await addDoc(collection(db, 'feedbacks'), {
        userId: userDetails.userId, // Include the student ID (userId)
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        subject,
        feedback,
        date: currentDate,
      });

      alert('Feedback submitted successfully!');
      setFeedback('');
      setSubject('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-section">
      <div className="dash-title">Submit Feedback</div>
      {userDetails ? (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={`${userDetails.firstName} ${userDetails.lastName}`}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formUserId">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  value={userDetails.userId} // Display the student ID
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="formFeedback">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="button-group">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      ) : (
        <div>Loading user details...</div>
      )}
    </div>
  );
};

export default Feedback;
