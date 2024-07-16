import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './OffcanvasCart.css'

import OffcanvasCartItem from './OffcanvasCartItem'

import {connect} from 'react-redux'

const OffCanvasCart = ({ show, handleClose, cartArray }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className="offcanvas-header" >
        <Offcanvas.Title className="offcanvas-title">
          Shopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          cartArray && cartArray.map((i, idx, array) => {
            return (
              <>
                {console.log(i)}
                <OffcanvasCartItem key={idx} item = {i.item} selectedInitialQuantity = {i.quantity}/>
                {idx < array.length - 1 && <div className='cart-item-divider' />}
              </>
            );
          })
        }
      </Offcanvas.Body>
      <div className="offcanvas-footer">
        <Button className='home-button'>Checkout</Button>
        <Button onClick={handleClose} className='home-button'>Close</Button>
      </div>
    </Offcanvas>
  );
};

const mapStateToProps = state => ({
  cartArray: state.cart.cart
})

export default connect(mapStateToProps)(OffCanvasCart);
