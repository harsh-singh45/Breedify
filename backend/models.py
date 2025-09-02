from pydantic import BaseModel, EmailStr
from typing import Optional

# --- User Models ---

# Base model for user attributes
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

# Model for creating a new user (expects a password)
class UserCreate(UserBase):
    password: str

# Model for representing a user stored in the DB (hashed password)
class UserInDB(UserBase):
    hashed_password: str

# Model for reading user data (never includes the password)
class User(UserBase):
    class Config:
        from_attributes = True

# --- Token Models ---

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None