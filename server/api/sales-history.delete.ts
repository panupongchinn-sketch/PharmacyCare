import { getSupabaseEnv } from "../utils/supabase-env"

export default defineEventHandler(async () => {
  const { supabaseUrl, supabaseKey } = getSupabaseEnv()

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase env is not configured (SUPABASE_URL + SUPABASE_KEY/ANON_KEY)",
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
