import { db } from "@/lib/db"
import { albumCovers } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// Sirve las tapas subidas desde /admin, que se guardan como bytea en Postgres.
// Las 44 tapas originales son archivos estáticos en public/covers y no pasan
// por acá.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const albumId = Number.parseInt(id, 10)
  if (!Number.isInteger(albumId)) {
    return new Response("Id inválido", { status: 400 })
  }

  const [cover] = await db
    .select()
    .from(albumCovers)
    .where(eq(albumCovers.albumId, albumId))

  if (!cover) return new Response("No encontrada", { status: 404 })

  // El ETag cambia cuando se reemplaza la tapa, así que el navegador puede
  // cachear fuerte sin quedarse con una imagen vieja.
  const etag = `"${albumId}-${cover.updatedAt.getTime()}"`
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } })
  }

  return new Response(new Uint8Array(cover.data), {
    headers: {
      "Content-Type": cover.mime,
      "Content-Length": String(cover.data.length),
      ETag: etag,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
