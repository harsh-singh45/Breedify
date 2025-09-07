import React, { useState, useEffect } from 'react';

// Import the images directly. Vite will handle the correct paths.
import heroImage1 from '/src/assets/hero-image.jpg';
import heroImage2 from '/src/assets/hero-image-2.jpg';
import heroImage3 from '/src/assets/hero-image-3.jpg';
import heroImage4 from '/src/assets/hero-image-4.jpg';
import heroImage5 from '/src/assets/hero-image-5.jpg';

// The array now holds all five imported image variables
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];

export default function LoginPage({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect hook to automatically cycle through images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, 8000);

    // Clean up the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

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
      onLoginSuccess(data.access_token);
    
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Left Column: Branding and Image */}
      <div className="login-hero-section">
        <div className="login-hero-content">
          {/* THIS IS THE MODIFIED LINE */}
          <div className="app-logo-hero anim-fade-in-up anim-delay-1">
            🐾 <span className="animated-gradient-text">Breedify</span>
          </div>
          <h1 className="anim-fade-in-up anim-delay-2">Intelligent Breed Classification</h1>
          <p className="anim-fade-in-up anim-delay-3">Instantly identify animal breeds with cutting-edge AI technology.</p>
        </div>
        <div 
          key={currentImageIndex} // Add key to re-trigger animation on change
          className="login-hero-image"
          style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
        >
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="login-card-wrapper">
        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue.</p>
          <form onSubmit={handleLogin}>
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
            <div className="login-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <a href="#">Forgot Password?</a>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" className="button button-primary" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'SIGN IN'}
            </button>
          </form>
          <div className="signup-link">
            Don't have an account? <a href="#" onClick={onSwitchToSignup}>Signup now</a>
          </div>
        </div>
      </div>
    </div>
  );
}