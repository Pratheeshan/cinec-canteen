import React, { useState } from 'react';
import { db } from '../../config/Config';
import { collection, addDoc } from 'firebase/firestore';
import './Addmeal.css';

const AddMeal = ({ setIsAddingNew }) => {
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    breakTime: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewMeal(prev => ({
      ...prev,
      breakTime: checked
        ? [...prev.breakTime, value]
        : prev.breakTime.filter(time => time !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mealsCollection = collection(db, 'meals');
      await addDoc(mealsCollection, newMeal);
      setNewMeal({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        breakTime: [],
      });
      setIsAddingNew(false); // Close the form after adding
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  return (
    <div className="meal-edit-form">
      <h3>Add New Meal</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>Name:</label></td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={newMeal.name}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td>
                <textarea
                  name="description"
                  value={newMeal.description}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Price:</label></td>
              <td>
                <input
                  type="number"
                  name="price"
                  value={newMeal.price}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Category:</label></td>
              <td>
                <select
                  name="category"
                  value={newMeal.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Rice">Rice</option>
                  <option value="Cool Drinks">Cool Drinks</option>
                  <option value="Short Eats">Short Eats</option>
                  <option value="Bun">Bun</option>
                  <option value="Hot Drink">Hot Drink</option>
                  <option value="Ice Cream">Ice Cream</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Image URL:</label></td>
              <td>
                <input
                  type="text"
                  name="imageUrl"
                  value={newMeal.imageUrl}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Break Time:</label></td>
              <td>
                <div className="break-time-group">
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      checked={newMeal.breakTime.includes('1')}
                      onChange={handleCheckboxChange}
                    />
                    1
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="2"
                      checked={newMeal.breakTime.includes('2')}
                      onChange={handleCheckboxChange}
                    />
                    2
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="3"
                      checked={newMeal.breakTime.includes('3')}
                      onChange={handleCheckboxChange}
                    />
                    3
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="form-buttons">
                <button type="submit">Add Meal</button>
                <button type="button" onClick={() => setIsAddingNew(false)}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddMeal;
