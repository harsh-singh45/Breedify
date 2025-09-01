import { useState } from 'react';
import './App.css'; // You can add your styles here later

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(null); // Reset previous result
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send the file to the FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/classify/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the classification.");
      }

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🐾 Breedify</h1>
      <p>Upload an image of cattle or a buffalo to classify it.</p>
      
      <div className="uploader-box">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" className="image-preview" />}
        <button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? "Classifying..." : "Classify Image"}
        </button>
      </div>

      {result && (
        <div className="result-box">
          <h2>Classification Result</h2>
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>Predicted Breed:</strong> {result.classification}</p>
          <p><strong>Confidence:</strong> {(result.confidence_score * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;