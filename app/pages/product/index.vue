<template>
  <div class="product-page min-h-screen py-8 sm:py-10">
    <section class="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
      <div class="hero-card relative overflow-hidden rounded-3xl border border-slate-200/80 p-6 sm:p-8">
        <div class="pointer-events-none absolute inset-0 hero-bg" aria-hidden="true"></div>
        <div class="pointer-events-none absolute inset-0 hero-overlay" aria-hidden="true"></div>

        <div class="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="max-w-2xl">
            <p class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-100 uppercase">
              Product Catalog
            </p>
            <h1 class="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">สินค้าของเรา</h1>
            <p class="mt-2 text-sm leading-relaxed text-slate-200">
              เลือกดูสินค้าแยกตามแบรนด์ พร้อมรายละเอียดและรูปภาพ สำหรับงานอุตสาหกรรม
            </p>
            <div class="mt-4 text-xs text-slate-200/90">
              พบสินค้า
              <span class="font-extrabold text-white">{{ totalFiltered }}</span>
              จากทั้งหมด
              <span class="font-extrabold text-white">{{ products.length }}</span>
              รายการ
            </div>
          </div>

          <button
            type="button"
            class="inline-flex h-10 items-center rounded-lg border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20"
            @click="loadProducts"
          >
            Refresh
          </button>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div class="sm:col-span-2 lg:col-span-2">
            <label class="mb-1 block text-xs font-semibold text-slate-600">ค้นหาสินค้า</label>
            <input
              v-model.trim="search"
              type="text"
              placeholder="ค้นหาชื่อสินค้า, SKU, หมวดหมู่"
              class="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-[#0B4AA2] focus:bg-white focus:ring-2 focus:ring-[#0B4AA2]/15"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-slate-600">แบรนด์</label>
            <select
              v-model="selectedBrand"
              class="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-[#0B4AA2] focus:bg-white focus:ring-2 focus:ring-[#0B4AA2]/15"
            >
              <option value="all">ทุกแบรนด์</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
          <div class="flex items-center gap-3">
            <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"></span>
            <span class="font-medium">กำลังโหลดข้อมูลสินค้า...</span>
          </div>
        </div>

        <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <div class="font-bold">โหลดข้อมูลไม่ได้</div>
          <div class="mt-1 text-sm">{{ error }}</div>
          <button
            type="button"
            class="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            @click="loadProducts"
          >
            ลองอีกครั้ง
          </button>
        </div>

        <div
          v-else-if="!products.length"
          class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600"
        >
          ยังไม่มีสินค้าในระบบ
        </div>

        <div
          v-else-if="!filteredGroupedByBrand.length"
          class="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600"
        >
          ไม่พบสินค้าที่ตรงกับเงื่อนไขค้นหา
        </div>

        <div v-else class="space-y-9">
          <section v-for="g in filteredGroupedByBrand" :key="g.brand" class="space-y-4">
            <div class="flex items-end justify-between gap-3 border-b border-slate-200 pb-2">
              <div>
                <h2 class="text-xl font-extrabold tracking-tight text-slate-900">{{ g.brand }}</h2>
                <p class="text-sm text-slate-500">{{ g.items.length }} รายการ</p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <NuxtLink
                v-for="p in g.items"
                :key="p.id"
                :to="`/product/${p.id}`"
                class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              >
                <div class="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-white">
                  <img
                    :src="p.image_url || fallbackImg"
                    :alt="p.name || 'product'"
                    class="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    @error="onImgError"
                  />
                </div>

                <div class="space-y-3 p-4">
                  <h3 class="line-clamp-2 min-h-[48px] text-base font-extrabold leading-snug text-slate-900">
                    {{ p.name || '-' }}
                  </h3>

                  <div class="space-y-1 text-xs text-slate-600">
                    <div><span class="font-bold text-slate-800">Brand:</span> {{ p.brand || '-' }}</div>
                    <div><span class="font-bold text-slate-800">SKU:</span> {{ p.sku || '-' }}</div>
                    <div><span class="font-bold text-slate-800">Category:</span> {{ p.category || '-' }}</div>
                    <div><span class="font-bold text-slate-800">Unit:</span> {{ p.unit || '-' }}</div>
                  </div>

                  <div class="pt-1">
                    <span class="text-sm font-bold text-[#0B4AA2] group-hover:underline">View details &gt;</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

useHead({ title: 'สินค้า | Yushi Industrial' })

type ProductRow = {
  id: string
  sku: string | null
  name: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  brand: string | null
}

const { $supabase } = useNuxtApp()
const fallbackImg = 'https://picsum.photos/seed/product/1200/900'

const products = ref<ProductRow[]>([])
const loading = ref(true)
const error = ref('')

const search = ref('')
const selectedBrand = ref('all')

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const normBrand = (b: string | null | undefined) => {
  const v = (b || '').trim()
  return v ? v : 'Unbranded'
}

const groupProducts = (rows: ProductRow[]) => {
  const map = new Map<string, ProductRow[]>()

  for (const p of rows) {
    const key = normBrand(p.brand)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }

  const brands = Array.from(map.keys()).sort((a, b) => {
    if (a === 'Unbranded') return 1
    if (b === 'Unbranded') return -1
    return a.localeCompare(b, 'en')
  })

  return brands.map((brand) => {
    const items = (map.get(brand) || []).slice().sort((x, y) =>
      (x.name || '').localeCompare(y.name || '', 'th')
    )
    return { brand, items }
  })
}

const groupedByBrand = computed(() => groupProducts(products.value))

const brands = computed(() => groupedByBrand.value.map((g) => g.brand))

const filteredProducts = computed(() => {
  const q = search.value.toLowerCase()

  return products.value.filter((p) => {
    const brand = normBrand(p.brand)
    const byBrand = selectedBrand.value === 'all' || selectedBrand.value === brand

    const haystack = [
      p.name || '',
      p.sku || '',
      p.category || '',
      p.brand || '',
      p.unit || '',
    ]
      .join(' ')
      .toLowerCase()

    const bySearch = !q || haystack.includes(q)

    return byBrand && bySearch
  })
})

const filteredGroupedByBrand = computed(() => groupProducts(filteredProducts.value))
const totalFiltered = computed(() => filteredProducts.value.length)

const loadProducts = async () => {
  loading.value = true
  error.value = ''
  try {
    const { data, error: e } = await ($supabase as any)
      .from('products')
      .select('id, sku, name, category, image_url, unit, brand')
      .order('brand', { ascending: true, nullsFirst: false })
      .order('name', { ascending: true })

    if (e) throw e
    products.value = (data || []) as ProductRow[]
  } catch (err: any) {
    error.value = err?.message || 'Failed to load products'
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.product-page {
  background:
    radial-gradient(circle at 20% -10%, rgba(11, 74, 162, 0.08), transparent 45%),
    radial-gradient(circle at 90% 10%, rgba(14, 165, 233, 0.08), transparent 35%),
    #f8fafc;
}

.hero-bg {
  background-image: url('/factory-layout.jpg');
  background-size: cover;
  background-position: center;
  filter: saturate(0.8) contrast(0.95);
}

.hero-overlay {
  background: linear-gradient(120deg, rgba(2, 6, 23, 0.88), rgba(15, 23, 42, 0.72), rgba(11, 74, 162, 0.5));
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
