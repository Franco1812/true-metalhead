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

-- Tapas subidas desde /admin. Van en tabla aparte y no como columna de
-- `albums` porque getAlbums() hace SELECT * y traeria los bytes de todas
-- las tapas en cada carga de la home.
-- Las sirve app/api/covers/[id]/route.ts
CREATE TABLE IF NOT EXISTS album_covers (
  album_id   integer PRIMARY KEY,
  data       bytea NOT NULL,
  mime       text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
