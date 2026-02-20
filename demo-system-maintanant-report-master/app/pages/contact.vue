<template>
  <div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-slate-700 sm:text-5xl">ติดต่อเรา</h1>
        <p class="mt-2 text-sm text-slate-500">ส่งข้อความหาเราได้เลย ทีมงานจะติดต่อกลับโดยเร็ว</p>
      </div>

      <button
        class="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
        type="button"
        @click="resetForm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        ล้างฟอร์ม
      </button>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 p-5 sm:p-6">
            <h2 class="text-lg font-bold text-slate-800">ส่งข้อความ / ขอข้อมูลเพิ่มเติม</h2>
            <p class="mt-1 text-sm text-slate-500">กรอกข้อมูลให้ครบเพื่อให้เราติดต่อกลับได้ถูกต้อง</p>
          </div>

          <div class="p-5 sm:p-6">
            <div v-if="success" class="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              ส่งข้อความเรียบร้อยแล้ว ขอบคุณครับ/ค่ะ
            </div>

            <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {{ error }}
            </div>

            <form class="space-y-5" @submit.prevent="submit">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-semibold text-slate-700">ชื่อ-นามสกุล *</label>
                  <input
                    v-model.trim="form.full_name"
                    type="text"
                    class="mt-2 h-11 w-full rounded-md border border-slate-300 px-4 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="ชื่อลูกค้า"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700">เบอร์โทร</label>
                  <input
                    v-model.trim="form.phone"
                    type="tel"
                    class="mt-2 h-11 w-full rounded-md border border-slate-300 px-4 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="เช่น 08x-xxx-xxxx"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700">บริษัท</label>
                  <input
                    v-model.trim="form.company"
                    type="text"
                    class="mt-2 h-11 w-full rounded-md border border-slate-300 px-4 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="ชื่อบริษัท (ถ้ามี)"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    v-model.trim="form.email"
                    type="email"
                    class="mt-2 h-11 w-full rounded-md border border-slate-300 px-4 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700">หัวข้อ</label>
                <input
                  v-model.trim="form.subject"
                  type="text"
                  class="mt-2 h-11 w-full rounded-md border border-slate-300 px-4 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
                  placeholder="เช่น ขอใบเสนอราคา / สอบถามสินค้า / สอบถามคอร์ส"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700">รายละเอียด *</label>
                <textarea
                  v-model.trim="form.detail"
                  rows="6"
                  class="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200"
                  placeholder="พิมพ์รายละเอียดที่ต้องการให้เราช่วย..."
                  required
                />
                <div class="mt-2 text-xs text-slate-500">
                  แนะนำ: ระบุสินค้า/รุ่น, จำนวน, จังหวัด และเวลาที่สะดวกให้ติดต่อกลับ
                </div>
              </div>

              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="text-xs text-slate-500">กดส่งแล้วถือว่ายินยอมให้เราใช้ข้อมูลเพื่อการติดต่อกลับ</div>

                <button
                  class="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-red-600 px-5 font-bold text-white hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="loading"
                  type="submit"
                >
                  <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                  ส่งข้อความ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 p-5 sm:p-6">
            <h2 class="text-lg font-bold text-slate-800">ข้อมูลติดต่อ</h2>
            <p class="mt-1 text-sm text-slate-500">บริษัท เอ็มแอนด์บี อินโนเวทีฟ คอมเมิร์ซ จำกัด</p>
            <p class="mt-1 text-sm text-slate-500">Pharmacy Care Co., Ltd.</p>
          </div>

          <div class="space-y-4 p-5 text-sm text-slate-700 sm:p-6">
            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-700">📍</span>
              <div>
                <div class="font-semibold">ที่อยู่</div>
                <div class="text-slate-600">อ.เมือง จ.ร้อยเอ็ด 450000</div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-700">☎</span>
              <div>
                <div class="font-semibold">โทร</div>
                <div class="text-slate-600">0917762859</div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-700">✉</span>
              <div>
                <div class="font-semibold">อีเมล</div>
                <div class="text-slate-600">automation101training@gmail.com</div>
              </div>
            </div>

            <div class="pt-2">
              <div class="mb-2 text-xs font-semibold text-slate-500">เวลาทำการ</div>
              <div class="text-slate-600">จันทร์-ศุกร์ 09:00-18:00</div>
            </div>

            <div class="border-t border-slate-100 pt-3">
              <button
                class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-4 font-semibold text-slate-700 hover:bg-slate-50"
                type="button"
                @click="goInvoice"
              >
                ขอใบเสนอราคา (ไปหน้า Invoice)
                <span class="text-red-600">→</span>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 p-5 sm:p-6">
            <h2 class="text-lg font-bold text-slate-800">แผนที่</h2>
          </div>
          <div class="p-3">
            <div class="flex aspect-[16/9] items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-500"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'ติดต่อเรา | ร้านขายยา' })

const route = useRoute()
useState<string>('mb_search_q', () => '')

type ContactForm = {
  full_name: string
  phone: string
  company: string
  email: string
  subject: string
  detail: string
}

type ContactMessageRow = ContactForm & {
  id: string
  source_page: string
  created_at: string
}

const CONTACT_STORAGE_KEY = 'contact_messages'
const { getValue, setValue } = useSharedStore()

const form = ref<ContactForm>({
  full_name: '',
  phone: '',
  company: '',
  email: '',
  subject: '',
  detail: '',
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const nowIso = () => new Date().toISOString()

const uid = () => {
  if (typeof globalThis !== 'undefined' && (globalThis as any).crypto?.randomUUID) {
    return (globalThis as any).crypto.randomUUID() as string
  }
  return `c_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

const resetForm = () => {
  form.value = {
    full_name: '',
    phone: '',
    company: '',
    email: '',
    subject: '',
    detail: '',
  }
  error.value = ''
  success.value = false
}

const submit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const fullName = (form.value.full_name || '').trim()
    const detail = (form.value.detail || '').trim()

    if (!fullName) throw new Error('กรุณากรอกชื่อ-นามสกุล')
    if (!detail) throw new Error('กรุณากรอกรายละเอียด')

    const payload: ContactMessageRow = {
      id: uid(),
      full_name: fullName,
      phone: (form.value.phone || '').trim(),
      company: (form.value.company || '').trim(),
      email: (form.value.email || '').trim(),
      subject: (form.value.subject || '').trim(),
      detail,
      source_page: route.fullPath,
      created_at: nowIso(),
    }

    const rows = await getValue<ContactMessageRow>(CONTACT_STORAGE_KEY)
    rows.unshift(payload)
    await setValue<ContactMessageRow>(CONTACT_STORAGE_KEY, rows)

    resetForm()
    success.value = true
  } catch (err: any) {
    error.value = err?.message || 'ส่งข้อมูลไม่สำเร็จ'
  } finally {
    loading.value = false
  }
}

const goInvoice = async () => {
  await navigateTo('/invoice')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
