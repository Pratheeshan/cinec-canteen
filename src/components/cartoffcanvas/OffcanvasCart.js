import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const OffCanvasCart = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Your cart is currently empty.
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasCart;
