steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE place_pictures (
        id SERIAL PRIMARY KEY NOT NULL,
        picture_url VARCHAR(1000) NOT NULL,
        place_id VARCHAR(150) NOT NULL
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE options;
    """
]]
