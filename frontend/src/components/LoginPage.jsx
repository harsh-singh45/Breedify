import React from 'react';

export default function LoginPage({ onLogin }) {
  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <p>Sign in to continue to Breedify.</p>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input type="text" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="login-options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="#">Forgot Your Password?</a>
        </div>
        <button onClick={onLogin} className="button button-primary" style={{width: '100%'}}>SIGN IN</button>
        <div className="signup-link">
          Don't have an account? <a href="#">Signup now</a>
        </div>
      </div>
    </div>
  );
}