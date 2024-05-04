// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Importing CSS for styling

function Dashboard() {

    // Log the screen resolution
console.log(`Screen Resolution: ${screen.width}x${screen.height}`);

    
    return (
      <div>
        
       <div className="dashboard">
            <div className="button-container">
                {/* Disabled Links with inline styling and no navigation */}
                <Link to="#" onClick={(e) => e.preventDefault()} className="dashboard-button" style={{ pointerEvents: "none", color: "gray" }}>Game Setup</Link>
                <Link to="/missionboard" className="dashboard-button">Missions Board</Link>
                <Link to="#" onClick={(e) => e.preventDefault()} className="dashboard-button" style={{ pointerEvents: "none", color: "gray" }}>Shadow Ledger</Link>
                <Link to="#" onClick={(e) => e.preventDefault()} className="dashboard-button" style={{ pointerEvents: "none", color: "gray" }}>Rule Book</Link>
                <Link to="/contractprofileform" className="dashboard-button">The Vault Keeper</Link>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;
