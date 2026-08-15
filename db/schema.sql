-- Esquema de la base. Refleja exactamente lib/db/schema.ts (Drizzle).
-- Si cambias uno, cambia el otro.
--
-- Correr sobre una base vacia:
--   psql "$DATABASE_URL" -f db/schema.sql
--   psql "$DATABASE_URL" -f db/seed.sql
--
-- Es idempotente: se puede correr de nuevo sin romper nada.

CREATE TABLE IF NOT EXISTS albums (
  id         serial PRIMARY KEY,
  artist     text NOT NULL,
  title      text NOT NULL,
  year       integer,
  cover_url  text,
  genre      text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id         serial PRIMARY KEY,
  album_id   integer NOT NULL,
  author     text NOT NULL,
  rating     integer,
  body       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
