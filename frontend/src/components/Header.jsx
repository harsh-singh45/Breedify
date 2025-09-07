import React, { useState, useEffect } from 'react';

export default function Header({ onLogout, onNavigate, currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ... (The handleScroll and useEffect code remains the same as before)
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (totalScroll / windowHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <header className={`header glass-effect ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-logo" onClick={() => onNavigate('dashboard')} style={{cursor: 'pointer'}}>
        🐾 <span className="animated-gradient-text">Breedify</span>
      </div>
      <nav className="header-nav">
        <a href="#" onClick={() => onNavigate('dashboard')} className={currentPage === 'dashboard' ? 'active' : ''}>
          Dashboard
        </a>
        <a href="#" onClick={() => onNavigate('about')} className={currentPage === 'about' ? 'active' : ''}>
          About
        </a>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </nav>
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </header>
  );
}