import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata = { title: "Crear cuenta — True Metalhead" }

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ volver?: string }>
}) {
  const { volver } = await searchParams

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground">
          Crear cuenta
        </h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Con una cuenta podés reseñar cualquier disco de la discoteca. El
          nombre que pongas es el que va a figurar en tus reseñas.
        </p>
        <AuthForm modo="registro" volver={volver ?? "/"} />
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver al sitio
        </Link>
      </div>
    </div>
  )
}
