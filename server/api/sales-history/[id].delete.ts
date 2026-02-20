import { getSupabaseEnv } from "../../utils/supabase-env"

export default defineEventHandler(async (event) => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv()

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase env is not configured (SUPABASE_URL + SUPABASE_KEY/ANON_KEY)",
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
