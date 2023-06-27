from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from queries.pool import pool


class Error(BaseModel):
    message: str


class OptionIn(BaseModel):
    business_status: Optional[str]
    name: str
    picture_url: Optional[str]
    google_place_id: Optional[str]
    formatted_address: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    price_level: Optional[int]
    rating: Optional[float]
    user_ratings_count: Optional[float]


class OptionOut(BaseModel):
    id: int
    business_status: Optional[str]
    name: str
    picture_url: Optional[str]
    google_place_id: Optional[str]
    formatted_address: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    price_level: Optional[int]
    rating: Optional[float]
    user_ratings_count: Optional[float]
    created_on: datetime
    updated_on: datetime


class OptionRepository:
    def create(self, option: OptionIn) -> OptionOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO option
                        (business_status,
                        name,
                        picture_url,
                        google_place_id,
                        formatted_address,
                        latitude,
                        longitude,
                        price_level,
                        rating,
                        user_ratings_count)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        option.business_status,
                        option.name,
                        option.picture_url,
                        option.google_place_id,
                        option.formatted_address,
                        option.latitude,
                        option.longitude,
                        option.price_level,
                        option.rating,
                        option.user_ratings_count
                    ]
                )
                id = result.fetchone()[0]
                old_data = option.dict()
                return OptionOut(id=id, **old_data)
