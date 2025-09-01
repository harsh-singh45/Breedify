import React from 'react';

export default function ResultsPage({ result, onRecapture, onSubmit }) {
  if (!result) return <div className="container">Loading results...</div>;

  return (
    <div className="container">
      <h1>Review Classification</h1>
      <div className="results-layout">
        <div className="image-column">
          <img src={result.previewUrl} alt="Captured Animal" />
        </div>
        <div className="data-column">
          <div className="results-table">
            <table>
              <tbody>
                <tr><td><strong>Filename</strong></td><td>{result.filename}</td></tr>
                <tr><td><strong>Predicted Breed</strong></td><td>{result.classification}</td></tr>
                <tr><td><strong>Confidence</strong></td><td>{(result.confidence_score * 100).toFixed(2)}%</td></tr>
              </tbody>
            </table>
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