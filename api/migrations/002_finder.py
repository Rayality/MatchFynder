steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE finder (
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100),
        last_name VARCHAR(100)
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE finder;
    """
]
]
