import React from 'react';
import "./FoodCard.css"

const FoodCard = () => {
    return (
        <div className="food-card">
            <div class="image-container">
                <span className="price">Rs. 200.00</span>
                <img src="meal.jpg" alt="Food" />
                <div className="info">
                    <span className="category">Meals</span>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;