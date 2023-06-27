steps = [
        # "Up" SQL statement
        """
        CREATE TABLE search_finders (
            finder_id INTEGER NOT NULL REFERENCES finder(id)
            search_id INTEGER NOT NULL REFERENCES search(id)
            PRIMARY KEY (search_id, finder_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE search_finders;
        """
    ]
