import { cn } from "@/lib/utils"

type Props = {
  title: string
  artist: string
  coverUrl?: string | null
  className?: string
}

// A vinyl-record style sleeve: the record peeks out from behind the sleeve.
export function VinylCover({ title, artist, coverUrl, className }: Props) {
  return (
    <div className={cn("group relative aspect-square w-full", className)}>
      {/* the record disc peeking out on the right */}
      <div className="absolute right-0 top-1/2 aspect-square h-[86%] -translate-y-1/2 translate-x-[14%] rounded-full bg-[radial-gradient(circle,theme(colors.neutral.900)_0%,#111_60%,#1c1c1c_61%,#111_62%,#1c1c1c_70%,#111_71%,#000_100%)] shadow-xl transition-transform duration-500 ease-out group-hover:translate-x-[34%] group-hover:rotate-45">
        <div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
        <div className="absolute left-1/2 top-1/2 h-[4%] w-[4%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
      </div>

      {/* the sleeve */}
      <div className="absolute inset-0 overflow-hidden rounded-sm border border-border/70 shadow-lg">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl || "/placeholder.svg"}
            alt={`Portada de ${title} de ${artist}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(145deg,var(--card),oklch(0.13_0.006_40))] p-4">
            <span className="font-display text-[0.7rem] uppercase tracking-[0.25em] text-accent">
              {artist}
            </span>
            <span className="font-display text-lg font-700 uppercase leading-none tracking-tight text-foreground text-balance">
              {title}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
