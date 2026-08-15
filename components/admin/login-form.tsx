"use client"

import { useActionState } from "react"
import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"

const initialState: { error: string | null } = { error: null }

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <form action={formAction} className="w-full max-w-sm">
      <label htmlFor="password" className="mb-2 block text-sm text-muted-foreground">
        Contraseña de administrador
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="w-full rounded-md border border-input bg-secondary px-3 py-2 text-base text-foreground outline-none focus:ring-2 focus:ring-ring sm:text-sm"
      />
      {state?.error ? <p className="mt-2 text-sm text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="mt-4 w-full">
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  )
}
