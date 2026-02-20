<template>
  <div class="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 space-y-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">จัดการสินค้า (Admin)</h1>
      <p class="mt-1 text-sm text-slate-600">เพิ่ม/ลบสินค้า และจัดการข้อมูลสต็อกใน Supabase</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="lg:col-span-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-5">
          <h2 class="text-base font-extrabold text-slate-900">เพิ่มสินค้าใหม่</h2>
        </div>

        <form class="p-5 space-y-4" @submit.prevent="createProduct">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-800">ชื่อสินค้า *</label>
            <input
              v-model.trim="form.name"
              type="text"
              required
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="เช่น Blackmores Omega 3"
            />
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">แบรนด์</label>
              <input
                v-model.trim="form.brand"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="เช่น Blackmores"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">SKU *</label>
              <input
                v-model.trim="form.sku"
                type="text"
                required
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="เช่น BM-OMEGA3-001"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">หมวดหมู่ *</label>
              <input
                v-model.trim="form.category"
                type="text"
                required
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="เช่น วิตามิน"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">หน่วย *</label>
              <input
                v-model.trim="form.unit"
                type="text"
                required
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="เช่น กระปุก"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">จำนวน *</label>
              <input
                v-model.number="form.quantity"
                type="number"
                min="0"
                required
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">ราคา *</label>
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">รูปสินค้า (อัปโหลดจากเครื่อง)</label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
              @change="onPickImage"
            />
            <div class="mt-3 flex items-center gap-3">
              <div class="flex h-16 w-20 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <img v-if="form.image_url" :src="form.image_url" alt="preview" class="h-full w-full object-contain p-1" />
                <span v-else class="text-xs text-slate-400">ไม่มีรูป</span>
              </div>
              <button
                v-if="form.image_url"
                type="button"
                class="h-9 rounded-lg border border-slate-300 bg-slate-100 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                @click="form.image_url = ''"
              >
                ลบรูป
              </button>
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ errorMsg }}
          </div>
          <div v-if="successMsg" class="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {{ successMsg }}
          </div>

          <div class="flex items-center gap-2">
            <button
              type="submit"
              class="h-11 flex-1 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
              :disabled="loading"
            >
              เพิ่มสินค้า
            </button>
            <button
              type="button"
              class="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold hover:bg-slate-50"
              @click="resetForm"
            >
              ล้างฟอร์ม
            </button>
          </div>
        </form>
      </section>

      <section class="lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-5 space-y-3">
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-extrabold text-slate-900">รายการสินค้า</h2>
              <p class="mt-1 text-sm text-slate-600">ทั้งหมด {{ filteredProducts.length }} รายการ</p>
            </div>
            <button
              type="button"
              class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              @click="loadProducts"
            >
              Refresh
            </button>
          </div>

          <input
            v-model.trim="search"
            type="text"
            placeholder="ค้นหา ชื่อสินค้า / SKU / แบรนด์ / หมวดหมู่"
            class="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div class="p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>
          <div v-else-if="!filteredProducts.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ไม่พบข้อมูลสินค้า
          </div>

          <div v-else class="rounded-xl border border-slate-200 overflow-auto">
            <table class="w-full table-auto text-sm">
              <thead class="bg-slate-50 text-slate-700">
                <tr>
                  <th class="px-3 py-2 text-left font-semibold">#</th>
                  <th class="px-3 py-2 text-left font-semibold">รูป</th>
                  <th class="px-3 py-2 text-left font-semibold">ชื่อสินค้า</th>
                  <th class="px-3 py-2 text-left font-semibold">แบรนด์</th>
                  <th class="px-3 py-2 text-left font-semibold">SKU</th>
                  <th class="px-3 py-2 text-left font-semibold">หมวดหมู่</th>
                  <th class="px-3 py-2 text-left font-semibold">หน่วย</th>
                  <th class="px-3 py-2 text-right font-semibold">จำนวน</th>
                  <th class="px-3 py-2 text-right font-semibold">ราคา</th>
                  <th class="px-3 py-2 text-center font-semibold">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(p, idx) in filteredProducts"
                  :key="p.id"
                  class="border-t border-slate-100"
                >
                  <td class="px-3 py-2 text-slate-500">{{ idx + 1 }}</td>
                  <td class="px-3 py-2">
                    <div class="h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <img
                        v-if="p.image_url"
                        :src="p.image_url"
                        :alt="p.name || 'product'"
                        class="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div v-else class="flex h-full w-full items-center justify-center text-[10px] text-slate-400">No Img</div>
                    </div>
                  </td>
                  <td class="px-3 py-2 font-medium text-slate-900 whitespace-normal break-words">{{ p.name || "-" }}</td>
                  <td class="px-3 py-2">{{ p.brand || "-" }}</td>
                  <td class="px-3 py-2">{{ p.sku || "-" }}</td>
                  <td class="px-3 py-2">{{ p.category || "-" }}</td>
                  <td class="px-3 py-2">{{ p.unit || "-" }}</td>
                  <td class="px-3 py-2 text-right">{{ p.quantity ?? 0 }}</td>
                  <td class="px-3 py-2 text-right">{{ formatPrice(p.price) }}</td>
                  <td class="px-3 py-2 text-center">
                    <button
                      type="button"
                      class="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                      @click="deleteProduct(p.id)"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue"

