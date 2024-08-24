import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStats = () => {
    const [demandPrediction, setDemandPrediction] = useState([]);

    useEffect(() => {
        const fetchDemandPrediction = async () => {
            const response = await axios.post('http://localhost:5000/predict', { type: 'demand' });
            setDemandPrediction(response.data.prediction);
        };
        fetchDemandPrediction();
    }, []);

    return (
        <div>
            <h2>Demand Prediction</h2>
            <ul>
                {demandPrediction.map((prediction, index) => (
                    <li key={index}>{prediction}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminStats;
