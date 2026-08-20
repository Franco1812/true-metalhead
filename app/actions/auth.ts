"use server"

import { and, eq, isNull, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { reviews, users } from "@/lib/db/schema"
import {
  getSessionUser,
  hashPassword,
  setSessionCookie,
  clearSessionCookie,
  verifyPassword,
} from "@/lib/auth"
import { setAdminCookie, clearAdminCookie, isAdmin } from "@/lib/session"

// React vacia el formulario apenas termina la action, asi que el nombre y el
// email vuelven en el estado: sin esto hay que reescribirlos en cada error.
export type FormResult = {
  error: string | null
  values?: { name?: string; email?: string }
}

// La consulta el cliente después de cargar la página. Leer la cookie desde el
// Server Component volvería dinámica la ficha de disco y perderíamos el
// prerenderizado (verificado: pasa de 45 páginas SSG a 0).
// Es solo para decidir qué mostrar; quien autoriza de verdad son las actions,
// que vuelven a chequear la sesión en el servidor.
export async function getCurrentUser() {
  return getSessionUser()
}

export async function checkAdmin() {
  return isAdmin()
}

// Las cuentas de esta lista quedan como admin al registrarse.
// Ej: ADMIN_EMAILS="franco@ejemplo.com,ceci@ejemplo.com"
function esEmailDeAdmin(email: string) {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email)
}

// El destino viene de un campo oculto del formulario: aceptamos solo rutas de
// este sitio para que nadie arme un link que termine redirigiendo afuera.
function destinoSeguro(valor: string) {
  return valor.startsWith("/") && !valor.startsWith("//") ? valor : "/"
}

function validar(name: string, email: string, password: string) {
  if (name.length < 2) return "El nombre necesita al menos 2 letras"
  if (name.length > 40) return "El nombre es demasiado largo"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Ese email no parece válido"
  if (password.length < 8) return "La contraseña necesita al menos 8 caracteres"
  return null
}

export async function registrarse(
  _prev: unknown,
  formData: FormData,
): Promise<FormResult> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const volver = destinoSeguro(String(formData.get("volver") ?? "/"))

  const valores = { values: { name, email } }

  const problema = validar(name, email, password)
  if (problema) return { error: problema, ...valores }

  const [tomado] = await db.select().from(users).where(eq(users.email, email))
  if (tomado) return { error: "Ya hay una cuenta con ese email", ...valores }

  const [creado] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash: await hashPassword(password),
      isAdmin: esEmailDeAdmin(email),
    })
    .returning()

  // Las reseñas viejas (las que se cargaron cuando el sitio tenía autores fijos)
  // quedaron con el nombre escrito a mano y sin dueño. Al registrarse alguien
  // con ese mismo nombre, pasan a ser suyas y las puede editar.
  // Ojo: el registro es abierto, así que alcanza con registrarse llamándose
  // igual para quedarse con ellas. Son las 3 reseñas del seed; si molesta, se
  // borra este update.
  await db
    .update(reviews)
    .set({ userId: creado.id })
    .where(
      and(
        isNull(reviews.userId),
        sql`lower(${reviews.author}) = ${name.toLowerCase()}`,
      ),
    )

  await setSessionCookie({
    id: creado.id,
    name: creado.name,
    isAdmin: creado.isAdmin,
  })
  revalidatePath("/", "layout")
  redirect(volver)
}

export async function ingresar(
  _prev: unknown,
  formData: FormData,
): Promise<FormResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const volver = destinoSeguro(String(formData.get("volver") ?? "/"))

  const [user] = await db.select().from(users).where(eq(users.email, email))
  // Mismo mensaje para email inexistente y contraseña equivocada: si no, el
  // formulario sirve para averiguar qué emails están registrados.
  const generico = {
    error: "Email o contraseña incorrectos",
    values: { email },
  }
  if (!user) return generico
  if (!(await verifyPassword(password, user.passwordHash))) return generico

  // Se relee ADMIN_EMAILS en cada login: si no, agregar la variable despues de
  // haberte registrado no serviria de nada. Solo asciende, nunca degrada.
  let esAdmin = user.isAdmin
  if (!esAdmin && esEmailDeAdmin(email)) {
    esAdmin = true
    await db.update(users).set({ isAdmin: true }).where(eq(users.id, user.id))
  }

  await setSessionCookie({ id: user.id, name: user.name, isAdmin: esAdmin })
  revalidatePath("/", "layout")
  redirect(volver)
}

export async function salir() {
  await clearSessionCookie()
  await clearAdminCookie()
  revalidatePath("/", "layout")
  redirect("/")
}

// Login viejo de /admin, solo con la contraseña del sitio. Sigue acá para no
// quedarse afuera del panel si todavía no hay ninguna cuenta con is_admin.
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
