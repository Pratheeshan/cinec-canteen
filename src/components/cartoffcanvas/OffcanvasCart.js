import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './OffcanvasCart.css';
import { doc, collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/Config'; // Import your Firebase configuration


import OffcanvasCartItem from './OffcanvasCartItem';
import { connect } from 'react-redux';
import QRCode from 'qrcode';
import emailjs from 'emailjs-com';


const OffCanvasCart = ({ show, handleClose, cartArray }) => {
  const handleCheckout = async () => {
    if (!cartArray || cartArray.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Get user email from local storage
    const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
    const user = JSON.parse(userAuthData).authResponse.user;
    const userEmail = user.email;

    try {
      // Query to find the user document by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      let userDocId = null;

      // Assuming there is only one document per user
      querySnapshot.forEach((doc) => {
        userDocId = doc.id;
      });

      if (!userDocId) {
        throw new Error('User not found');
      }

      // Reference to the user's document in the users collection
      const userDocRef = doc(db, 'users', userDocId);

      // Reference to the orders subcollection within the user's document
      const ordersRef = collection(userDocRef, 'orders');

      // Prepare order data
      const orderData = {
        date: serverTimestamp(), // Use server timestamp for the order date
        status: 'Pending',
        items: cartArray.map(cartItem => ({
          itemId: cartItem.item.id,
          name: cartItem.item.name,
          price: cartItem.item.price,
          quantity: cartItem.quantity,
          breakTimes: cartItem.breakTimes || [] // Include selected break times
        })),
      };
      console.log(cartArray)
      // Add the order data to the orders subcollection
      await addDoc(ordersRef, orderData);

      // Update local storage
      const persistedData = JSON.parse(localStorage.getItem('persist:root'));
      delete persistedData.cart; // Remove the cart data
      localStorage.setItem('persist:root', JSON.stringify(persistedData)); // Update local storage

      // Reload the page
      // window.location.reload();

      // Generate QR code as a Data URL
      const qrCodeDataURL = await generateQRCode(JSON.stringify(orderData.items));
      console.log(qrCodeDataURL)

      const email = 'pratheeshanv@gmail.com'
      const user_name = 'Pratheeshan'
      // Send the email with QR code
      sendEmailWithQRCode(user_name, email, qrCodeDataURL);

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  const generateQRCode = (text) => {
    return QRCode.toDataURL(text, { width: 256 });
  };

  const sendEmailWithQRCode = (user_name, userEmail, qrCodeURL) => {
    const templateParams = {
      user_name: user_name,
      to_email: userEmail,
      qr_code: `<img src="${qrCodeURL}" alt="QR Code" />`
    };

    emailjs.send('service_j010obn', 'template_ae7u6en', templateParams, '8JEsvxeUkQApbKYML')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send email. Error: ', err);
      });
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className="offcanvas-header">
        <Offcanvas.Title className="offcanvas-title">
          Shopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          cartArray && cartArray.map((item, idx) => (
            <React.Fragment key={item.item.id || idx}> {/* Use a unique identifier or fallback to index */}
              <OffcanvasCartItem item={item.item} selectedInitialQuantity={item.quantity} selectedBreakTimes={item.breakTimes} />
              {idx < cartArray.length - 1 && <div className='cart-item-divider' />}
            </React.Fragment>
          ))
        }
      </Offcanvas.Body>
      <div className="offcanvas-footer">
        <Button className='home-button' onClick={handleCheckout}>Checkout</Button>
        <Button onClick={handleClose} className='home-button'>Close</Button>
      </div>
    </Offcanvas>
  );
};

const mapStateToProps = state => ({
  cartArray: state.cart.cart
});

export default connect(mapStateToProps)(OffCanvasCart);
