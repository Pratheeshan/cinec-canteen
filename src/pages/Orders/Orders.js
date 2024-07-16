import React, { useState } from 'react';
import { Button, Table, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Orders.css'; // Ensure you have this file for additional styling

const sampleOrders = [
  {
    date: '23/05/2024',
    menu: ['Chicken Rice', 'Coffee'],
    totalPayment: 350,
    status: 'Completed'
  },
  {
    date: '23/05/2024',
    menu: ['Rice & Curry', 'Sting', 'Ice-Cream'],
    totalPayment: 600,
    status: 'Completed'
  },
  // Add more sample orders as needed
];

const Orders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (filter) => {
    setFilter(filter);
    // Implement filter logic if needed
  };

  const OrderItem = ({ order }) => {
    return (
      <tr>
        <td>{order.date}</td>
        <td>{order.menu.join(', ')}</td>
        <td>Rs. {order.totalPayment}</td>
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
        <h2>Order Report</h2>
        <DropdownButton id="dropdown-basic-button" title="Filter Order" onSelect={handleFilterChange}>
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
          <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
          <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
        </DropdownButton>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Menu</th>
            <th>Total Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter(order => filter === 'All' || order.status === filter)
            .map((order, index) => (
              <OrderItem key={index} order={order} />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
