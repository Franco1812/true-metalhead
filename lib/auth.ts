import { cookies } from "next/headers"
import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto"
import { promisify } from "node:util"

const scrypt = promisify(scryptCallback)

const COOKIE_NAME = "discos_sesion"
const MAX_AGE = 60 * 60 * 24 * 30 // 30 días

export type SessionUser = {
  id: number
  name: string
  isAdmin: boolean
}

// La sesión va firmada dentro de la cookie y no en una tabla: así leerla no
// despierta la base (Neon suspende a los 5 min sin trafico) ni suma una query
// por request. El precio es que no se puede revocar antes de que expire.
function secret() {
  const value = process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD
  if (!value) {
    throw new Error("Falta SESSION_SECRET en las variables de entorno")
  }
  return value
}

function b64url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url")
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url")
}

function equal(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  // timingSafeEqual explota si difieren los largos, así que hay que chequearlo.
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

// --- Contraseñas -----------------------------------------------------------

const SCRYPT_KEYLEN = 64

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const derived = (await scrypt(password, salt, SCRYPT_KEYLEN)) as Buffer
  return `scrypt:${salt}:${derived.toString("hex")}`
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split(":")
  if (scheme !== "scrypt" || !salt || !hash) return false
  const derived = (await scrypt(password, salt, SCRYPT_KEYLEN)) as Buffer
  const esperado = Buffer.from(hash, "hex")
  return (
    derived.length === esperado.length && timingSafeEqual(derived, esperado)
  )
}

// --- Cookie de sesión ------------------------------------------------------

export async function setSessionCookie(user: SessionUser) {
  const payload = b64url(
    JSON.stringify({
      id: user.id,
      name: user.name,
      adm: user.isAdmin,
      exp: Date.now() + MAX_AGE * 1000,
    }),
  )
  const store = await cookies()
  store.set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: true,
    // Igual que la cookie de admin: el sitio se abre embebido en previews y
    // con "lax" el navegador no la manda.
    sameSite: "none",
    path: "/",
    maxAge: MAX_AGE,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies()
  const raw = store.get(COOKIE_NAME)?.value
  if (!raw) return null

  const corte = raw.lastIndexOf(".")
  if (corte < 1) return null
  const payload = raw.slice(0, corte)
  const firma = raw.slice(corte + 1)
  if (!equal(firma, sign(payload))) return null

  try {
    const datos = JSON.parse(Buffer.from(payload, "base64url").toString())
    if (typeof datos.exp !== "number" || datos.exp < Date.now()) return null
    return { id: datos.id, name: datos.name, isAdmin: Boolean(datos.adm) }
  } catch {
    return null
  }
}

// Para las server actions que escriben: nunca confiar en que el cliente ya
// chequeó la sesión.
export async function requireUser() {
  const user = await getSessionUser()
  if (!user) throw new Error("Tenés que iniciar sesión")
  return user
}
