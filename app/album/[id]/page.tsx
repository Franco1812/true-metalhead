import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAlbumWithReviews, getAlbums } from "@/app/actions/albums"
import { SiteHeader } from "@/components/site-header"
import { VinylCover } from "@/components/vinyl-cover"
import { ReviewPanel } from "@/components/review-panel"
import { AUTHORS } from "@/lib/authors"

// Igual que la home: cacheada, y revalidatePath(`/album/${id}`) la refresca
// apenas se guarda o borra una resena.
export const revalidate = 3600

// Sin esto el segmento dinamico se renderiza en cada visita y `revalidate` se
// ignora. Prerenderiza las fichas existentes; las de discos nuevos se generan
// on-demand y quedan cacheadas igual (dynamicParams viene en true por defecto).
export async function generateStaticParams() {
  const albums = await getAlbums()
  return albums.map((a) => ({ id: String(a.id) }))
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const albumId = Number(id)
  if (Number.isNaN(albumId)) notFound()

  const data = await getAlbumWithReviews(albumId)
  if (!data) notFound()

  const { album, reviews: albumReviews } = data

  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a la discoteca
        </Link>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
          <div className="w-48 shrink-0 sm:w-56">
            <VinylCover title={album.title} artist={album.artist} coverUrl={album.coverUrl} />
          </div>
          <div className="flex-1">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-primary">{album.artist}</p>
            <h1 className="mt-1 text-balance font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
              {album.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {album.year ? <span>{album.year}</span> : null}
              {album.genre ? (
                <span className="rounded-full border border-border px-3 py-0.5 text-xs uppercase tracking-wider">
                  {album.genre}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">Las reseñas</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {AUTHORS.map((author) => {
              const review = albumReviews.find((r) => r.author === author) ?? null
              return (
                <ReviewPanel
                  key={author}
                  author={author}
                  review={review}
                  albumId={album.id}
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
