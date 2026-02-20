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

      <div class="mt-4 grid gap-3 sm:grid-cols-3">
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

    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-auto">
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
                  <button
                    type="button"
                    class="rounded-md border border-red-300 px-3 py-1.5 font-semibold text-red-700 hover:bg-red-50"
                    @click="removeSale(sale.id)"
                  >
                    ลบ
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

const sales = ref<SaleHistoryEntry[]>([])
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

const money = (value: number | null | undefined) => `${Number(value || 0).toLocaleString("th-TH")}`
const formatDate = (value: string) =>
  value ? new Date(value).toLocaleString("th-TH") : "-"

const loadHistory = async () => {
  loading.value = true
  error.value = ""
  try {
    const rows = await $fetch<SaleHistoryEntry[]>("/api/sales-history")
    sales.value = Array.isArray(rows) ? rows : []
  } catch (err: any) {
    sales.value = []
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

const removeSale = async (id: string) => {
  error.value = ""
  try {
    await $fetch(`/api/sales-history/${id}`, { method: "DELETE" })
    sales.value = sales.value.filter((x) => x.id !== id)
    if (selected.value?.id === id) {
      selected.value = null
      showDetail.value = false
    }
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      err?.message ||
      "ลบรายการไม่สำเร็จ"
  }
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
