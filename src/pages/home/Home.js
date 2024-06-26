import React from 'react';
import './Home.css';

const categories = [
    { name: 'Meals', price: '200.00', image: 'food.jpg' },
    { name: 'Soft Drinks', price: '160.00', image: 'food.jpg' },
    { name: 'Short Eats', price: '100.00', image: 'food.jpg' },
    { name: 'Ice Cream', price: '80.00', image: 'food.jpg' }
  ];
const Home = () => {
    return (
        <div className='home-page'>
            <section className="canteen-section">
                <div className="canteen-text">
                    <div className='home-title'>Welcome to <br/>the online</div>
                    <div className='home-subtitle'>CINEC Campus Canteen</div>
                    <div className="canteen-images">
                        <img src="image7.png" alt="Food Item 1" />
                        <img src="image7.png" alt="Food Item 2" />
                        <img src="image7.png" alt="Food Item 3" />
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
                                src="icon11.svg"
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
                                src="icon13.svg"
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
                                src="icon12.svg"
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
                    <button className="home-button">Explore Menu</button>
                </div>
                <div className="menu-items">
                    {categories.map((category) => (
                        <div className="menu-item" key={category.name}>
                            <img src={category.image} alt={category.name} />
                            <div className="menu-item-info">
                                <span className="menu-item-price">Rs. {category.price}</span>
                                <span className="menu-item-name">{category.name}</span>
                            </div>
                        </div>
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
                    <a href='https://maps.app.goo.gl/VNczpVw59CKWpG919' target='_blank'  rel="noreferrer" class="home-button">Navigate to Canteen</a>
                                    </div>
                <img src="map.png" alt="map" className="project-image" />
                </div>
            </section>


        </div>
    );
};


export default Home;
