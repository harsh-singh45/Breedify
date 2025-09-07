import React, { useState } from 'react'; // No Suspense or Spline import needed

export default function SignupPage({ onSwitchToLogin }) {
  // ... component state and handleSignup function remain the same
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

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
      setTimeout(() => onSwitchToLogin(), 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      {/* Left Column: Signup Form */}
      <div className="signup-card-wrapper">
        <div className="login-card">
          <div className="login-card-logo">
            🐾 Breedify
          </div>
          <h2>Create an Account</h2>
          <p>Join to start classifying.</p>
          <form onSubmit={handleSignup}>
            {/* Form fields remain the same */}
            <div className="form-group">
                <label htmlFor="fullName">Full Name (Optional)</label>
                <div className="input-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
                <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">E-Mail</label>
                <div className="input-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <button type="submit" className="button button-primary" style={{width: '100%'}} disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'SIGN UP'}
            </button>
          </form>
          <div className="signup-link">
            Already have an account? <a href="#" onClick={onSwitchToLogin}>Login now</a>
          </div>
        </div>
      </div>

      {/* Right Column: Poster with Static Background */}
      <div className="signup-hero-section">
        <div className="signup-hero-content">
          <h1 className="anim-fade-in-up anim-delay-1">AI-Powered Breed Identification</h1>
          <p className="anim-fade-in-up anim-delay-2">
            Our system accurately classifies livestock breeds using images, replacing error-prone manual judgment with real-time, unbiased, and scientifically accurate results.
          </p>
          <ul className="features-list anim-fade-in-up anim-delay-3">
            <li><span>✓</span> Affordable & Scalable</li>
            <li><span>✓</span> Empowers Farmers</li>
            <li><span>✓</span> Preserves Indigenous Breeds</li>
            <li><span>✓</span> Supports Sustainable Livestock Management</li>
          </ul>
        </div>
        {/* The Spline background div is now removed */}
      </div>
    </div>
  );
}