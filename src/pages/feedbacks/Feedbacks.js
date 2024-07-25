import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { auth, db } from '../../config/Config'; // Adjust the import path if needed
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feedbacks.css'

const Feedback = () => {
  const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const fetchUserDetails = async (user) => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserDetails(userDoc.data());
      }
    //   setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserDetails(user);
      } else {
        // setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const currentDate = new Date();
      await addDoc(collection(db, 'feedbacks'), {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        feedback,
        subject,
        date: currentDate,
      });
    //   setLoading(false);
      alert('Feedback submitted successfully!');
      setFeedback('');
      setSubject('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    //   setLoading(false);
      alert('Error submitting feedback. Please try again.');
    }
  };

//   if (loading) {
//     return <Loading />;
//   }

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
          </Row>
          <Row>
            <Col>
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
