-- Migration number: 0010 	 2025-10-29T05:51:37.489Z
CREATE TABLE IF NOT EXISTS NEW_Internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  business TEXT NOT NULL,
  website_url TEXT,
  email TEXT,
  description TEXT NOT NULL,
  industry TEXT,
  length_weeks INTEGER,
  weekly_hours_low REAL,
  weekly_hours_high REAL,
  age_min INTEGER,
  age_max INTEGER,
  address TEXT,
  hourly_pay REAL,
  FOREIGN KEY (business) REFERENCES Users (username)
);

INSERT INTO
  NEW_Internships (
    id,
    title,
    business,
    description,
    address,
    hourly_pay
  )
SELECT
  id,
  title,
  business,
  description,
  address,
  hourly_pay
FROM
  Internships;

DROP TABLE Internships;

ALTER TABLE NEW_Internships
RENAME TO Internships;

CREATE TABLE IF NOT EXISTS NEW_Users (
  username TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  token_secret TEXT,
  user_type TEXT NOT NULL CHECK (
    user_type IN (
      'admin',
      'student',
      'business',
      'parent',
      'teacher'
    )
  ) DEFAULT 'student'
);

INSERT INTO
  NEW_Users (
    username,
    password_hash,
    email,
    first_name,
    last_name,
    token_secret,
    user_type
  )
SELECT
  username,
  password_hash,
  email,
  first_name,
  last_name,
  token_secret,
  user_type
FROM
  Users;

DROP TABLE Users;

ALTER TABLE NEW_Users
RENAME TO Users;
