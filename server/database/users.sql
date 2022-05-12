DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    firstname      VARCHAR(255) NOT NULL,
    lastname       VARCHAR(255) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    profile_picture_url TEXT,  
    bio             TEXT,
    passwordhash   VARCHAR NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
