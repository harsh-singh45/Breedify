import React, { useState } from 'react';

export default function LoginPage({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError('');

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Incorrect email or password.");
      }

      const data = await response.json();
      onLoginSuccess(data.access_token); // Pass the token to the App component
    
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <p>Sign in to continue to Breedify.</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#">Forgot Your Password?</a>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="button button-primary" style={{width: '100%'}}>SIGN IN</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="#" onClick={onSwitchToSignup}>Signup now</a>
        </div>
      </div>
    </div>
  );
}