-- Esquema de la base. Refleja exactamente lib/db/schema.ts (Drizzle).
-- Si cambias uno, cambia el otro.
--
-- Correr sobre una base vacia:
--   node db/apply.mjs db/schema.sql
--   node db/apply.mjs db/seed.sql
-- (o con psql, si lo tenes: psql "$DATABASE_URL" -f db/schema.sql)
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

-- Cuentas del sitio. Registro abierto: cualquiera puede crear una y resenar.
-- is_admin es lo unico que habilita cargar y borrar discos (/admin).
CREATE TABLE IF NOT EXISTS users (
  id            serial PRIMARY KEY,
  name          text NOT NULL,
  email         text NOT NULL,
  password_hash text NOT NULL,
  is_admin      boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON users (email);

CREATE TABLE IF NOT EXISTS reviews (
  id         serial PRIMARY KEY,
  album_id   integer NOT NULL,
  -- Nombre mostrado, congelado al escribir la resena.
  author     text NOT NULL,
  -- Queda en NULL en las resenas anteriores a las cuentas (las del seed).
  user_id    integer,
  rating     integer,
  body       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Para bases que ya existian antes de las cuentas.
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS user_id integer;

-- Una resena por persona y por disco. Las filas con user_id NULL no chocan
-- entre si: Postgres considera distintos a dos NULL en un indice unico.
CREATE UNIQUE INDEX IF NOT EXISTS reviews_album_user_key
  ON reviews (album_id, user_id);

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
