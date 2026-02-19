<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <div class="fixed top-0 left-0 right-0 z-[70] bg-[#0B4AA2] text-white">
      <div class="max-w-none mx-auto px-4 sm:px-6 lg:px-10">
        <div class="h-10 flex items-center justify-between text-xs sm:text-sm">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 opacity-95">
              <span class="inline-block">Tel</span>
              <span>02-517-0688</span>
            </div>
            <div class="hidden sm:flex items-center gap-2 opacity-95">
              <span class="inline-block">Mail</span>
              <span>info@yushi.co.th</span>
            </div>
          </div>

          <div class="flex items-center gap-3 opacity-95">
            <span>@yushigroup</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-10 min-h-screen flex flex-col">
      <header class="sticky top-10 z-[60] bg-white border-b border-slate-200">
        <div class="max-w-none mx-auto px-4 sm:px-6 lg:px-10">
          <div class="h-16 flex items-center gap-3 sm:gap-4">
            <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
              <img
                src="/MBLogo.png"
                alt="M&B"
                class="h-12 sm:h-14 w-auto object-contain"
              />
              <div class="hidden sm:block leading-tight">
                <div class="font-extrabold tracking-tight text-slate-900">YUSHI</div>
                <div class="text-[11px] text-slate-500 -mt-0.5">INDUSTRIAL</div>
              </div>
            </NuxtLink>

            <div class="flex-1"></div>

            <div class="flex items-center">
              <NuxtLink
                v-if="!isLoggedIn"
                to="/login"
                class="h-9 inline-flex items-center gap-2 rounded-full bg-[#0B4AA2] px-4 text-sm font-semibold text-white shadow-sm
                       hover:bg-[#083A7E] active:bg-[#062F67] transition-colors
                       focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]/30"
              >
                เข้าสู่ระบบ
              </NuxtLink>

              <div v-else class="flex items-center gap-2">
                <button
                  type="button"
                  class="h-9 inline-flex items-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  @click="onLogout"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>

          <div class="h-12 flex items-center border-t border-slate-100">
            <nav class="flex items-center gap-5 text-sm overflow-x-auto whitespace-nowrap no-scrollbar">
              <NuxtLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="font-semibold text-slate-800 hover:text-[#0B4AA2] shrink-0"
                :class="route.path === item.to ? 'text-[#0B4AA2]' : ''"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </header>

      <main class="flex-1 w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <slot />
      </main>

      <footer class="bg-[#0B4AA2] text-white mt-auto">
        <div class="max-w-none mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-white/85">
            <NuxtLink to="/contact" class="hover:underline">Data privacy</NuxtLink>
            <NuxtLink to="/contact" class="hover:underline">Cookie settings</NuxtLink>
            <NuxtLink to="/contact" class="hover:underline">Imprint</NuxtLink>
            <NuxtLink to="/contact" class="hover:underline">General terms and conditions</NuxtLink>
            <span class="sm:ml-auto text-white/70">© {{ new Date().getFullYear() }} M&B</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const auth = useAuth?.() as any
const user = auth?.user
const getSession = auth?.getSession
const signOut = auth?.signOut

const showDevAdminBtn = true
const adminTest = ref(false)

onMounted(async () => {
  adminTest.value = localStorage.getItem("ADMIN_TEST") === "1"

  try {
    if (getSession) await getSession()
  } catch (e) {
    console.error("getSession error:", e)
  }
})

const isLoggedIn = computed(() => {
  const real = !!user?.value
  return real || adminTest.value
})

const toggleAdminTest = () => {
  adminTest.value = !adminTest.value
  localStorage.setItem("ADMIN_TEST", adminTest.value ? "1" : "0")
}

const onLogout = async () => {
  try {
    if (signOut) await signOut()
  } finally {
    adminTest.value = false
    localStorage.removeItem("ADMIN_TEST")
    await navigateTo("/")
  }
}

const nav = computed(() => {
  const base = [
    { label: "หน้าแรก", to: "/" },
    { label: "เกี่ยวกับเรา", to: "/about" },
    { label: "สินค้า", to: "/product" },
    { label: "บริการ", to: "/service" },
    { label: "ติดต่อ", to: "/contact" },
  ]

  if (isLoggedIn.value) {
    base.push({ label: "จัดการสินค้า", to: "/admin/products" })
    base.push({ label: "จัดการโปรเจค", to: "/admin/projects-local" })
    base.push({ label: "ตั้งค่า", to: "/admin/settings" })
  }

  return base
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap");

* {
  font-family: "Kanit", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
