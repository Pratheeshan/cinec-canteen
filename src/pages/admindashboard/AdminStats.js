import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/Config';
import { Line } from 'react-chartjs-2';

const AdminStats = () => {
    const [predictions, setPredictions] = useState([]);
    const [images, setImages] = useState({});
    const [filter, setFilter] = useState('Today');
    const [forecastData, setForecastData] = useState([]);
    const [actualData, setActualData] = useState([]);

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
                console.log("all orders", allOrders)

                // Sort orders by date
                allOrders.sort((a, b) => b.date.toDate() - a.date.toDate());

                // Filter orders based on selected time period
                const filteredOrders = filterOrdersByDate(allOrders, filter);

                const predictions = await getPredictions(allOrders);
                console.log("Predictions:", predictions);
                setPredictions(predictions);
                await fetchImagesForPredictions(predictions);

                console.log("allOrders:", allOrders);
                await fetchForecastData(allOrders);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        
        fetchAllOrders();
    }, [filter]);

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

    // Fetch actual data and forecast data
    const fetchForecastData = async (orders) => {
        try {
            const response = await fetch('http://localhost:5000/forecast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orders),
            });
            const data = await response.json();
            setForecastData(data);
            console.log("forecast data", data)
            
            // Fetch actual data (replace with your API or data source)
            // const actualResponse = await fetch('http://localhost:5000/actual', {
            //     method: 'GET',
            // });
            // const actualData = await actualResponse.json();
            // setActualData(actualData);
            // console.log("forecast actualData", actualData)
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    const lineData = {
        labels: forecastData.map(entry => entry.date),
        datasets: [
            {
                label: 'Forecasted Demand',
                data: forecastData.map(entry => entry.demand),
                fill: false,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
            },
            {
                label: 'Actual Demand',
                data: actualData.map(entry => entry.demand),
                fill: false,
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
            },
        ],
    };

    return (
        <div className='dash'>
            <div>
                <div className='dash-title'>Admin Dashboard</div>
                <h2>Demand Forecasting</h2>
                <Line data={lineData} />
            </div>
        </div>
    );
};

export default AdminStats;
