"use client"

import { useEffect, useRef, useState } from "react"
import { createAlbum } from "@/app/actions/albums"
import { Button } from "@/components/ui/button"

// text-base en mobile: con menos de 16px iOS Safari hace zoom al enfocar el campo.
const fieldClass =
  "w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"

export function AlbumForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  // Liberar el object URL de la vista previa al cambiarlo o desmontar.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return file ? URL.createObjectURL(file) : null
    })
  }

  async function action(formData: FormData) {
    setPending(true)
    setError(null)
    setOk(false)
    try {
      await createAlbum(formData)
      formRef.current?.reset()
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      setOk(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar el disco")
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
        <label htmlFor="coverFile" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
          Portada (JPG, PNG o WEBP — hasta 4 MB)
        </label>
        <div className="flex items-start gap-4">
          <input
            id="coverFile"
            name="coverFile"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onPickFile}
            className="flex-1 rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground file:mr-3 file:rounded file:border-0 file:bg-foreground file:px-3 file:py-1 file:text-sm file:text-background hover:file:opacity-90"
          />
          {preview ? (
            <img
              src={preview}
              alt="Vista previa de la portada"
              className="size-20 shrink-0 rounded-sm border border-border object-cover"
            />
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="coverUrl" className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
          …o pegar una URL de portada
        </label>
        <input id="coverUrl" name="coverUrl" type="url" placeholder="https://..." className={fieldClass} />
        <p className="mt-1 text-xs text-muted-foreground">
          Si subís un archivo, se usa ese y se ignora la URL.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending} className="justify-self-start">
          {pending ? "Guardando..." : "Agregar disco"}
        </Button>
        {ok ? <span className="text-sm text-accent">Disco agregado</span> : null}
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  )
}
