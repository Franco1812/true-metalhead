import type { Review } from "@/lib/db/schema"
import { Rating } from "@/components/rating"
import { ReviewEditor } from "@/components/review-editor"

export function ReviewPanel({
  author,
  review,
  albumId,
}: {
  author: string
  review: Review | null | undefined
  albumId: number
}) {
  return (
    <article className="flex flex-col rounded-md border border-border/70 bg-card p-4 sm:p-6">
      <header className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-700 uppercase text-accent">
            {author.slice(0, 1)}
          </span>
          <div>
            <p className="font-display text-sm font-600 uppercase tracking-widest text-foreground">
              {author}
            </p>
            <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Reseña
            </p>
          </div>
        </div>
        {review ? <Rating value={review.rating} /> : null}
      </header>
      <div className="pt-5">
        {review ? (
          <p className="whitespace-pre-line leading-relaxed text-foreground/90 text-pretty">
            {review.body}
          </p>
        ) : (
          <p className="text-sm italic leading-relaxed text-muted-foreground">
            {author} todavía no reseñó este disco.
          </p>
        )}
      </div>

      {/* Se muestra solo si hay sesión de admin; lo resuelve en el cliente
          para no volver dinámica la página. */}
      <ReviewEditor albumId={albumId} author={author} review={review ?? null} />
    </article>
  )
}
