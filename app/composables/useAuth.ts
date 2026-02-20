type LocalAuthAccount = {
  id: string
  email: string
  password: string
  full_name?: string
  role?: "super_admin" | "user"
  approved?: boolean
  created_at: string
}

const AUTH_USERS_KEY = "mb_local_auth_users"
const AUTH_SESSION_KEY = "mb_local_auth_session"

const createError = (message: string) => ({ message })

const normalizeEmail = (value: string) => value.trim().toLowerCase()

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

const toPublicUser = (account: LocalAuthAccount) => ({
  id: account.id,
  email: account.email,
  user_metadata: { full_name: account.full_name || "" },
  app_metadata: {
    provider: "local",
    role: account.role || "user",
    approved: !!account.approved,
  },
  aud: "authenticated",
  created_at: account.created_at,
})

const makeSession = (account: LocalAuthAccount) => ({
  access_token: `local-${account.id}`,
  token_type: "bearer",
  expires_at: null,
  user: toPublicUser(account),
})

const getStorage = () => {
  if (process.server) return null
  return window.localStorage
}

export const useAuth = () => {
  const user = useState<any | null>("auth_user", () => null)
  const inited = useState<boolean>("auth_inited", () => false)

  const readUsers = (): LocalAuthAccount[] => {
    const storage = getStorage()
    if (!storage) return []
    const raw = safeParse<LocalAuthAccount[]>(storage.getItem(AUTH_USERS_KEY), [])
    const hasSuperAdmin = raw.some((u) => u.role === "super_admin")
    const fallbackSuperAdminId = hasSuperAdmin
      ? ""
      : [...raw]
          .sort(
            (a, b) =>
              new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
          )[0]?.id || raw[0]?.id || ""

    return raw.map((u) => ({
      ...u,
      role: u.role || (u.id === fallbackSuperAdminId ? "super_admin" : "user"),
      approved:
        typeof u.approved === "boolean"
          ? u.approved
          : (u.role || (u.id === fallbackSuperAdminId ? "super_admin" : "user")) ===
            "super_admin",
    }))
  }

  const writeUsers = (users: LocalAuthAccount[]) => {
    const storage = getStorage()
    if (!storage) return
    storage.setItem(AUTH_USERS_KEY, JSON.stringify(users))
  }

  const readSession = () => {
    const storage = getStorage()
    if (!storage) return null
    return safeParse<any | null>(storage.getItem(AUTH_SESSION_KEY), null)
  }

  const writeSession = (session: any | null) => {
    const storage = getStorage()
    if (!storage) return
    if (!session) {
      storage.removeItem(AUTH_SESSION_KEY)
      return
    }
    storage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  }

  const getSession = async () => {
    const session = readSession()
    user.value = session?.user ?? null
    return { session, error: null }
  }

  const init = async () => {
    if (inited.value) return
    inited.value = true
    await getSession()

    if (process.client) {
      window.addEventListener("storage", (event) => {
        if (event.key !== AUTH_SESSION_KEY) return
        const next = readSession()
        user.value = next?.user ?? null
      })
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    const cleanEmail = normalizeEmail(email)
    if (!cleanEmail || !password) {
      return { data: null, error: createError("Email and password are required") }
    }

    const users = readUsers()
    const exists = users.some((u) => normalizeEmail(u.email) === cleanEmail)
    if (exists) {
      return { data: null, error: createError("This email is already registered") }
    }

    const uuid = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    const isFirstUser = users.length === 0
    const account: LocalAuthAccount = {
      id: uuid,
      email: cleanEmail,
      password,
      full_name: (fullName || "").trim(),
      role: isFirstUser ? "super_admin" : "user",
      approved: isFirstUser,
      created_at: new Date().toISOString(),
    }

    users.push(account)
    writeUsers(users)

    return {
      data: { user: toPublicUser(account), session: null },
      error: null,
    }
  }

  const signIn = async (email: string, password: string) => {
    const cleanEmail = normalizeEmail(email)
    const account = readUsers().find(
      (u) => normalizeEmail(u.email) === cleanEmail && u.password === password
    )

    if (!account) {
      return { data: null, error: createError("Invalid email or password") }
    }
    if (!account.approved) {
      return { data: null, error: createError("Your account is pending approval from super admin") }
    }

    const session = makeSession(account)
    writeSession(session)
    user.value = session.user
    return { data: { user: session.user, session }, error: null }
  }

  const signOut = async () => {
    writeSession(null)
    user.value = null
    return { error: null }
  }

  return { user, init, getSession, signUp, signIn, signOut }
}
