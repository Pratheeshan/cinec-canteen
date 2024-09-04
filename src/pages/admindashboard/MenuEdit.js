import React, { useState, useEffect } from 'react';
import { db, storage } from '../../config/Config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './MenuEdit.css';
import AddMeal from './Addmeal'; // Import the AddMeal component

const MenuEdit = () => {
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedMeal, setEditedMeal] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    breakTime: [],
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State for image file

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsCollection = collection(db, 'meals');
        const mealsSnapshot = await getDocs(mealsCollection);
        const mealsList = mealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllFoodItems(mealsList);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleEditClick = (meal) => {
    setEditingId(meal.id);
    setEditedMeal({
      name: meal.name,
      description: meal.description,
      price: meal.price,
      category: meal.category,
      imageUrl: meal.imageUrl,
      breakTime: meal.breakTime || [],
    });
    setImageFile(null); // Reset the image file state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMeal(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEditedMeal(prev => ({
      ...prev,
      breakTime: checked
        ? [...prev.breakTime, value]
        : prev.breakTime.filter(time => time !== value),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Set the selected image file
    }
  };

  const handleSaveClick = async (id) => {
    try {
      if (imageFile) {
        // Upload the new image to Firebase Storage
        const storageRef = ref(storage, `meals/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(storageRef);
        editedMeal.imageUrl = downloadURL; // Update the imageUrl with the new URL
      }

      const mealRef = doc(db, 'meals', id);
      await updateDoc(mealRef, editedMeal);
      setAllFoodItems(prev => prev.map(meal => meal.id === id ? { id, ...editedMeal } : meal));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  return (
    <div className="status-section">
      <div className="dash-title">Manage Meals</div>
      {isAddingNew ? (
        <AddMeal setIsAddingNew={setIsAddingNew} />
      ) : (
        <>
          <table className="form-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Breaktime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allFoodItems.map((meal) => (
                <tr key={meal.id}>
                  {editingId === meal.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editedMeal.name}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <textarea
                          name="description"
                          value={editedMeal.description}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="price"
                          value={editedMeal.price}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td>
                        <select
                          name="category"
                          value={editedMeal.category}
                          onChange={handleInputChange}
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
                      <td>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          {editedMeal.imageUrl && !imageFile && (
                            <img src={editedMeal.imageUrl} alt="Meal" style={{ width: '100px', height: '100px' }} />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="break-time-group">
                          <label>
                            <input
                              type="checkbox"
                              value="1"
                              checked={editedMeal.breakTime.includes('1')}
                              onChange={handleCheckboxChange}
                            />
                            1
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              value="2"
                              checked={editedMeal.breakTime.includes('2')}
                              onChange={handleCheckboxChange}
                            />
                            2
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              value="3"
                              checked={editedMeal.breakTime.includes('3')}
                              onChange={handleCheckboxChange}
                            />
                            3
                          </label>
                        </div>
                      </td>
                      <td>
                        <button onClick={() => handleSaveClick(meal.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{meal.name}</td>
                      <td>{meal.description}</td>
                      <td>{meal.price}</td>
                      <td>{meal.category}</td>
                      <td>
                        {meal.imageUrl && (
                          <img src={meal.imageUrl} alt="Meal" style={{ width: '100px', height: '100px' }} />
                        )}
                      </td>
                      <td>{meal.breakTime.join(', ')}</td>
                      <td>
                        <button onClick={() => handleEditClick(meal)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-new" onClick={() => setIsAddingNew(true)}>Add New</button>
        </>
      )}
    </div>
  );
};

export default MenuEdit;
