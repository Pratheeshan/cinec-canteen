import React, { useState, useEffect } from 'react';
import './Menu.css';
import FoodCard from '../../components/foodcard/FoodCard';
import FoodCardPopup from '../../components/Popup model/FoodCardPopup';
import Pagination from 'react-bootstrap/Pagination';
import { db } from '../../config/Config';
import { collection, getDocs } from 'firebase/firestore';
import Loading from '../../components/loading/Loading';

const menuItems = [
  { label: 'All Menu', iconSrc: '/allmeal.svg', className: 'm1' },
  { label: 'Rice', iconSrc: '/rice.svg', className: 'm2' },
  { label: 'Cool Drinks', iconSrc: '/cooldrink.svg', className: 'm3' },
  { label: 'Short Eats', iconSrc: '/shorteats.svg', className: 'm4' },
  { label: 'Bun', iconSrc: '/bread.svg', className: 'm5' },
  { label: 'Hot Drink', iconSrc: '/coffee.svg', className: 'm51' },
  { label: 'Ice Cream', iconSrc: '/ice-cream-icon.svg', className: 'm52' },
];

const ITEMS_PER_PAGE = 8;

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Menu');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [allFoodItems, setAllFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const mealsCollection = collection(db, 'meals');
        const mealsSnapshot = await getDocs(mealsCollection);
        const mealsList = mealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllFoodItems(mealsList);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
      setLoading(false);
    };

    fetchMeals();
  }, []);

  const filteredFoodItems = selectedCategory === 'All Menu' 
    ? allFoodItems 
    : allFoodItems.filter(item => item.category === selectedCategory);
  const totalPages = Math.ceil(filteredFoodItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = filteredFoodItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFoodItemClick = (item) => {
    setSelectedFoodItem(item);
  };

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
      {loading ? (
        <Loading />
      ) : (
        <>
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

          <section className='food-items'>
            <div className='food-cards'>
              {displayedItems.map((item, idx) => (
                <div key={idx} onClick={() => handleFoodItemClick(item)}>
                  <FoodCard item={item} />
                </div>
              ))}
            </div>
          </section>

          <div className="pagination-container">
            <Pagination size="sm" className='pagination'>{paginationItems}</Pagination>
          </div>

          {selectedFoodItem && (
            <FoodCardPopup
              show={Boolean(selectedFoodItem)}
              handleCancelOnClick={() => setSelectedFoodItem(null)}
              item={selectedFoodItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
