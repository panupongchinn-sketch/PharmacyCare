import type { SupabaseClient, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const { $supabase } = useNuxtApp() as { $supabase: SupabaseClient };
  const user = useState<User | null>("user", () => null);
  const loading = useState("authLoading", () => false);

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    loading.value = true;
    try {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      user.value = data.user;

      // Handle remember me by setting session persistence
      if (!rememberMe) {
        // Session will expire when browser closes
        await $supabase.auth.updateUser({
          data: { remember_me: false },
        });
      }

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    loading.value = true;
    try {
      const { error } = await $supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
      return { error: null };
    } catch (error: any) {
      return { error };
    } finally {
      loading.value = false;
    }
  };

  const getCurrentUser = async () => {
    loading.value = true;
    try {
      const {
        data: { user: currentUser },
        error,
      } = await $supabase.auth.getUser();
      if (error) throw error;
      user.value = currentUser;
      return { user: currentUser, error: null };
    } catch (error: any) {
      user.value = null;
      return { user: null, error };
    } finally {
      loading.value = false;
    }
  };

  const getSession = async () => {
    const {
      data: { session },
      error,
    } = await $supabase.auth.getSession();
    return { session, error };
  };

  const signUp = async (email: string, password: string, name?: string) => {
    loading.value = true;
    try {
      const { data, error } = await $supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || "",
          },
        },
      });

      if (error) throw error;

      user.value = data.user;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    getSession,
  };
};
