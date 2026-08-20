"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { checkAdmin, getCurrentUser, salir } from "@/app/actions/auth"
import type { SessionUser } from "@/lib/auth"

const linkClass =
  "inline-flex min-h-11 items-center uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:min-h-0 sm:tracking-widest"

// La home y las fichas de disco son estáticas, así que el estado de sesión no
// puede venir del render: se pregunta acá, ya en el cliente.
export function SessionNav() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [admin, setAdmin] = useState(false)
  const [listo, setListo] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let vivo = true
    Promise.all([getCurrentUser(), checkAdmin()])
      .then(([u, esAdmin]) => {
        if (!vivo) return
        setUser(u)
        setAdmin(esAdmin)
        setListo(true)
      })
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [pathname])

  // Hasta saber quién es no mostramos nada: es preferible a que aparezca
  // "Entrar" un instante y se reemplace por el nombre.
  if (!listo) return null

  if (!user) {
    return (
      <Link
        href={{ pathname: "/ingresar", query: { volver: pathname } }}
        className={linkClass + " hover:text-primary"}
      >
        Entrar
      </Link>
    )
  }

  return (
    <>
      {admin ? (
        <Link href="/admin" className={linkClass + " hover:text-primary"}>
          Cargar
        </Link>
      ) : null}
      <Link
        href={`/usuario/${user.id}`}
        className="inline-flex min-h-11 items-center gap-2 sm:min-h-0"
        title={`Tus reseñas, ${user.name}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-display text-xs font-700 uppercase text-accent">
          {user.name.slice(0, 1)}
        </span>
        <span className="hidden font-display uppercase tracking-widest text-foreground sm:inline">
          {user.name}
        </span>
      </Link>
      <form action={salir}>
        <button
          type="submit"
          className={linkClass + " hover:text-primary"}
        >
          Salir
        </button>
      </form>
    </>
  )
}
