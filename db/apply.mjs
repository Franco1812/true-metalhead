// Corre un .sql contra DATABASE_URL. Existe porque psql no siempre esta
// instalado y el esquema hay que poder aplicarlo igual.
//
//   node db/apply.mjs db/schema.sql
//   node db/apply.mjs db/seed.sql
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

const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()
try {
  await client.query(readFileSync(archivo, "utf8"))
  console.log(`Aplicado: ${archivo}`)
} finally {
  await client.end()
}
