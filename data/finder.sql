DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS finder;
DROP TABLE IF EXISTS search;
DROP TABLE IF EXISTS search_finders;
DROP TABLE IF EXISTS search_options;
DROP TABLE IF EXISTS place_pictures;
DROP TABLE IF EXISTS friends;

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

CREATE TABLE finder (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    hashed_password VARCHAR(200)
);

CREATE TABLE search (
    id SERIAL PRIMARY KEY NOT NULL,
    owner INTEGER REFERENCES finder(id),
    participant_count INTEGER DEFAULT 1,
    match_made BOOLEAN NOT NULL DEFAULT false,
    next_page_token VARCHAR(1000) DEFAULT 'new',
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE search_finders (
    id SERIAL NOT NULL,
    finder_id INTEGER REFERENCES finder(id),
    search_id INTEGER REFERENCES search(id),
    PRIMARY KEY (search_id, finder_id)
);

CREATE TABLE search_options (
    id SERIAL NOT NULL,
    edible_count INTEGER DEFAULT 0,
    option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
    search_id INTEGER NOT NULL REFERENCES search(id) ON DELETE CASCADE,
    PRIMARY KEY (option_id, search_id),
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE place_pictures (
    id SERIAL PRIMARY KEY NOT NULL,
    picture_url VARCHAR(1000) NOT NULL,
    place_id VARCHAR(150) NOT NULL
);

CREATE TABLE friends (
    owner INTEGER  REFERENCES finder(id),
    friend INTEGER NOT NULL REFERENCES finder(id)
);

-- create trigger function to update the updated_on attribute
-- to the current datetime whenever called
CREATE FUNCTION update_updated_on()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- add trigger to options table to call the
-- update_updated_on function whenever any row is updated
CREATE TRIGGER update_updated_on_options
    BEFORE UPDATE
    ON
        options
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_on();

-- add trigger to search table to call the
-- update_updated_on function whenever any row is updated
CREATE TRIGGER update_updated_on_search
    BEFORE UPDATE
    ON
        search
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_on();

-- add trigger to search_options table to call the
-- update_updated_on function whenever any row is updated
CREATE TRIGGER update_updated_on_search_options
    BEFORE UPDATE
    ON
        search_options
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_on();
