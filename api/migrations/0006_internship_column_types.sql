-- Migration number: 0006 	 2025-09-10T15:36:54.870Z
CREATE TABLE IF NOT EXISTS NEW_Internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  hours TEXT,
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
    hours,
    description,
    address,
    business
  )
SELECT
  id,
  title,
  start_date,
  end_date,
  hours,
  description,
  address,
  business
FROM
  Internships;

DROP TABLE Internships;

ALTER TABLE NEW_Internships
RENAME TO Internships;
