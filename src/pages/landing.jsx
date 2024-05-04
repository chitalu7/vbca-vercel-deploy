// Enjoy the hunt!
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Make sure to include the updated CSS file path

function LandingPage() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
        <h1>Welcome to Dominatio Abscondita</h1>
       

        <button onClick={handleNavigateToLogin}>Patron</button>
        <button onClick={handleNavigateToLogin}>Vault Keeper</button>
        <button onClick={handleNavigateToLogin}>Explore</button>
    </div>
  );
}

export default LandingPage;
