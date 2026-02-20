import { getSupabaseEnv } from "../utils/supabase-env"

type CreatePayload = {
  sku?: string
  name?: string
  brand?: string | null
  category?: string
  unit?: string
  quantity?: number
  price?: number
  image_url?: string | null
}

export default defineEventHandler(async (event) => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv()

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase env is not configured (SUPABASE_URL + SUPABASE_KEY/ANON_KEY)",
    })
  }

  const body = await readBody<CreatePayload>(event)

  const payload = {
    sku: String(body?.sku || "").trim(),
    name: String(body?.name || "").trim(),
    brand: body?.brand ? String(body.brand).trim() : null,
    category: String(body?.category || "").trim(),
    unit: String(body?.unit || "").trim(),
    quantity: Number(body?.quantity ?? 0),
    price: Number(body?.price ?? 0),
    image_url: body?.image_url ?? null,
  }

  if (!payload.sku || !payload.name || !payload.category || !payload.unit) {
    throw createError({
      statusCode: 400,
      statusMessage: "sku, name, category, and unit are required",
    })
  }
  if (!Number.isFinite(payload.quantity) || payload.quantity < 0) {
    throw createError({ statusCode: 400, statusMessage: "quantity must be >= 0" })
  }
  if (!Number.isFinite(payload.price) || payload.price < 0) {
    throw createError({ statusCode: 400, statusMessage: "price must be >= 0" })
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  }

  // Prevent duplicate SKU and return a clear message for admin UI.
  const existing = await $fetch<any[]>(
    `${supabaseUrl}/rest/v1/products_primary?select=id&sku=eq.${encodeURIComponent(payload.sku)}&limit=1`,
    { headers }
  )
  if (Array.isArray(existing) && existing.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: "SKU นี้มีอยู่แล้ว กรุณาใช้ SKU ใหม่",
    })
  }

  try {
    const withBrand = await $fetch<any[]>(
      `${supabaseUrl}/rest/v1/products_primary`,
      {
        method: "POST",
        headers,
        body: [payload],
      }
    )
    return Array.isArray(withBrand) ? withBrand[0] : withBrand
  } catch {
    const { brand: _brand, ...fallbackPayload } = payload
    try {
      const withoutBrand = await $fetch<any[]>(
        `${supabaseUrl}/rest/v1/products_primary`,
        {
          method: "POST",
          headers,
          body: [fallbackPayload],
        }
      )
      return Array.isArray(withoutBrand) ? withoutBrand[0] : withoutBrand
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.data?.error_description ||
        err?.message ||
        "Insert failed"
      throw createError({
        statusCode: err?.statusCode || 500,
        statusMessage: msg,
      })
    }
  }
})
