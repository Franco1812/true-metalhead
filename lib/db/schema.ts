import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core"

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

export type Album = typeof albums.$inferSelect
export type Review = typeof reviews.$inferSelect
