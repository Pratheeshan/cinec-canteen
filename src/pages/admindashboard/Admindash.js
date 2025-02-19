import React, {useState} from 'react';
import AdminSidebar from './AdminSidebar'
import AdminStats from './AdminStats';
import './Admindash.css';


import AccountDetails from '../accountdetails/AccountDetails';
import MenuEdit from './MenuEdit';
import ViewFeeback from './ViewFeeback';
import Editorders from './Editorders';

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
                activeTab === 2 ? <Editorders /> :
                activeTab === 3 ? <MenuEdit /> :
                activeTab === 4 ? <AccountDetails /> :
                activeTab === 5 ? <ViewFeeback /> :

                null
            }
        </div>
    );
};

export default Admindash;