import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/Config';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for Chart.js to work
import './Dstats.css';

const DStats = () => {
    const [predictions, setPredictions] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
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

                allOrders.sort((a, b) => b.date.toDate() - a.date.toDate());

                const predictions = await getPredictions(allOrders);
                console.log("Predictions:", predictions);
                setPredictions(predictions);
                await fetchImagesForPredictions(predictions);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        const fetchImagesForPredictions = async (predictions) => {
            try {
                const mealsRef = collection(db, 'meals');
                const mealsSnapshot = await getDocs(mealsRef);
                const imagesData = {};
        
                predictions.forEach(prediction => {
                    const mealDoc = mealsSnapshot.docs.find(doc => doc.data().name === prediction.item);
                    console.log(mealDoc)
                    if (mealDoc) {
                        const imageUrl = mealDoc.data().imageUrl;
                        console.log("Image URL for", prediction.item, ":", imageUrl); // Debugging line
                        imagesData[prediction.item] = imageUrl;
                    }
                });
                console.log("image fetched", imagesData)
        
                setImages(imagesData);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        

        fetchAllOrders();
    }, []);

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

    // Prepare data for Pie chart
    const pieData = {
        labels: predictions.map(prediction => prediction.item),
        datasets: [
            {
                label: '# of Orders',
                data: predictions.map(prediction => prediction.count),
                backgroundColor: ['#0e1c3c', '#36A2EB', '#ffa456', '#4BC0C0'], // Customize as needed
                hoverBackgroundColor: ['#0e1c3cdb', '#36a2ebeb', '#ffa456f0', '#4bc0c0e3'],
            },
        ],
    };

    return (
        <div className="dash">
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className='dash-title'>Dashboard</div>
                </div>
            <div className='popular-foods'>
            <h1>Top 4 Most Popular Items</h1>
                
                {/* Pie Chart */}
                <div className='chart-container'>
                    <Pie data={pieData} />
                </div>

                {/* List of Popular Items with Images */}
                <div className='popular-items'>
                    {predictions.map((prediction, index) => (
                        <div key={index} className='item'>
                            {/* <img src='https://firebasestorage.googleapis.com/v0/b/cinec-canteen.appspot.com/o/meals%2FRicecurry-chicken.png?alt=media&token=91bd57e6-9123-4481-8c8b-5e22a563f732' alt={prediction.item} className='meal-image' /> */}
                            <img src={images[prediction.item]} alt={prediction.item} className='meal-image' />
                            <span>{prediction.item} - {prediction.count} orders</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DStats;
