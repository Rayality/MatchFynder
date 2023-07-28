from .pool import pool
from psycopg import sql
from psycopg.rows import dict_row
from .generic_sql import generic_insert


class FynderRepository:
    def get_friends(self, table_owner_id):
        query = sql.SQL(
            """
            SELECT o.username, f.*
            FROM friends
            WHERE owner = %s
            JOIN finder o
                ON friends.owner=o.id
            JOIN finder f
                ON friends.friend=f.id
            RETURNING *
            """
        )
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=dict_row) as db:
                    result = db.execute(query, table_owner_id)
                    return result.fetchone()
        except Exception as e:
            print("Error in 'get_friends'")
            raise e

    def add_friend(self, table_owner_id, friend_id):
        try:
            result = generic_insert(
                "friends",
                {
                    "owner": table_owner_id,
                    "friend": friend_id
                }
            )
            return result
        except Exception as e:
            print("Error in 'add_friend'")
            raise e
