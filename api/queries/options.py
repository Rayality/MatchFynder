from pydantic import BaseModel
from typing import Optional, Union
from datetime import datetime
from queries.pool import pool
from .generic_sql import (
    generic_insert,
    generic_find,
    generic_get_all,
    generic_update,
)


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
    def get_single_option(self, option_id: int) -> Union[OptionOut, Error]:
        try:
            return generic_find("options", "id", option_id)

        except Exception as e:
            print(e)
            return {"message": "Unable to get option. Does the id exist?"}

    def delete_option(self, option_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM options
                        WHERE id = %s
                        """,
                        [option_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update_option(self, option_id: int, option) -> Union[OptionOut, Error]:
        try:
            return generic_update("options", option, "id", option_id)

        except Exception as e:
            print(e)
            return {"message": "Could not update option"}

    # return all options
    def get_options(self) -> list[OptionOut]:
        try:
            return generic_get_all("options")

        except Exception as e:
            print(e)
            return {"message": "Could not get options"}

    # create an option
    def create(self, option: OptionIn) -> Union[OptionOut, Error]:
        try:
            return generic_insert("options", option)

        except Exception as e:
            return {"message": f"{e}"}
