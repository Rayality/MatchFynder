steps = [[
    # "Up" SQL statement
    """
    CREATE FUNCTION update_updated_on()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_on = now();
        RETURN NEW;
    END;
    $$ language 'plpgsql';
    """,
    # "Down" SQL statement
    """
    DROP FUNCTION update_updated_on;
    """
]]
