CREATE TABLE task_categories (
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    is_deleted BOOLEAN DEFAULT FALSE, -- Mark as deleted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id, category_id) -- Primary key is a combination of task_id and category_id
);