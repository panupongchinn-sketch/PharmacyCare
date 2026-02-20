export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "SUPABASE_URL or SUPABASE_KEY is not configured",
    })
  }

  const rawId = String(event.context.params?.id || "").trim()
  if (!rawId) {
    throw createError({ statusCode: 400, statusMessage: "id is required" })
  }

  await $fetch(`${supabaseUrl}/rest/v1/sales_history?id=eq.${encodeURIComponent(rawId)}`, {
    method: "DELETE",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal",
    },
  })

  return { ok: true }
})
