from .pool import pool
from psycopg import sql


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
        return e
