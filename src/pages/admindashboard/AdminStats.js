import React from 'react';
import './AdminStats.css';

const AdminStats = () => {
    return (
        <div className="dash">
            <div className="card">
                <h2>56</h2>
                <p className="increase">+4%</p>
                <p>Menus</p>
                <i className="icon">🍽️</i>
                <div className="chart"> {/* Placeholder for chart */} </div>
            </div>
            <div className="card">
                <h2>785</h2>
                <p className="increase">+2.7%</p>
                <p>Orders</p>
                <i className="icon">📝</i>
                <div className="chart"> {/* Placeholder for chart */} </div>
            </div>
            <div className="card">
                <h2>56</h2>
                <p className="decrease">-3%</p>
                <p>Customers</p>
                <i className="icon">👥</i>
                <div className="chart"> {/* Placeholder for chart */} </div>
            </div>
            <div className="card">
                <h2>$6231</h2>
                <p className="decrease">-3.7%</p>
                <p>Income</p>
                <i className="icon">💵</i>
                <div className="chart"> {/* Placeholder for chart */} </div>
            </div>
        </div>
    );
};

export default AdminStats;
