"use client"

import { useState } from "react"
import { deleteAlbum } from "@/app/actions/albums"
import type { Album } from "@/lib/db/schema"

type Props = {
  albums: Album[]
  reviewCounts: Record<number, number>
}

export function AlbumList({ albums, reviewCounts }: Props) {
  const [busyId, setBusyId] = useState<number | null>(null)

  async function onDelete(album: Album) {
    if (!confirm(`¿Borrar "${album.title}" y sus reseñas?`)) return
    setBusyId(album.id)
    try {
      await deleteAlbum(album.id)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <ul className="divide-y divide-border/60">
      {albums.map((album) => (
        <li key={album.id} className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm text-foreground">
              <span className="text-muted-foreground">{album.artist}</span> — {album.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {album.year ?? "s/año"} · {reviewCounts[album.id] ?? 0} reseña(s)
            </p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(album)}
            disabled={busyId === album.id}
            className="shrink-0 rounded-md border border-destructive/40 px-3 py-1.5 text-xs uppercase tracking-wider text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
          >
            {busyId === album.id ? "..." : "Borrar"}
          </button>
        </li>
      ))}
    </ul>
  )
}
