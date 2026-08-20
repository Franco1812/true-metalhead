import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  customType,
  uniqueIndex,
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

// Cuentas del sitio. Cualquiera puede registrarse y reseñar; `isAdmin` es lo
// único que habilita cargar y borrar discos.
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    // Siempre en minúsculas, así el login no depende de cómo lo escriban.
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    isAdmin: boolean("is_admin").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [uniqueIndex("users_email_key").on(t.email)],
)

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    albumId: integer("album_id").notNull(),
    // `author` queda como nombre mostrado y congelado en el momento de escribir.
    // Las reseñas viejas (anteriores a las cuentas) tienen author sin userId.
    author: text("author").notNull(),
    userId: integer("user_id"),
    rating: integer("rating"),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  // Una reseña por persona y por disco: el upsert se apoya en esto.
  (t) => [uniqueIndex("reviews_album_user_key").on(t.albumId, t.userId)],
)

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
export type User = typeof users.$inferSelect
export type AlbumCover = typeof albumCovers.$inferSelect
