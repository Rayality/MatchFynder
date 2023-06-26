CREATE TABLE options (
    id INTEGER NOT NULL UNIQUE,
    business_status VARCHAR(1000),
    name TEXT NOT NULL,
    picture_url IMAGE,
    google_place_id TEXT,
    formatted_address TEXT,
    latitude FLOAT,
    longitude FLOAT,
    price_level INTEGER,
    rating FLOAT,
    user_ratings_count INTEGER,
    created DATETIME,
    updated DATETIME
);

CREATE TABLE search (
    id INTEGER NOT NULL UNIQUE,
    owner INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE,
    participant_count INTEGER,
    match_made BOOLEAN NOT NULL DEFAULT false,
)


CREATE TABLE search_in_progress (
    edible_count INTEGER,
    option INTEGER NOT NULL REFERENCES options("id") ON DELETE CASCADE,
    search INTEGER NOT NULL REFERENCES search("id") ON DELETE CASCADE
)


CREATE TABLE search_participation_in_progress (
    edible BOOLEAN NOT NULL,
    user INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE,
    option INTEGER NOT NULL REFERENCES options("id") ON DELETE CASCADE,
    search INTEGER NOT NULL REFERENCES search("id") ON DELETE CASCADE
)



-- nosql data version of in progress data
-- id = search_id
-- option_counts = {option_id: count, ....}
-- participant_feedback = {user_id: {option_id: bool}}, {user_id: {option_id: bool}, {option_id: bool}}

-- Future:
-- consider future enhancements that involve search filters
