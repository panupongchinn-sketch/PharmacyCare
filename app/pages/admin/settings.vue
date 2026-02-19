<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Settings: User & Password</h1>
      <p class="mt-1 text-sm text-slate-600">Manage local login accounts stored in this browser.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="lg:col-span-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-5">
          <h2 class="text-base font-extrabold text-slate-900">Create User</h2>
        </div>

        <form class="p-5 space-y-4" @submit.prevent="createUser">
          <div v-if="!isSuperAdmin" class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
            Only super admin can approve and manage users.
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">Full name</label>
            <input
              v-model.trim="form.full_name"
              type="text"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              placeholder="Optional"
              :disabled="!isSuperAdmin"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">Email (User)</label>
            <input
              v-model.trim="form.email"
              type="email"
              required
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              placeholder="user@email.com"
              :disabled="!isSuperAdmin"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              placeholder="at least 6 characters"
              :disabled="!isSuperAdmin"
            />
          </div>

          <div v-if="errorMsg" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ errorMsg }}
          </div>

          <div v-if="successMsg" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {{ successMsg }}
          </div>

          <button
            type="submit"
            class="h-11 rounded-xl bg-[#0B4AA2] px-5 text-sm font-semibold text-white hover:bg-[#083A7E]"
            :disabled="!isSuperAdmin"
          >
            Add User
          </button>
        </form>
      </section>

      <section class="lg:col-span-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-5 flex items-center justify-between">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">Users</h2>
            <p class="mt-1 text-sm text-slate-600">Total {{ users.length }} account(s)</p>
          </div>
          <button
            type="button"
            class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            @click="loadUsers"
          >
            Refresh
          </button>
        </div>

        <div class="p-5">
          <div v-if="!users.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            No users yet.
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="u in users"
              :key="u.id"
              class="rounded-xl border border-slate-200 p-4"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div class="font-semibold text-slate-900">{{ u.full_name || "(no name)" }}</div>
                  <div class="text-sm text-slate-600">{{ u.email }}</div>
                  <div class="mt-1 flex items-center gap-2 text-xs">
                    <span class="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700">
                      {{ u.role === "super_admin" ? "Super Admin" : "User" }}
                    </span>
                    <span
                      class="rounded-full px-2 py-0.5"
                      :class="u.approved ? 'border border-emerald-200 bg-emerald-50 text-emerald-700' : 'border border-amber-200 bg-amber-50 text-amber-700'"
                    >
                      {{ u.approved ? "Approved" : "Pending" }}
                    </span>
                  </div>
                  <div class="mt-1 text-xs text-slate-500">Created: {{ formatDate(u.created_at) }}</div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="!u.approved && u.role !== 'super_admin'"
                    type="button"
                    class="h-9 rounded-lg border border-emerald-300 bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                    :disabled="!isSuperAdmin"
                    @click="approveUser(u.id)"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    class="h-9 rounded-lg border border-red-300 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                    :disabled="!isSuperAdmin || u.role === 'super_admin'"
                    @click="deleteUser(u.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div class="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  v-model="passwordDraft[u.id]"
                  type="password"
                  minlength="6"
                  class="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                  placeholder="New password"
                  :disabled="!isSuperAdmin"
                />
                <button
                  type="button"
                  class="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-black"
                  :disabled="!isSuperAdmin"
                  @click="changePassword(u.id)"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

definePageMeta({ middleware: ["auth"] })
useHead({ title: "Settings | User Management" })

type LocalAuthAccount = {
  id: string
  email: string
  password: string
  full_name?: string
  role?: "super_admin" | "user"
  approved?: boolean
  created_at: string
}

const USERS_KEY = "mb_local_auth_users"
const SESSION_KEY = "mb_local_auth_session"

const users = ref<LocalAuthAccount[]>([])
const passwordDraft = ref<Record<string, string>>({})
const currentUserId = ref("")
const isSuperAdmin = ref(false)

