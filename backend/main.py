from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI(title="Breedify API")

# --- CORS Middleware ---
origins = [
    "http://localhost:5173", # The default URL for Vite React dev server
    "http://localhost:3000", # A common alternative for React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)


# Define a root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "Welcome to the Breedify Backend!"}


# Define the classification endpoint
@app.post("/classify/")
async def classify_image(file: UploadFile = File(...)):
    """
    This endpoint receives an image, saves it temporarily,
    and will eventually pass it to an AI model for classification.
    """
    # For now, we'll just return a dummy JSON response.
    # The actual AI logic will go here later.
    
    

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "classification": "Cattle", # Dummy classification
        "confidence_score": 0.95    # Dummy score
    }