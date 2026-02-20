<template>
  <div class="lux-page relative min-h-screen overflow-hidden py-8 sm:py-10">
    <div class="lux-glow glow-a" aria-hidden="true"></div>
    <div class="lux-glow glow-b" aria-hidden="true"></div>
    <div class="lux-noise" aria-hidden="true"></div>

    <section class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
      <div class="hero-glass relative overflow-hidden rounded-[30px] p-6 sm:p-8">
        <div class="hero-photo" aria-hidden="true"></div>
        <div class="hero-fade" aria-hidden="true"></div>

        <div class="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/85">Medicine Detail</p>
            <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl">
              {{ product?.name || 'ไม่พบข้อมูลสินค้า' }}
            </h1>
            <p class="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              ตรวจสอบข้อมูลสินค้ารายการนี้ก่อนสั่งซื้อ หากต้องการคำแนะนำเพิ่มเติมสามารถติดต่อเภสัชกรได้ทันที
            </p>

            <div class="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              <span class="lux-chip">SKU: {{ product?.sku || '-' }}</span>
              <span class="lux-chip">หมวดหมู่: {{ product?.category || '-' }}</span>
              <span class="lux-chip">หน่วยขาย: {{ product?.unit || '-' }}</span>
            </div>
          </div>

          <NuxtLink
            to="/product"
            class="inline-flex h-11 items-center justify-center rounded-xl border border-white/40 bg-white/20 px-5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/30"
          >
            ← กลับหน้าสินค้า
          </NuxtLink>
        </div>
      </div>

      <div class="mt-6">
        <div v-if="loading" class="glass-card p-6 text-slate-600">
          <div class="flex items-center gap-3">
            <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"></span>
            <span class="font-medium">กำลังโหลดข้อมูลสินค้า...</span>
          </div>
        </div>

        <div v-else-if="error" class="glass-card border-red-200/70 bg-red-50/70 p-4 text-red-700">
          <div class="font-bold">ไม่พบข้อมูลสินค้า</div>
          <div class="mt-1 text-sm">{{ error }}</div>

          <div class="mt-3 flex gap-2">
            <button
              type="button"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              @click="loadProduct"
            >
              ลองใหม่อีกครั้ง
            </button>
            <NuxtLink
              to="/product"
              class="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold hover:bg-red-100/70"
            >
              กลับ
            </NuxtLink>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div class="space-y-6 xl:col-span-8">
            <div class="glass-card overflow-hidden rounded-3xl">
              <div class="border-b border-white/60 p-4 sm:p-6">
                <div class="image-wrap overflow-hidden rounded-2xl border border-slate-100/70 bg-white/85">
                  <img
                    :src="product?.image_url || fallbackImg"
                    :alt="product?.name || 'product'"
                    class="h-full w-full object-contain p-4"
                    loading="lazy"
                    @error="onImgError"
                  />
                </div>
              </div>

              <div class="p-4 sm:p-6">
                <h2 class="text-lg font-extrabold text-slate-900">ข้อมูลสินค้า</h2>

                <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div class="spec-card">
                    <div class="spec-label">SKU</div>
                    <div class="spec-value">{{ product?.sku || '-' }}</div>
                  </div>

                  <div class="spec-card">
                    <div class="spec-label">หมวดหมู่</div>
                    <div class="spec-value">{{ product?.category || '-' }}</div>
                  </div>

                  <div class="spec-card">
                    <div class="spec-label">หน่วยขาย</div>
                    <div class="spec-value">{{ product?.unit || '-' }}</div>
                  </div>

                  <div class="spec-card">
                    <div class="spec-label">รหัสสินค้า</div>
                    <div class="spec-mono">{{ product?.id || '-' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="xl:col-span-4">
            <div class="sticky top-28 space-y-4">
              <div class="glass-card overflow-hidden rounded-3xl">
                <div class="border-b border-white/60 bg-white/40 px-5 py-4 backdrop-blur-sm">
                  <h3 class="text-lg font-extrabold text-slate-900">สอบถามราคา / คำแนะนำ</h3>
                  <p class="mt-1 text-sm text-slate-600">หากต้องการข้อมูลการใช้ยาเพิ่มเติม สามารถติดต่อทีมเภสัชกรของเราได้ทันที</p>
                </div>

                <div class="space-y-3 p-5">
                  <button
                    type="button"
                    class="h-11 w-full rounded-xl bg-[#0B4AA2] text-sm font-bold text-white transition hover:bg-[#083A7E]"
                    @click="goContact"
                  >
                    สอบถามสินค้า + ขอคำแนะนำ
                  </button>

                  <NuxtLink
                    to="/contact"
                    class="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200/70 bg-white/70 text-sm font-semibold text-slate-700 transition hover:bg-white"
                  >
                    ติดต่อร้านยา
                  </NuxtLink>
                </div>
              </div>

              <div class="glass-card rounded-2xl p-4 text-sm text-slate-600">
                <div class="font-bold text-slate-900">ข้อมูลติดต่อร้านยา</div>
                <div class="mt-1">โทร 02-517-0688 หรืออีเมล pharmacy@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type ProductRow = {
  id: string | number
  sku: string | null
  name: string | null
  category: string | null
  image_url: string | null
  unit: string | null
}

const route = useRoute()
const id = computed(() => String(route.params.id || ''))

const fallbackImg = 'https://picsum.photos/seed/productdetail/1200/900'
const product = ref<ProductRow | null>(null)
const loading = ref(true)
const error = ref('')

useHead(() => ({
  title: `${product.value?.name || 'ไม่พบข้อมูลสินค้า'} | ร้านขายยา`,
}))

const loadProduct = async () => {
  loading.value = true
  error.value = ''
  try {
    const list = await $fetch<ProductRow[]>('/api/products-primary')
    product.value = list.find((x) => String(x.id) === id.value) || null
    if (!product.value) error.value = 'ไม่พบสินค้าที่ต้องการ (id ไม่ถูกต้อง)'
  } catch (err: any) {
    error.value = err?.message || 'Failed to load product'
    product.value = null
  } finally {
    loading.value = false
  }
}

const onImgError = (e: Event) => {
  const el = e.target as HTMLImageElement | null
  if (el) el.src = fallbackImg
}

const goContact = async () => {
  const qs = new URLSearchParams()
  if (product.value?.name) qs.set('subject', `สอบถามสินค้า: ${product.value.name}`)
  if (id.value) qs.set('product_id', id.value)
  await navigateTo(`/contact?${qs.toString()}`)
}

onMounted(loadProduct)
watch(id, () => loadProduct())
</script>

<style scoped>
.lux-page {
  background:
    radial-gradient(circle at 15% -10%, rgba(96, 165, 250, 0.28), transparent 40%),
    radial-gradient(circle at 88% 12%, rgba(103, 232, 249, 0.22), transparent 34%),
    linear-gradient(180deg, #f7fbff 0%, #f3f7fc 52%, #f7f9fc 100%);
}

.lux-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(38px);
  pointer-events: none;
  opacity: 0.42;
}

.glow-a {
  width: 360px;
  height: 360px;
  left: -120px;
  top: 180px;
  background: #dbeafe;
}

.glow-b {
  width: 420px;
  height: 420px;
  right: -170px;
  top: 230px;
  background: #cffafe;
}

.lux-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  background-image: radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.45) 1px, transparent 0);
  background-size: 18px 18px;
}

