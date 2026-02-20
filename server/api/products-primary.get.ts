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
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "SUPABASE_URL or SUPABASE_KEY is not configured",
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
