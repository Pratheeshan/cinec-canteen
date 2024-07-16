import React, { useState } from 'react';
import './Home.css';
import FoodCard from '../../components/foodcard/FoodCard';
import FoodCardPopup from '../../components/Popup model/FoodCardPopup';

const allFoodItems = [
    { id: 1, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 2, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 3, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 4, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 5, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 6, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 7, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 8, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' }
];

const FourFoodItems = [
    { id: 1, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' },
    { id: 2, category: 'Rice', label: 'Rice', price: 'Rs. 250.00', image: 'meal.jpg' },
    { id: 3, category: 'Cool Drinks', label: 'Cool Drink', price: 'Rs. 150.00', image: 'meal.jpg' },
    { id: 4, category: 'All Menu', label: 'Meals', price: 'Rs. 200.00', image: 'meal.jpg' }
];

const Home = () => {
    const [showFoodCardPopup, setShowFoodCardPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleFoodCardOnClick = (item) => {
        setSelectedItem(item);
        setShowFoodCardPopup(true);
    };

    const handleFoodCardPopupOnClick = () => {
        setShowFoodCardPopup(false);
        setSelectedItem(null);
    };

    return (
        <div className='home-page'>
            <section className="canteen-section">
                <div className="canteen-text">
                    <div className='home-title'>Welcome to <br />the online</div>
                    <div className='home-subtitle'>CINEC Campus Canteen</div>
                    <div className="canteen-images">
                        <img src="image7.png" alt="Food Item 1" />
                        <img src="image 6.png" alt="Food Item 2" />
                        <img src="image 5.png" alt="Food Item 3" />
                    </div>
                </div>
                <div className="canteen-image-main">
                    <img src="homeslide.png" alt="Main Dish" />
                </div>
            </section>
            {/* features */}
            <section className="features-stack">
                <div className="feature-cards">
                    <div className="feature-card">
                        <div className='divservice-img1'>
                            <img
                                className="icon11png"
                                alt=""
                                src="shopping.svg"
                            />
                        </div>
                        <h3>Efficient Ordering Process</h3>
                        <p>
                            Online ordering system allows you to place your meal orders quickly and conveniently.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className='divservice-img2'>
                            <img
                                className="icon11png"
                                alt=""
                                src="qr-code-scan-icon.svg"
                            />
                        </div>
                        <h3>QR Oder Invoice</h3>
                        <p>
                            Scan the QR Code to complete the order and receive the foods.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className='divservice-img3'>
                            <img
                                className="icon11png"
                                alt=""
                                src="service.svg"
                            />
                        </div>
                        <h3>Customizable Options</h3>
                        <p>
                            Based on your food preference automatic menu suggestions
                        </p>
                    </div>
                </div>
            </section>
            {/* Create account */}
            <section className="account-section">
                <div className='accountroot'>
                    <img src="homeFrame.png" alt="Dish" className="project-image" />
                    <div className="account-info">
                        <h2>Create Your <br />Canteen <span>Account  </span></h2>
                        <p>
                            Creating an account allows you to enjoy a seamless ordering experience, track your order history, and receive exclusive meal suggestions. Sign up now to unlock these benefits and start ordering your favorite meals with ease!
                        </p>
                        <a href="/Register" class="home-button">Create Account</a>
                    </div>
                </div>
            </section>

            {/* Menu Categories */}
            <section className="menu-categories">
                <div className="account-info">
                    <h2>Menu <span>Categories</span></h2>
                    <p>
                        Explore our delicious offerings for today! From hearty breakfast options to satisfying lunches and snacks, our menu is curated to delight your taste buds and keep you energized throughout the day.
                    </p>
                    <a href="/Menu" class="home-button">View Menu</a>
                </div>
                <div className='food-cards'>
                    {FourFoodItems.map((item, idx) => (
                        <FoodCard key={idx} item={item} onClick={() => handleFoodCardOnClick(item)} />
                    ))}
                </div>
            </section>
          
            {/* Trending item menu */}
            <section className='fooditems-row1'>
                <div className="trendig-title">
                    <h3>Canteen Favorites</h3>
                    <h2>Explore Our <span>Trending Dish</span></h2>
                </div>
            </section>
            <section className='food-items'>
                <div className='food-cards'>
                    {allFoodItems.map((item, idx) => (
                        <FoodCard key={idx} item={item} onClick={() => handleFoodCardOnClick(item)} />
                    ))}
                </div>
            </section>

            {/* Map to canteen */}
            <section className="account-section">
                <div className='maproot'>
                    <div className="account-info">
                        <h2>Locate the <br /><span>Canteen </span></h2>
                        <p>
                            Find your way to the CINEC Campus Canteen with ease using our interactive map. Located at the heart of the campus. Use the map below to navigate to our location and enjoy a convenient dining experience.
                        </p>
                        <a href='https://maps.app.goo.gl/VNczpVw59CKWpG919' target='_blank' rel="noreferrer" class="home-button">Navigate to Canteen</a>
                    </div>
                    <img src="map.png" alt="map" className="project-image" />
                </div>
            </section>

            <FoodCardPopup show={showFoodCardPopup} handleCancelOnClick={handleFoodCardPopupOnClick} item={selectedItem} />
        </div>
    );
};

export default Home;
