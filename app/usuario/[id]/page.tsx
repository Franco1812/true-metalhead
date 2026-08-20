import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getUserWithReviews } from "@/app/actions/albums"
import { SiteHeader } from "@/components/site-header"
import { FeedReviewCard } from "@/components/feed-review-card"

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getUserWithReviews(Number(id))
  return { title: data ? `${data.user.name} — True Metalhead` : "True Metalhead" }
}

export default async function UsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const userId = Number(id)
  if (Number.isNaN(userId)) notFound()

  const data = await getUserWithReviews(userId)
  if (!data) notFound()

  const { user, reviews } = data

  return (
    <div className="min-h-svh">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/resenas"
          className="mb-8 inline-flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Todas las reseñas
        </Link>

        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 font-display text-2xl font-700 uppercase text-accent">
            {user.name.slice(0, 1)}
          </span>
          <div>
            <h1 className="font-display text-3xl font-700 uppercase leading-none tracking-tight text-foreground md:text-4xl">
              {user.name}
            </h1>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
              {reviews.length === 1 ? "1 reseña" : `${reviews.length} reseñas`}
            </p>
          </div>
        </div>

        <div className="mt-10">
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">
              {user.name} todavía no escribió ninguna reseña.
            </p>
          ) : (
            reviews.map((review) => (
              <FeedReviewCard
                key={review.id}
                review={review}
                mostrarAutor={false}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
