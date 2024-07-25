import React, { useEffect, useState } from 'react';
import { auth, db } from '../../config/Config'; // Adjust the import path if needed
import { doc, getDoc } from 'firebase/firestore';
import './Sidebar.css';
import Loading from '../../components/loading/Loading';

const Sidebar = ({ setActiveTabState, activeTab }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setLoading(true);

        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        }
        setLoading(false);
      } else {
        setUser(null);
        setUserDetails(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Optionally, redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="sidebar">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="profile">
            {user && userDetails ? (
              <>
                <div className='user'>{userDetails.firstName} {userDetails.lastName}</div>
                <div className='user'>{userDetails.userId}</div>
                <div className='user'>{user.email}</div>
                <p>{user.emailVerified ? 'Verified Account' : 'Student Account'}</p>
              </>
            ) : (
              <>
                <div className='user'>Name</div>
                <div className='user'>Student ID</div>
                <div className='user'>Email Address</div>
                <p>Account Type</p>
              </>
            )}
            <div className='side-item-divider' />
          </div>
          <nav className="nav-dmenu">
            <span className={`nav-dash ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTabState(1)}>Dashboard</span>
            <span className={`nav-dash ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTabState(2)}>Orders</span>
            <span className={`nav-dash ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTabState(3)}>Time Table</span>
            <span className={`nav-dash ${activeTab === 4 ? 'active' : ''}`} onClick={() => setActiveTabState(4)}>Account Details</span>
            <span className={`nav-dash ${activeTab === 5 ? 'active' : ''}`} onClick={() => setActiveTabState(5)}>Reviews/Feedback</span>
            <a href="#!" className="nav-dash" onClick={handleLogout}>Log out</a>
          </nav>
        </>
      )}
    </div>
  );
};

export default Sidebar;
