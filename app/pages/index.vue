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

      <section id="benefits" class="bg-white">
        <div class="benefits-top relative overflow-hidden border-y border-slate-200/80 py-14 sm:py-20">
          <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_48%,rgba(247,236,216,0.86)_100%)]"></div>
          <div class="absolute inset-0 opacity-30">
            <img src="/recommend-factory-type-1.jpg" alt="background" class="h-full w-full object-cover" />
          </div>

          <div class="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 class="max-w-3xl text-3xl font-extrabold leading-tight text-emerald-700 sm:text-5xl">
                สร้างระบบนิเวศของการดูแลสุขภาพที่เชื่อมต่อถึงกัน เพื่อการดูแลที่ไร้รอยต่อ
              </h2>
              <div class="mt-4 h-px max-w-3xl bg-slate-300"></div>
              <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-800">
                HA.OS ระบบ HIS ที่เชื่อมต่อกับหน่วยงานกลาง และพาร์ทเนอร์ด้านสุขภาพต่างๆ เพื่อความสะดวกและความหลากหลายในกระบวนการด้านสุขภาพของโรงพยาบาล
              </p>
              <NuxtLink
                to="/contact"
                class="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700"
              >
                ติดต่อเพื่อเป็นพาร์ทเนอร์
              </NuxtLink>
            </div>

            <div class="mx-auto">
              <div class="relative h-[280px] w-[280px] rounded-full border-4 border-white/80 bg-white/60 p-3 shadow-2xl backdrop-blur-sm sm:h-[360px] sm:w-[360px]">
                <div class="h-full w-full overflow-hidden rounded-full ring-4 ring-white/70">
                  <img src="/recommend-factory-type-1.jpg" alt="partnership" class="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="benefits-bottom relative overflow-hidden py-14 sm:py-20">
          <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(181,221,206,0.78)_0%,rgba(196,225,241,0.72)_100%)]"></div>
          <div class="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
            <h3 class="text-center text-3xl font-extrabold text-slate-800 sm:text-5xl">การเชื่อมต่อที่ครอบคลุมกระบวนการด้านสุขภาพ</h3>
            <div class="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/70 bg-white/15 p-6 text-center text-lg leading-relaxed text-slate-800 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
              เราออกแบบ HA.OS ให้เป็นแพลตฟอร์มแบบเปิดที่พร้อมเชื่อมต่อกับระบบต่าง ๆ ได้อย่างหลากหลายตามมาตรฐานสากล เพื่อให้โรงพยาบาลสามารถเลือกใช้เทคโนโลยีที่ดีที่สุดสำหรับแต่ละส่วนงาน และนำมาทำงานร่วมกันได้อย่างลงตัว
              ข้อมูลผู้ป่วยจึงถูกส่งต่ออย่างถูกต้อง แม่นยำ และทันท่วงทีในทุกขั้นตอนการรักษา
            </div>
          </div>
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
