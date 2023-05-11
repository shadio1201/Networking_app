CREATE DATABASE NetworkDatabase;

CREATE TABLE users(
    user_id VARCHAR(100) PRIMARY KEY,
    created_at DATE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic TEXT,
    birthday DATE NOT NULL,
    titel VARCHAR(255),
    description TEXT,
    industry_type VARCHAR(255),
    contact_details jsonb DEFAULT '{}',
    location jsonb DEFAULT '{}',
    experience jsonb DEFAULT '{}',
    educations jsonb DEFAULT '{}',
    skills jsonb DEFAULT '{}',
    approvals jsonb DEFAULT '{}',
    saved_profiles jsonb DEFAULT '{}',
    network_score DECIMAL(10,2),
    isActive BOOLEAN DEFAULT FALSE,
    card_key VARCHAR(255) UNIQUE
);

    FOREIGN KEY(card_key) REFERENCES cards(key_id) ON DELETE SET NULL

CREATE TABLE cards(
    card_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE,
    is_locked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tokens(
    session_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    refreshToken VARCHAR NOT NULL
);

ALTER TABLE users ADD FOREIGN KEY(card_key) REFERENCES cards(card_id) ON DELETE SET NULL;



/* TRIGGERS */
CREATE OR REPLACE FUNCTION set_auto_cardUpdate()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS $$
BEGIN
    UPDATE users SET card_key = NEW.card_id WHERE user_id = NEW.user_id;
END;
$$

CREATE TRIGGER auto_insert_cardId
    AFTER INSERT
    ON cards 
    FOR EACH ROW
    EXECUTE PROCEDURE set_auto_cardUpdate();






{
    "email": "lkr97km@hotmail.dk",
    "firstname": "Lasse",
    "lastname": "Kjellerup",
    "password": "password",
    "birthday": "1997-01-08",
    "details": {
        "telefon": "21998287",
        "email": "lkr97km@hotmail.dk"
    }
}

{
    "email": "test@test.dk",
    "firstname": "Anton",
    "lastname": "Larsen",
    "password": "password",
    "birthday": "1998-11-28",
    "details": {
        "telefon": "00000000",
        "email": "test@test.dk"
    }
}

{
    "email": "test2@test.dk",
    "firstname": "Michela",
    "lastname": "Damm",
    "password": "password",
    "birthday": "1995-02-12",
    "details": {
        "telefon": "55225395",
        "email": "test2@test.dk"
    }
}

UPDATE users SET experience='[{"position":"Multimedie Designer, AP","company":"IBA, Erhvervsakademi", "periode":"2020-2022", "location": "Kolding, Danmark"}]' WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';

UPDATE users SET educations='[{"education":"Multimedie Designer, AP","school":"IBA, Erhvervsakademi", "periode":"2020-2022", "location": "Kolding, Danmark"}]' WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';

UPDATE users SET skills='{"list": ["HTML", "CSS", "Javascript", "React", "Vue", "Express", "Nodejs"]}' WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';

UPDATE users SET location='{"city": "Kolding", "area": "Syddanmark", "country": "Danmark"}', description='Jeg er en super engageret 25 årig multimediedesigner fra Kolding. Jeg vil beskrive mig selv som ambitiøs og kvalitetsbevidst med en bred grafisk og teknisk forståelse.' WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';

UPDATE users SET description='Jeg er en super engageret 25 årig multimediedesigner fra Kolding. Jeg vil beskrive mig selv som ambitiøs og kvalitetsbevidst med en bred grafisk og teknisk forståelse.' WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';

UPDATE users SET approvals='{"users": ["1", "2", "3", "4"]}' WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';


SELECT email FROM users WHERE user_id IN ('b47d236c969c49caaded5ccda2297c8c', 'd3c834dc2a2149ad8ff98cbbd4487bbd');

SELECT approvals FROM users WHERE user_id='d3c834dc2a2149ad8ff98cbbd4487bbd';