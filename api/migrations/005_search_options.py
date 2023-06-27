steps = [
    # "Up" SQL statement
    """
    CREATE TABLE search_options (
        edible_count INTEGER,
        option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
        search_id INTEGER NOT NULL REFERENCES search(id) ON DELETE CASCADE
        PRIMARY KEY (option_id, search_id)
    )
    """,
    # "Down" SQL statement
    """
    DROP TABLE search_options;
    """
]
