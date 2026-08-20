"use server"

import { db } from "@/lib/db"
import { albums, albumCovers, reviews, users } from "@/lib/db/schema"
import { and, asc, desc, eq, isNull, or, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/session"
import { requireUser } from "@/lib/auth"

export async function getAlbums() {
  return db
    .select()
    .from(albums)
    .orderBy(asc(albums.artist), asc(albums.year))
}

export async function getAllReviews() {
  return db.select().from(reviews)
}

export async function getAlbumWithReviews(id: number) {
  const [album] = await db.select().from(albums).where(eq(albums.id, id))
  if (!album) return null
  const albumReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.albumId, id))
    .orderBy(asc(reviews.createdAt), asc(reviews.id))
  return { album, reviews: albumReviews }
}

// El muro de /resenas: todo lo que escribio todo el mundo, lo ultimo primero.
export async function getReviewsFeed(limit = 200) {
  return db
    .select({
      id: reviews.id,
      body: reviews.body,
      rating: reviews.rating,
      author: reviews.author,
      userId: reviews.userId,
      createdAt: reviews.createdAt,
      albumId: albums.id,
      albumTitle: albums.title,
      albumArtist: albums.artist,
      albumYear: albums.year,
      albumCoverUrl: albums.coverUrl,
    })
    .from(reviews)
    .innerJoin(albums, eq(reviews.albumId, albums.id))
    .orderBy(desc(reviews.createdAt), desc(reviews.id))
    .limit(limit)
}

// Solo id y nombre: el email y el hash no salen nunca de acá.
export async function getUsers() {
  return db
    .select({ id: users.id, name: users.name, createdAt: users.createdAt })
    .from(users)
    .orderBy(asc(users.name))
}

export async function getUserWithReviews(id: number) {
  const [user] = await db
    .select({ id: users.id, name: users.name, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.id, id))
  if (!user) return null
  const suyas = await db
    .select({
      id: reviews.id,
      body: reviews.body,
      rating: reviews.rating,
      author: reviews.author,
      userId: reviews.userId,
      createdAt: reviews.createdAt,
      albumId: albums.id,
      albumTitle: albums.title,
      albumArtist: albums.artist,
      albumYear: albums.year,
      albumCoverUrl: albums.coverUrl,
    })
    .from(reviews)
    .innerJoin(albums, eq(reviews.albumId, albums.id))
    .where(eq(reviews.userId, id))
    .orderBy(desc(reviews.createdAt), desc(reviews.id))
  return { user, reviews: suyas }
}

// Vercel corta el cuerpo de una server action en 4.5 MB.
const MAX_TAPA_BYTES = 4 * 1024 * 1024

// No confiamos en el type que declara el navegador: lo verificamos contra los
// primeros bytes del archivo.
function detectarImagen(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg"
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47)
    return "image/png"
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  )
    return "image/webp"
  return null
}

async function leerTapa(formData: FormData) {
  const file = formData.get("coverFile")
  if (!(file instanceof File) || file.size === 0) return null
  if (file.size > MAX_TAPA_BYTES) {
    throw new Error(
      `La imagen pesa ${(file.size / 1024 / 1024).toFixed(1)} MB y el máximo es 4 MB`,
    )
  }
  const bytes = new Uint8Array(await file.arrayBuffer())
  const mime = detectarImagen(bytes)
  if (!mime) throw new Error("El archivo no es una imagen JPG, PNG ni WEBP")
  return { bytes: Buffer.from(bytes), mime }
}

