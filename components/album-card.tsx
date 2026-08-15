import Link from "next/link"
import type { Album } from "@/lib/db/schema"
import { VinylCover } from "@/components/vinyl-cover"

type Props = {
  album: Album
  authors: string[]
}

export function AlbumCard({ album, authors }: Props) {
  return (
    <Link
      href={`/album/${album.id}`}
      className="group block rounded-md p-2 transition-colors hover:bg-card"
    >
      <VinylCover
        title={album.title}
        artist={album.artist}
        coverUrl={album.coverUrl}
      />
      <div className="mt-4 px-1">
        <h3 className="font-display text-base font-600 uppercase leading-tight tracking-wide text-foreground text-pretty">
          {album.title}
        </h3>
        <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{album.artist}</span>
          {album.year ? (
            <>
              <span className="text-border">/</span>
              <span>{album.year}</span>
            </>
          ) : null}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {authors.length > 0 ? (
            authors.map((a) => (
              <span
                key={a}
                className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-widest text-accent"
              >
                {a}
              </span>
            ))
          ) : (
            <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground/60">
              Sin reseñas aún
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
