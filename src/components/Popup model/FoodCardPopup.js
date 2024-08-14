import React, { useState } from 'react';
import './FoodCardPopup.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {connect} from 'react-redux'
import {addToCart} from '../../redux/actions/cartAction'

const FoodCardPopup = ({ show, handleCancelOnClick, item, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedBreakTimes, setSelectedBreakTimes] = useState([]);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const toggleBreakTime = (breakTime) => {
        setSelectedBreakTimes(prev => {
            if (prev.includes(breakTime)) {
                return prev.filter(time => time !== breakTime); // Deselect if already selected
            } else {
                return [...prev, breakTime]; // Select if not already selected
            }
        });
    };

    if (!item) return null; // If no item is passed, return null

    const addToCartFunction = () => {
        const cartItem = {
            item,
            quantity,
            breakTimes: selectedBreakTimes
        }

        addToCart(cartItem)
        handleCancelOnClick(); 
        
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div><strong>{item.name}</strong></div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className='popup-item'>
                    <div className='item-img'>
                        <img src={item.imageUrl} alt={item.name} className='img' />
                        <p className='pop-price'><strong>Price: </strong>Rs. {parseFloat(item.price) * quantity}</p>
                    </div>
                    <div className='item-description'>
                        <p> {item.description}</p>
                        
                        <div className="quantity-input">
                        <div> Set the quantity: </div>
                            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>&mdash;</button>
                            <input className="quantity-input__screen" type="text" value={quantity} readOnly />
                            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}> &#xff0b; </button>
                        </div>
                        <div className='button-section'>
                        <div>
                        {item.breakTime && item.breakTime.map((i, idx) => (
                            <Button
                                key={idx}
                                className={`home-button ${selectedBreakTimes.includes(i) ? 'selected' : ''}`}
                                onClick={() => toggleBreakTime(i)}
                            >
                                {`Break ${i}`}
                            </Button>
                        ))}
                    </div>
                        </div>
                    </div>
                </section>
            </Modal.Body>
            <Modal.Footer>
            <Button className='home-button' onClick = {addToCartFunction}>Add to Cart</Button>
                <Button className='home-button' onClick={handleCancelOnClick}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: data => { dispatch(addToCart(data)) }
    }
  }
  
  export default connect(null, mapDispatchToProps)(FoodCardPopup);
