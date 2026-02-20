export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "SUPABASE_URL or SUPABASE_KEY is not configured",
    })
  }

  await $fetch(`${supabaseUrl}/rest/v1/sales_history?id=gt.0`, {
    method: "DELETE",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal",
    },
  })

  return { ok: true }
})
