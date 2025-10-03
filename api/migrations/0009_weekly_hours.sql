-- Migration number: 0009 	 2025-10-03T14:44:21.076Z
CREATE TABLE IF NOT EXISTS NEW_Internships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  weekly_hours REAL,
  description TEXT NOT NULL,
  address TEXT,
  business TEXT NOT NULL,
  hourly_pay REAL,
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
    business,
    hourly_pay
  )
SELECT
  id,
  title,
  start_date,
  end_date,
  description,
  address,
  business,
  hourly_pay
FROM
  Internships;

DROP TABLE Internships;

ALTER TABLE NEW_Internships
RENAME TO Internships;
