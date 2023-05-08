CREATE DATABASE NetworkDatabase;

CREATE TABLE users(
    user_id VARCHAR(100) PRIMARY KEY,
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
    network_score DECIMAL(10,2),
    card_key VARCHAR(255) UNIQUE
);

    FOREIGN KEY(card_key) REFERENCES cards(key_id) ON DELETE SET NULL

CREATE TABLE cards(
    card_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE,
    is_locked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
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