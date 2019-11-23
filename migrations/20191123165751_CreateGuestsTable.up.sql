CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE guests (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar TEXT NOT NULL
);
