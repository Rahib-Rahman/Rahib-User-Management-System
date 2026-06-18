CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL,    
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- sort by login
    registration_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    status VARCHAR(20) DEFAULT 'unconfirmed' -- status: unconfirmed, active, blocked
);
