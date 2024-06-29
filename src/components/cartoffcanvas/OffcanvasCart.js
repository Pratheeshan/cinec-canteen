import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './OffcanvasCart.css'

import OffcanvasCartItem from './OffcanvasCartItem'

const OffCanvasCart = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className="offcanvas-header" >
        <Offcanvas.Title className="offcanvas-title">
          Shopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Your cart is currently empty.
        <OffcanvasCartItem />
      </Offcanvas.Body>
      <div className="offcanvas-footer">
        <Button className='home-button'>Checkout</Button>
        <Button  onClick={handleClose} className='home-button'>Close</Button>
      </div>
    </Offcanvas>
  );
};

export default OffCanvasCart;
