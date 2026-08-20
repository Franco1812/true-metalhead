import Link from "next/link"
import { getReviewsFeed, getUsers } from "@/app/actions/albums"
import { SiteHeader } from "@/components/site-header"
import { FeedReviewCard } from "@/components/feed-review-card"

// Misma cache que la home: las actions llaman revalidatePath("/resenas") al
// guardar, así que una reseña nueva aparece igual al instante.
export const revalidate = 3600

export const metadata = {
  title: "Todas las reseñas — True Metalhead",
  description: "Todo lo que escribió cada quien, lo último primero.",
}

export default async function ResenasPage() {
  const [feed, usuarios] = await Promise.all([getReviewsFeed(), getUsers()])

  return (
    <div className="min-h-svh">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-accent">
          El muro
        </p>
        <h1 className="mt-3 font-display text-4xl font-700 uppercase leading-none tracking-tight text-foreground md:text-6xl">
          Todas las reseñas
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {feed.length === 1 ? "1 reseña" : `${feed.length} reseñas`} de todo el
          mundo, lo último primero.
        </p>

        {usuarios.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {usuarios.map((u) => (
              <Link
                key={u.id}
                href={`/usuario/${u.id}`}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20"
              >
                {u.name}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          {feed.length === 0 ? (
            <p className="text-muted-foreground">
              Todavía no hay reseñas.{" "}
              <Link
                href="/registro"
                className="text-primary underline-offset-4 hover:underline"
              >
                Creá tu cuenta
              </Link>{" "}
              y escribí la primera.
            </p>
          ) : (
            feed.map((review) => (
              <FeedReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
