// App.jsx 
import { useState } from 'react'

// React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Authentication Provider
import { AuthProvider } from '../contexts/AuthContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx';

// React routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Route Protector
import ProtectedRoute from './components/RouteProtection.jsx'

// Import components
import LandingPage from './pages/landing.jsx'
import LoginForm from './pages/login.jsx'
import Dashboard from './pages/dashboard.jsx'
import MissionBoard from './pages/missionboard.jsx'
import ContractProfileForm from './pages/ContractProfileForm.jsx';
import { onSave } from './utilities/freabaseUtilityFunctions';

import "./App.css";

// Utility function to extract and capitalize the first name from an email
const getCapitalizedName = (email) => {
  if (!email) return '';
  const namePart = email.split('@')[0];
  return namePart.charAt(0).toUpperCase() + namePart.slice(1);
};

function App() {
  const { currentUser } = useAuth(); // Access the currentUser from the AuthProvider

  //console.log("The current user is " + currentUser.email);

  const saveProfileToFirebase = async (name, bio, image) => {
    // Placeholder for the Firebase upload logic
    console.log(name, bio, image);
    // Here we will add the Firebase upload logic in the next tasks
  };

  const handleSave = async (formData) => {
    try {
      await onSave(formData); // Pass the entire form data object to onSave
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving the profile:', error);
      alert('Error saving profile: ' + error.message);
    }
  };
  

return (
  <BrowserRouter>
    <AuthProvider>
      <nav className="top-nav">
        <h3>DOMINATIO ABSCONDITA</h3>
        {/* Display the user's email if logged in */}
        {/* {currentUser && <h2>Welcome, {getCapitalizedName(currentUser.email)}</h2>} */}
        {currentUser ? <h2>Welcome, {getCapitalizedName(currentUser.email)}</h2> : <h2>Welcome, Guest</h2>}

      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/missionboard" element={<ProtectedRoute><MissionBoard/></ProtectedRoute>} />
        <Route path="/contractprofileform" element={<ProtectedRoute><ContractProfileForm onSave={handleSave}/></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
}

export default App
