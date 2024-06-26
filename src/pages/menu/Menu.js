import React, { useState } from 'react';
import './Menu.css';
import Pagination from 'react-bootstrap/Pagination';

// Sample Data
const allFoodItems = [
    { id: 1, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 2, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 3, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 4, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 5, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 3, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 6, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 7, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 8, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 9, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 10, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 11, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 12, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' }

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
const ITEMS_PER_PAGE = 7;

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Menu');
    const [currentPage, setCurrentPage] = useState(1);

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
                    {displayedItems.map(item => (
                        <div key={item.id} className="food-card">
                            <div className="image-container">
                                <span className="price">{item.price}</span>
                                <img src={item.image} alt={item.label} />
                                <div className="info">
                                    <span className="category">{item.label}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pagination */}
            <div className="pagination-container">
                <Pagination size="sm" className='pagination'>{paginationItems}</Pagination>
            </div>
        </div>
    );
};

export default Menu;