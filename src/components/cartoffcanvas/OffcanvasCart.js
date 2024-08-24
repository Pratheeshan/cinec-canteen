import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './OffcanvasCart.css';
import { doc, collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '../../config/Config'; // Import your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
  const user = JSON.parse(userAuthData).authResponse.user;
  const userEmail = user.email;

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);

    console.log("q", q)
    console.log("querySnapshot", querySnapshot)

    let userDocId = null;
    querySnapshot.forEach((doc) => {
      userDocId = doc.id;
    });

    if (!userDocId) {
      throw new Error('User not found');
    }

    const userDocRef = doc(db, 'users', userDocId);
    const ordersRef = collection(userDocRef, 'orders');

    // Assuming emails are unique, get the first matched document
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Extract user details from the document
    const userName = userData.firstName; // assuming the field is `firstName`
    const userId = userData.userId; // assuming the field is `userId`

    console.log("studentName:", userName);
    console.log("userId:", userId);

    const orderData = {
      date: serverTimestamp(),
      status: 'Pending',
      studentName: userName,
      userId: userId,
      items: cartArray.map(cartItem => ({
        itemId: cartItem.item.id,
        name: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity,
        breakTimes: cartItem.breakTimes || []
      })),
    };

    console.log(orderData);
    //await addDoc(ordersRef, orderData);
    const orderDocRef = await addDoc(ordersRef, orderData);
    const orderId = orderDocRef.id;

    const persistedData = JSON.parse(localStorage.getItem('persist:root'));
    delete persistedData.cart;
    localStorage.setItem('persist:root', JSON.stringify(persistedData));

    const qrCodeDataURL = await generateQRCode(JSON.stringify(orderData));
    console.log(qrCodeDataURL);

    // Reference for the image in Firebase Storage
    const qrCodeImageRef = ref(storage, `QR/${orderId}.png`);

    // Convert dataURL to Blob for uploading
    const response = await fetch(qrCodeDataURL);
    const blob = await response.blob();

    await uploadBytes(qrCodeImageRef, blob);
    let imageUrl = await getDownloadURL(qrCodeImageRef);
    console.log(imageUrl)

    // const email = 'pratheeshanv@gmail.com';
    sendEmailWithQRCode(userName, userEmail, imageUrl);

    alert("Order placed successfully!");
  } catch (error) {
    console.error("Error placing order: ", error.message || error);
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
      qr_code: qrCodeURL, // Pass the data URL here
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
