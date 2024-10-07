import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/Config';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dstats.css';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';


const DStats = ({ authResponse }) => {
    const [predictions, setPredictions] = useState([]);
    const [personalPredictions, setPersonalPredictions] = useState([]);
    const [images, setImages] = useState({});
    const [personalImages, setpersonalImages] = useState({});
    const [filter, setFilter] = useState('Today'); // Default filter

    const [weeklySpending, setWeeklySpending] = useState([]);
    const [monthlySpending, setMonthlySpending] = useState([]);

    // const lineData = {
    //     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    //     datasets: [
    //         {
    //             label: 'Orders Over Time',
    //             data: [5, 10, 15, 20],
    //             fill: false,
    //             borderColor: '#36A2EB',
    //             backgroundColor: '#36A2EB',
    //             tension: 0.1,
    //         },
    //     ],
    // };

    // const series = [{
    //     name: "Desktops",
    //     data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    // }]

    // const options = {
    //     chart: {
    //         height: 350,
    //         type: 'line',
    //         zoom: {
    //             enabled: false
    //         }
    //     }
    // }

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const usersRef = collection(db, 'users');
                const usersSnapshot = await getDocs(usersRef);
                let allOrders = [];

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

                // Sort orders by date
                allOrders.sort((a, b) => b.date.toDate() - a.date.toDate());

                // Filter orders based on selected time period
                const filteredOrders = filterOrdersByDate(allOrders, filter);

                const predictions = await getPredictions(filteredOrders);
                console.log("Predictions:", predictions);
                setPredictions(predictions);
                await fetchImagesForPredictions(predictions);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        const fetchUserSpecificOrders = async () => {
            try {
                console.log("fetchUserSpecificOrders")
                console.log("authResponse", authResponse.user.uid)
                // Replace this with the actual current user's ID
                const userId = authResponse && authResponse.user && authResponse.user.uid ? authResponse.user.uid : "MSDNUlwmn9MD729syGSj7cnacmJ2"

                const userOrdersRef = collection(db, 'users', userId, 'orders');
                const ordersSnapshot = await getDocs(userOrdersRef);
                let userOrders = [];

                ordersSnapshot.docs.forEach(orderDoc => {
                    userOrders.push({
                        ...orderDoc.data(),
                        orderId: orderDoc.id,
                        userId: userId,
                    });
                });

                /*// Sort user orders by date
                userOrders.sort((a, b) => b.date.toDate() - a.date.toDate());
    
                // Filter orders based on selected time period
                const filteredOrders = filterOrdersByDate(userOrders, filter);

                console.log("fetchUserSpecificOrders filteredOrders", filteredOrders)
                
                const personalizedPredictions = await getPersonalizedPredictions(filteredOrders);
                console.log("Personalized Predictions:", personalizedPredictions);
                setPredictions(personalizedPredictions);
                await fetchImagesForPredictions(personalizedPredictions);
                */

                console.log("fetchUserSpecificOrders filteredOrders", userOrders)

                const monthlySpending = await calculateMonthlySpending(userOrders);
                console.log("monthlySpending:", monthlySpending);
                setMonthlySpending(monthlySpending)

                const weeklySpending = await calculateWeeklySpending(userOrders);
                console.log("weeklySpending:", weeklySpending);
                setWeeklySpending(weeklySpending)

                // Send orders to Python model for personalized recommendations
                const personalizedPredictions = await getPersonalizedPredictions(userOrders);
                console.log("Personalized Predictions:", personalizedPredictions);
                setPersonalPredictions(personalizedPredictions);
                await fetchImagesForPersonalPredictions(personalizedPredictions);
            } catch (error) {
                console.error("Error fetching user-specific orders: ", error);
            }
        }

        const filterOrdersByDate = (orders, filter) => {
            const now = new Date();
            return orders.filter(order => {
                const orderDate = order.date.toDate();
                switch (filter) {
                    case 'Today':
                        return orderDate.toDateString() === now.toDateString();
                    case 'Weekly':
                        const oneWeekAgo = new Date(now);
                        oneWeekAgo.setDate(now.getDate() - 7);
                        return orderDate >= oneWeekAgo;
                    case 'Monthly':
                        const oneMonthAgo = new Date(now);
                        oneMonthAgo.setMonth(now.getMonth() - 1);
                        return orderDate >= oneMonthAgo;
                    default:
                        return true;
                }
            });
        };
        
        const fetchImagesForPersonalPredictions = async (predictions) => {
            try {
                const mealsRef = collection(db, 'meals');
                const mealsSnapshot = await getDocs(mealsRef);
                const imagesData = {};

                predictions.forEach(prediction => {
                    const mealDoc = mealsSnapshot.docs.find(doc => doc.data().name === prediction.item);
                    if (mealDoc) {
                        const imageUrl = mealDoc.data().imageUrl;
                        imagesData[prediction.item] = imageUrl;
                    }
                });

                setpersonalImages(imagesData);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        const fetchImagesForPredictions = async (predictions) => {
            try {
                const mealsRef = collection(db, 'meals');
                const mealsSnapshot = await getDocs(mealsRef);
                const imagesData = {};

                predictions.forEach(prediction => {
                    const mealDoc = mealsSnapshot.docs.find(doc => doc.data().name === prediction.item);
                    if (mealDoc) {
                        const imageUrl = mealDoc.data().imageUrl;
                        imagesData[prediction.item] = imageUrl;
                    }
                });

                setImages(imagesData);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        const getPredictions = async (orders) => {
            try {
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orders),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const predictions = await response.json();
                return predictions.slice(0, 4); // Return top 4 items
            } catch (error) {
                console.error("Error fetching predictions:", error.message);
                return [];
            }
        };

        const getPersonalizedPredictions = async (orders) => {
            try {
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orders),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const predictions = await response.json();
                return predictions.slice(0, 4); // Return top 4 items
            } catch (error) {
                console.error("Error fetching predictions:", error.message);
                return [];
            }
        };

        const calculateMonthlySpending = async (orders) => {
            try {
                console.log("calculateMonthlySpending orders: ", orders)
                const response = await fetch('http://localhost:5000/monthly-spent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orders),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const spending = await response.json();
                console.log("spending", spending)
                return spending
            } catch (error) {
                console.error("Error fetching predictions:", error.message);
                return [];
            }
        };

        const calculateWeeklySpending = async (orders) => {
            try {
                console.log("calculateMonthlySpending orders: ", orders)
                const response = await fetch('http://localhost:5000/weekly-spent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orders),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const spending = await response.json();
                console.log("spending", spending)
                return spending
            } catch (error) {
                console.error("Error fetching predictions:", error.message);
                return [];
            }
        };

        fetchAllOrders();
        fetchUserSpecificOrders();
    }, [filter]);

    // Prepare data for Pie chart
    const pieData = {
        labels: predictions.map(prediction => prediction.item),
        datasets: [
            {
                label: '# of Orders',
                data: predictions.map(prediction => prediction.count),
                backgroundColor: ['#0e1c3c', '#36A2EB', '#ffa456', '#4BC0C0'], 
                hoverBackgroundColor: ['#0e1c3cdb', '#36a2ebeb', '#ffa456f0', '#4bc0c0e3'],
            },
        ],
    };

    // Prepare data for Donut chart
    // const calculateWeeklySpending = (orders) => {
    //     const now = new Date();
    //     const spending = [];

    //     // Initialize array for the last 4 weeks
    //     for (let i = 0; i < 4; i++) {
    //         spending.push({ week: `Week ${i + 1}`, total: 0 });
    //     }

    //     orders.forEach(order => {
    //         const orderDate = order.date.toDate();
    //         const weekDifference = Math.floor((now - orderDate) / (7 * 24 * 60 * 60 * 1000));

    //         if (weekDifference < 4) {
    //             spending[3 - weekDifference].total += parseFloat(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
    //         }
    //     });

    //     return spending.map(item => item.total);
    // };

    const weeklySeries = [{
        name: "Weekly Spending",
        data: weeklySpending
    }];

    const monthlySeries = [{
        name: "Monthly Spending",
        data: monthlySpending
    }];

    const chartOptions = {
        chart: {
            type: 'line',
            height: 250,
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Spending Over Time',
            align: 'left'
        }
    };

    return (
        <div className="dash">
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='dash-title'>Dashboard</div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="dropdown"
                >
                    <option value="Today">Today</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>
            <div className='prediction-container'>
                <div className='popular-foods'>
                    <div className='popular-top'>
                        <h2>Top 4 Most Popular Items</h2>
                    </div>
                    {/* Pie Chart */}
                    <div className='chart-container'>
                        <Pie data={pieData} />
                    </div>
                    {/* List of Popular Items with Images */}
                    <div className='popular-items'>

                        {predictions.map((prediction, index) => (
                            <div key={index} className='item'>
                                <img src={images[prediction.item]} alt={prediction.item} className='meal-image' />
                                <span>{prediction.item} - {prediction.count} orders</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='personal-container'>
                <div className='personal-chart'>
                        <div className='chart-container'>
                            <h2>Weekly Spending</h2>
                            <ReactApexChart options={{ ...chartOptions, xaxis: { categories: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] } }} series={weeklySeries} type="line" height={180} />
                        </div>
                        <div className='chart-container'>
                            <h2>Monthly Spending</h2>
                            <ReactApexChart options={{ ...chartOptions, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] } }} series={monthlySeries} type="line" height={180} />
                        </div>

                    </div>
                    <div className='personal-foods'>
                        <div className='popular-items'>
                            <h2>Personalized Suggestions</h2>

                            {personalPredictions.map((prediction, index) => (
                                <div key={index} className='item'>
                                    <img src={personalImages[prediction.item]} alt={prediction.item} className='meal-image' />
                                    <span>{prediction.item} - {prediction.count} orders</span>
                                </div>
                            ))}
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    authResponse: state.auth.authResponse
});

export default connect(mapStateToProps)(DStats);
