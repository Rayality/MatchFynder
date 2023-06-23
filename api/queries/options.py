from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class OptionOut(BaseModel):
    business_status: Optional[str]
    name: str
    picture_url: Optional[str]
    google_place_id: Optional[str]
    formatted_address: str
    latitude: float
    longitude: float
    price_level: int
    rating: float
    user_ratings_count: float
    created_on: datetime
    updated_on: datetime


class OptionIn(BaseModel):
    business_status: Optional[str]
    name: str
    picture_url: Optional[str]
    google_place_id: Optional[str]
    formatted_address: str
    latitude: float
    longitude: float
    price_level: int
    rating: float
    user_ratings_count: float