useHead({ title: "Admin | Products" })
const supa = useSupabaseRest()

type ProductRow = {
  id: string | number
  sku: string | null
  name: string | null
  brand: string | null
  category: string | null
  image_url: string | null
  unit: string | null
  quantity: number | null
  price: number | null
}

type CreatePayload = {
  sku: string
  name: string
  brand: string | null
  category: string
  unit: string
  quantity: number
  price: number
  image_url: string | null
}

const products = ref<ProductRow[]>([])
const loading = ref(false)
const errorMsg = ref("")
const successMsg = ref("")
const search = ref("")

const form = reactive({
  name: "",
  brand: "",
  sku: "",
  category: "",
  unit: "",
  quantity: 0,
  price: 0,
  image_url: "",
})

const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter((p) =>
    [p.name, p.brand, p.sku, p.category, p.unit]
      .map((x) => (x || "").toLowerCase())
      .join(" ")
      .includes(q)
  )
})

const resetForm = () => {
  form.name = ""
  form.brand = ""
  form.sku = ""
  form.category = ""
  form.unit = ""
  form.quantity = 0
  form.price = 0
  form.image_url = ""
}

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ""))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const onPickImage = async (e: Event) => {
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) return
  const maxMB = 2
  if (file.size > maxMB * 1024 * 1024) {
    window.alert(`รูปใหญ่เกิน ${maxMB}MB กรุณาย่อรูปก่อน`)
    if (input) input.value = ""
    return
  }
  form.image_url = await fileToDataUrl(file)
  if (input) input.value = ""
}

const formatPrice = (value: number | null) => {
  if (typeof value !== "number") return "-"
  return value.toLocaleString("th-TH")
}

const loadProducts = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const rows = await supa.listProducts()
    products.value = Array.isArray(rows) ? rows : []
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || e?.message || "โหลดสินค้าไม่สำเร็จ"
    products.value = []
  } finally {
    loading.value = false
  }
}

const createProduct = async () => {
  errorMsg.value = ""
  successMsg.value = ""

  const payload: CreatePayload = {
    name: form.name.trim(),
    brand: form.brand.trim() || null,
    sku: form.sku.trim(),
    category: form.category.trim(),
    unit: form.unit.trim(),
    quantity: Number(form.quantity),
    price: Number(form.price),
    image_url: form.image_url || null,
  }

  if (!payload.name || !payload.sku || !payload.category || !payload.unit) {
    errorMsg.value = "กรุณากรอกข้อมูลที่มี * ให้ครบ"
    return
  }
  if (!Number.isFinite(payload.quantity) || payload.quantity < 0) {
    errorMsg.value = "จำนวนต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป"
    return
  }
  if (!Number.isFinite(payload.price) || payload.price < 0) {
    errorMsg.value = "ราคาต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป"
    return
  }

  loading.value = true
  try {
    await supa.createProduct(payload)
    successMsg.value = "เพิ่มสินค้าสำเร็จ"
    resetForm()
    await loadProducts()
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || e?.message || "เพิ่มสินค้าไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

const deleteProduct = async (id: string | number) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!window.confirm("ลบสินค้านี้ใช่ไหม?")) return

  loading.value = true
  try {
    await supa.deleteProduct(id)
    successMsg.value = "ลบสินค้าแล้ว"
    await loadProducts()
  } catch (e: any) {
    errorMsg.value = e?.data?.statusMessage || e?.message || "ลบสินค้าไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)
</script>
