import React, { useState, useEffect } from 'react';
import { Table, Dropdown, DropdownButton, Badge, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../config/Config'; // Adjust the import path as needed

const Editorders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                // Fetch all orders from all users
                const usersRef = collection(db, 'users');
                const usersSnapshot = await getDocs(usersRef);
                const allOrders = [];

                for (const userDoc of usersSnapshot.docs) {
                    const userOrdersRef = collection(db, 'users', userDoc.id, 'orders');
                    const ordersSnapshot = await getDocs(userOrdersRef);

                    ordersSnapshot.docs.forEach(orderDoc => {
                        allOrders.push({
                            ...orderDoc.data(),
                            orderId: orderDoc.id,
                            userId: userDoc.id,
                        });
                    });
                }

                // Sort orders by date (most recent first)
                allOrders.sort((a, b) => b.date.toDate() - a.date.toDate());

                setOrders(allOrders);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        fetchAllOrders();
    }, []);

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleStatusChange = async (orderId, userId, newStatus) => {
        try {
            const orderDocRef = doc(db, 'users', userId, 'orders', orderId);
            await updateDoc(orderDocRef, { status: newStatus });
            setOrders(prevOrders => prevOrders.map(order => 
                order.orderId === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order status: ", error);
        }
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
                <td>
                    <DropdownButton title="Change Status">
                        <Dropdown.Item onClick={() => handleStatusChange(order.orderId, order.userId, 'Pending')}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange(order.orderId, order.userId, 'Completed')}>Completed</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange(order.orderId, order.userId, 'Cancelled')}>Cancelled</Dropdown.Item>
                    </DropdownButton>
                </td>
            </tr>
        );
    };

    return (
        <div className="orders-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className='dash-title'>All Orders</div>
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
                        <th>Break Times</th>
                        <th>Total Payment</th>
                        <th>Status</th>
                        <th>Actions</th> {/* New column for actions */}
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

export default Editorders;
