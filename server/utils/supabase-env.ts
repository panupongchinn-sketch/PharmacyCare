export const getSupabaseEnv = () => {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NUXT_SUPABASE_URL ||
    process.env.NUXT_PUBLIC_SUPABASE_URL ||
    ""

  const supabaseKey =
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NUXT_SUPABASE_KEY ||
    process.env.NUXT_SUPABASE_ANON_KEY ||
    process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""

  return {
    supabaseUrl: String(supabaseUrl).trim(),
    supabaseKey: String(supabaseKey).trim(),
  }
}
