"use server"

import { setAdminCookie, clearAdminCookie } from "@/lib/session"
import { revalidatePath } from "next/cache"

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
