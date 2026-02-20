import { getSupabaseEnv } from "../utils/supabase-env"

type ProductRow = {
  id: string | number
  sku: string | null
  name: string | null
  brand: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  quantity: number | null
  price: number | null
}

export default defineEventHandler(async () => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv()

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase env is not configured (SUPABASE_URL + SUPABASE_KEY/ANON_KEY)",
    })
  }

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  }

  try {
    const withBrand = await $fetch<ProductRow[]>(
      `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,brand,category,image_url,unit,quantity,price&order=id.desc`,
      { headers }
    )
    return Array.isArray(withBrand) ? withBrand : []
  } catch {
    const withoutBrand = await $fetch<any[]>(
      `${supabaseUrl}/rest/v1/products_primary?select=id,sku,name,category,image_url,unit,quantity,price&order=id.desc`,
      { headers }
    )
    return Array.isArray(withoutBrand)
      ? withoutBrand.map((x) => ({ ...x, brand: null }))
      : []
  }
})
