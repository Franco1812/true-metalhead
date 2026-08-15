import { cookies } from "next/headers"

const COOKIE_NAME = "discos_admin"

// Simple admin gate: the cookie stores the admin password hash-ish token.
// Good enough for a private two-person review site.
export async function isAdmin() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  return Boolean(token && token === process.env.ADMIN_PASSWORD)
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
