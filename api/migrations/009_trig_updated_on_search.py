steps = [[
    # "Up" SQL statement
    """
    CREATE TRIGGER update_updated_on_search
        BEFORE UPDATE
        ON
            search
        FOR EACH ROW
    EXECUTE PROCEDURE update_updated_on();
    """,
    # "Down" SQL statement
    """
    DROP TRIGGER update_updated_on_search;
    """
]]
