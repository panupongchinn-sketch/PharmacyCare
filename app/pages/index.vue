<template>
  <div class="min-h-screen bg-slate-50">
    <!-- ✅ HERO VIDEO -->
    <section class="relative w-full">
      <div class="relative h-[520px] sm:h-[640px] w-full overflow-hidden bg-black">
        <video
          class="absolute inset-0 h-full w-full object-cover"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        >
          <source
            src="https://yushiindustrial.com/wp-content/uploads/2025/03/vdo-intro.mp4"
            type="video/mp4"
          />
        </video>

        <div class="absolute inset-0 bg-black/35"></div>

        <div class="relative h-full mx-auto max-w-7xl px-4 sm:px-6 flex items-center">
          <div
            class="w-full max-w-2xl rounded-2xl bg-black/55 border border-white/10 p-6 sm:p-10 text-white shadow-xl"
          >
            <h1 class="text-4xl sm:text-6xl font-extrabold italic tracking-tight">
              Yushi Industrial
            </h1>

            <p class="mt-5 text-sm sm:text-base text-white/85 leading-relaxed">
              บริการรับปรึกษา ออกแบบ ติดตั้ง บำรุงรักษา งานระบบอุตสาหกรรม
              จำหน่ายสินค้าอุปกรณ์อุตสาหกรรม พร้อมทีมช่างมืออาชีพ และบริการ 24 ชั่วโมง
            </p>

            <div class="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40
                       text-white font-semibold hover:bg-white/10 transition"
              >
                โปรเจคของเรา
              </a>

              <a
                href="#catalog"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0B4AA2]
                       text-white font-semibold hover:bg-[#083A7E] transition"
              >
                สินค้าของเรา
              </a>

              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/15
                       text-white font-semibold hover:bg-white/20 transition"
              >
                ติดต่อเรา
              </NuxtLink>
            </div>

            <div class="mt-5 text-xs sm:text-sm text-white/75">
              ทั้งหมดสินค้า:
              <span class="font-bold text-white">{{ products.length }}</span>
              รายการ
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ การ์ด 1 ใบ "ด้านล่าง VDO" -->
    <section class="bg-slate-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="py-10">
          <div class="rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">
            <div class="p-6 sm:p-10">
              <div class="grid lg:grid-cols-12 gap-8 items-center">
                <!-- ซ้าย -->
                <div class="lg:col-span-12">
                  <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0B4AA2]">
                    YUSHI INDUSTRIAL
                    <span class="text-slate-900">ผู้จัดจำหน่าย สินค้าอุตสาหกรรม</span>
                  </h2>

                  <p class="mt-4 text-slate-600 leading-relaxed">
                    รวมสินค้าอุตสาหกรรมหลายหมวดหมู่ พร้อมบริการให้คำปรึกษา ออกแบบ ติดตั้ง และบำรุงรักษา
                    เพื่อให้งานของคุณเดินได้อย่างมืออาชีพ
                  </p>

                  <div class="mt-6 flex flex-wrap gap-3">
                    <a
                      href="tel:025170688"
                      class="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#0B4AA2] text-[#0B4AA2] font-bold
                             hover:bg-[#0B4AA2] hover:text-white transition"
                    >
                      📞 02-517-0688
                    </a>

                    <a
                      href="#"
                      class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#17A34A] text-white font-bold
                             hover:opacity-90 transition"
                    >
                      💬 @yushigroup
                    </a>
                  </div>

                  <div class="mt-5 text-sm text-slate-500">
                    ทั้งหมดสินค้า:
                    <span class="font-bold text-slate-700">{{ products.length }}</span>
                    รายการ
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    <!-- ✅ PARTNERS -->
    <section class="relative py-14 sm:py-18">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-50"></div>
      <div class="absolute inset-x-0 top-0 -z-10 h-px bg-slate-200"></div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="text-center">
          <p class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#0B4AA2] uppercase">
            Trusted by <span class="h-1 w-1 rounded-full bg-[#0B4AA2]"></span> Partners
          </p>

          <h2 class="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            ลูกค้าและพาร์ทเนอร์ธุรกิจ
          </h2>

          <p class="mt-3 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            ตัวอย่างองค์กรที่ให้ความไว้วางใจและร่วมงานกับเรา
          </p>
        </div>

        <div class="mt-10 sm:mt-12">
          <div v-if="partnerLogos.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              v-for="item in partnerLogos"
              :key="item.id"
              class="h-24 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden"
            >
              <img
                :src="item.imageDataUrl"
                :alt="item.name || 'partner'"
                class="h-full w-full object-contain p-3"
                loading="lazy"
                @error="onImgError"
              />
            </div>
          </div>

          <div v-else class="flex items-center justify-center">
            <img
              src="https://yushiindustrial.com/wp-content/uploads/2025/03/customer-logo.png"
              alt="Partners"
              class="w-full max-w-5xl h-auto object-contain"
              loading="lazy"
              @error="onImgError"
            />
          </div>

          <div class="mt-10 h-px bg-slate-200"></div>
        </div>
      </div>
    </section>

    <!-- ✅ PROJECTS (LocalStorage) — ✅ “กว้างออกซ้ายขวา” -->
    <main id="projects" class="mx-auto max-w-screen-2xl px-4 sm:px-6 py-12">
      <!-- heading -->
      <div class="text-center">
        <p class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#0B4AA2] uppercase">
          Portfolio <span class="h-1 w-1 rounded-full bg-[#0B4AA2]"></span> Projects
        </p>

        <h2 class="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          โปรเจคของเรา
          <span class="text-[#0B4AA2]"></span>
        </h2>

        <p class="mt-3 text-slate-600 max-w-2xl mx-auto leading-relaxed">
          
        </p>
      </div>

      <div class="mt-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div v-if="!projectsLoaded" class="mt-8 text-center text-slate-500">
        กำลังโหลด...
      </div>

      <div
        v-else-if="!projects.length"
        class="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center"
      >
        <div
          class="mx-auto mb-4 h-12 w-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl"
        >
          📌
        </div>
        <div class="text-lg font-extrabold text-slate-900">ยังไม่มีโปรเจค</div>
        <div class="mt-1 text-sm text-slate-600">ไปเพิ่มที่เมนู “จัดการโปรเจค” ก่อน</div>
      </div>

      <!-- ✅ Grid: ลดจำนวนคอลัมน์ เพื่อให้แต่ละใบ “กว้าง” -->
      <div v-else class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-7">
        <article
          v-for="p in projects"
          :key="p.id"
          class="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition"
        >
          <!-- ✅ ทำเป็นการ์ดแนวนอนบนจอใหญ่ (กว้างออกซ้ายขวา) -->
          <div class="grid md:grid-cols-12">
            <!-- media -->
            <div class="md:col-span-5">
              <div class="relative h-56 sm:h-64 md:h-full bg-slate-100 overflow-hidden">
                <img
                  v-if="p.imageDataUrl"
                  :src="p.imageDataUrl"
                  :alt="p.name"
                  class="h-full w-full object-cover group-hover:scale-[1.03] transition"
                />
                <div v-else class="h-full w-full flex items-center justify-center text-slate-400">
                  <div class="text-center">
                    <div class="text-4xl">🖼️</div>
                    <div class="mt-2 text-sm font-semibold">ไม่มีรูป</div>
                  </div>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent"></div>
              </div>
            </div>

            <!-- body -->
            <div class="md:col-span-7 p-6 sm:p-7">
              <h3 class="font-extrabold text-slate-900 text-lg sm:text-xl line-clamp-2">
                {{ p.name }}
              </h3>

              <div class="mt-3 flex flex-wrap gap-2 text-xs">
                <span
                  v-if="p.category"
                  class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold"
                >
                  {{ p.category }}
                </span>

                <span
                  v-if="p.client"
                  class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold"
                >
                  {{ p.client }}
                </span>

                <span
                  v-if="p.status"
                  class="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold"
                >
                  {{ p.status }}
                </span>
              </div>

              <p class="mt-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed line-clamp-5">
                {{ p.description }}
              </p>

              <div class="mt-6 h-px bg-slate-100"></div>
              <div class="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span class="font-semibold text-slate-700">Yushi Industrial</span>
                <span class="inline-flex items-center gap-1 font-semibold text-[#0B4AA2]">
                  ดูเพิ่มเติม <span class="transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>

    <!-- ✅ PRODUCT CATALOG -->
    <main id="catalog" class="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <div v-if="loading" class="flex items-center gap-3 text-slate-500">
        <span class="inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"></span>
        <span class="font-medium">กำลังโหลด...</span>
      </div>

      <div v-else-if="error" class="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
        <div class="font-bold">โหลดข้อมูลไม่ได้</div>
        <div class="text-sm mt-1">{{ error }}</div>
        <button
          type="button"
          class="mt-3 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
          @click="loadProducts"
        >
          ลองอีกครั้ง
        </button>
      </div>

      <div v-else class="space-y-8">
        <div class="space-y-4">
          <div class="text-center">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#0B4AA2]">
              หมวดหมู่สินค้า
            </h2>
            <p class="mt-2 text-slate-600 max-w-2xl mx-auto">
              เลือกดูสินค้าแยกตามแบรนด์ พร้อมรายละเอียดและรูปภาพ
            </p>
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              class="h-10 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm"
              @click="loadProducts"
            >
              Refresh
            </button>
          </div>
        </div>

        <section v-for="g in groupedByBrand" :key="g.brand" class="space-y-4">
          <div>
            <h3 class="text-xl font-extrabold text-slate-900">
              {{ g.brand }}
            </h3>
            <p class="text-sm text-slate-500">
              {{ g.items.length }} รายการ
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <NuxtLink
              v-for="p in g.items"
              :key="p.id"
              :to="`/product/${p.id}`"
              class="group block rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition
                     focus:outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
            >
              <div class="aspect-[4/3] bg-white flex items-center justify-center border-b border-slate-100 overflow-hidden">
                <img
                  :src="p.image_url || fallbackImg"
                  :alt="p.name || 'product'"
                  class="w-full h-full object-contain group-hover:scale-[1.02] transition"
                  loading="lazy"
                  @error="onImgError"
                />
              </div>

              <div class="p-4 space-y-2">
                <h4 class="font-bold text-slate-900 leading-snug line-clamp-2">
                  {{ p.name || "-" }}
                </h4>

                <div class="text-xs text-slate-600 space-y-1">
                  <div><span class="font-semibold">Brand:</span> {{ p.brand || "-" }}</div>
                  <div><span class="font-semibold">SKU:</span> {{ p.sku || "-" }}</div>
                  <div><span class="font-semibold">Category:</span> {{ p.category || "-" }}</div>
                  <div><span class="font-semibold">Unit:</span> {{ p.unit || "-" }}</div>
                </div>

                <div class="pt-2">
                  <span class="text-sm font-semibold text-[#0B4AA2] group-hover:underline">
                    View details &gt;
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>
    </main>
<!-- ✅ FOOTER LINKS SECTION -->
    <section class="bg-white border-t border-slate-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <div class="flex items-center gap-3">
              <img src="/MBLogo.png" alt="Yushi Industrial" class="h-12 w-auto object-contain" />
              <div class="leading-tight">
                <div class="text-lg font-extrabold text-slate-900">Yushi Industrial</div>
                <div class="text-sm text-slate-500 -mt-0.5">YUSHI GROUP</div>
              </div>
            </div>

            <p class="mt-5 text-sm text-slate-600 leading-relaxed">
              เราเป็นผู้ให้บริการ รับติดตั้ง ซ่อมบำรุง และจำหน่ายสินค้าอุตสาหกรรมแบบครบวงจร
              มุ่งเน้นคุณภาพ มาตรฐาน และบริการหลังการขาย
            </p>
          </div>

          <div class="lg:col-span-3">
            <h3 class="text-sm font-extrabold text-[#0B4AA2] tracking-wide">สินค้าของเรา</h3>
            <ul class="mt-4 space-y-2 text-sm text-slate-700">
              <li>ระบบส่งกำลังและระบบอัตโนมัติ</li>
              <li>ระบบลมและโบลเวอร์อุตสาหกรรม</li>
              <li>ระบบระบายอากาศภายในอาคาร</li>
              <li>ระบบบำบัดอากาศและระบบระบายอากาศ</li>
              <li>ปั๊มน้ำอุตสาหกรรม</li>
              <li>ปั๊มน้ำเพื่อการเกษตร</li>
              <li>เครื่องมือช่างและอุปกรณ์งานช่าง</li>
            </ul>
          </div>

          <div class="lg:col-span-3">
            <h3 class="text-sm font-extrabold text-[#0B4AA2] tracking-wide">บริการของเรา</h3>
            <ul class="mt-4 space-y-2 text-sm text-slate-700">
              <li>บริการงานออกแบบและติดตั้ง</li>
              <li>บริการงานซ่อมและบำรุงรักษา</li>
              <li>บริการงานเช่าและจัดงานกิจกรรม</li>
              <li>บริการสำรวจหน้างาน</li>
              <li>บริการหลังการขาย</li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <h3 class="text-sm font-extrabold text-[#0B4AA2] tracking-wide">ติดต่อเรา</h3>

            <div class="mt-4 text-sm text-slate-700 leading-relaxed">
              <div class="font-semibold text-slate-900">บริษัท ยูชิ อินดัสเทรียล จำกัด</div>
              <div class="mt-1">72 ถนนรามอินทรา แขวงมีนบุรี เขตมีนบุรี กรุงเทพฯ 10510</div>
            </div>

            <ul class="mt-4 space-y-3 text-sm text-slate-700">
              <li class="flex items-center gap-2">
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">📞</span>
                <a class="hover:underline" href="tel:025170688">02-517-0688</a>
              </li>
              <li class="flex items-center gap-2">
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">☎️</span>
                <a class="hover:underline" href="tel:025170863">02-517-0863</a>
              </li>
              <li class="flex items-center gap-2">
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">✉️</span>
                <a class="hover:underline" href="mailto:info@yushi.co.th">info@yushi.co.th</a>
              </li>
              <li class="flex items-center gap-2">
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">💬</span>
                <span>@yushigroup</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-[#0B4AA2] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
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
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

type ProductRow = {
  id: string
  sku: string | null
  name: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  brand: string | null
}

type ProjectRow = {
  id: string
  name: string
  description: string
  category?: string
  client?: string
  status?: "draft" | "doing" | "done"
  imageDataUrl?: string
  createdAt: string
  updatedAt: string
}

type PartnerLogoRow = {
  id: string
  name: string
  imageDataUrl: string
  createdAt: string
  updatedAt: string
}

/** =================== PRODUCTS (Supabase) =================== */
const { $supabase } = useNuxtApp()
const fallbackImg = "https://picsum.photos/seed/product/1200/900"
const PARTNERS_KEY = "yushi_partner_logos"

const products = ref<ProductRow[]>([])
const loading = ref(true)
const error = ref("")
const partnerLogos = ref<PartnerLogoRow[]>([])

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const normBrand = (b: string | null | undefined) => {
  const v = (b || "").trim()
  return v ? v : "Unbranded"
}

const groupedByBrand = computed(() => {
  const map = new Map<string, ProductRow[]>()

  for (const p of products.value) {
    const key = normBrand(p.brand)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(p)
  }

  const brands = Array.from(map.keys()).sort((a, b) => {
    if (a === "Unbranded") return 1
    if (b === "Unbranded") return -1
    return a.localeCompare(b, "en")
  })

  return brands.map((brand) => {
    const items = (map.get(brand) || []).slice().sort((x, y) =>
      (x.name || "").localeCompare(y.name || "", "th")
    )
    return { brand, items }
  })
})

const loadProducts = async () => {
  loading.value = true
  error.value = ""
  try {
    const { data, error: e } = await ($supabase as any)
      .from("products")
      .select("id, sku, name, category, image_url, unit, brand")
      .order("brand", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true })

    if (e) throw e
    products.value = (data || []) as ProductRow[]
  } catch (err: any) {
    error.value = err?.message || "Failed to load products"
    products.value = []
  } finally {
    loading.value = false
  }
}

/** =================== PROJECTS (LocalStorage) =================== */
const PROJECTS_KEY = "yushi_projects"

const projects = ref<ProjectRow[]>([])
const projectsLoaded = ref(false)

const loadProjectsLocal = () => {
  if (typeof window === "undefined") return
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    const arr = raw ? JSON.parse(raw) : []
    projects.value = Array.isArray(arr) ? arr : []
  } catch (e) {
    console.error("loadProjectsLocal error:", e)
    projects.value = []
  } finally {
    projectsLoaded.value = true
  }
}

const loadPartnerLogosLocal = () => {
  if (typeof window === "undefined") return
  try {
    const raw = localStorage.getItem(PARTNERS_KEY)
    const arr = raw ? JSON.parse(raw) : []
    partnerLogos.value = Array.isArray(arr) ? arr : []
  } catch (e) {
    console.error("loadPartnerLogosLocal error:", e)
    partnerLogos.value = []
  }
}

onMounted(() => {
  loadProducts()
  loadProjectsLocal()
  loadPartnerLogosLocal()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


