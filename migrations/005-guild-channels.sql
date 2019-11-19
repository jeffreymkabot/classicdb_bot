-- Up
CREATE TABLE guild_textchannels (
	id TEXT NOT NULL UNIQUE,
	name TEXT,
	allowed INTEGER NOT NULL DEFAULT 0,
	guild_id INTEGER NOT NULL REFERENCES guild_configs(id) ON DELETE CASCADE
);
-- Down
ALTER TABLE guild_configs RENAME TO tmp;
CREATE TABLE guild_configs (
    id TEXT NOT NULL UNIQUE,
    parser TEXT NOT NULL,
    memes INTEGER NOT NULL DEFAULT 0,
    icon TEXT,
	name TEXT
);
INSERT INTO guild_configs
    SELECT
        id, parser, memes, icon, name
    FROM
        tmp;
DROP TABLE tmp;
DROP TABLE guild_textchannels;
