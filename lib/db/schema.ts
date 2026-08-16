import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  customType,
} from "drizzle-orm/pg-core"

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType: () => "bytea",
})

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  artist: text("artist").notNull(),
  title: text("title").notNull(),
  year: integer("year"),
  coverUrl: text("cover_url"),
  genre: text("genre"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull(),
  author: text("author").notNull(),
  rating: integer("rating"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// Las tapas subidas desde /admin viven acá y no en `albums`, porque getAlbums()
// hace un SELECT * y traería los bytes de las 45 tapas en cada carga de la home.
export const albumCovers = pgTable("album_covers", {
  albumId: integer("album_id").primaryKey(),
  data: bytea("data").notNull(),
  mime: text("mime").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type Album = typeof albums.$inferSelect
export type Review = typeof reviews.$inferSelect
export type AlbumCover = typeof albumCovers.$inferSelect
