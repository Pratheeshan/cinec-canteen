import React, { useState } from 'react';
import './FoodCardPopup.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FoodCardPopup = ({ show, handleCancelOnClick }) => {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div>
                        Item name
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className='popup-item'>
                    <div className='item-img'>
                        <img src="food.jpg" alt="Food Item" className='img' />
                    </div>
                    <div className='item-description'>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <div className="quantity-input">
                        <div> Set the quantity: </div>
                        <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>&mdash;</button>
                        <input className="quantity-input__screen" type="text" value={quantity} readOnly />
                        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}> &#xff0b; </button>
                    </div>
                    <div className='button-section' >

                        <Button className='home-button'> Break 1</Button>
                        <Button className='home-button'> Break 2</Button>
                        <Button className='home-button'> Break 3</Button>
                        <Button className='home-button'> Add to Cart</Button>
                        <Button className='home-button'> Buy now</Button>
                    </div>
                    
                        
                    </div>
                </section>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCancelOnClick}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FoodCardPopup;
