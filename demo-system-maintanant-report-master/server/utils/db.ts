import { Pool } from "pg"

let pool: Pool | null = null
const memoryStore = new Map<string, unknown>()
let warnedNoDb = false

const getPool = () => {
  if (pool) return pool

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    return null
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })
  return pool
}

let initialized = false

export const ensureStoreTable = async () => {
  const p = getPool()
  if (!p) {
    if (!warnedNoDb) {
      console.warn("[store] DATABASE_URL is not configured, using in-memory store")
      warnedNoDb = true
    }
    return
  }
  if (initialized) return
  const client = await p.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS app_store (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)
    initialized = true
  } finally {
    client.release()
  }
}

export const getStoreValue = async (key: string) => {
  await ensureStoreTable()
  const p = getPool()
  if (!p) return memoryStore.get(key) ?? []
  const { rows } = await p.query("SELECT value FROM app_store WHERE key = $1 LIMIT 1", [key])
  return rows[0]?.value ?? []
}

export const setStoreValue = async (key: string, value: unknown) => {
  await ensureStoreTable()
  const p = getPool()
  if (!p) {
    memoryStore.set(key, value ?? [])
    return
  }
  await p.query(
    `
      INSERT INTO app_store (key, value, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `,
    [key, JSON.stringify(value ?? [])]
  )
}
