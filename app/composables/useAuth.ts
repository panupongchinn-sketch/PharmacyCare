// app/composables/useAuth.ts
import type { Session, User } from "@supabase/supabase-js"

export const useAuth = () => {
  const { $supabase } = useNuxtApp() as any

  const session = useState<Session | null>("sb_session", () => null)
  const isReady = useState<boolean>("sb_auth_ready", () => false)

  const user = computed<User | null>(() => session.value?.user ?? null)

  const init = async () => {
    if (process.server) return

    // กัน init ซ้ำ + ทำ listener ครั้งเดียว
    if (!isReady.value) {
      isReady.value = true
      $supabase.auth.onAuthStateChange((_event: any, sess: Session | null) => {
        session.value = sess
      })
    }

    const { data, error } = await $supabase.auth.getSession()
    if (error) throw error
    session.value = data.session
  }

  const getSession = async () => {
    const { data, error } = await $supabase.auth.getSession()
    if (error) throw error
    session.value = data.session
    return { session: session.value }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await $supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    session.value = data.session
    return data
  }

  const signOut = async () => {
    const { error } = await $supabase.auth.signOut()
    if (error) throw error
    session.value = null
  }

  return { session, user, init, getSession, signIn, signOut }
}
