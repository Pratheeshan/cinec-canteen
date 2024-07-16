import React, { useState } from 'react';
import './FoodCardPopup.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {connect} from 'react-redux'
import {addToCart} from '../../redux/actions/cartAction'

const FoodCardPopup = ({ show, handleCancelOnClick, item, addToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    if (!item) return null; // If no item is passed, return null

    const addToCartFunction = () => {
        const cartItem = {
            item,
            quantity
        }

        addToCart(cartItem)
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
                        <div> Select break time: </div>
                            {/* <Button className='home-button'>Break 1</Button>
                            <Button className='home-button'>Break 2</Button>
                            <Button className='home-button'>Break 3</Button> */}
                            <div>
                            {
                                item && item.breakTime && item.breakTime.map((i, idx) =>{
                                    return <Button className='home-button' key = {idx}>
                                        {`Break ${i}`}
                                    </Button>
                                })
                            }
                            </div>
                            <Button className='home-button' onClick = {addToCartFunction}>Add to Cart</Button>
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

const mapDispatchToProps = dispatch => {
    return {
        addToCart: data => { dispatch(addToCart(data)) }
    }
  }
  
  export default connect(null, mapDispatchToProps)(FoodCardPopup);
