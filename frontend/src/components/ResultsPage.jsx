import React from 'react';

export default function ResultsPage({ result, onRecapture, onSubmit }) {
  if (!result) return <div className="container">Loading results...</div>;

  const confidencePercentage = (result.confidence_score * 100).toFixed(2);

  return (
    <div className="container">
      <h1>Classification Results</h1>
      <div className="results-layout">
        <div className="image-column">
          <img src={result.previewUrl} alt="Captured Animal" />
        </div>
        <div className="data-column">
          {/* The main results are now in a dedicated card */}
          <div className="results-card">
            <div className="result-item main-result">
              <span className="result-label">Predicted Breed</span>
              <span className="result-value">{result.classification}</span>
            </div>

            <div className="result-item">
              <span className="result-label">Confidence Score</span>
              <div className="confidence-bar-container">
                <div 
                  className="confidence-bar" 
                  style={{ width: `${confidencePercentage}%` }}>
                  {confidencePercentage}%
                </div>
              </div>
            </div>

            <div className="result-item">
              <span className="result-label">Filename</span>
              <span className="result-value-secondary">{result.filename}</span>
            </div>
          </div>

          <div className="results-buttons">
            <button onClick={onSubmit} className="button button-primary">Submit to BPA</button>
            <button onClick={onRecapture} className="button button-secondary">
              Recapture Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}