import React, { useRef, useEffect } from 'react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please grant permission.");
          onClose();
        }
      };
      startCamera();
    } else if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  }, [isOpen, onClose]);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob(onCapture, 'image/jpeg');
  };

  if (!isOpen) return null;

  return (
    <div className="camera-modal">
      <div className="camera-container">
        <video ref={videoRef} autoPlay playsInline></video>
        <div className="camera-controls">
          <button onClick={handleCapture} className="capture-btn"></button>
        </div>
        <span onClick={onClose} className="close-modal-btn">&times;</span>
      </div>
    </div>
  );
}