import React, {useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import DStats from '../../components/DStats/DStats';
import './Dashboard.css';

import Orders from '../Orders/Orders'
import Timetable from '../timetable/Timetable'
import AccountDetails from '../accountdetails/AccountDetails';
import Feedbacks from '../feedbacks/Feedbacks';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(1)

    const setActiveTabState = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="dashboard">
            <Sidebar setActiveTabState = {setActiveTabState} activeTab = {activeTab}/>
            {
                activeTab === 1 ? <DStats/> :
                activeTab === 2 ? <Orders /> :
                activeTab === 3 ? <Timetable /> :
                activeTab === 4 ? <AccountDetails /> :
                activeTab === 5 ? <Feedbacks /> :

                null
            }
        </div>
    );
};

export default Dashboard;