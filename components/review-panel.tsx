import Link from "next/link"
import type { Review } from "@/lib/db/schema"
import { Rating } from "@/components/rating"

// Solo muestra. Escribir y editar vive en components/my-review.tsx, que
// necesita saber quién está logueado y por eso corre en el cliente.
export function ReviewPanel({ review }: { review: Review }) {
  return (
    <article className="flex flex-col rounded-md border border-border/70 bg-card p-4 sm:p-6">
      <header className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-700 uppercase text-accent">
            {review.author.slice(0, 1)}
          </span>
          <div>
            {/* Las reseñas viejas no tienen cuenta detrás: ahí el nombre no linkea. */}
            {review.userId ? (
              <Link
                href={`/usuario/${review.userId}`}
                className="font-display text-sm font-600 uppercase tracking-widest text-foreground hover:text-primary"
              >
                {review.author}
              </Link>
            ) : (
              <p className="font-display text-sm font-600 uppercase tracking-widest text-foreground">
                {review.author}
              </p>
            )}
            <p className="text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              {new Intl.DateTimeFormat("es-AR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(review.createdAt)}
            </p>
          </div>
        </div>
        <Rating value={review.rating} />
      </header>
      <p className="whitespace-pre-line pt-5 leading-relaxed text-foreground/90 text-pretty">
        {review.body}
      </p>
    </article>
  )
}
