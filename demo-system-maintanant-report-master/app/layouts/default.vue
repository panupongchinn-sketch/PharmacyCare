<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="sticky top-0 z-[70] border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-emerald-700 text-emerald-700">
            <span class="text-lg font-extrabold">Rx</span>
          </div>
          <div class="leading-tight">
            <p class="text-xs font-semibold text-emerald-700 sm:text-sm">Pharmacy Care</p>
            <p class="text-sm font-extrabold text-emerald-900 sm:text-2xl">ร้านขายยาเพื่อสุขภาพครอบครัว</p>
          </div>
        </NuxtLink>

        <nav class="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
          <NuxtLink :to="'/'" class="transition hover:text-emerald-700" :class="isActive('/') ? 'text-emerald-700' : ''">หน้าแรก</NuxtLink>
          <NuxtLink :to="'/#featured'" class="transition hover:text-emerald-700">สินค้าแนะนำ</NuxtLink>
          <NuxtLink to="/admin/products" class="transition hover:text-emerald-700" :class="isActive('/admin/products') ? 'text-emerald-700' : ''">สต็อกร้าน</NuxtLink>
          <NuxtLink to="/sale" class="transition hover:text-emerald-700" :class="isActive('/sale') ? 'text-emerald-700' : ''">ขายยา</NuxtLink>
          <NuxtLink to="/sales-history" class="transition hover:text-emerald-700" :class="isActive('/sales-history') ? 'text-emerald-700' : ''">ประวัติขาย</NuxtLink>
          <NuxtLink :to="'/#benefits'" class="transition hover:text-emerald-700">ทำไมต้องเรา</NuxtLink>
          <NuxtLink to="/contact" class="transition hover:text-emerald-700" :class="isActive('/contact') ? 'text-emerald-700' : ''">ติดต่อเรา</NuxtLink>
        </nav>

        <NuxtLink
          to="/product"
          class="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
        >
          ดูรายการยา
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto w-full max-w-none flex-1 bg-slate-50" :class="isHome ? 'px-0 py-0' : 'px-4 py-8 sm:px-6 lg:px-10'">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const isActive = (path: string) => route.path === path
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Kanit', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
</style>
