import React, { useRef } from 'react';

// The component now accepts an `onFileUpload` prop
export default function Dashboard({ onStartClassification, onFileUpload }) {
  // Create a ref to access the hidden file input element
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    // Programmatically click the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        {/* Container for the action buttons */}
        <div className="action-buttons">
          <button onClick={onStartClassification} className="button button-primary">
            Use Camera
          </button>
          <button onClick={handleUploadClick} className="button button-secondary">
            Upload Image
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }}
        accept="image/*"
      />

      <h2>Recent Submissions</h2>
      <div className="cards-grid">
        <div className="submission-card">
          <strong>Buffalo #34AB</strong>
          <p>Status: Approved<br />Date: 01 Sep 2025</p>
        </div>
        <div className="submission-card">
          <strong>Cattle #98ZX</strong>
          <p>Status: Approved<br />Date: 30 Aug 2025</p>
        </div>
        <div className="submission-card">
          <strong>Cattle #12FG</strong>
          <p>Status: Pending<br />Date: 28 Aug 2025</p>
        </div>
      </div>
    </div>
  );
}