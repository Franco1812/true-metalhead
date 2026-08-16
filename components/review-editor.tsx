"use client"

import { useEffect, useState } from "react"
import { upsertReview, deleteReview } from "@/app/actions/albums"
import { checkAdmin } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import type { Review } from "@/lib/db/schema"

const fieldClass =
  "w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"

type Props = {
  albumId: number
  author: string
  review: Review | null
}

export function ReviewEditor({ albumId, author, review }: Props) {
  const [admin, setAdmin] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // La página es estática, así que el estado de sesión se pregunta acá.
  useEffect(() => {
    let vivo = true
    checkAdmin()
      .then((esAdmin) => {
        if (vivo) setAdmin(esAdmin)
      })
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [])

  if (!admin) return null

  if (!abierto) {
    return (
      <div className="mt-4 border-t border-border/60 pt-4">
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          {review ? "Editar reseña" : "Escribir reseña"}
        </button>
      </div>
    )
  }

  async function guardar(formData: FormData) {
    setPending(true)
    setError(null)
    try {
      await upsertReview(formData)
      setAbierto(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar la reseña")
    } finally {
      setPending(false)
    }
  }

  async function borrar() {
    if (!review) return
    setPending(true)
    setError(null)
    try {
      await deleteReview(review.id, albumId)
      setAbierto(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo borrar la reseña")
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={guardar} className="mt-4 grid gap-3 border-t border-border/60 pt-4">
      <input type="hidden" name="albumId" value={albumId} />
      <input type="hidden" name="author" value={author} />

      <div>
        <label
          htmlFor={`rating-${author}`}
          className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          Puntaje (1 a 5, opcional)
        </label>
        <input
          id={`rating-${author}`}
          name="rating"
          type="number"
          min="1"
          max="5"
          defaultValue={review?.rating ?? ""}
          className={fieldClass + " sm:max-w-[8rem]"}
        />
      </div>

      <div>
        <label
          htmlFor={`body-${author}`}
          className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          Reseña *
        </label>
        <textarea
          id={`body-${author}`}
          name="body"
          required
          rows={6}
          defaultValue={review?.body ?? ""}
          className={fieldClass + " resize-y leading-relaxed"}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Guardando..." : "Guardar"}
        </Button>
        <button
          type="button"
          onClick={() => {
            setAbierto(false)
            setError(null)
          }}
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Cancelar
        </button>
        {review ? (
          <button
            type="button"
            onClick={borrar}
            disabled={pending}
            className="ml-auto text-xs uppercase tracking-widest text-destructive hover:underline disabled:opacity-50"
          >
            Borrar
          </button>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  )
}
