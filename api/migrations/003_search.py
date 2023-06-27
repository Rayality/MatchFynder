steps = [
    # "Up" SQL statement
    """
    CREATE TABLE search (
        id SERIAL PRIMARY KEY NOT NULL,
        owner INTEGER FOREIGN KEY REFERENCES finder(id),
        participant_count INTEGER,
        match_made BOOLEAN NOT NULL DEFAULT false
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE search;
    """
]
