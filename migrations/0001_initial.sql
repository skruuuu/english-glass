PRAGMA foreign_keys=ON;
CREATE TABLE users(id TEXT PRIMARY KEY);
CREATE TABLE sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
CREATE INDEX sessions_expiry ON sessions(expires);
CREATE TABLE attempts(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),skill TEXT NOT NULL CHECK(skill IN ('Listening','Speaking','Reading','Writing')),correct INTEGER NOT NULL CHECK(correct IN (0,1)),created_at INTEGER NOT NULL);
CREATE INDEX attempts_user_time ON attempts(user_id,created_at DESC);
