"use server"

import { db } from "@/lib/db"
import { albums, reviews } from "@/lib/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/session"

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
    .orderBy(asc(reviews.author))
  return { album, reviews: albumReviews }
}

export async function createAlbum(formData: FormData) {
  if (!(await isAdmin())) throw new Error("No autorizado")
  const artist = String(formData.get("artist") ?? "").trim()
  const title = String(formData.get("title") ?? "").trim()
  const yearRaw = String(formData.get("year") ?? "").trim()
  const genre = String(formData.get("genre") ?? "").trim()
  const coverUrl = String(formData.get("coverUrl") ?? "").trim()
  if (!artist || !title) throw new Error("Artista y título son obligatorios")

  await db.insert(albums).values({
    artist,
    title,
    year: yearRaw ? Number.parseInt(yearRaw, 10) : null,
    genre: genre || null,
    coverUrl: coverUrl || null,
  })
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteAlbum(id: number) {
  if (!(await isAdmin())) throw new Error("No autorizado")
  await db.delete(reviews).where(eq(reviews.albumId, id))
  await db.delete(albums).where(eq(albums.id, id))
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function upsertReview(formData: FormData) {
  if (!(await isAdmin())) throw new Error("No autorizado")
  const albumId = Number.parseInt(String(formData.get("albumId") ?? ""), 10)
  const author = String(formData.get("author") ?? "").trim()
  const body = String(formData.get("body") ?? "").trim()
  const ratingRaw = String(formData.get("rating") ?? "").trim()
  if (!albumId || !author || !body) {
    throw new Error("Álbum, autor y texto son obligatorios")
  }
  const rating = ratingRaw ? Number.parseInt(ratingRaw, 10) : null

  // One review per author per album: replace if it exists.
  const [existing] = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.albumId, albumId), eq(reviews.author, author)))

  if (existing) {
    await db
      .update(reviews)
      .set({ body, rating })
      .where(eq(reviews.id, existing.id))
  } else {
    await db.insert(reviews).values({ albumId, author, body, rating })
  }
  revalidatePath("/")
  revalidatePath(`/album/${albumId}`)
  revalidatePath("/admin")
}

export async function deleteReview(id: number, albumId: number) {
  if (!(await isAdmin())) throw new Error("No autorizado")
  await db.delete(reviews).where(eq(reviews.id, id))
  revalidatePath(`/album/${albumId}`)
  revalidatePath("/admin")
}
