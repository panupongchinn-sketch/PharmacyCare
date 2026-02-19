import { createClient, SupabaseClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabaseUrl = config.public.SUPABASE_URL as string | undefined;
  const supabaseKey = config.public.SUPABASE_KEY as string | undefined;
  const supabase: SupabaseClient | null =
    supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

  return {
    provide: {
      supabase,
    },
  };
});
