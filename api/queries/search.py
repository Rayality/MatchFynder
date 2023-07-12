from pydantic import BaseModel
from .pool import pool
from .generic_sql import generic_insert


class MatchMade(BaseModel):
    match_made: bool


class SearchDad(BaseModel):
    id: int
    owner: int
    participant_count: int
    match_made: bool


class Search(BaseModel):
    owner: int
    participant_count: int


class SearchOut(BaseModel):
    id: int
    owner: int
    participant_count: int


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
    def add_search_finder(
        self, search_id: int, finder_id: int
    ) -> list[SearchFinders]:
        try:
            generic_insert(
                "search_finders",
                {"search_id": search_id, "finder_id": finder_id},
            )
            finders = self.get_search_finders(search_id)
            return finders
        except Exception as e:
            return {"message": e}

    def add_search_option(
        self, search_id: int, option_id: int
    ) -> list[SearchOptions]:
        try:
            generic_insert(
                "search_options",
                {"search_id": search_id, "option_id": option_id},
            )
            options = self.get_search_options(search_id)
            return options
        except Exception as e:
            return {"message": e}

    def get_search_finders(self, search_id: int) -> list[int]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM search_finders sf
                        WHERE search_id = %s
                        """,
                        [search_id],
                    )
                    search_finders = []
                    finders = db.fetchall()
                    for finder in finders:
                        search_finders.append(finder[1])
                    return search_finders

        except Exception as e:
            return {"message": f"{e}"}

    def get_search_options(self, search_id: int) -> list[SearchOptions]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    search_options = db.execute(
                        """
                        SELECT *
                        FROM search_options
                        WHERE search_id = %s
                        """,
                        [search_id],
                    )
                    search_options = []
                    options = db.fetchall()
                    for option in options:
                        print(option)
                        search_options.append(
                            self.record_to_search_option(option)
                        )
                    return search_options

        except Exception as e:
            return {"message": f"{e}"}

    def create_search(self, search: Search) -> SearchOut:
        out = generic_insert("search", search)
        try:
            search = SearchOut(**out)
            s_id = search.id
            o_id = search.owner
            self.add_search_finder(s_id, o_id)
            return search
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

    def get_search(self) -> list[SearchDad]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM search
                        """
                    )
                    return [self.record_to_search(record) for record in result]
        except Exception as e:
            print(e.errors())
            return {"message": "Could not get options"}

    def get_single_search(self, search_id: int) -> SearchDad:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM search
                        WHERE id = %s
                        """,
                        [search_id],
                    )
                    record = result.fetchone()
                    return self.record_to_search(record)

        except Exception as e:
            print(e)
            return None

    def get_match_made(self, search_id: int) -> MatchMade:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM search
                        WHERE id = %s
                        """,
                        [search_id],
                    )
                    record = result.fetchone()
                    return self.record_to_search(record)

        except Exception as e:
            print(e)
            return None

    def record_to_search(self, record):
        return SearchDad(
            id=record[0],
            owner=record[1],
            participant_count=record[2],
            match_made=record[3],
        )

    def record_to_search_option(self, record):
        return SearchOptions(
            edible_count=record[1], option_id=record[2], search_id=record[3]
        )
