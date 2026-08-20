"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { upsertReview, deleteReview } from "@/app/actions/albums"
import { getCurrentUser } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import type { SessionUser } from "@/lib/auth"
import type { Review } from "@/lib/db/schema"

const fieldClass =
  "w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"

type Props = {
  albumId: number
  reviews: Review[]
}

// La ficha del disco es estática: se prerenderiza igual para todo el mundo y
// recién acá, en el cliente, sabemos quién sos y si ya reseñaste.
export function MiResena({ albumId, reviews }: Props) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [listo, setListo] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let vivo = true
    getCurrentUser()
      .then((u) => {
        if (!vivo) return
        setUser(u)
        setListo(true)
      })
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [])

  if (!listo) return null

  if (!user) {
    return (
      <p className="mt-8 rounded-md border border-dashed border-border/70 px-4 py-6 text-center text-sm text-muted-foreground">
        <Link
          href={{ pathname: "/ingresar", query: { volver: `/album/${albumId}` } }}
          className="text-primary underline-offset-4 hover:underline"
        >
          Entrá
        </Link>{" "}
        para dejar la tuya.
      </p>
    )
  }

  // También toma la reseña vieja escrita con su nombre pero sin cuenta detrás:
  // es la misma que upsertReview va a reemplazar.
  const mia =
    reviews.find((r) => r.userId === user.id) ??
    reviews.find(
      (r) =>
        r.userId == null &&
        r.author.toLowerCase() === user.name.toLowerCase(),
    ) ??
    null

  async function guardar(formData: FormData) {
    setPending(true)
    setError(null)
    try {
      await upsertReview(formData)
      setAbierto(false)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar la reseña")
    } finally {
      setPending(false)
    }
  }

  async function borrar() {
    if (!mia) return
    setPending(true)
    setError(null)
    try {
      await deleteReview(mia.id, albumId)
      setAbierto(false)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo borrar la reseña")
    } finally {
      setPending(false)
    }
  }

  if (!abierto) {
    return (
      <div className="mt-8 flex justify-center">
        <Button type="button" size="lg" onClick={() => setAbierto(true)}>
          {mia ? "Editar mi reseña" : "Escribir mi reseña"}
        </Button>
      </div>
    )
  }

  return (
    <form
      action={guardar}
      className="mt-8 grid gap-3 rounded-md border border-border/70 bg-card p-4 sm:p-6"
    >
      <input type="hidden" name="albumId" value={albumId} />

      <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
        Tu reseña, {user.name}
      </p>

      <div>
        <label
          htmlFor="rating"
          className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          Puntaje (1 a 5, opcional)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          defaultValue={mia?.rating ?? ""}
          className={fieldClass + " sm:max-w-[8rem]"}
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground"
        >
          Reseña *
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={8}
          defaultValue={mia?.body ?? ""}
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
        {mia ? (
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
