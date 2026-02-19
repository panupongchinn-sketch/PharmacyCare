<template>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">
    <div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">จัดการสินค้า (Admin)</h1>
      <p class="mt-1 text-sm text-slate-600">เพิ่มและลบสินค้าที่จะแสดงในหน้า /product</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-12">
      <section class="lg:col-span-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
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
              class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
              placeholder="เช่น Optical distance sensor"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">Brand</label>
              <input
                v-model.trim="form.brand"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                placeholder="เช่น Leuze"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">SKU</label>
              <input
                v-model.trim="form.sku"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                placeholder="เช่น AS 307i 200"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">Category</label>
              <input
                v-model.trim="form.category"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                placeholder="เช่น Laser positioning systems"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-800">Unit</label>
              <input
                v-model.trim="form.unit"
                type="text"
                class="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0B4AA2]/20"
                placeholder="เช่น pcs"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-800">รูปสินค้า (อัปโหลดจากเครื่อง)</label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-slate-600
                     file:mr-3 file:rounded-xl file:border-0 file:bg-slate-100 file:px-4 file:py-2
                     file:text-sm file:font-semibold file:text-slate-800 hover:file:bg-slate-200"
              @change="onPickImage"
            />

            <div class="mt-3 flex items-center gap-3">
              <div class="h-16 w-20 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                <img
                  v-if="form.imageDataUrl"
                  :src="form.imageDataUrl"
                  alt="preview"
                  class="h-full w-full object-contain p-1"
                />
                <span v-else class="text-xs text-slate-400">ไม่มีรูป</span>
              </div>
              <button
                v-if="form.imageDataUrl"
                type="button"
                class="h-9 rounded-lg border border-slate-300 bg-slate-100 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                @click="form.imageDataUrl = ''"
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
              class="h-11 flex-1 rounded-xl bg-[#0B4AA2] px-5 text-sm font-semibold text-white hover:bg-[#083A7E]"
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

      <section class="lg:col-span-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 p-5 flex items-center justify-between gap-3">
          <div>
            <h2 class="text-base font-extrabold text-slate-900">รายการสินค้า</h2>
            <p class="mt-1 text-sm text-slate-600">ทั้งหมด {{ products.length }} รายการ</p>
          </div>
          <button
            type="button"
            class="h-10 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            @click="loadProducts"
          >
            Refresh
          </button>
        </div>

        <div class="p-5">
          <div v-if="loading" class="text-sm text-slate-500">กำลังโหลด...</div>

          <div v-else-if="!products.length" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ยังไม่มีสินค้า
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="p in products"
              :key="p.id"
              class="rounded-xl border border-slate-200 p-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="font-semibold text-slate-900 truncate">{{ p.name || "-" }}</div>
                  <div class="mt-1 text-xs text-slate-600">
                    Brand: {{ p.brand || "-" }} | SKU: {{ p.sku || "-" }}
                  </div>
                  <div class="mt-1 text-xs text-slate-500">
                    Category: {{ p.category || "-" }} | Unit: {{ p.unit || "-" }}
                  </div>
                </div>

                <button
                  type="button"
                  class="h-9 rounded-lg border border-red-300 bg-red-50 px-3 text-xs font-semibold text-red-700 hover:bg-red-100"
                  @click="deleteProduct(p.id)"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

definePageMeta({ middleware: ["auth"] })
useHead({ title: "Admin | Products" })

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

const products = ref<ProductRow[]>([])
const loading = ref(false)
const errorMsg = ref("")
const successMsg = ref("")

const form = reactive({
  name: "",
  brand: "",
  sku: "",
  category: "",
  unit: "",
  imageDataUrl: "",
})

const resetForm = () => {
  form.name = ""
  form.brand = ""
  form.sku = ""
  form.category = ""
  form.unit = ""
  form.imageDataUrl = ""
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

  form.imageDataUrl = await fileToDataUrl(file)
  if (input) input.value = ""
}

const loadProducts = async () => {
  loading.value = true
  errorMsg.value = ""
  try {
    const { data, error } = await ($supabase as any)
      .from("products")
      .select("id, sku, name, category, image_url, unit, brand")
      .order("brand", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true })

    if (error) throw error
    products.value = (data || []) as ProductRow[]
  } catch (e: any) {
    errorMsg.value = e?.message || "โหลดสินค้าล้มเหลว"
    products.value = []
  } finally {
    loading.value = false
  }
}

const createProduct = async () => {
  errorMsg.value = ""
  successMsg.value = ""

  const name = form.name.trim()
  if (!name) {
    errorMsg.value = "กรุณากรอกชื่อสินค้า"
    return
  }

  try {
    const payload = {
      name,
      brand: form.brand.trim() || null,
      sku: form.sku.trim() || null,
      category: form.category.trim() || null,
      unit: form.unit.trim() || null,
      image_url: form.imageDataUrl || null,
    }

    const { error } = await ($supabase as any).from("products").insert(payload)
    if (error) throw error

    successMsg.value = "เพิ่มสินค้าสำเร็จ"
    resetForm()
    await loadProducts()
  } catch (e: any) {
    errorMsg.value = e?.message || "เพิ่มสินค้าไม่สำเร็จ"
  }
}

const deleteProduct = async (id: string) => {
  errorMsg.value = ""
  successMsg.value = ""
  if (!window.confirm("ลบสินค้านี้ใช่ไหม?")) return

  try {
    const { error } = await ($supabase as any).from("products").delete().eq("id", id)
    if (error) throw error
    successMsg.value = "ลบสินค้าแล้ว"
    await loadProducts()
  } catch (e: any) {
    errorMsg.value = e?.message || "ลบสินค้าไม่สำเร็จ"
  }
}

onMounted(loadProducts)
</script>
