// Corre un .sql contra DATABASE_URL. Existe porque psql no siempre esta
// instalado y el esquema hay que poder aplicarlo igual.
//
//   node db/apply.mjs db/schema.sql
//   node db/apply.mjs db/seed.sql
//
// Por defecto usa el DATABASE_URL de .env.local. Para correr contra otra base
// (Neon, por ejemplo) alcanza con pasarla por entorno, que le gana al archivo:
//
//   DATABASE_URL="postgresql://...neon.tech/..." node db/apply.mjs db/schema.sql
//
// Los archivos del repo son idempotentes: se pueden correr de nuevo.
import { readFileSync } from "node:fs"
import { Client } from "pg"

try {
  process.loadEnvFile(".env.local")
} catch {
  // Sin .env.local esperamos DATABASE_URL en el entorno (por ejemplo en CI).
}

const archivo = process.argv[2]
if (!archivo) {
  console.error("Uso: node db/apply.mjs <archivo.sql>")
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error("Falta DATABASE_URL")
  process.exit(1)
}

// Se avisa a que base se apunta: local y produccion se parecen demasiado en
// una terminal como para migrar la equivocada sin enterarse.
const destino = new URL(process.env.DATABASE_URL)
console.log(`Base: ${destino.hostname}${destino.pathname}`)

const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()
try {
  await client.query(readFileSync(archivo, "utf8"))
  console.log(`Aplicado: ${archivo}`)
} finally {
  await client.end()
}
