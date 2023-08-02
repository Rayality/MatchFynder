steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE search (
        id SERIAL PRIMARY KEY NOT NULL,
        owner INTEGER REFERENCES finder(id),
        participant_count INTEGER DEFAULT 1,
        match_made BOOLEAN NOT NULL DEFAULT false,
        next_page_token VARCHAR(1000) DEFAULT 'new',
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE options;
    """
]]
