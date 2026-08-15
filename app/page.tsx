import { getAlbums, getAllReviews } from "@/app/actions/albums"
import { AlbumCard } from "@/components/album-card"
import { SiteHeader } from "@/components/site-header"
import type { Album } from "@/lib/db/schema"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [albums, reviews] = await Promise.all([getAlbums(), getAllReviews()])

  const authorsByAlbum = new Map<number, string[]>()
  for (const r of reviews) {
    const list = authorsByAlbum.get(r.albumId) ?? []
    if (!list.includes(r.author)) list.push(r.author)
    authorsByAlbum.set(r.albumId, list)
  }

  const groups = new Map<string, Album[]>()
  for (const a of albums) {
    const list = groups.get(a.artist) ?? []
    list.push(a)
    groups.set(a.artist, list)
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="font-display text-sm uppercase tracking-[0.4em] text-accent">
            Reseñas a dos manos
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-700 uppercase leading-[0.95] tracking-tight text-foreground text-balance md:text-7xl">
            Todo lo que gira a 33 rpm
          </h1>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Una colección personal de reseñas de discos. Cada álbum lleva la
            mirada de dos oyentes: dos escuchas, dos opiniones, un mismo surco.
          </p>
          <div className="mt-8 flex gap-8 text-sm text-muted-foreground">
            <div>
              <span className="font-display text-3xl font-700 text-foreground">
                {albums.length}
              </span>
              <span className="ml-2 uppercase tracking-widest">discos</span>
            </div>
            <div>
              <span className="font-display text-3xl font-700 text-foreground">
                {reviews.length}
              </span>
              <span className="ml-2 uppercase tracking-widest">reseñas</span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        {albums.length === 0 ? (
          <p className="text-muted-foreground">
            Todavía no hay discos cargados.
          </p>
        ) : (
          Array.from(groups.entries()).map(([artist, list]) => (
            <div key={artist} className="mb-16">
              <div className="mb-6 flex items-baseline justify-between border-b border-border/60 pb-3">
                <h2 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground">
                  {artist}
                </h2>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {list.length} discos
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
                {list.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    authors={authorsByAlbum.get(album.id) ?? []}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs uppercase tracking-widest text-muted-foreground">
          True Metalhead — reseñas de discos
        </div>
      </footer>
    </div>
  )
}
