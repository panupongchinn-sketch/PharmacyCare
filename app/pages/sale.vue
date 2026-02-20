<template>
  <div class="-mx-4 -my-8 min-h-[calc(100vh-120px)] bg-slate-100 p-4 sm:-mx-6 sm:p-6 lg:-mx-10 lg:p-8">
    <div class="mx-auto grid max-w-[1700px] gap-4 xl:grid-cols-12">
      <section class="xl:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="space-y-3 border-b border-slate-100 p-4">
          <div class="flex gap-3">
            <input
              v-model.trim="search"
              type="text"
              placeholder="ค้นหาสินค้า / SKU / แบรนด์"
              class="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="button"
              class="h-11 rounded-xl border border-violet-300 bg-violet-50 px-4 text-sm font-semibold text-violet-700 hover:bg-violet-100"
            >
              Scan
            </button>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="c in categories"
              :key="c"
              type="button"
              class="h-9 rounded-lg border px-4 text-sm"
              :class="selectedCategory === c ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 bg-white text-slate-700'"
              @click="selectedCategory = c"
            >
              {{ c }}
            </button>
          </div>
        </div>

        <div class="max-h-[520px] overflow-auto p-2">
          <table class="w-full table-auto text-sm">
            <thead class="sticky top-0 bg-white">
              <tr class="border-b border-slate-200 text-slate-600">
                <th class="w-8 px-2 py-2 text-center">#</th>
                <th class="w-16 px-2 py-2 text-left">รูป</th>
                <th class="px-2 py-2 text-left">สินค้า</th>
                <th class="w-24 px-2 py-2 text-right">ราคา</th>
                <th class="w-24 px-2 py-2 text-center">คงเหลือ</th>
                <th class="w-32 px-2 py-2 text-center">จำนวนขาย</th>
                <th class="w-28 px-2 py-2 text-right">รวม</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(p, idx) in filteredCatalog"
                :key="p.id"
                class="border-b border-slate-100 hover:bg-emerald-50/40"
              >
                <td class="px-2 py-3 text-center text-slate-500">{{ idx + 1 }}</td>
                <td class="px-2 py-3">
                  <div class="h-12 w-12 overflow-hidden rounded border border-slate-200 bg-slate-50">
                    <img v-if="p.image_url" :src="p.image_url" :alt="p.name || 'product'" class="h-full w-full object-cover" />
                    <div v-else class="flex h-full w-full items-center justify-center text-[10px] text-slate-400">No Img</div>
                  </div>
                </td>
                <td class="px-2 py-3">
                  <div class="font-semibold text-slate-900">{{ p.name || '-' }}</div>
                  <div class="text-xs text-slate-500">SKU: {{ p.sku || '-' }} | {{ p.unit || '-' }}</div>
                </td>
                <td class="px-2 py-3 text-right">{{ money(p.price) }}</td>
                <td class="px-2 py-3 text-center">{{ stockQty(p.id) }}</td>
                <td class="px-2 py-3">
                  <div class="flex items-center justify-center gap-1">
                    <button type="button" class="h-8 w-8 rounded border border-slate-300 text-lg" @click="decQty(p)">-</button>
                    <div class="w-10 text-center font-semibold">{{ cartQty(p.id) }}</div>
                    <button type="button" class="h-8 w-8 rounded border border-emerald-700 bg-emerald-700 text-lg text-white" @click="addToCart(p)">+</button>
                  </div>
                </td>
                <td class="px-2 py-3 text-right font-semibold">{{ money(lineSubtotalByProductId(p.id)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-sm">
          <div class="font-semibold">รวม</div>
          <div class="flex items-center gap-8">
            <span>{{ totalQty }} ชิ้น</span>
            <span class="font-bold">{{ money(cartTotal) }}</span>
          </div>
        </div>
      </section>

      <section class="xl:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            class="h-9 rounded-lg border px-3 text-sm font-semibold"
            :class="paymentMethod === 'cash' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300'"
            @click="paymentMethod = 'cash'"
          >
            เงินสด
          </button>
          <button
            type="button"
            class="h-9 rounded-lg border px-3 text-sm font-semibold"
            :class="paymentMethod === 'qris' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300'"
            @click="paymentMethod = 'qris'"
          >
            QRIS
          </button>
          <button
            type="button"
            class="h-9 rounded-lg border px-3 text-sm font-semibold"
            :class="paymentMethod === 'debit' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300'"
            @click="paymentMethod = 'debit'"
          >
            Debit
          </button>
        </div>

        <div class="mb-4 flex items-end justify-between">
          <h2 class="text-4xl font-extrabold text-slate-900">Total</h2>
          <div class="text-4xl font-extrabold">{{ money(cartTotal) }}</div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">Cash</label>
            <input
              v-model="cashInput"
              type="text"
              inputmode="numeric"
              class="h-11 w-full rounded-xl border border-slate-300 px-3 text-lg outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">Change</label>
            <input
              :value="money(changeAmount)"
              type="text"
              readonly
              class="h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-lg"
            />
          </div>
        </div>

        <div class="mt-4 grid grid-cols-3 border border-slate-200">
          <button
            v-for="k in keypad"
            :key="k"
            type="button"
            class="h-16 border border-slate-200 text-xl hover:bg-slate-50"
            @click="pressKey(k)"
          >
            <span v-if="k !== 'back'">{{ k }}</span>
            <span v-else>⌫</span>
          </button>
        </div>

        <div v-if="message" class="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {{ message }}
        </div>
        <div v-if="error" class="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ error }}
        </div>

        <button
          type="button"
          class="mt-4 h-12 w-full rounded-xl bg-emerald-700 text-lg font-bold text-white hover:bg-emerald-800 disabled:opacity-50"
          :disabled="!cart.length"
          @click="pay"
        >
          Pay
        </button>
      </section>
    </div>

    <div
      v-if="showReceipt && receipt"
      class="receipt-overlay fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/55 p-4"
    >
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div id="receipt-print" class="receipt-paper p-5">
          <div class="text-center">
            <h3 class="text-xl font-extrabold text-slate-900">Pharmacy Care</h3>
            <p class="text-sm text-slate-600">ใบเสร็จรับเงิน</p>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            <div>เลขที่: {{ receipt.receiptNo }}</div>
            <div class="text-right">วันที่: {{ receipt.createdAt }}</div>
            <div>วิธีชำระ: {{ receipt.paymentLabel }}</div>
            <div class="text-right">พนักงาน: POS</div>
          </div>

          <div class="mt-4 border-t border-b border-dashed border-slate-300 py-2">
            <div
              v-for="line in receipt.lines"
              :key="line.id"
              class="mb-2 text-sm last:mb-0"
            >
              <div class="font-semibold text-slate-900">{{ line.name || '-' }}</div>
              <div class="flex items-center justify-between text-slate-600">
                <span>{{ line.qty }} x {{ money(line.price) }}</span>
                <span>{{ money(line.subtotal) }}</span>
              </div>
            </div>
          </div>

          <div class="mt-3 space-y-1 text-sm">
            <div class="flex justify-between text-slate-700">
              <span>จำนวนรวม</span>
              <span>{{ receipt.totalQty }} ชิ้น</span>
            </div>
            <div class="flex justify-between text-slate-900">
              <span>ยอดรวม</span>
              <span class="font-bold">{{ money(receipt.total) }}</span>
            </div>
            <div class="flex justify-between text-slate-700">
              <span>รับเงิน</span>
              <span>{{ money(receipt.cash) }}</span>
            </div>
            <div class="flex justify-between text-slate-700">
              <span>เงินทอน</span>
              <span>{{ money(receipt.change) }}</span>
            </div>
          </div>

          <p class="mt-4 text-center text-xs text-slate-500">ขอบคุณที่ใช้บริการ</p>
        </div>

        <div class="no-print flex items-center justify-end gap-2 border-t border-slate-200 p-4">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            @click="showReceipt = false"
          >
            ปิด
          </button>
          <button
            type="button"
            class="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            @click="printReceipt"
          >
            พิมพ์ใบเสร็จ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

useHead({ title: 'ขายยา | POS' })

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

type CartLine = {
  id: string | number
  sku: string | null
  name: string | null
  image_url: string | null
  unit: string | null
  price: number
  qty: number
}

type ReceiptLine = {
  id: string | number
  productId?: string | number | null
  name: string | null
  sku?: string | null
  unit?: string | null
  price: number
  qty: number
  subtotal: number
}

type ReceiptData = {
  receiptNo: string
  createdAt: string
  paymentLabel: string
  lines: ReceiptLine[]
  totalQty: number
  total: number
  cash: number
  change: number
}

const products = ref<ProductRow[]>([])
const cart = ref<CartLine[]>([])
const search = ref('')
const selectedCategory = ref('All')
const paymentMethod = ref<'cash' | 'qris' | 'debit'>('cash')
const cashInput = ref('')
const message = ref('')
const error = ref('')
const showReceipt = ref(false)
const receipt = ref<ReceiptData | null>(null)

const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'back']

const categories = computed(() => {
  const set = new Set<string>()
  for (const p of products.value) {
    if (p.category) set.add(p.category)
  }
  return ['All', ...Array.from(set)]
})

const filteredCatalog = computed(() => {
  const q = search.value.trim().toLowerCase()
  return products.value.filter((p) => {
    const byCategory = selectedCategory.value === 'All' || p.category === selectedCategory.value
    const text = [p.name, p.sku, p.brand, p.category].join(' ').toLowerCase()
    const bySearch = !q || text.includes(q)
    return byCategory && bySearch
  })
})

const cartTotal = computed(() => cart.value.reduce((sum, x) => sum + x.price * x.qty, 0))
const totalQty = computed(() => cart.value.reduce((sum, x) => sum + x.qty, 0))
const cashAmount = computed(() => Number((cashInput.value || '0').replace(/,/g, '')) || 0)
const changeAmount = computed(() => Math.max(0, cashAmount.value - cartTotal.value))
const paymentLabel = computed(() => {
  if (paymentMethod.value === 'cash') return 'เงินสด'
  if (paymentMethod.value === 'qris') return 'QRIS'
  return 'Debit'
})

const money = (value: number | null | undefined) => `${Number(value || 0).toLocaleString('th-TH')}`

const stockQty = (id: string | number) => {
  const p = products.value.find((x) => String(x.id) === String(id))
  const stock = Number(p?.quantity || 0)
  const inCart = cart.value.find((x) => String(x.id) === String(id))?.qty || 0
  return Math.max(0, stock - inCart)
}

const cartQty = (id: string | number) => cart.value.find((x) => String(x.id) === String(id))?.qty || 0

const lineSubtotalByProductId = (id: string | number) => {
  const line = cart.value.find((x) => String(x.id) === String(id))
  if (!line) return 0
  return line.price * line.qty
}

const addToCart = (p: ProductRow) => {
  error.value = ''
  message.value = ''
  if (stockQty(p.id) <= 0) {
    error.value = 'สินค้าไม่พอในสต็อก'
    return
  }

  const found = cart.value.find((x) => String(x.id) === String(p.id))
  if (found) {
    found.qty += 1
  } else {
    cart.value.push({
      id: p.id,
      sku: p.sku,
      name: p.name,
      image_url: p.image_url,
      unit: p.unit,
      price: Number(p.price || 0),
      qty: 1,
    })
  }
}

const decQty = (p: ProductRow) => {
  const found = cart.value.find((x) => String(x.id) === String(p.id))
  if (!found) return
  found.qty -= 1
  if (found.qty <= 0) {
    cart.value = cart.value.filter((x) => String(x.id) !== String(p.id))
  }
}

const pressKey = (k: string) => {
  if (k === 'back') {
    cashInput.value = cashInput.value.slice(0, -1)
    return
  }
  cashInput.value = `${cashInput.value}${k}`
}

const pay = async () => {
  error.value = ''
  message.value = ''

  if (!cart.value.length) {
    error.value = 'ยังไม่มีสินค้าในรายการขาย'
    return
  }

  if (paymentMethod.value === 'cash' && cashAmount.value < cartTotal.value) {
    error.value = 'เงินสดไม่พอชำระ'
    return
  }

  const finalTotal = cartTotal.value
  const finalQty = totalQty.value
  const paid = paymentMethod.value === 'cash' ? cashAmount.value : finalTotal
  const change = Math.max(0, paid - finalTotal)
  const lines: ReceiptLine[] = cart.value.map((line) => ({
    id: line.id,
    productId: line.id,
    name: line.name,
    sku: line.sku,
    unit: line.unit,
    price: line.price,
    qty: line.qty,
    subtotal: line.price * line.qty,
  }))

  const receiptNo = `RX-${Date.now().toString().slice(-8)}`
  const createdAt = new Date().toLocaleString('th-TH')

  receipt.value = {
    receiptNo,
    createdAt,
    paymentLabel: paymentLabel.value,
    lines,
    totalQty: finalQty,
    total: finalTotal,
    cash: paid,
    change,
  }

  try {
    await $fetch("/api/sales-history", {
      method: "POST",
      body: {
        receiptNo,
        paymentMethod: paymentMethod.value,
        paymentLabel: paymentLabel.value,
        totalQty: finalQty,
        total: finalTotal,
        cash: paid,
        change,
        lines,
      },
    })
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      err?.message ||
      "บันทึกประวัติการขายไม่สำเร็จ"
    return
  }

  showReceipt.value = true
  message.value = 'ชำระเงินสำเร็จ'
  cart.value = []
  cashInput.value = ''
}

const printReceipt = () => {
  window.print()
}

const loadProducts = async () => {
  try {
    const rows = await $fetch<ProductRow[]>('/api/products-primary')
    products.value = Array.isArray(rows) ? rows : []
  } catch {
    products.value = []
    error.value = 'โหลดข้อมูลสินค้าไม่สำเร็จ'
  }
}

onMounted(loadProducts)
</script>

<style>
@media print {
  body * {
    visibility: hidden !important;
  }

  #receipt-print,
  #receipt-print * {
    visibility: visible !important;
  }

  #receipt-print {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 16px;
    background: white;
  }

  .no-print {
    display: none !important;
  }
}
</style>
