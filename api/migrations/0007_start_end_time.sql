-- Migration number: 0007 	 2025-09-25T15:17:44.041Z
CREATE TABLE IF NOT EXISTS NEW_Internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  start_time TEXT,
  end_time TEXT,
  description TEXT NOT NULL,
  address TEXT,
  business TEXT NOT NULL,
  FOREIGN KEY (business) REFERENCES Users (username)
);

INSERT INTO
  NEW_Internships (
    id,
    title,
    start_date,
    end_date,
    description,
    address,
    business
  )
SELECT
  id,
  title,
  start_date,
  end_date,
  description,
  address,
  business
FROM
  Internships;

DROP TABLE Internships;

ALTER TABLE NEW_Internships
RENAME TO Internships;
