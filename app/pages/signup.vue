<template>
  <div class="w-full py-10">
    <div class="mx-auto max-w-md">
      <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="p-6 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <img src="/MBLogo.png" alt="M&B" class="h-9 w-auto" />
            <div>
              <h1 class="text-xl font-bold text-slate-900">สมัครสมาชิก</h1>
              <p class="text-sm text-slate-500">สร้างบัญชีเพื่อเข้าใช้งานและเรียนคอร์ส</p>
            </div>
          </div>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="handleSignup">
          <!-- Full name (optional) -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล</label>
            <input
              v-model.trim="name"
              type="text"
              placeholder="ชื่อ-นามสกุล / Full Name"
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
              :disabled="isLoading"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              v-model.trim="email"
              type="email"
              autocomplete="username"
              placeholder="เช่น user@email.com"
              required
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
              :disabled="isLoading"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPw ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="อย่างน้อย 6 ตัวอักษร"
                required
                minlength="6"
                class="w-full h-11 rounded-lg border border-slate-300 px-3 pr-20
                       focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
                :disabled="isLoading"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 rounded-md
                       text-sm font-semibold text-slate-600 hover:bg-slate-50"
                @click="showPw = !showPw"
                :disabled="isLoading"
              >
                {{ showPw ? "ซ่อน" : "ดู" }}
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="ยืนยันรหัสผ่าน"
              required
              minlength="6"
              class="w-full h-11 rounded-lg border border-slate-300 px-3
                     focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
              :disabled="isLoading"
            />
          </div>

          <!-- Success -->
          <div
            v-if="successMessage"
            class="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            {{ successMessage }}
          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {{ errorMessage }}
          </div>

          <!-- Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full h-11 rounded-full bg-red-600 text-white font-semibold shadow-sm
                   hover:bg-red-700 active:bg-red-800 transition-colors
                   disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">สร้างบัญชี</span>
            <span v-else class="inline-flex items-center justify-center gap-2">
              <span class="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-white animate-spin"></span>
              กำลังสร้างบัญชี...
            </span>
          </button>

          <!-- Links -->
          <div class="pt-2 flex items-center justify-between text-sm">
            <NuxtLink to="/" class="text-slate-500 hover:text-red-700">
              ← กลับหน้าแรก
            </NuxtLink>

            <div class="text-slate-600">
              มีบัญชีอยู่แล้ว?
              <NuxtLink to="/login" class="font-semibold text-red-600 hover:text-red-700">
                เข้าสู่ระบบ
              </NuxtLink>
            </div>
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
import { ref } from "vue"

useHead({ title: "Signup | M&B" })

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const showPw = ref(false)

const errorMessage = ref("")
const successMessage = ref("")
const isLoading = ref(false)

const { signUp } = useAuth()

const handleSignup = async () => {
  errorMessage.value = ""
  successMessage.value = ""

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "รหัสผ่านไม่ตรงกัน"
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
    return
  }

  isLoading.value = true
  try {
    // ✅ ใช้ signature เดิมของมึง: signUp(email, password, name)
    const { data, error } = await signUp(email.value, password.value, name.value)

    if (error) {
      errorMessage.value = error.message || "สมัครสมาชิกไม่สำเร็จ"
      return
    }

    successMessage.value = "สร้างบัญชีสำเร็จ! กำลังพาไปหน้าเข้าสู่ระบบ..."

    // clear
    name.value = ""
    email.value = ""
    password.value = ""
    confirmPassword.value = ""

    setTimeout(() => {
      navigateTo("/login")
    }, 1200)
  } catch (err: any) {
    errorMessage.value = err?.message || "เกิดข้อผิดพลาด"
  } finally {
    isLoading.value = false
  }
}
</script>
