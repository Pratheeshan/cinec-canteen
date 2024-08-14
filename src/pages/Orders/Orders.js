import React, { useState, useEffect } from 'react';
import { Table, Dropdown, DropdownButton, Badge, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Orders.css'; // Ensure you have this file for additional styling
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/Config'; // Adjust the import path as needed

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get user email from local storage
        const userAuthData = JSON.parse(localStorage.getItem('persist:root')).auth;
        const user = JSON.parse(userAuthData).authResponse.user;
        const userEmail = user.email;

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
        const userDocRef = collection(db, 'users', userDocId, 'orders');

        // Fetch orders
        const ordersSnapshot = await getDocs(userDocRef);
        let fetchedOrders = ordersSnapshot.docs.map(doc => doc.data());

        // Sort orders by date (most recent first)
        fetchedOrders = fetchedOrders.sort((a, b) => b.date.toDate() - a.date.toDate());

        // Update state with fetched orders
        setOrders(fetchedOrders);

      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    

    fetchOrders();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filterOrders = (orders) => {
    return orders.filter(order => {
      const matchesStatus = filter === 'All' || order.status === filter;
      const matchesDate = !selectedDate || order.date.toDate().toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
      return matchesStatus && matchesDate;
    });
  };

  const OrderItem = ({ order }) => {
    const totalPayment = order.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const breakTimeMap = {
      1: '10:30 AM',
      2: '12:30 PM',
      3: '3:30 PM'
    };

    return (
      <tr>
        <td>{order.date.toDate().toLocaleDateString()}</td>
        <td>{order.items.map(item => item.name).join(', ')}</td>
        <td>
          {order.items.flatMap(item => item.breakTimes || [])
            .map((breakTime, index) => (
              <div key={index}>{breakTimeMap[breakTime] || 'Unknown Time'}</div>
            ))}
          {order.items.every(item => !item.breakTimes || item.breakTimes.length === 0) && <div>No break times</div>}
        </td>
        <td>Rs. {totalPayment}</td>
        <td>
          <Badge bg={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'danger'}>
            {order.status}
          </Badge>
        </td>
      </tr>
    );
  };

  return (
    <div className="orders-section">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className='dash-title'>Order Report</div>
        <div className="d-flex">
          <DropdownButton className="dropdown-basic-button" title="Filter Order" onSelect={handleFilterChange}>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
            <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
            <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
          </DropdownButton>
          <Form.Control
            type="date"
            className="ml-2"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Menu</th>
            <th>Break Times</th> {/* New column for Break Times */}
            <th>Total Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {filterOrders(orders).map((order, index) => (
            <OrderItem key={index} order={order} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