export async function createAlbum(formData: FormData) {
  if (!(await isAdmin())) throw new Error("No autorizado")
  const artist = String(formData.get("artist") ?? "").trim()
  const title = String(formData.get("title") ?? "").trim()
  const yearRaw = String(formData.get("year") ?? "").trim()
  const genre = String(formData.get("genre") ?? "").trim()
  const coverUrl = String(formData.get("coverUrl") ?? "").trim()
  if (!artist || !title) throw new Error("Artista y título son obligatorios")

  const tapa = await leerTapa(formData)

  // En una transacción: si falla al guardar la imagen, no queda un disco
  // apuntando a una tapa inexistente.
  await db.transaction(async (tx) => {
    const [creado] = await tx
      .insert(albums)
      .values({
        artist,
        title,
        year: yearRaw ? Number.parseInt(yearRaw, 10) : null,
        genre: genre || null,
        // Si subieron archivo gana el archivo; si no, la URL que hayan pegado.
        coverUrl: tapa ? null : coverUrl || null,
      })
      .returning({ id: albums.id })

    if (tapa) {
      await tx
        .insert(albumCovers)
        .values({ albumId: creado.id, data: tapa.bytes, mime: tapa.mime })
      await tx
        .update(albums)
        .set({ coverUrl: `/api/covers/${creado.id}` })
        .where(eq(albums.id, creado.id))
    }
  })

  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteAlbum(id: number) {
  if (!(await isAdmin())) throw new Error("No autorizado")
  await db.delete(reviews).where(eq(reviews.albumId, id))
  // Sin esto quedarían los bytes de la tapa ocupando lugar para siempre.
  await db.delete(albumCovers).where(eq(albumCovers.albumId, id))
  await db.delete(albums).where(eq(albums.id, id))
  revalidatePath("/")
  revalidatePath("/resenas")
  revalidatePath("/admin")
}

export async function upsertReview(formData: FormData) {
  const user = await requireUser()
  const albumId = Number.parseInt(String(formData.get("albumId") ?? ""), 10)
  const body = String(formData.get("body") ?? "").trim()
  const ratingRaw = String(formData.get("rating") ?? "").trim()
  if (!albumId || !body) throw new Error("Álbum y texto son obligatorios")
  const rating = ratingRaw ? Number.parseInt(ratingRaw, 10) : null
  if (rating !== null && (Number.isNaN(rating) || rating < 1 || rating > 5)) {
    throw new Error("El puntaje va de 1 a 5")
  }

  // Una reseña por persona y por disco: si ya hay, se reemplaza.
  // El `or` también agarra las reseñas viejas sin dueño que llevan su nombre;
  // si no, escribir sobre ese disco dejaría dos reseñas suyas en la ficha.
  const candidatas = await db
    .select()
    .from(reviews)
    .where(
      and(
        eq(reviews.albumId, albumId),
        or(
          eq(reviews.userId, user.id),
          and(
            isNull(reviews.userId),
            sql`lower(${reviews.author}) = ${user.name.toLowerCase()}`,
          ),
        ),
      ),
    )
  const existing =
    candidatas.find((r) => r.userId === user.id) ?? candidatas[0]

  if (existing) {
    await db
      .update(reviews)
      .set({ body, rating, userId: user.id, author: user.name })
      .where(eq(reviews.id, existing.id))
  } else {
    await db
      .insert(reviews)
      .values({ albumId, author: user.name, userId: user.id, body, rating })
  }
  revalidatePath("/")
  revalidatePath("/resenas")
  revalidatePath(`/album/${albumId}`)
  revalidatePath(`/usuario/${user.id}`)
  revalidatePath("/admin")
}

export async function deleteReview(id: number, albumId: number) {
  const [existing] = await db.select().from(reviews).where(eq(reviews.id, id))
  if (!existing) return
  // Cada quien borra la suya; el admin puede borrar cualquiera.
  const user = await requireUser()
  if (existing.userId !== user.id && !(await isAdmin())) {
    throw new Error("No autorizado")
  }
  await db.delete(reviews).where(eq(reviews.id, id))
  revalidatePath("/")
  revalidatePath("/resenas")
  revalidatePath(`/album/${albumId}`)
  revalidatePath(`/usuario/${user.id}`)
  revalidatePath("/admin")
}
