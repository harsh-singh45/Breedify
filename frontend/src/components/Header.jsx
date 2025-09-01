import React from 'react';

export default function Header({ onLogout }) {
  return (
    <header className="main-header">
      <div className="logo">🐾 Breedify</div>
      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#history">History</a>
        <a href="#profile">Profile</a>
        <span onClick={onLogout}>Logout</span>
      </nav>
    </header>
  );
}