from pydantic import BaseModel
from typing import Optional, Union
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
    created_on: datetime
    updated_on: datetime


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
    def delete_option(self, option_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM options
                        WHERE id = %s
                        """,
                        [option_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def update_option(self, option_id: int, option: OptionIn) -> Union[OptionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE options
                        SET business_status = %s
                            , name = %s
                            , picture_url = %s
                            , formatted_address = %s
                            , latitude = %s
                            , longitude = %s
                            , price_level = %s
                            , rating = %s
                            , user_ratings_count = %s
                            , created_on = %s
                            , updated_on = %s
                        WHERE id = %s
                        """,
                        [
                            option.business_status,
                            option.name,
                            option.picture_url,
                            option.formatted_address,
                            option.latitude,
                            option.longitude,
                            option.price_level,
                            option.rating,
                            option.user_ratings_count,
                            option.created_on,
                            option.updated_on,
                            option_id

                        ]
                    )
                    old_data = option.dict()
                    return OptionOut(id=option_id, **old_data)

        except Exception as e:
            print(e)
            return {"message": "Could not get options"}

    def get_options(self) -> list[OptionOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id,
                        business_status,
                        name,
                        picture_url,
                        google_place_id,
                        formatted_address,
                        latitude,
                        longitude,
                        price_level,
                        rating,
                        user_ratings_count,
                        created_on,
                        updated_on

                        FROM options
                        ORDER BY id;

                        """
                    )
                    result = []
                    for record in db:
                        option = OptionOut(
                            id=record[0],
                            business_status=record[1],
                            name=record[2],
                            picture_url=record[3],
                            google_place_id=record[4],
                            formatted_address=record[5],
                            latitude=record[6],
                            longitude=record[7],
                            price_level=record[8],
                            rating=record[9],
                            user_ratings_count=record[10],
                            created_on=record[11],
                            updated_on=record[12]

                        )
                        result.append(option)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get options"}

    def create(self, option: OptionIn) -> OptionOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO options
                        (
                            business_status,
                            name,
                            picture_url,
                            google_place_id,
                            formatted_address,
                            latitude,
                            longitude,
                            price_level,
                            rating,
                            user_ratings_count,
                            created_on,
                            updated_on
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                            option.user_ratings_count,
                            option.created_on,
                            option.updated_on
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = option.dict()
                    return OptionOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "ERROR"}
