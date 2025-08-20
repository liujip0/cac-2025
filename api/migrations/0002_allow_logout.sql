-- Migration number: 0002 	 2025-08-20T17:06:31.825Z
ALTER TABLE Users
ADD COLUMN token_secret TEXT;
