import { cookies } from "next/headers"
import { getSessionUser } from "@/lib/auth"

const COOKIE_NAME = "discos_admin"

// Hay dos formas de ser admin:
//   1. la cookie vieja de contraseña única (ADMIN_PASSWORD), que se mantiene
//      para no quedar afuera de /admin si todavía no hay cuenta con is_admin;
//   2. una cuenta con `is_admin` en true.
// El flag viaja dentro de la cookie de sesión: si le das admin a alguien que ya
// tenía la sesión abierta, lo toma recién cuando vuelve a entrar.
export async function isAdmin() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (token && token === process.env.ADMIN_PASSWORD) return true
  const user = await getSessionUser()
  return Boolean(user?.isAdmin)
}

export async function setAdminCookie() {
  const store = await cookies()
  store.set(COOKIE_NAME, process.env.ADMIN_PASSWORD ?? "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
