import React from 'react';
import "./FoodCard.css"

const FoodCard = ({item, onClick}) => {
    return (
        <div className="food-card" onClick={onClick}>
            <div class="image-container">
                <span className="price">{item.price}</span>
                <img src="meal.jpg" alt="Food" />
                <div className="info">
                    <span className="category">{item.label}</span>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;