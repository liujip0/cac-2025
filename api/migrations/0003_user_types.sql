-- Migration number: 0003 	 2025-08-22T12:27:27.406Z
ALTER TABLE Users
ADD COLUMN user_type TEXT NOT NULL CHECK (
  user_type IN (
    'admin',
    'student',
    'business',
    'parent',
    'teacher'
  )
) DEFAULT 'student';

UPDATE Users
SET
  user_type = 'student'
WHERE
  user_type IS NULL;