CREATE DATABASE percipia;
CREATE TABLE todo
(
    todo_id SERIAL PRIMARY KEY,
    todo VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);