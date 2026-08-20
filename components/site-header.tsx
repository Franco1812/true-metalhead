import Link from "next/link"
import { SessionNav } from "@/components/session-nav"

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-foreground">
            <span className="h-3 w-3 rounded-full bg-background" />
            <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-background/40" />
          </span>
          <span className="font-display whitespace-nowrap text-lg font-700 uppercase tracking-[0.15em] text-foreground md:text-2xl md:tracking-[0.2em]">
            True Metalhead
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-xs sm:gap-6 sm:text-sm">
          {/* En mobile se oculta: el logo ya linkea a la home. */}
          <Link
            href="/"
            className="hidden items-center uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Discos
          </Link>
          {/* min-h en mobile: 16px de alto es un blanco imposible de tocar con el dedo. */}
          <Link
            href="/resenas"
            className="inline-flex min-h-11 items-center uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:min-h-0 sm:tracking-widest"
          >
            Reseñas
          </Link>
          <SessionNav />
        </nav>
      </div>
    </header>
  )
}
