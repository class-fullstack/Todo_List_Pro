CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status INTEGER DEFAULT 0, -- 0: Incomplete, 1: Complete
    is_deleted BOOLEAN DEFAULT FALSE, -- Mark as deleted
    due_date DATE, -- Due date of the task
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);