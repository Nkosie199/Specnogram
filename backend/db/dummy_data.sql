INSERT INTO specnogram.users (user_name, email, role_id)
VALUES
  ('Alice Johnson', 'alice@example.com', 1),
  ('Bob Smith', 'bob@example.com', 2),
  ('Charlie Green', 'charlie@example.com', 3);

INSERT INTO specnogram.roles (role_id, user_id, description)
VALUES
  (1, 1, 'Admin'),
  (2, 2, 'Project Manager'),
  (3, 3, 'Developer');

INSERT INTO specnogram.projects (user_id, title, description, deadline)
VALUES
  (1, 'Specnogram V1', 'Initial release of the app', '2025-06-30'),
  (2, 'Marketing Website', 'Build landing and documentation', '2025-05-15');

INSERT INTO specnogram.tasks (project_id, title, description, status, start_date, duration_in_days, reporter, assignee)
VALUES
  (1, 'Set up DB schema', 'Define initial tables and constraints', 'Completed', '2025-04-01', 3, 'Alice Johnson', 'Charlie Green'),
  (1, 'Implement Auth', 'OAuth2 login with Google', 'In Progress', '2025-04-05', 5, 'Alice Johnson', 'Bob Smith'),
  (2, 'Design landing page', 'Create responsive UI for homepage', 'To Do', '2025-04-10', 4, 'Bob Smith', 'Charlie Green');

INSERT INTO specnogram.notifications (user_id, message, is_read, created_at)
VALUES
  (3, 'You have been assigned a new task.', false, NOW()),
  (2, 'Your task is due in 2 days.', true, NOW()),
  (1, 'Project deadline approaching!', false, NOW());
