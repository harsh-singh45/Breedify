import React, { useRef, useState } from 'react';

export default function Dashboard({ onStartClassification, onFileUpload }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  // Triggers the hidden file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // --- Drag and Drop Handlers ---
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      {/* --- NEW: Stats Grid --- */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Submissions</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Approved</h3>
          <p>9</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>3</p>
        </div>
        <div className="stat-card">
          <h3>Accuracy</h3>
          <p>95.8%</p>
        </div>
      </div>

      {/* --- NEW: Upload Area --- */}
      <div className="upload-section">
        <h2>Start a New Classification</h2>
        <div 
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-area-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V8.25c0-1.12.93-2.25 2.25-2.25h13.5A2.25 2.25 0 0121 8.25v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25z" />
            </svg>
          </div>
          <p><strong>Drag & drop your image here</strong>, or click to browse.</p>
          <span>PNG, JPG, GIF up to 10MB</span>
        </div>
        <div className="upload-alternative">
          <p>Or, use your device's camera</p>
          <button onClick={onStartClassification} className="button button-secondary">
            Use Camera
          </button>
        </div>
      </div>

      {/* Hidden file input remains the same */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }}
        accept="image/*"
      />

      {/* --- REVISED: Recent Submissions --- */}
      <h2>Recent Submissions</h2>
      <div className="cards-grid">
        <div className="submission-card">
          <div className="submission-card-image"></div>
          <div className="submission-card-info">
            <strong>Buffalo #34AB</strong>
            <p>Date: 01 Sep 2025</p>
          </div>
          <div className="submission-card-status status-approved">Approved</div>
        </div>
        <div className="submission-card">
          <div className="submission-card-image image-2"></div>
          <div className="submission-card-info">
            <strong>Cattle #98ZX</strong>
            <p>Date: 30 Aug 2025</p>
          </div>
          <div className="submission-card-status status-approved">Approved</div>
        </div>
        <div className="submission-card">
          <div className="submission-card-image image-3"></div>
          <div className="submission-card-info">
            <strong>Cattle #12FG</strong>
            <p>Date: 28 Aug 2025</p>
          </div>
          <div className="submission-card-status status-pending">Pending</div>
        </div>
      </div>
    </div>
  );
}