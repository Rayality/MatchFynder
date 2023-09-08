steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE options (
        id SERIAL PRIMARY KEY NOT NULL,
        business_status VARCHAR(1000),
        name TEXT NOT NULL,
        picture_url VARCHAR(1000),
        google_place_id TEXT,
        formatted_address TEXT,
        latitude DECIMAL,
        longitude DECIMAL,
        price_level SMALLINT,
        rating REAL,
        user_ratings_count INTEGER,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE options;
    """
]]
