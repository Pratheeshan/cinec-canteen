import React, { useState } from 'react';
import { Table, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Timetable.css';

const sampleTimetable = [
  { day: 'Monday', breakTimes: ['10:30', '12:30', '3:30'] },
  { day: 'Tuesday', breakTimes: ['10:30', '12:30', '3:30'] },
  { day: 'Wednesday', breakTimes: ['10:30', '12:30', '3:30'] },
  { day: 'Thursday', breakTimes: ['10:30', '12:30', '3:30'] },
  { day: 'Friday', breakTimes: ['10:30', '12:30', '3:30'] },
  { day: 'Saturday', breakTimes: ['10:30', '12:30', '3:30'] },
  { day: 'Sunday', breakTimes: ['10:30', '12:30', '3:30'] }
];

const Timetable = () => {
    const [timetable, setTimetable] = useState(sampleTimetable);
    const [editing, setEditing] = useState(null);
  
    const handleEditClick = (index) => {
      setEditing(index);
    };
  
    const handleSaveClick = (index) => {
      setEditing(null);
    };
  
    const handleInputChange = (index, breakIndex, value) => {
      const newTimetable = [...timetable];
      newTimetable[index].breakTimes[breakIndex] = value;
      setTimetable(newTimetable);
    };
  
    const TimeInput = ({ value, onChange }) => (
      <Form.Control
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  
    return (
      <div className="timetable-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="dash-title">Lecture breaks</div>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Day of the Week</th>
              <th>1st Break Time</th>
              <th>2nd Break Time</th>
              <th>3rd Break Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {timetable.map((item, index) => (
              <tr key={index}>
                <td>{item.day}</td>
                {item.breakTimes.map((time, breakIndex) => (
                  <td key={breakIndex}>
                    {editing === index ? (
                      <TimeInput
                        value={time}
                        onChange={(value) =>
                          handleInputChange(index, breakIndex, value)
                        }
                      />
                    ) : (
                      `${time} ${breakIndex === 0 ? 'AM' : 'PM'}`
                    )}
                  </td>
                ))}
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
          </tbody>
        </Table>
      </div>
    );
  };
  
  export default Timetable;