const form = reactive({
  full_name: "",
  email: "",
  password: "",
})

const errorMsg = ref("")
const successMsg = ref("")

const normalizeEmail = (v: string) => v.trim().toLowerCase()

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

const normalizeUsers = (rows: LocalAuthAccount[]) =>
  (() => {
    const hasSuperAdmin = rows.some((u) => u.role === "super_admin")
    const fallbackSuperAdminId = hasSuperAdmin
      ? ""
      : [...rows]
          .sort(
            (a, b) =>
              new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
          )[0]?.id || rows[0]?.id || ""

    return rows.map((u) => {
      const role = u.role || (u.id === fallbackSuperAdminId ? "super_admin" : "user")
      return {
        ...u,
        role,
        approved: typeof u.approved === "boolean" ? u.approved : role === "super_admin",
      }
    })
  })()

const loadUsers = () => {
  if (!process.client) return
  const raw = safeParse<LocalAuthAccount[]>(localStorage.getItem(USERS_KEY), [])
  users.value = normalizeUsers(raw)
  localStorage.setItem(USERS_KEY, JSON.stringify(users.value))

  const session = safeParse<any | null>(localStorage.getItem(SESSION_KEY), null)
  currentUserId.value = session?.user?.id || ""
  const current = users.value.find((u) => u.id === currentUserId.value)
  isSuperAdmin.value = current?.role === "super_admin"
}

const saveUsers = () => {
  if (!process.client) return
  localStorage.setItem(USERS_KEY, JSON.stringify(normalizeUsers(users.value)))
}

const createUser = () => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!isSuperAdmin.value) {
    errorMsg.value = "Only super admin can manage users"
    return
  }

  const email = normalizeEmail(form.email)
  if (!email || !form.password) {
    errorMsg.value = "Email and password are required"
    return
  }
  if (form.password.length < 6) {
    errorMsg.value = "Password must be at least 6 characters"
    return
  }
  if (users.value.some((u) => normalizeEmail(u.email) === email)) {
    errorMsg.value = "This email already exists"
    return
  }

  const id = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  users.value.unshift({
    id,
    email,
    password: form.password,
    full_name: form.full_name.trim(),
    role: "user",
    approved: true,
    created_at: new Date().toISOString(),
  })

  saveUsers()
  form.full_name = ""
  form.email = ""
  form.password = ""
  successMsg.value = "User created"
}

const changePassword = (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!isSuperAdmin.value) {
    errorMsg.value = "Only super admin can manage users"
    return
  }

  const nextPassword = (passwordDraft.value[id] || "").trim()
  if (!nextPassword) {
    errorMsg.value = "Please enter new password"
    return
  }
  if (nextPassword.length < 6) {
    errorMsg.value = "Password must be at least 6 characters"
    return
  }

  const row = users.value.find((u) => u.id === id)
  if (!row) return
  row.password = nextPassword
  saveUsers()
  passwordDraft.value[id] = ""
  successMsg.value = "Password updated"
}

const deleteUser = (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!isSuperAdmin.value) {
    errorMsg.value = "Only super admin can manage users"
    return
  }

  if (!window.confirm("Delete this user?")) return

  users.value = users.value.filter((u) => u.id !== id)
  saveUsers()
  delete passwordDraft.value[id]

  const session = safeParse<any | null>(localStorage.getItem(SESSION_KEY), null)
  if (session?.user?.id === id) {
    localStorage.removeItem(SESSION_KEY)
    navigateTo("/login")
    return
  }

  successMsg.value = "User deleted"
}

const approveUser = (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!isSuperAdmin.value) {
    errorMsg.value = "Only super admin can manage users"
    return
  }
  const row = users.value.find((u) => u.id === id)
  if (!row) return
  row.approved = true
  saveUsers()
  successMsg.value = "User approved"
}

const formatDate = (iso: string) => {
  if (!iso) return "-"
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString("th-TH")
}

onMounted(loadUsers)
</script>
