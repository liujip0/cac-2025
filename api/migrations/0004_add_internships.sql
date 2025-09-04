-- Migration number: 0004 	 2025-09-04T15:45:52.478Z
CREATE TABLE IF NOT EXISTS Internships (
  title TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  hours TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  business TEXT NOT NULL,
  FOREIGN KEY (business) REFERENCES Users (username)
);