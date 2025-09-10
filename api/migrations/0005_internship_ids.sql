-- Migration number: 0005 	 2025-09-10T12:33:08.298Z
CREATE TABLE IF NOT EXISTS NEW_Internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  hours TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  business TEXT NOT NULL,
  FOREIGN KEY (business) REFERENCES Users (username)
);

INSERT INTO
  NEW_Internships (
    title,
    start_date,
    end_date,
    hours,
    description,
    address,
    business
  )
SELECT
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
