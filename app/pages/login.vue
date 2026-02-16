<template>
  <div class="w-full py-10">
    <div class="mx-auto max-w-md">
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="p-6 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <img src="/MBLogo.png" alt="M&B" class="h-9 w-auto" />
            <div>
              <h1 class="text-xl font-bold text-slate-900">เข้าสู่ระบบ</h1>
              <p class="text-sm text-slate-500">กรอก User และ Password เพื่อเข้าใช้งาน</p>
            </div>
          </div>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="onLogin">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">User (Email)</label>
            <input
              v-model.trim="email"
              type="email"
              autocomplete="username"
              placeholder="เช่น user@email.com"
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
              :disabled="loading"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPw ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full h-11 rounded-lg border border-slate-300 px-3 pr-20
                       focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
                :disabled="loading"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 rounded-md
                       text-sm font-semibold text-slate-600 hover:bg-slate-50"
                @click="showPw = !showPw"
                :disabled="loading"
              >
                {{ showPw ? "ซ่อน" : "ดู" }}
              </button>
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ errorMsg }}
          </div>

          <button
            type="submit"
            class="w-full h-11 rounded-full bg-red-600 text-white font-semibold shadow-sm
                   hover:bg-red-700 active:bg-red-800 transition-colors
                   disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="!loading">เข้าสู่ระบบ</span>
            <span v-else class="inline-flex items-center gap-2">
              <span class="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin"></span>
              กำลังเข้าสู่ระบบ...
            </span>
          </button>

          <!-- ✅ ลิงก์ที่มึงต้องการ -->
          <div class="pt-2 flex items-center justify-between text-sm">
            <NuxtLink to="/" class="text-slate-500 hover:text-red-700">
              ← กลับหน้าแรก
            </NuxtLink>

            <NuxtLink to="/signup" class="font-semibold text-red-600 hover:text-red-700">
              ยังไม่มีบัญชี? สมัครสมาชิก
            </NuxtLink>
          </div>
        </form>
      </div>

      <p class="mt-4 text-center text-xs text-slate-400">
        © {{ new Date().getFullYear() }} M&B
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

useHead({ title: "Login | M&B" })

const route = useRoute()
const redirectTo = computed(() => {
  const r = route.query.redirect
  return typeof r === "string" && r.startsWith("/") ? r : "/my-courses"
})

const email = ref("")
const password = ref("")
const showPw = ref(false)

const loading = ref(false)
const errorMsg = ref("")

const { signIn } = useAuth()

const onLogin = async () => {
  errorMsg.value = ""

  if (!email.value || !password.value) {
    errorMsg.value = "กรุณากรอก Email และ Password"
    return
  }

  loading.value = true
  try {
    await signIn(email.value, password.value)
    await navigateTo(redirectTo.value)
  } catch (e: any) {
    errorMsg.value = e?.message || "เข้าสู่ระบบไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}
</script>
