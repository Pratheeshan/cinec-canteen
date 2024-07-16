import React, { useState, useEffect } from 'react';
import './OffcanvasCart.css'



const OffcanvasCartItem = ({ item, selectedInitialQuantity }) => {
    const [quantity, setQuantity] = useState(selectedInitialQuantity);

    const increment = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    useEffect(()=> {

    }, [])

    // if (!item) // If no item is passed, return null


        return (
            <section className='popup-item'>

                <div className='item-img'>
                    <a href="food.jpg">
                        <img width="100" height="100" src={item.imageUrl} alt="" />
                    </a>
                </div>
                <div>
                    <div className='item-description'>
                        <div>
                            <div className='test'>
                                <b>Food Name - </b>
                                {item.name}
                            </div>
                            <div>
                                <b>Price - </b>
                                Rs. {parseFloat(item.price) * quantity}
                            </div>
                        </div>
                        <div >
                            <div className="offquantity-input">
                                <div > QTY: </div>
                                <button className="offquantity-input__modifier offquantity-input__modifier--left"   onClick={decrement}>&mdash;</button>
                                <input className="offquantity-input__screen" type="text" value={quantity} readOnly />
                                <button className="offquantity-input__modifier offquantity-input__modifier--right" onClick={increment}> &#xff0b; </button>
                            </div>
                               
                                    <div className='trash-img'>
                                        <img width="15" height="15" src="trash.svg" alt="" />
                                    </div>
                            
                        </div>
                    </div>

                </div>


            </section>
        );
};

export default OffcanvasCartItem;