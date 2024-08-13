import React from 'react';
import "./FoodCard.css"

const FoodCard = ({item, onClick}) => {
    return (
        <div className="food-card" onClick={onClick}>
            <div className="image-container">
                <span className="price">Rs. {item.price}.00</span>
                <img src={item.imageUrl} alt="Food" />
                <div className="info">
                    <span className="category">{item.name}</span>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;