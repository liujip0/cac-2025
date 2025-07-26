-- Migration number: 0001 	 2025-07-25T22:53:42.834Z
DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (
  username PRIMARY KEY NOT NULL,
  user_type text CHECK (userType IN ('student', 'parent', 'business')) NOT NULL,
  hashedPassword text NOT NULL
);

DROP TABLE IF EXISTS Internships;

CREATE TABLE IF NOT EXISTS Internships (
  id integer PRIMARY KEY,
  internship_name text NOT NULL,
  business text NOT NULL,
  FOREIGN KEY (internship_name) REFERENCES Users (username) ON UPDATE CASCADE ON DELETE CASCADE
);