from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from queries.pool import pool


class Error(BaseModel):
    message: str


class SearchIn(BaseModel):
    owner: int
    participant_count: int


class SearchOut(BaseModel):
    id: int
    owner: int
    participant_count: int
    match_made: bool
    created_on: datetime
    updated_on: datetime


class SearchRepository:
    def create(self, search: SearchIn) -> SearchOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO search
                        (
                            owner,
                            participant_count
                        )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id, match_made, created_on, updated_on;
                        """,
                        [
                            search.owner,
                            search.participant_count
                        ]
                    )
                    id = result.fetchone()[0]
                    match_made = result.fetchone()[1]
                    created_on = result.fetchone()[2]
                    updated_on = result.fetchone()[3]
                    old_data = search.dict()
                    return SearchOut(
                        id=id,
                        **old_data,
                        match_made=match_made,
                        created_on=created_on,
                        updated_on=updated_on
                        )
        except Exception as e:
            print(e)
            return {"message": "ERROR"}

    def get_searches(self) -> list[SearchOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id,
                        owner,
                        participant_count,
                        match_made,
                        created_on,
                        updated_on

                        FROM search
                        ORDER BY id;

                        """
                    )
                    result = []
                    for record in db:
                        search = SearchOut(
                            id=record[0],
                            owner=record[1],
                            participant_count=record[2],
                            match_made=record[3],
                            created_on=record[4],
                            updated_on=record[5]

                        )
                        result.append(search)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get searches"}
