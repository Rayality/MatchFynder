from .pool import pool
from psycopg import sql
from psycopg.rows import dict_row


# given a table name and data containing column names and values
# create records in postgresql using psycopg, and
# return the record that was created
def generic_insert(table_name, data):
    if type(data) is not type({}):
        data = data.dict()
    identifiers = list(data.keys())
    values = list(data.values())
    query = sql.SQL("INSERT INTO {t} ({i}) VALUES ({v}) RETURNING *;").format(
        t=sql.Identifier(table_name),
        i=sql.SQL(", ").join(map(sql.Identifier, identifiers)),
        v=sql.SQL(", ").join(sql.Placeholder() * len(identifiers)),
    )
    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(query, [*values])
                return result.fetchall()
    except Exception as e:
        raise e


# given a table name, a column name, and a column value,
# get and return all matching records
def generic_find(table_name: str, where_identifier: str, where_equal_to: str):
    query = sql.SQL("SELECT * FROM {t} WHERE {w} = {e}").format(
        t=sql.Identifier(table_name),
        w=sql.Identifier(where_identifier),
        e=where_equal_to,
    )
    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(query)
                return result.fetchall()
    except Exception as e:
        raise e


# given a table name
# get and return all records
def generic_get_all(table_name: str):
    query = sql.SQL("SELECT * FROM {t}").format(t=sql.Identifier(table_name))
    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(query)
                return result.fetchall()
    except Exception as e:
        raise e


# given a table name, a set of data to change, and a where filter
# update records that match the where filter using the data
def generic_update(table_name, data, where_identifier: str, where_equal_to: str):
    if type(data) is not type({}):
        data = data.dict()
    identifiers = list(data.keys())
    values = list(data.values())
    query = sql.SQL(
        "UPDATE {t} SET ({i}) = ({v}) WHERE {w} = {e} RETURNING *;"
    ).format(
        t=sql.Identifier(table_name),
        i=sql.SQL(", ").join(map(sql.Identifier, identifiers)),
        v=sql.SQL(", ").join(sql.Placeholder() * len(identifiers)),
        w=sql.Identifier(where_identifier),
        e=where_equal_to,
    )
    try:
        with pool.connection() as conn:
            with conn.cursor(row_factory=dict_row) as db:
                result = db.execute(query, [*values])
                return result.fetchone()
    except Exception as e:
        raise e
