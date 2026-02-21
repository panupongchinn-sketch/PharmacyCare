<template>
  <div class="mx-auto w-full max-w-7xl space-y-6">
    <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900">ประวัติการขาย</h1>
          <p class="text-sm text-slate-500">รายการใบเสร็จที่เกิดจากหน้า POS</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            @click="loadHistory"
          >
            Refresh
          </button>
        </div>
      </div>

      <div class="mt-4 grid gap-3 sm:grid-cols-5">
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p class="text-xs text-slate-500">บิลทั้งหมด</p>
          <p class="text-2xl font-extrabold text-slate-900">{{ filteredSales.length }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p class="text-xs text-slate-500">ยอดขายรวม</p>
          <p class="text-2xl font-extrabold text-slate-900">{{ money(grandTotal) }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p class="text-xs text-slate-500">จำนวนสินค้ารวม</p>
          <p class="text-2xl font-extrabold text-slate-900">{{ grandQty }}</p>
        </div>
        <div class="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p class="text-xs text-amber-700">ต้นทุนรวม</p>
          <p class="text-2xl font-extrabold text-amber-900">{{ money(grandCost) }}</p>
        </div>
        <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <p class="text-xs text-emerald-700">กำไรรวม</p>
          <p class="text-2xl font-extrabold text-emerald-900">{{ money(grandProfit) }}</p>
        </div>
      </div>

      <div class="mt-4">
        <input
          v-model.trim="search"
          type="text"
          placeholder="ค้นหาเลขที่ใบเสร็จ / วิธีชำระ"
          class="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <p v-if="loading" class="mt-3 text-sm text-slate-500">กำลังโหลดข้อมูล...</p>
      <p v-if="error" class="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{{ error }}</p>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-slate-900">ยอดขายตามช่วงวันที่</h2>
            <p class="text-sm text-slate-500">เลือกช่วงวันที่เพื่อสรุปยอดขายรายวัน</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <input
              v-model="dateFrom"
              type="date"
              class="h-10 rounded-lg border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <span class="text-slate-400">-</span>
            <input
              v-model="dateTo"
              type="date"
              class="h-10 rounded-lg border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="button"
              class="h-10 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="setLast7Days"
            >
              7 วันล่าสุด
            </button>
            <button
              type="button"
              class="h-10 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              @click="setThisMonth"
            >
              เดือนนี้
            </button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 sm:gap-3">
          <div class="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
            <p class="text-[11px] text-emerald-700">รวมทั้งช่วง</p>
            <p class="text-sm font-extrabold text-emerald-800">{{ money(rangeTotal) }}</p>
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center">
            <p class="text-[11px] text-slate-500">เฉลี่ย/วัน</p>
            <p class="text-sm font-extrabold text-slate-800">{{ money(rangeAverage) }}</p>
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center">
            <p class="text-[11px] text-slate-500">สูงสุด</p>
            <p class="text-sm font-extrabold text-slate-800">{{ bestDayLabel }} {{ money(bestDayTotal) }}</p>
          </div>
        </div>
      </div>

      <p v-if="!dateRangeValid" class="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
        กรุณาเลือกวันที่เริ่มต้นให้น้อยกว่าหรือเท่ากับวันที่สิ้นสุด
      </p>

      <div class="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 sm:p-5">
        <div class="grid grid-cols-[44px_1fr] gap-3">
          <div class="flex h-56 flex-col justify-between pb-6 text-[11px] font-semibold text-slate-400">
            <span>{{ money(yAxisTicks[0]) }}</span>
            <span>{{ money(yAxisTicks[1]) }}</span>
            <span>{{ money(yAxisTicks[2]) }}</span>
            <span>0</span>
          </div>

          <div class="relative h-56">
            <div class="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6">
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-dashed border-slate-200"></div>
              <div class="border-t border-slate-200"></div>
            </div>

            <div class="relative z-10 grid h-full items-end gap-2 sm:gap-3" :style="{ gridTemplateColumns: `repeat(${Math.max(chartDays.length, 1)}, minmax(0, 1fr))` }">
              <div v-for="day in chartDays" :key="day.key" class="flex h-full flex-col justify-end">
                <div class="group relative flex h-[180px] items-end justify-center">
                  <div
                    class="w-full max-w-[68px] rounded-t-xl border border-emerald-200/70 bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-sm transition-all duration-300 group-hover:brightness-105"
                    :class="day.total === bestDayTotal && day.total > 0 ? 'ring-2 ring-amber-300/70' : ''"
                    :style="{ height: barHeight(day.total) }"
                  />
                  <div class="pointer-events-none absolute -top-7 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow transition group-hover:opacity-100">
                    {{ money(day.total) }} บาท
                  </div>
                </div>
                <p class="mt-2 text-center text-sm font-bold text-slate-700">{{ day.label }}</p>
                <p class="text-center text-xs text-slate-500">{{ money(day.total) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-if="dateRangeValid && !chartDays.length" class="mt-3 text-sm text-slate-500">
        ไม่มีข้อมูลยอดขายในช่วงวันที่ที่เลือก
      </p>
    </section>

    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="max-h-[620px] overflow-auto">
        <table class="w-full min-w-[920px] text-sm">
          <thead class="bg-slate-50 text-slate-600">
            <tr>
              <th class="px-4 py-3 text-left">วันที่</th>
              <th class="px-4 py-3 text-left">เลขที่ใบเสร็จ</th>
              <th class="px-4 py-3 text-left">ชำระ</th>
              <th class="px-4 py-3 text-right">จำนวน</th>
              <th class="px-4 py-3 text-right">ยอดรวม</th>
              <th class="px-4 py-3 text-right">รับเงิน</th>
              <th class="px-4 py-3 text-right">เงินทอน</th>
              <th class="px-4 py-3 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!filteredSales.length">
              <td colspan="8" class="px-4 py-8 text-center text-slate-500">ยังไม่มีประวัติการขาย</td>
            </tr>
            <tr v-for="sale in filteredSales" :key="sale.id" class="border-t border-slate-100">
              <td class="px-4 py-3">{{ formatDate(sale.createdAt) }}</td>
              <td class="px-4 py-3 font-semibold text-slate-900">{{ sale.receiptNo }}</td>
              <td class="px-4 py-3">{{ sale.paymentLabel }}</td>
              <td class="px-4 py-3 text-right">{{ sale.totalQty }}</td>
              <td class="px-4 py-3 text-right font-semibold">{{ money(sale.total) }}</td>
              <td class="px-4 py-3 text-right">{{ money(sale.cash) }}</td>
              <td class="px-4 py-3 text-right">{{ money(sale.change) }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    class="rounded-md border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
                    @click="openDetail(sale)"
                  >
                    ดู
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div v-if="showDetail && selected" class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/55 p-4">
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div id="history-receipt-print" class="p-5">
          <div class="text-center">
            <h3 class="text-xl font-extrabold text-slate-900">Pharmacy Care</h3>
            <p class="text-sm text-slate-600">ใบเสร็จรับเงิน</p>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            <div>เลขที่: {{ selected.receiptNo }}</div>
            <div class="text-right">วันที่: {{ formatDate(selected.createdAt) }}</div>
            <div>วิธีชำระ: {{ selected.paymentLabel }}</div>
            <div class="text-right">พนักงาน: POS</div>
          </div>

          <div class="mt-4 border-t border-b border-dashed border-slate-300 py-2">
            <div v-for="line in selected.lines" :key="line.id" class="mb-2 text-sm last:mb-0">
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
              <span>{{ selected.totalQty }} ชิ้น</span>
            </div>
            <div class="flex justify-between text-slate-900">
              <span>ยอดรวม</span>
              <span class="font-bold">{{ money(selected.total) }}</span>
            </div>
            <div class="flex justify-between text-slate-700">
              <span>รับเงิน</span>
              <span>{{ money(selected.cash) }}</span>
            </div>
            <div class="flex justify-between text-slate-700">
              <span>เงินทอน</span>
              <span>{{ money(selected.change) }}</span>
            </div>
          </div>
        </div>

        <div class="no-print flex items-center justify-end gap-2 border-t border-slate-200 p-4">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            @click="showDetail = false"
          >
            ปิด
          </button>
          <button
            type="button"
            class="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            @click="printSelected"
          >
            พิมพ์
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

useHead({ title: "ประวัติการขาย | Pharmacy Care" })
const supa = useSupabaseRest()

type ReceiptLine = {
  id: string | number
  productId?: string | null
  name: string | null
  sku?: string | null
  unit?: string | null
  price: number
  qty: number
  subtotal: number
}

type SaleHistoryEntry = {
  id: string
  receiptNo: string
  createdAt: string
  paymentMethod: "cash" | "qris" | "debit"
  paymentLabel: string
  lines: ReceiptLine[]
  totalQty: number
  total: number
  cash: number
  change: number
}

type ProductCostRow = {
  id: string | number
  sku: string | null
  purchase_price?: number | null
}

const sales = ref<SaleHistoryEntry[]>([])
const productCostById = ref<Map<string, number>>(new Map())
const productCostBySku = ref<Map<string, number>>(new Map())
const search = ref("")
const showDetail = ref(false)
const selected = ref<SaleHistoryEntry | null>(null)
const loading = ref(false)
const error = ref("")

const filteredSales = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return sales.value
  return sales.value.filter((s) => {
    const text = `${s.receiptNo} ${s.paymentLabel} ${s.createdAt}`.toLowerCase()
    return text.includes(q)
  })
})

const grandTotal = computed(() => filteredSales.value.reduce((sum, s) => sum + s.total, 0))
const grandQty = computed(() => filteredSales.value.reduce((sum, s) => sum + s.totalQty, 0))
const saleCost = (sale: SaleHistoryEntry) =>
  sale.lines.reduce((sum, line) => {
    const byId =
      line.productId == null ? undefined : productCostById.value.get(String(line.productId))
    const bySku = productCostBySku.value.get(String(line.sku || "").trim().toLowerCase())
    const unitCost = Number((byId ?? bySku) || 0)
    return sum + unitCost * Number(line.qty || 0)
  }, 0)
const grandCost = computed(() => filteredSales.value.reduce((sum, s) => sum + saleCost(s), 0))
const grandProfit = computed(() => grandTotal.value - grandCost.value)

const toInputDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const today = new Date()
today.setHours(0, 0, 0, 0)
const sevenDaysAgo = new Date(today)
sevenDaysAgo.setDate(today.getDate() - 6)

const dateFrom = ref(toInputDate(sevenDaysAgo))
const dateTo = ref(toInputDate(today))

const rangeStartDate = computed(() => {
  const date = new Date(`${dateFrom.value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
})

const rangeEndDate = computed(() => {
  const date = new Date(`${dateTo.value}T23:59:59.999`)
  return Number.isNaN(date.getTime()) ? null : date
})

const dateRangeValid = computed(() => {
  if (!rangeStartDate.value || !rangeEndDate.value) return false
  return rangeStartDate.value.getTime() <= rangeEndDate.value.getTime()
})

const chartDays = computed(() => {
  if (!dateRangeValid.value || !rangeStartDate.value || !rangeEndDate.value) return []

  const start = new Date(rangeStartDate.value)
  start.setHours(0, 0, 0, 0)
  const end = new Date(rangeEndDate.value)
  end.setHours(0, 0, 0, 0)

  const dayBuckets: { key: string; label: string; total: number }[] = []
  const cursor = new Date(start)
  let guard = 0
  while (cursor.getTime() <= end.getTime() && guard < 93) {
    dayBuckets.push({
      key: toInputDate(cursor),
      label: `${cursor.getDate()}/${cursor.getMonth() + 1}`,
      total: 0,
    })
    cursor.setDate(cursor.getDate() + 1)
    guard += 1
  }

  const dayIndexMap = new Map(dayBuckets.map((bucket, index) => [bucket.key, index]))

  for (const sale of sales.value) {
    const saleDate = new Date(sale.createdAt)
    if (Number.isNaN(saleDate.getTime())) continue
    if (saleDate.getTime() < rangeStartDate.value.getTime() || saleDate.getTime() > rangeEndDate.value.getTime()) continue

    const key = toInputDate(saleDate)
    const bucketIndex = dayIndexMap.get(key)
    if (bucketIndex === undefined) continue

    dayBuckets[bucketIndex].total += Number(sale.total) || 0
  }

  return dayBuckets
})

const maxRangeTotal = computed(() => {
  return Math.max(...chartDays.value.map((day) => day.total), 0)
})

const rangeTotal = computed(() => chartDays.value.reduce((sum, day) => sum + day.total, 0))
const rangeAverage = computed(() => (chartDays.value.length ? rangeTotal.value / chartDays.value.length : 0))

const bestDay = computed(() =>
  chartDays.value.reduce(
    (best, current) => (current.total > best.total ? current : best),
    { key: "", label: "-", total: 0 }
  )
)
const bestDayLabel = computed(() => bestDay.value.label)
const bestDayTotal = computed(() => bestDay.value.total)

const niceCeil = (value: number) => {
  if (value <= 0) return 100
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const normalized = value / magnitude
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  return step * magnitude
}

const chartMax = computed(() => niceCeil(maxRangeTotal.value))
const yAxisTicks = computed(() => [
  chartMax.value,
  Math.round((chartMax.value * 2) / 3),
  Math.round(chartMax.value / 3),
])

const barHeight = (total: number) => {
  if (total <= 0) return "0%"
  const percent = (total / chartMax.value) * 100
  return `${Math.max(6, Math.round(percent))}%`
}

const setLast7Days = () => {
  const end = new Date()
  end.setHours(0, 0, 0, 0)
  const start = new Date(end)
  start.setDate(end.getDate() - 6)
  dateFrom.value = toInputDate(start)
  dateTo.value = toInputDate(end)
}

const setThisMonth = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date()
  end.setHours(0, 0, 0, 0)
  dateFrom.value = toInputDate(start)
  dateTo.value = toInputDate(end)
}

const money = (value: number | null | undefined) => `${Number(value || 0).toLocaleString("th-TH")}`
const formatDate = (value: string) =>
  value ? new Date(value).toLocaleString("th-TH") : "-"

const loadHistory = async () => {
  loading.value = true
  error.value = ""
  try {
    const [rows, products] = await Promise.all([supa.listSalesHistory(), supa.listProducts()])
    sales.value = Array.isArray(rows) ? rows : []

    const mapById = new Map<string, number>()
    const mapBySku = new Map<string, number>()
    for (const p of Array.isArray(products) ? (products as ProductCostRow[]) : []) {
      const unitCost = Number(p.purchase_price || 0)
      if (p.id != null) mapById.set(String(p.id), unitCost)
      const sku = String(p.sku || "").trim().toLowerCase()
      if (sku) mapBySku.set(sku, unitCost)
    }
    productCostById.value = mapById
    productCostBySku.value = mapBySku
  } catch (err: any) {
    sales.value = []
    productCostById.value = new Map()
    productCostBySku.value = new Map()
    error.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      err?.message ||
      "โหลดประวัติการขายไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

const openDetail = (sale: SaleHistoryEntry) => {
  selected.value = sale
  showDetail.value = true
}

const printSelected = () => {
  window.print()
}

onMounted(loadHistory)
</script>

<style>
@media print {
  body * {
    visibility: hidden !important;
  }

  #history-receipt-print,
  #history-receipt-print * {
    visibility: visible !important;
  }

  #history-receipt-print {
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
