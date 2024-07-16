import React, {useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import DStats from '../../components/DStats/DStats';
import './Dashboard.css';

import Orders from '../Orders/Orders'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(1)

    const setActiveTabState = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="dashboard">
            <Sidebar setActiveTabState = {setActiveTabState}/>
            {
                activeTab === 1 ? <DStats/> :
                activeTab === 2 ? <Orders /> :
                null
            }
        </div>
    );
};

export default Dashboard;