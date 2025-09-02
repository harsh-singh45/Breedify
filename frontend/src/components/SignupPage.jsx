import React, { useState } from 'react';

export default function SignupPage({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Signup failed.");
      }

      setMessage("Signup successful! Please log in.");
      setTimeout(() => onSwitchToLogin(), 2000); // Redirect to login after 2 seconds

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1>Create an Account</h1>
        <p>Join Breedify to start classifying.</p>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name (Optional)</label>
            <input 
              type="text" 
              id="fullName" 
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
          
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          
          <button type="submit" className="button button-primary" style={{width: '100%'}}>SIGN UP</button>
        </form>
        <div className="signup-link">
          Already have an account? <a href="#" onClick={onSwitchToLogin}>Login now</a>
        </div>
      </div>
    </div>
  );
}