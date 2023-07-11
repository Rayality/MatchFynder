from .pool import pool
from psycopg import sql
from psycopg.rows import dict_row


def generic_insert(table_name, data):
    if type(data) is not type({}):
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


def generic_find(table_name: str, where_identifier: str, where_equal_to: str):
    query = sql.SQL("SELECT * FROM {t} WHERE {i} = {e}").format(
        t=sql.Identifier(table_name),
        i=sql.Identifier(where_identifier),
        e=where_equal_to
    )
    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(query)
                data = result.fetchone()
                return (data)
    except Exception as e:
        return {"message": f"{e}"}
