import React, { useState } from 'react';
import './FoodCardPopup.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FoodCardPopup = ({ show, handleCancelOnClick, item }) => {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    if (!item) return null; // If no item is passed, return null

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div><strong>{item.label}</strong></div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className='popup-item'>
                    <div className='item-img'>
                        <img src={item.image} alt={item.label} className='img' />
                        <p className='pop-price'><strong>Price: </strong>Rs. {parseFloat(item.price.replace('Rs. ', '')) * quantity}</p>
                    </div>
                    <div className='item-description'>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        
                        <div className="quantity-input">
                        <div> Set the quantity: </div>
                            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>&mdash;</button>
                            <input className="quantity-input__screen" type="text" value={quantity} readOnly />
                            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}> &#xff0b; </button>
                        </div>
                        <div className='button-section'>
                        <div> Select break time: </div>
                            <Button className='home-button'>Break 1</Button>
                            <Button className='home-button'>Break 2</Button>
                            <Button className='home-button'>Break 3</Button>
                            <Button className='home-button'>Add to Cart</Button>
                            <Button className='home-button'>Buy now</Button>
                        </div>
                    </div>
                </section>
            </Modal.Body>
            <Modal.Footer>
                <Button className='home-button' onClick={handleCancelOnClick}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FoodCardPopup;
