import React, {useState} from 'react';
import AdminSidebar from './AdminSidebar'
import AdminStats from './AdminStats';
import './Admindash.css';

import Orders from '../Orders/Orders'
import AccountDetails from '../accountdetails/AccountDetails';
import Feedbacks from '../feedbacks/Feedbacks';
import MenuEdit from './MenuEdit';

const Admindash = () => {
    const [activeTab, setActiveTab] = useState(1)

    const setActiveTabState = (tab) => {
        setActiveTab(tab)
    }
    return (
        <div className="dashboard">
            <AdminSidebar setActiveTabState = {setActiveTabState} activeTab = {activeTab}/>
            {
                activeTab === 1 ? <AdminStats/> :
                activeTab === 2 ? <Orders /> :
                activeTab === 3 ? <MenuEdit /> :
                activeTab === 4 ? <AccountDetails /> :
                activeTab === 5 ? <Feedbacks /> :

                null
            }
        </div>
    );
};

export default Admindash;