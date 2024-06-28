import React, { useState } from 'react';
import './Menu.css';
import FoodCard from '../../components/foodcard/FoodCard';
import FoodCardPopup from '../../components/Popup model/FoodCardPopup';
import Pagination from 'react-bootstrap/Pagination';

// Sample Data
const allFoodItems = [
    { id: 1, category: 'All Menu', label: 'Meals', price: 'Rs. 500.00', image: 'food2.png' },
    { id: 2, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 3, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 4, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'image7.png' },
    { id: 5, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'food2.png' },
    { id: 6, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'food2.png' },
    { id: 7, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 8, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 9, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'food2.png' },
    { id: 10, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 11, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 12, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 13, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' }
];

// Sample Menu Categories
const menuItems = [
    { label: 'All Menu', iconSrc: '/icon11.png', className: 'm1' },
    { label: 'Rice', iconSrc: '/icon11.png', className: 'm2' },
    { label: 'Cool Drinks', iconSrc: '/icon11.png', className: 'm3' },
    { label: 'Short Eats', iconSrc: '/icon11.png', className: 'm4' },
    { label: 'Bun', iconSrc: '/icon11.png', className: 'm5' },
    { label: 'Hot Drink', iconSrc: '/icon11.png', className: 'm51' },
    { label: 'Ice Cream', iconSrc: '/icon11.png', className: 'm52' },
];

// Pagination Items
const ITEMS_PER_PAGE = 8;

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Menu');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFoodItem, setSelectedFoodItem] = useState(null);

    // Filtered Food Items based on the selected category
    const filteredFoodItems = selectedCategory === 'All Menu' ? allFoodItems : allFoodItems.filter(item => item.category === selectedCategory);
    const totalPages = Math.ceil(filteredFoodItems.length / ITEMS_PER_PAGE);

    // Paginate the filtered items
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedItems = filteredFoodItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handle Category Selection
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to the first page when category changes
    };

    // Handle Page Click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle Food Item Click
    const handleFoodItemClick = (item) => {
        setSelectedFoodItem(item);
    };

    // Create Pagination Items
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className='menu-page'>
            {/* Menu Highlight Category */}
            <section className="menu">
                <div className="menu-highlight">
                    {menuItems.map((item, index) => (
                        <button className={`menu-item ${item.className}`} key={index} onClick={() => handleCategoryClick(item.label)}>
                            <div className="icon-container">
                                <img className="icon1" alt={item.label} src={item.iconSrc} />
                            </div>
                            <div className="label">{item.label}</div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Food Items */}
            <section className='food-items'>
                <div className='food-cards'>
                    {displayedItems.map((item, idx) => (
                        <div key={idx} onClick={() => handleFoodItemClick(item)}>
                            <FoodCard item={item} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Pagination */}
            <div className="pagination-container">
                <Pagination size="sm" className='pagination'>{paginationItems}</Pagination>
            </div>

            {/* Food Card Popup */}
            {selectedFoodItem && (
                <FoodCardPopup
                    show={Boolean(selectedFoodItem)}
                    handleCancelOnClick={() => setSelectedFoodItem(null)}
                    item={selectedFoodItem}
                />
            )}
        </div>
    );
};

export default Menu;
