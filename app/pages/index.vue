<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <section id="home" class="relative isolate overflow-hidden">
      <div class="absolute inset-0">
        <img src="/recommend-factory-type-1.jpg" alt="hero" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-700/40 to-emerald-400/30"></div>
      </div>

      <div class="relative mx-auto flex min-h-[420px] w-full max-w-7xl items-center px-4 py-12 sm:min-h-[520px] sm:px-6">
        <div class="max-w-3xl rounded-3xl border border-white/35 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md sm:p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">Trusted Pharmacy</p>
          <h1 class="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">เลือกซื้อยาและเวชภัณฑ์ได้ง่ายในที่เดียว</h1>
          <p class="mt-4 text-sm leading-relaxed text-emerald-50/95 sm:text-lg">
            รวมสินค้าสำคัญสำหรับดูแลสุขภาพประจำบ้าน พร้อมข้อมูลสินค้าอ่านง่าย และหน้ารายละเอียดที่ค้นหาไว
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink
              to="/product"
              class="inline-flex items-center justify-center rounded-xl bg-amber-300 px-6 py-3 text-sm font-extrabold text-emerald-950 transition hover:brightness-95"
            >
              เลือกดูสินค้า
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center rounded-xl border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ปรึกษาเภสัชกร
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <main>
      <section id="featured" class="py-14 sm:py-20">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-emerald-700">Featured Products</p>
              <h2 class="mt-1 text-3xl font-extrabold text-emerald-900 sm:text-5xl">สินค้าแนะนำ</h2>
            </div>
            <NuxtLink to="/product" class="text-sm font-bold text-emerald-700 hover:underline">ดูทั้งหมด -></NuxtLink>
          </div>

          <div v-if="loading" class="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">กำลังโหลดสินค้า...</div>

          <div v-else-if="loadError" class="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            โหลดสินค้าไม่สำเร็จ กรุณาลองใหม่อีกครั้งในภายหลัง
          </div>

          <div v-else class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <NuxtLink
              v-for="item in featuredProducts"
              :key="item.id"
              :to="`/product/${item.id}`"
              class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div class="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-white">
                <img
                  :src="item.image_url || fallbackImg"
                  :alt="item.name || 'product'"
                  class="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div class="space-y-3 p-4 sm:p-5">
                <h3 class="two-line product-title text-[1.05rem] font-extrabold leading-snug text-slate-900">{{ item.name || "-" }}</h3>
                <div class="space-y-1 text-sm text-slate-700">
                  <p><span class="font-extrabold text-slate-900">แบรนด์:</span> {{ displayBrand(item) }}</p>
                  <p><span class="font-extrabold text-slate-900">SKU:</span> {{ item.sku || "-" }}</p>
                  <p><span class="font-extrabold text-slate-900">หมวดหมู่:</span> {{ item.category || "-" }}</p>
                  <p><span class="font-extrabold text-slate-900">หน่วยขาย:</span> {{ item.unit || "-" }}</p>
                </div>
                <p class="text-lg font-extrabold text-emerald-700">{{ formatPrice(item.price) }}</p>
                <div class="pt-1">
                  <span class="text-sm font-extrabold text-[#0B4AA2] group-hover:underline">ดูรายละเอียดสินค้า &gt;</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section id="benefits" class="bg-white py-14 sm:py-20">
        <div class="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          <article class="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
            <h3 class="text-xl font-extrabold text-emerald-900">ข้อมูลชัดเจน</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-700">ดูชื่อยา หมวดหมู่ ราคา และหน่วยขายได้ทันทีในหน้าเดียว</p>
          </article>
          <article class="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
            <h3 class="text-xl font-extrabold text-emerald-900">ค้นหาไว</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-700">เข้าสู่หน้าสินค้าเพื่อค้นหาตามชื่อ SKU และหมวดหมู่ได้รวดเร็ว</p>
          </article>
          <article class="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
            <h3 class="text-xl font-extrabold text-emerald-900">พร้อมให้คำแนะนำ</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-700">มีช่องทางติดต่อสอบถามก่อนตัดสินใจเลือกสินค้า</p>
          </article>
        </div>
      </section>
    </main>

    <footer id="contact" class="border-t border-slate-200 bg-slate-50">
      <div class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xl font-extrabold text-emerald-900">Pharmacy Care</p>
          <p class="mt-1 text-sm text-slate-700">ติดต่อสอบถามสินค้าและคำแนะนำการใช้งาน</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink to="/product" class="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">
            เลือกสินค้า
          </NuxtLink>
          <NuxtLink to="/contact" class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100">
            ติดต่อร้านยา
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

type ProductItem = {
  id: string | number
  sku: string | null
  name: string | null
  brand?: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  price: number | null
}

useHead({ title: "หน้าแรก | ร้านขายยา" })

const fallbackImg = "/recommend-factory-type-1.jpg"
const featuredProducts = ref<ProductItem[]>([])
const loading = ref(true)
const loadError = ref(false)
const { listProducts } = useSupabaseRest()

const displayBrand = (item: ProductItem) =>
  (item.brand || "").trim() || (item.category || "").trim() || "-"

const formatPrice = (value: number | null) => {
  if (typeof value !== "number") return "สอบถามราคา"
  return `${value.toLocaleString("th-TH")} บาท`
}

const loadFeatured = async () => {
  loading.value = true
  loadError.value = false
  try {
    const rows = await listProducts()
    featuredProducts.value = Array.isArray(rows) && rows.length ? rows.slice(0, 8) : []
  } catch {
    featuredProducts.value = []
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadFeatured)
</script>

<style scoped>
.two-line {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.2rem;
}

.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-title {
  overflow-wrap: anywhere;
}
</style>
