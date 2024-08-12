import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Timetable.css';
import { db } from '../../config/Config';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [hasLecture, setHasLecture] = useState(false);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
        const user = JSON.parse(userAuthData).authResponse.user;
        const userEmail = user.email;

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        let userDocId = null;

        querySnapshot.forEach((doc) => {
          userDocId = doc.id;
        });

        if (!userDocId) {
          throw new Error('User not found');
        }

        const timetableRef = collection(db, 'users', userDocId, 'timetable');
        const timetableSnapshot = await getDocs(timetableRef);
        const data = timetableSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTimetable(data);

      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
  }, []);

  const handleAddDay = async () => {
    try {
      if (!selectedDay) {
        console.warn('Day of the week cannot be empty');
        return;
      }

      const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
      const user = JSON.parse(userAuthData).authResponse.user;
      const userEmail = user.email;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      let userDocId = null;

      querySnapshot.forEach((doc) => {
        userDocId = doc.id;
      });

      if (!userDocId) {
        throw new Error('User not found');
      }

      const timetableRef = collection(db, 'users', userDocId, 'timetable');
      await addDoc(timetableRef, { day: selectedDay, hasLecture });
      setSelectedDay('');
      setHasLecture(false);

      const timetableSnapshot = await getDocs(timetableRef);
      const data = timetableSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTimetable(data);

    } catch (error) {
      console.error('Error adding new timetable entry:', error);
    }
  };

  const handleEditClick = (index) => {
    setEditing(index);
  };

  const handleSaveClick = async (index) => {
    if (index === null || index >= timetable.length) {
      console.warn('Invalid index for saving');
      return;
    }

    const updatedTimetable = timetable[index];
    try {
      const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
      const user = JSON.parse(userAuthData).authResponse.user;
      const userEmail = user.email;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      let userDocId = null;

      querySnapshot.forEach((doc) => {
        userDocId = doc.id;
      });

      if (!userDocId) {
        throw new Error('User not found');
      }

      const timetableRef = doc(db, 'users', userDocId, 'timetable', updatedTimetable.id);
      await updateDoc(timetableRef, { hasLecture: updatedTimetable.hasLecture });
      setEditing(null);

    } catch (error) {
      console.error('Error updating timetable:', error);
    }
  };

  const handleLectureToggle = async (index) => {
    if (index < 0 || index >= timetable.length) {
      console.warn('Invalid index for toggling lecture');
      return;
    }
    const newTimetable = [...timetable];
    const isChecked = !newTimetable[index].hasLecture;
    newTimetable[index].hasLecture = isChecked;
    setTimetable(newTimetable);

    // If unchecked, delete the timetable entry
    if (!isChecked) {
      const entryToDelete = timetable[index];
      try {
        const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
        const user = JSON.parse(userAuthData).authResponse.user;
        const userEmail = user.email;

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        let userDocId = null;

        querySnapshot.forEach((doc) => {
          userDocId = doc.id;
        });

        if (!userDocId) {
          throw new Error('User not found');
        }

        const timetableRef = doc(db, 'users', userDocId, 'timetable', entryToDelete.id);
        await deleteDoc(timetableRef);

        // Remove from local state
        setTimetable(newTimetable.filter((_, i) => i !== index));

      } catch (error) {
        console.error('Error deleting timetable entry:', error);
      }
    }
  };

  return (
    <div className="timetable-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="dash-title">Lecture Schedule</div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Day of the Week</th>
            <th>Has Lecture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {timetable.map((item, index) => (
            <tr key={item.id}>
              <td>{item.day}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={item.hasLecture || false} // Ensure it's always a boolean
                  onChange={() => handleLectureToggle(index)}
                  disabled={editing !== index} // Disable checkbox while editing
                />
              </td>
              <td>
                {editing === index ? (
                  <Button variant="success" onClick={() => handleSaveClick(index)}>
                    Save
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => handleEditClick(index)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Form.Select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="">Select a day</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Form.Check
                type="checkbox"
                checked={hasLecture}
                onChange={(e) => setHasLecture(e.target.checked)}
              />
            </td>
            <td>
              <Button variant="success" onClick={handleAddDay}>
                Add
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Timetable;
