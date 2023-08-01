steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE finder (
        id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        hashed_password VARCHAR(200)
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE options;
    """
]]
