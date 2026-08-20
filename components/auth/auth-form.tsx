"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ingresar, registrarse, type FormResult } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"

// text-base en mobile: con menos de 16px iOS Safari hace zoom al enfocar el campo.
const fieldClass =
  "w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"

const labelClass =
  "mb-1 block text-xs uppercase tracking-wider text-muted-foreground"

const initialState: FormResult = { error: null }

type Props = {
  modo: "ingresar" | "registro"
  // A dónde volver después de entrar. Lo pone la página que enlazó hasta acá.
  volver: string
}

export function AuthForm({ modo, volver }: Props) {
  const esRegistro = modo === "registro"
  const [state, formAction, pending] = useActionState(
    esRegistro ? registrarse : ingresar,
    initialState,
  )

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="volver" value={volver} />

      {esRegistro ? (
        <div>
          <label htmlFor="name" className={labelClass}>
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={40}
            defaultValue={state?.values?.name ?? ""}
            autoComplete="name"
            placeholder="Cómo firmás tus reseñas"
            className={fieldClass}
          />
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={state?.values?.email ?? ""}
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Contraseña *
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={esRegistro ? 8 : undefined}
          autoComplete={esRegistro ? "new-password" : "current-password"}
          className={fieldClass}
        />
        {esRegistro ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Mínimo 8 caracteres.
          </p>
        ) : null}
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} size="lg" className="w-full">
        {pending
          ? esRegistro
            ? "Creando cuenta..."
            : "Entrando..."
          : esRegistro
            ? "Crear cuenta"
            : "Entrar"}
      </Button>

      <p className="text-sm text-muted-foreground">
        {esRegistro ? "¿Ya tenés cuenta? " : "¿Todavía no tenés cuenta? "}
        <Link
          href={{
            pathname: esRegistro ? "/ingresar" : "/registro",
            query: volver === "/" ? undefined : { volver },
          }}
          className="text-primary underline-offset-4 hover:underline"
        >
          {esRegistro ? "Entrá" : "Registrate"}
        </Link>
      </p>
    </form>
  )
}