.hero-glass {
  border: 1px solid rgba(255, 255, 255, 0.58);
  box-shadow: 0 20px 40px rgba(2, 6, 23, 0.12);
  backdrop-filter: blur(8px);
}

.hero-photo {
  position: absolute;
  inset: 0;
  background-image: url('/recommend-factory-type-1.jpg');
  background-size: cover;
  background-position: center;
}

.hero-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(118deg, rgba(15, 23, 42, 0.72), rgba(30, 41, 59, 0.53), rgba(11, 74, 162, 0.35));
}

.lux-chip {
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.2);
  color: #eff6ff;
  padding: 0.3rem 0.58rem;
  border-radius: 999px;
  backdrop-filter: blur(6px);
}

.glass-card {
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}

.image-wrap {
  aspect-ratio: 16 / 10;
}

.spec-card {
  border: 1px solid rgba(148, 163, 184, 0.32);
  background: rgba(255, 255, 255, 0.78);
  border-radius: 0.86rem;
  padding: 0.8rem;
}

.spec-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #64748b;
}

.spec-value {
  margin-top: 0.28rem;
  font-size: 0.92rem;
  font-weight: 800;
  color: #0f172a;
}

.spec-mono {
  margin-top: 0.28rem;
  font-size: 0.74rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  color: #334155;
  word-break: break-all;
}
</style>
