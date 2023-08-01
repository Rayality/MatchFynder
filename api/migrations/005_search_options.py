steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE search_options (
        id SERIAL NOT NULL,
        edible_count INTEGER DEFAULT 0,
        option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
        search_id INTEGER NOT NULL REFERENCES search(id) ON DELETE CASCADE,
        PRIMARY KEY (option_id, search_id),
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE options;
    """
]]
