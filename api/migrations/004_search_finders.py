steps = [[
    # "Up" SQL statement
    """
    CREATE TABLE search_finders (
        id SERIAL NOT NULL,
        finder_id INTEGER REFERENCES finder(id),
        search_id INTEGER REFERENCES search(id),
        PRIMARY KEY (search_id, finder_id)
    );
    """,
    # "Down" SQL statement
    """
    DROP TABLE options;
    """
]]
