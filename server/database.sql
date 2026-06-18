-- Clean and final schema
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    registration_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'unverified',
    previous_status VARCHAR(20)
);

-- Ensure previous_status column exists (safe to run multiple times)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS previous_status VARCHAR(20);

-- Backfill existing users
UPDATE users
SET previous_status = status
WHERE previous_status IS NULL;