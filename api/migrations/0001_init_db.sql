-- Migration number: 0001 	 2025-08-20T14:07:49.317Z
CREATE TABLE IF NOT EXISTS Users (
  username TEXT NOT NULL PRIMARY KEY,
  password_hash TEXT NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
);
