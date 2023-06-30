from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from queries.pool import pool
from psycopg import sql


def generic_insert(table_name, data):
    data = data.dict()
    identifiers = list(data.keys())
    values = list(data.values())
    query = sql.SQL("INSERT INTO {t} ({i}) VALUES ({v}) RETURNING id;").format(
            t=sql.Identifier(table_name),
            i=sql.SQL(", ").join(map(sql.Identifier, identifiers)),
            v=sql.SQL(", ").join(sql.Placeholder() * len(identifiers)))
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    query, [*values]
                )
                id = result.fetchone()[0]
                data['id'] = id
                return (data)
    except Exception as e:
        return {"message": f"{e}"}


class Search(BaseModel):
    owner: int
    participant_count: int
    match_made: bool

class SearchOut(Search):
    id: int

class SearchOptions(BaseModel):
    edible_count: int
    option_id: int
    search_id: int


class SearchFinders(BaseModel):
    id: int
    finder_id: int
    search_id: int


class SearchRepository:
    def get_search_finders(self, search_id: int) -> list[SearchFinders]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    search_finders = db.execute(
                        """
                        SELECT *
                        FROM search_finders AS sf
                        WHERE search_id = %s
                        LEFT OUTER JOIN finder AS f
                            ON (sf.finder_id = f.id)
                        GROUP BY sf.id
                        """,
                        [search_id]
                    )
                    print(search_finders)
                    return True

        except Exception as e:
            return {"message": f"{e}"}

    def get_search_options(self, search_id: int) -> SearchOptions:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    search_options = db.execute(
                        """
                        SELECT *
                        FROM search_options
                        WHERE search_id = %s
                        GROUP BY id
                        """,
                        [search_id]
                    )
                    print(search_options)
                    print(search_options.fetchone())
                    return True

        except Exception as e:
            return {"message": f"{e}"}

    def create_search(self, search: Search) -> SearchOut:
        out = generic_insert("search", search)
        return SearchOut(out)

    def set_match_made_true(self, search_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    search = db.execute(
                        """
                        UPDATE search
                        SET match_made = true
                        WHERE search_id = %s
                        """,
                        [search_id]
                    )
                    print(search)
                    print(search.fetchone())
                    return True

        except Exception as e:
            return {"message": f"{e}"}

    def update_edible_count(self, search_id: int, option_id: int) -> int:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    search = db.execute(
                        """
                        UPDATE search_options
                        SET edible_count = true
                        WHERE search_id = %s AND option_id = %s
                        """,
                        [search_id, option_id]
                    )
                    print(search)
                    print(search.fetchone())
                    return True

        except Exception as e:
            return {"message": f"{e}"}
