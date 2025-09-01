import { useState } from 'react';
import './App.css';

// Import all components from the components folder
import Header from './components/Header';
import CameraModal from './components/CameraModal';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';

function App() {
  const [page, setPage] = useState('login');
  const [result, setResult] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => setPage('dashboard');
  const handleLogout = () => setPage('login');
  const handleStartClassification = () => setIsCameraOpen(true);

  // --- New Function to handle file uploads ---
  const handleFileUpload = (file) => {
    if (!file) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    const previewUrl = URL.createObjectURL(file);

    // This part is the same as the capture logic
    fetch("http://127.0.0.1:8000/classify/", {
      method: "POST",
      body: formData,
    })
    .then(response => {
      if (!response.ok) throw new Error("Classification failed.");
      return response.json();
    })
    .then(data => {
      setResult({ ...data, previewUrl });
      setPage('results');
    })
    .catch(error => {
      console.error("Error:", error);
      alert(error.message);
    })
    .finally(() => setIsLoading(false));
  };

  const handleCapture = (imageBlob) => {
    setIsCameraOpen(false);
    // We can reuse the file upload logic!
    const capturedFile = new File([imageBlob], "capture.jpg", { type: "image/jpeg" });
    handleFileUpload(capturedFile);
  };

  const renderCurrentPage = () => {
    switch (page) {
      case 'dashboard':
        // Pass the new handler function as a prop
        return <Dashboard 
                  onStartClassification={handleStartClassification} 
                  onFileUpload={handleFileUpload} 
                />;
      case 'results':
        return <ResultsPage 
                  result={result} 
                  onRecapture={handleStartClassification} 
                  onSubmit={() => {
                    alert('Results submitted to BPA successfully!');
                    setPage('dashboard');
                  }}
                />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="website-container">
      {isLoading && <div className="loading-overlay">Classifying...</div>}
      {page !== 'login' && <Header onLogout={handleLogout} />}
      
      <main className="content-area">
        {renderCurrentPage()}
      </main>

      <CameraModal 
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
}

export default App;