"use client"

import { useState } from "react"
import { upsertReview } from "@/app/actions/albums"
import { Button } from "@/components/ui/button"
import type { Album } from "@/lib/db/schema"

// text-base en mobile: con menos de 16px iOS Safari hace zoom al enfocar el campo.
const fieldClass =
  "w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"

type Props = {
  albums: Album[]
  authors: readonly string[]
}

export function ReviewForm({ albums, authors }: Props) {
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)

  async function action(formData: FormData) {
    setPending(true)
    setDone(false)
    try {
      await upsertReview(formData)
      setDone(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={action} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="albumId" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Disco *
          </label>
          <select id="albumId" name="albumId" required className={fieldClass}>
            {albums.map((a) => (
              <option key={a.id} value={a.id}>
                {a.artist} — {a.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="author" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Autor/a *
          </label>
          <select id="author" name="author" required className={fieldClass}>
            {authors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="rating" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
          Puntaje (1 a 5, opcional)
        </label>
        <input id="rating" name="rating" type="number" min="1" max="5" className={fieldClass + " sm:max-w-[8rem]"} />
      </div>
      <div>
        <label htmlFor="body" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
          Reseña *
        </label>
        <textarea id="body" name="body" required rows={6} className={fieldClass + " resize-y leading-relaxed"} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending} className="justify-self-start">
          {pending ? "Guardando..." : "Guardar reseña"}
        </Button>
        {done ? <span className="text-sm text-accent">Reseña guardada</span> : null}
      </div>
      <p className="text-xs text-muted-foreground">
        Si ya existe una reseña de ese autor/a para ese disco, se reemplaza.
      </p>
    </form>
  )
}
