import React from 'react';
import { useLocation } from 'react-router-dom';
import './MainContent.css';

const MainContent = () => {
  const location = useLocation();
  const authPaths = ['/login', '/register'];

  return (
    <>
      {authPaths.includes(location.pathname) && (
        <div className="main-content">
          <h1>Welcome to MR Traders</h1>
        </div>
      )}
    </>
  );
};

export default MainContent;