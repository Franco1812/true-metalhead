import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { isAdmin } from "@/lib/session"
import { getAlbums, getAllReviews } from "@/app/actions/albums"
import { logout } from "@/app/actions/auth"
import { AUTHORS } from "@/lib/authors"
import { LoginForm } from "@/components/admin/login-form"
import { AlbumForm } from "@/components/admin/album-form"
import { ReviewForm } from "@/components/admin/review-form"
import { AlbumList } from "@/components/admin/album-list"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const admin = await isAdmin()

  if (!admin) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-700 uppercase tracking-tight text-foreground">Zona de carga</h1>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">Ingresá la contraseña para administrar los discos.</p>
          <LoginForm />
          <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Volver al sitio
          </Link>
        </div>
      </div>
    )
  }

  const [albums, reviews] = await Promise.all([getAlbums(), getAllReviews()])
  const reviewCounts: Record<number, number> = {}
  for (const r of reviews) reviewCounts[r.albumId] = (reviewCounts[r.albumId] ?? 0) + 1

  return (
    <div className="min-h-svh">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            {/* -m-3 p-3: agranda el area tactil a 40px sin correr el layout. */}
            <Link
              href="/"
              aria-label="Volver al sitio"
              className="-m-3 inline-flex items-center justify-center p-3 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="font-display text-lg font-700 uppercase tracking-tight text-foreground">Zona de carga</h1>
          </div>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm" className="text-muted-foreground">
              Salir
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-12 px-4 py-10">
        <section>
          <h2 className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-accent">Agregar disco</h2>
          <AlbumForm />
        </section>

        <section>
          <h2 className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-accent">Agregar / editar reseña</h2>
          {albums.length === 0 ? (
            <p className="text-sm text-muted-foreground">Primero agregá un disco.</p>
          ) : (
            <ReviewForm albums={albums} authors={AUTHORS} />
          )}
        </section>

        <section>
          <h2 className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-accent">
            Discos cargados ({albums.length})
          </h2>
          <AlbumList albums={albums} reviewCounts={reviewCounts} />
        </section>
      </main>
    </div>
  )
}
