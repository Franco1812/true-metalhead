import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Rating({
  value,
  className,
}: {
  value: number | null
  className?: string
}) {
  if (value == null) return null
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${value} de 5 estrellas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < value
              ? "fill-accent text-accent"
              : "fill-transparent text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  )
}
