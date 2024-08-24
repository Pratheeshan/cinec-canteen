import React, { useState } from 'react';
import { db, storage } from '../../config/Config'; // Import storage
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
  const [imageFile, setImageFile] = useState(null);

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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';

      if (imageFile) {
        // Upload the image to Firebase Storage
        const imageRef = ref(storage, `meals/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add the meal to Firestore with the image URL
      const mealsCollection = collection(db, 'meals');
      await addDoc(mealsCollection, {
        ...newMeal,
        imageUrl: imageFile ? imageUrl : newMeal.imageUrl,
      });

      setNewMeal({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        breakTime: [],
      });
      setImageFile(null);
      setIsAddingNew(false); // Close the form after adding
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  return (
    <div className="status-section">
      <div className='meal-edit-form'>
        <div className="dash-title">Add New Meal</div>
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
                <td><label>Image:</label></td>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
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
                      10.30 AM
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="2"
                        checked={newMeal.breakTime.includes('2')}
                        onChange={handleCheckboxChange}
                      />
                      12.30 PM
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="3"
                        checked={newMeal.breakTime.includes('3')}
                        onChange={handleCheckboxChange}
                      />
                      3.30 PM
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
    </div>
  );
};

export default AddMeal;
