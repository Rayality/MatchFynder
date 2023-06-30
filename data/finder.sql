DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS finder;
DROP TABLE IF EXISTS search;
DROP TABLE IF EXISTS search_finders;
DROP TABLE IF EXISTS search_options;

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
    participant_count INTEGER,
    match_made BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE search_finders (
    id SERIAL NOT NULL,
    finder_id INTEGER REFERENCES finder(id),
    search_id INTEGER REFERENCES search(id),
    PRIMARY KEY (search_id, finder_id)
);

CREATE TABLE search_options (
    edible_count INTEGER,
    option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
    search_id INTEGER NOT NULL REFERENCES search(id) ON DELETE CASCADE,
    PRIMARY KEY (option_id, search_id)
);

INSERT INTO finder VALUES
  ("username1", "email_one@this.is", "user", "name", "pas1s"),
  ("abusername2", "email_two@this.is", "abuser", "surname", "pas2s")
  
-- nosql data version of in progress data
-- id = search_id
-- option_counts = {option_id: count, ....}
-- participant_feedback = {user_id: {option_id: bool}}, {user_id: {option_id: bool}, {option_id: bool}}

-- Future:
-- consider future enhancements that involve search filters
