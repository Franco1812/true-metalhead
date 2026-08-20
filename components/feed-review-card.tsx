import Link from "next/link"
import { Rating } from "@/components/rating"
import { VinylCover } from "@/components/vinyl-cover"
import type { getReviewsFeed } from "@/app/actions/albums"

// La fila del muro trae la reseña y los datos del disco ya unidos.
export type FeedReview = Awaited<ReturnType<typeof getReviewsFeed>>[number]

const fecha = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

export function FeedReviewCard({
  review,
  mostrarAutor = true,
}: {
  review: FeedReview
  mostrarAutor?: boolean
}) {
  return (
    <article className="flex gap-4 border-b border-border/60 py-6 sm:gap-6">
      <Link
        href={`/album/${review.albumId}`}
        className="w-20 shrink-0 sm:w-28"
        aria-label={`${review.albumTitle} de ${review.albumArtist}`}
      >
        <VinylCover
          title={review.albumTitle}
          artist={review.albumArtist}
          coverUrl={review.albumCoverUrl}
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/album/${review.albumId}`} className="group block">
          <h3 className="font-display text-lg font-600 uppercase leading-tight tracking-wide text-foreground group-hover:text-primary text-pretty">
            {review.albumTitle}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
            {review.albumArtist}
            {review.albumYear ? ` · ${review.albumYear}` : ""}
          </p>
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {mostrarAutor ? (
            review.userId ? (
              <Link
                href={`/usuario/${review.userId}`}
                className="font-display uppercase tracking-widest text-accent hover:underline"
              >
                {review.author}
              </Link>
            ) : (
              <span className="font-display uppercase tracking-widest text-accent">
                {review.author}
              </span>
            )
          ) : null}
          <span>{fecha.format(review.createdAt)}</span>
          <Rating value={review.rating} />
        </div>

        <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/90 text-pretty">
          {review.body}
        </p>
      </div>
    </article>
  )
}
