"use client"

import { useRef, useState } from "react"
import { createAlbum } from "@/app/actions/albums"
import { Button } from "@/components/ui/button"

// text-base en mobile: con menos de 16px iOS Safari hace zoom al enfocar el campo.
const fieldClass =
  "w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"

export function AlbumForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [pending, setPending] = useState(false)

  async function action(formData: FormData) {
    setPending(true)
    try {
      await createAlbum(formData)
      formRef.current?.reset()
    } finally {
      setPending(false)
    }
  }

  return (
    <form ref={formRef} action={action} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="artist" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Artista *
          </label>
          <input id="artist" name="artist" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="title" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Título *
          </label>
          <input id="title" name="title" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="year" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Año
          </label>
          <input id="year" name="year" type="number" min="1900" max="2100" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="genre" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
            Género
          </label>
          <input id="genre" name="genre" className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="coverUrl" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
          URL de portada (opcional)
        </label>
        <input id="coverUrl" name="coverUrl" type="url" placeholder="https://..." className={fieldClass} />
      </div>
      <Button type="submit" disabled={pending} className="justify-self-start">
        {pending ? "Guardando..." : "Agregar disco"}
      </Button>
    </form>
  )
}
