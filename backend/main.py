from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from typing import List

# Import your new modules
from . import models, auth

# Create the FastAPI app
app = FastAPI(title="Breedify API")

# --- CORS Middleware ---
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Authentication Endpoints ---

@app.post("/token", response_model=models.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Provides a JWT token for a valid user.
    """
    user = auth.get_user(email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=models.User)
def create_user(user: models.UserCreate):
    """
    Creates a new user.
    """
    db_user = auth.get_user(email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    user_in_db = models.UserInDB(**user.model_dump(), hashed_password=hashed_password)
    
    # Save user to our fake in-memory DB
    auth.fake_users_db[user.email] = user_in_db.model_dump()
    
    return user_in_db

# --- Protected Endpoint Example ---

@app.get("/users/me/", response_model=models.User)
async def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    """

    Fetches the current logged-in user's data.
    """
    return current_user


# --- Existing Classification Endpoint (Now Protected) ---

@app.post("/classify/")
async def classify_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Receives an image for classification. Requires authentication.
    """
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "classification": "Cattle",
        "confidence_score": 0.95,
        "classified_by": current_user.email
    }