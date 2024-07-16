import React from 'react';
import './Sidebar.css';

const Sidebar = ({setActiveTabState}) => {
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
        <span className="nav-dash active" onClick={()=>setActiveTabState(1)}>Dashboard</span>
        <span href="/orders" className="nav-dash" onClick={()=>setActiveTabState(2)}>Orders</span>
        <span href="/timetable" className="nav-dash" onClick={()=>setActiveTabState(3)}>Time Table</span>
        <span href="/account" className="nav-dash" onClick={()=>setActiveTabState(4)}>Account Details</span>
        <span href="/reviews" className="nav-dash" onClick={()=>setActiveTabState(5)}>Reviews/Feedback</span>
        <a href="/logout" className="nav-dash">Log out</a>
      </nav>
    </div>
  );
};

export default Sidebar;