import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"; // Ensure this path is correct

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { logIn } = useAuth(); // Destructure logIn from useAuth

    const handleLogin = async () => {
        setError(""); // Clear previous errors
        try {
            await logIn(email, password);
            console.log("Logged in successfully");
            navigate('/dashboard', { replace: true }); // Use replace to avoid navigation issues
            
        } catch (error) {
            setError("Failed to log in: " + error.message);
            console.log("Log in failed: ", error.message);
        }
    };
    

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Log in</button>
        </div>
    );
}

export default LoginForm;
