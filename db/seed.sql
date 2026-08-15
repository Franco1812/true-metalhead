-- Datos del sitio: discografias cargadas desde MusicBrainz + Cover Art Archive.
-- Generado desde la base local el 2026-08-15.
--
--   psql "$DATABASE_URL" -f db/seed.sql
--
-- Idempotente: re-correrlo no duplica filas.
-- Los id van explicitos para que reviews.album_id siga apuntando bien.

BEGIN;

-- 47 discos
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 1, 'Spinetta', 'Artaud', 1973, NULL, 'Rock'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 1);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 2, 'Spinetta', 'Kamikaze', 1982, NULL, 'Folk'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 2);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 3, 'Radiohead', 'In Rainbows', 2007, NULL, 'Art Rock'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 3);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 4, 'Megadeth', 'Killing Is My Business... and Business Is Good!', 1985, 'https://coverartarchive.org/release/ee7f74ee-6110-4e20-83ad-138100bfacfe/8741641801.jpg', 'Speed Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 4);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 5, 'Megadeth', 'Peace Sells... but Who''s Buying?', 1986, 'https://coverartarchive.org/release/585946c1-b920-4257-8ec8-cbdb5ac9e2f5/42308428639-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 5);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 6, 'Megadeth', 'So Far, So Good... So What!', 1988, 'https://coverartarchive.org/release/c1dd9e1e-726a-362a-b512-4c06da84d482/15824046738.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 6);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 7, 'Megadeth', 'Rust in Peace', 1990, 'https://coverartarchive.org/release/e68c6a5e-0773-4b5c-bb66-b6f032bb2db4/12663594543-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 7);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 8, 'Megadeth', 'Countdown to Extinction', 1992, 'https://coverartarchive.org/release/7eddabb7-74ad-48da-b78f-ef5fb0b316b0/40492108544-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 8);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 9, 'Megadeth', 'Youthanasia', 1994, 'https://coverartarchive.org/release/0b0195b1-4e7d-49a7-9866-73b566fbf1dc/42369312078-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 9);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 10, 'Megadeth', 'Cryptic Writings', 1997, 'https://coverartarchive.org/release/c5f4218f-70e8-4ef8-9c0d-6bb560a0fd18/4451463715.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 10);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 11, 'Megadeth', 'Risk', 1999, 'https://coverartarchive.org/release/6b0508a8-e4df-3b02-8a34-7a8204851915/5041318941.jpg', 'Hard Rock'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 11);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 12, 'Megadeth', 'The World Needs a Hero', 2001, 'https://coverartarchive.org/release/771f1527-4c83-4f68-b85e-676cb1235536/14971985152-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 12);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 13, 'Megadeth', 'The System Has Failed', 2004, 'https://coverartarchive.org/release/b93b09e0-5245-334d-8cfb-3db688b9502b/4093130817.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 13);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 14, 'Megadeth', 'United Abominations', 2007, 'https://coverartarchive.org/release/d0cba0a5-8edc-4472-a49f-7e176a4230ad/42533352694-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 14);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 15, 'Megadeth', 'Endgame', 2009, 'https://coverartarchive.org/release/d3a31068-0e0e-4c99-8025-c069e0bf2f27/13980542471.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 15);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 16, 'Megadeth', 'Th1rt3en', 2011, 'https://coverartarchive.org/release/e43d3468-168a-439a-a009-5cd289eafc49/13980610192.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 16);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 17, 'Megadeth', 'Super Collider', 2013, 'https://coverartarchive.org/release/c8e3446d-13a5-4b28-a495-76ec050af61f/15082508140.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 17);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 18, 'Megadeth', 'Dystopia', 2016, 'https://coverartarchive.org/release/dda2c648-0c12-4785-8672-3d8d49fab49b/11661738609-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 18);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 19, 'Megadeth', 'The Sick, the Dying... and the Dead!', 2022, 'https://coverartarchive.org/release/51954851-7ead-47b6-ac5d-a2bfdf6d49fa/32846617879-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 19);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 20, 'Megadeth', 'Megadeth', 2026, 'https://coverartarchive.org/release/ffdd925c-e377-48db-b5d3-1c559cb65105/44165872789-500.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 20);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 21, 'Nirvana', 'Bleach', 1989, 'https://coverartarchive.org/release/adab3feb-1822-4d27-a997-db7d6c9688c0/26212361129-500.jpg', 'Grunge'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 21);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 22, 'Nirvana', 'Nevermind', 1991, 'https://coverartarchive.org/release/c771f7fc-9e62-4349-a2e3-ceaf7122bf5b/30501372565-500.jpg', 'Grunge'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 22);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 23, 'Nirvana', 'In Utero', 1993, 'https://coverartarchive.org/release/7d13c434-1c49-4d7f-b164-a5247108af01/19918667556-500.jpg', 'Grunge'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 23);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 24, 'Death', 'Scream Bloody Gore', 1987, 'https://coverartarchive.org/release/cec8a220-d46d-4f2d-b717-4daa467e7bd4/19231471713-500.jpg', 'Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 24);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 25, 'Death', 'Leprosy', 1988, 'https://coverartarchive.org/release/c719049a-c3ce-47ae-b4a0-d3e36bf186ce/15736289077.png', 'Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 25);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 26, 'Death', 'Spiritual Healing', 1990, 'https://coverartarchive.org/release/6a92cd5e-6eab-4c81-a0ae-23300be56b12/41296296119-500.jpg', 'Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 26);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 27, 'Death', 'Human', 1991, 'https://coverartarchive.org/release/3101ec0b-94c8-4cc2-8079-ae786ba5e838/31324237474-500.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 27);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 28, 'Death', 'Individual Thought Patterns', 1993, 'https://coverartarchive.org/release/0fbb9017-dcc2-4324-ba44-5332f9b3aa61/33427224541-500.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 28);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 29, 'Death', 'Symbolic', 1995, 'https://coverartarchive.org/release/e77c72ec-6e3f-4e4f-917c-3e7f1125884a/13631387236-500.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 29);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 30, 'Death', 'The Sound of Perseverance', 1998, 'https://coverartarchive.org/release/d679b409-6215-4ad7-8471-092bc9a36eb8/3296791761-500.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 30);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 31, 'Iron Maiden', 'Iron Maiden', 1980, 'https://coverartarchive.org/release/761b0e6f-da07-43a8-ad04-9c8686f5b140/40599690635-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 31);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 32, 'Iron Maiden', 'Killers', 1981, 'https://coverartarchive.org/release/b7b27bcb-d886-4d32-94e9-28dcf780d965/24771707979-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 32);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 33, 'Iron Maiden', 'The Number of the Beast', 1982, 'https://coverartarchive.org/release/dc5ff6c2-a3d3-408b-aa92-d18e6b484b66/33794545250-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 33);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 34, 'Iron Maiden', 'Piece of Mind', 1983, 'https://coverartarchive.org/release/bb33b22e-c3f0-4ace-b1f7-c29e3f2b6741/33792624242-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 34);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 35, 'Iron Maiden', 'Powerslave', 1984, 'https://coverartarchive.org/release/635b1461-f8c9-4b32-b465-10b75a6d28aa/40599548804-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 35);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 36, 'Iron Maiden', 'Somewhere in Time', 1986, 'https://coverartarchive.org/release/6331f06d-465d-4327-8e67-107c26b9eaa9/20759335832-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 36);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 37, 'Iron Maiden', 'Seventh Son of a Seventh Son', 1988, 'https://coverartarchive.org/release/6e435895-dc69-4215-bb4c-5274c7ccf70d/7847614730.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 37);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 38, 'Iron Maiden', 'No Prayer for the Dying', 1990, 'https://coverartarchive.org/release/77ac07fc-c17a-4ab6-bddc-88d352b681d3/7847685484.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 38);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 39, 'Iron Maiden', 'Fear of the Dark', 1992, 'https://coverartarchive.org/release/978c4483-e56a-4ba7-acdc-ecb782d25371/14000958155.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 39);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 40, 'Iron Maiden', 'The X Factor', 1995, 'https://coverartarchive.org/release/906baae0-3da8-3bad-af10-e514258129c6/15754970976.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 40);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 41, 'Iron Maiden', 'Virtual XI', 1998, 'https://coverartarchive.org/release/b3fa4632-d70a-3f87-b0ab-9fc16776cbe9/7123280420-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 41);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 42, 'Iron Maiden', 'Brave New World', 2000, 'https://coverartarchive.org/release/f64e95fb-5e84-42c7-90e6-6cad939d8eec/3309838336-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 42);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 43, 'Iron Maiden', 'Dance of Death', 2003, 'https://coverartarchive.org/release/f33e3eb5-6599-48d1-a883-5aaa78c9a78b/24121372385-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 43);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 44, 'Iron Maiden', 'A Matter of Life and Death', 2006, 'https://coverartarchive.org/release/f528efaf-a19c-4701-8fbe-d2d252449093/4902777439-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 44);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 45, 'Iron Maiden', 'The Final Frontier', 2010, 'https://coverartarchive.org/release/f1f6be5a-b6e3-4553-b157-1182e0807606/19075168288-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 45);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 46, 'Iron Maiden', 'The Book of Souls', 2015, 'https://coverartarchive.org/release/8ea66778-0ae4-4f3d-af96-ae372a5b300b/35102144664-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 46);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 47, 'Iron Maiden', 'Senjutsu', 2021, 'https://coverartarchive.org/release/510d9daf-5f3a-41e9-b066-65b774fb4ca0/30324165465-500.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 47);

-- 3 resenas
INSERT INTO reviews (id, album_id, author, rating, body)
SELECT 1, 1, 'Franco', 5, 'Un disco que no envejece.'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE id = 1);
INSERT INTO reviews (id, album_id, author, rating, body)
SELECT 2, 1, 'Cecilia', 4, 'Cada escucha encuentra algo nuevo.'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE id = 2);
INSERT INTO reviews (id, album_id, author, rating, body)
SELECT 3, 3, 'Franco', 5, 'Produccion impecable de punta a punta.'
WHERE NOT EXISTS (SELECT 1 FROM reviews WHERE id = 3);

-- Sin esto, el proximo alta desde /admin chocaria con los id ya usados.
SELECT setval('albums_id_seq',  (SELECT coalesce(max(id), 1) FROM albums));
SELECT setval('reviews_id_seq', (SELECT coalesce(max(id), 1) FROM reviews));

COMMIT;
