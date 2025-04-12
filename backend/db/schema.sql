CREATE SCHEMA IF NOT EXISTS specnogram;
SET search_path TO specnogram;

CREATE TABLE roles (
    role_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    role_id INT REFERENCES roles(role_id),
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE projects (
    project_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    deadline TIMESTAMP
);

CREATE TABLE tasks (
    task_id INT PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    start_date TIMESTAMP,
    duration_in_days INT,
    reporter VARCHAR(50) NOT NULL,
    assignee VARCHAR(50)
);

CREATE TABLE notifications (
    notification_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
