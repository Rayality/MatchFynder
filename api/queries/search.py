from pydantic import BaseModel
from datetime import datetime
from .pool import pool
from .generic_sql import (
    generic_insert,
    generic_find,
    generic_get_all,
    generic_update,
)


class MatchMade(BaseModel):
    match_made: bool


class SearchDad(BaseModel):
    id: int
    owner: int
    participant_count: int
    match_made: bool


class Search(BaseModel):
    owner: int


class SearchOut(BaseModel):
    id: int
    owner: int
    participant_count: int
    match_made: bool
    created_on: datetime
    updated_on: datetime


class SearchOptions(BaseModel):
    edible_count: int | None = None
    option_id: int
    search_id: int


class SearchOptionsLink(BaseModel):
    option_id: int
    search_id: int


class SearchFinders(BaseModel):
    id: int
    finder_id: int
    search_id: int


class SearchRepository:
    # create search and create a search_finder record for the search owner
    # using generic_insert and returning the search record upon creation
    def create_search(self, search: Search):
        try:
            new_record = (generic_insert("search", search))[0]
            self.add_search_finder(new_record["id"], new_record["owner"])
            return new_record
        except Exception as e:
            return {"message": f"{e}"}

    # using the search id and the user id, create a search_finder record
    def add_search_finder(self, search_id: int, finder_id: int):
        try:
            return generic_insert(
                "search_finders",
                {"search_id": search_id, "finder_id": finder_id},
            )
        except Exception as e:
            return {"message": e}

    # using the search_id, get a list of associated search_finders
    def get_search_finders(self, search_id: int):
        try:
            results = generic_find("search_finders", "search_id", search_id)
            return results
        except Exception as e:
            return {"message": e}

    # using the search_id and the option_id, create a search_options record
    def add_search_option(self, search_id: int, option_id: int):
        try:
            return generic_insert(
                "search_options",
                {"search_id": search_id, "option_id": option_id},
            )
        except Exception as e:
            return {"message": e}
            return {"message": f"{e}"}

    # using the search_id, get the associated search_options
    def get_search_options(self, search_id: int):
        try:
            return generic_find("search_options", "search_id", search_id)

        except Exception as e:
            return {"message": f"{e}"}

    def update_edible_count(self, search_id: int, option_id: int) -> int:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    option = db.execute(
                        """
                        UPDATE search_options
                        SET edible_count = edible_count + 1
                        WHERE search_id = %s AND option_id = %s
                        RETURNING edible_count;
                        """,
                        [search_id, option_id],
                    )
                    edible_count = option.fetchone()[0]
                    search = self.get_single_search(search_id)
                    if search.participant_count <= edible_count:
                        self.set_match_made_true(search_id)
                    return edible_count

        except Exception as e:
            return {"message": f"{e}"}

    def set_match_made_true(self, search_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE search
                        SET match_made = true
                        WHERE id = %s
                        """,
                        [search_id],
                    )
                    return True

        except Exception as e:
            return {"message": f"{e}"}
