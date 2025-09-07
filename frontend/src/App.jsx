import { useState, useEffect } from 'react';
import './App.css';

// Import all components
import Header from './components/Header';
import CameraModal from './components/CameraModal';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'; // New import
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';

function App() {
  // Page can be 'login', 'signup', 'dashboard', 'results'
  const [page, setPage] = useState('login');
  // Auth token is stored in state and localStorage to keep the user logged in
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  
  const [result, setResult] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If a token exists, go to the dashboard
  useEffect(() => {
    if (authToken) {
      setPage('dashboard');
    }
  }, [authToken]);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setPage('login');
  };

  const handleFileUpload = (file) => {
    if (!file || !authToken) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    const previewUrl = URL.createObjectURL(file);

    // Add the Authorization header to the request
    fetch("http://127.0.0.1:8000/classify/", {
      method: "POST",
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: formData,
    })
    .then(response => {
      if (response.status === 401) throw new Error("Authentication failed. Please log in again.");
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
      if (error.message.includes("Authentication")) handleLogout();
    })
    .finally(() => setIsLoading(false));
  };

  const handleCapture = (imageBlob) => {
    setIsCameraOpen(false);
    const capturedFile = new File([imageBlob], "capture.jpg", { type: "image/jpeg" });
    handleFileUpload(capturedFile);
  };

  const renderCurrentPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onStartClassification={() => setIsCameraOpen(true)} onFileUpload={handleFileUpload} />;
      case 'results':
        return <ResultsPage 
                  result={result} 
                  onRecapture={() => setIsCameraOpen(true)} 
                  onSubmit={() => { alert('Results submitted!'); setPage('dashboard'); }}
                />;
      case 'signup':
        return <SignupPage onSwitchToLogin={() => setPage('login')} />;
      case 'history': // New case for the history page
      return <HistoryPage />;
      default: // 'login'
        return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => setPage('signup')} />;
    }
  };

  return (
    <div className="website-container">
      {isLoading && <div className="loading-overlay">Classifying...</div>}
      {page !== 'login' && page !== 'signup' && <Header onLogout={handleLogout} />}
      
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