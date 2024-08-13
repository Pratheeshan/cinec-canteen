// components/loading/Loading.js
import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-spinner">
      <div className="lds-ripple"><div></div><div></div></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
