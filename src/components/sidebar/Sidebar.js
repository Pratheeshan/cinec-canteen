import React from 'react';
import './Sidebar.css';

const Sidebar = ({setActiveTabState, activeTab}) => {
  return (
    <div className="sidebar">
      <div className="profile">
        <div className='user'>Name</div>
        <div className='user'>Student ID</div>
        <div className='user'>Email Address</div>
        <p>Account Type</p>
        <div className='side-item-divider' />
      </div>
      <nav className="nav-dmenu">
        <span className={`nav-dash ${activeTab === 1 ? 'active' : ''}`}  onClick={()=>setActiveTabState(1)}>Dashboard</span>
        <span className={`nav-dash ${activeTab === 2 ? 'active' : ''}`}  onClick={()=>setActiveTabState(2)}>Orders</span>
        <span className={`nav-dash ${activeTab === 3 ? 'active' : ''}`}  onClick={()=>setActiveTabState(3)}>Time Table</span>
        <span className={`nav-dash ${activeTab === 4 ? 'active' : ''}`}  onClick={()=>setActiveTabState(4)}>Account Details</span>
        <span className={`nav-dash ${activeTab === 5 ? 'active' : ''}`}  onClick={()=>setActiveTabState(5)}>Reviews/Feedback</span>
        <a href="/logout" className="nav-dash">Log out</a>
      </nav>
    </div>
  );
};

export default Sidebar;