ALTER TABLE users
ADD COLUMN avatar_url VARCHAR(255);
ALTER COLUMN username DROP NOT NULL;
