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
SELECT 4, 'Megadeth', 'Killing Is My Business... and Business Is Good!', 1985, '/covers/4.jpg', 'Speed Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 4);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 5, 'Megadeth', 'Peace Sells... but Who''s Buying?', 1986, '/covers/5.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 5);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 6, 'Megadeth', 'So Far, So Good... So What!', 1988, '/covers/6.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 6);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 7, 'Megadeth', 'Rust in Peace', 1990, '/covers/7.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 7);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 8, 'Megadeth', 'Countdown to Extinction', 1992, '/covers/8.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 8);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 9, 'Megadeth', 'Youthanasia', 1994, '/covers/9.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 9);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 10, 'Megadeth', 'Cryptic Writings', 1997, '/covers/10.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 10);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 11, 'Megadeth', 'Risk', 1999, '/covers/11.jpg', 'Hard Rock'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 11);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 12, 'Megadeth', 'The World Needs a Hero', 2001, '/covers/12.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 12);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 13, 'Megadeth', 'The System Has Failed', 2004, '/covers/13.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 13);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 14, 'Megadeth', 'United Abominations', 2007, '/covers/14.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 14);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 15, 'Megadeth', 'Endgame', 2009, '/covers/15.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 15);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 16, 'Megadeth', 'Th1rt3en', 2011, '/covers/16.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 16);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 17, 'Megadeth', 'Super Collider', 2013, '/covers/17.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 17);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 18, 'Megadeth', 'Dystopia', 2016, '/covers/18.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 18);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 19, 'Megadeth', 'The Sick, the Dying... and the Dead!', 2022, '/covers/19.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 19);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 20, 'Megadeth', 'Megadeth', 2026, '/covers/20.jpg', 'Thrash Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 20);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 21, 'Nirvana', 'Bleach', 1989, '/covers/21.jpg', 'Grunge'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 21);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 22, 'Nirvana', 'Nevermind', 1991, '/covers/22.jpg', 'Grunge'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 22);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 23, 'Nirvana', 'In Utero', 1993, '/covers/23.jpg', 'Grunge'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 23);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 24, 'Death', 'Scream Bloody Gore', 1987, '/covers/24.jpg', 'Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 24);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 25, 'Death', 'Leprosy', 1988, '/covers/25.jpg', 'Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 25);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 26, 'Death', 'Spiritual Healing', 1990, '/covers/26.jpg', 'Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 26);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 27, 'Death', 'Human', 1991, '/covers/27.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 27);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 28, 'Death', 'Individual Thought Patterns', 1993, '/covers/28.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 28);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 29, 'Death', 'Symbolic', 1995, '/covers/29.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 29);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 30, 'Death', 'The Sound of Perseverance', 1998, '/covers/30.jpg', 'Technical Death Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 30);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 31, 'Iron Maiden', 'Iron Maiden', 1980, '/covers/31.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 31);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 32, 'Iron Maiden', 'Killers', 1981, '/covers/32.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 32);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 33, 'Iron Maiden', 'The Number of the Beast', 1982, '/covers/33.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 33);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 34, 'Iron Maiden', 'Piece of Mind', 1983, '/covers/34.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 34);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 35, 'Iron Maiden', 'Powerslave', 1984, '/covers/35.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 35);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 36, 'Iron Maiden', 'Somewhere in Time', 1986, '/covers/36.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 36);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 37, 'Iron Maiden', 'Seventh Son of a Seventh Son', 1988, '/covers/37.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 37);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 38, 'Iron Maiden', 'No Prayer for the Dying', 1990, '/covers/38.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 38);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 39, 'Iron Maiden', 'Fear of the Dark', 1992, '/covers/39.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 39);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 40, 'Iron Maiden', 'The X Factor', 1995, '/covers/40.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 40);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 41, 'Iron Maiden', 'Virtual XI', 1998, '/covers/41.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 41);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 42, 'Iron Maiden', 'Brave New World', 2000, '/covers/42.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 42);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 43, 'Iron Maiden', 'Dance of Death', 2003, '/covers/43.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 43);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 44, 'Iron Maiden', 'A Matter of Life and Death', 2006, '/covers/44.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 44);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 45, 'Iron Maiden', 'The Final Frontier', 2010, '/covers/45.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 45);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 46, 'Iron Maiden', 'The Book of Souls', 2015, '/covers/46.jpg', 'Heavy Metal'
WHERE NOT EXISTS (SELECT 1 FROM albums WHERE id = 46);
INSERT INTO albums (id, artist, title, year, cover_url, genre)
SELECT 47, 'Iron Maiden', 'Senjutsu', 2021, '/covers/47.jpg', 'Heavy Metal'
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
