"use server"

import { setAdminCookie, clearAdminCookie, isAdmin } from "@/lib/session"
import { revalidatePath } from "next/cache"

// La consulta el cliente después de cargar la página. Leer la cookie desde el
// Server Component volvería dinámica la ficha de disco y perderíamos el
// prerenderizado (verificado: pasa de 45 páginas SSG a 0).
// Es solo para decidir si se muestra el formulario; quien autoriza de verdad
// es upsertReview, que vuelve a chequear isAdmin() en el servidor.
export async function checkAdmin() {
  return isAdmin()
}

export async function login(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "")
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Contraseña incorrecta" }
  }
  await setAdminCookie()
  revalidatePath("/admin")
  return { error: null }
}

export async function logout() {
  await clearAdminCookie()
  revalidatePath("/admin")
}
