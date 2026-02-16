<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between gap-3 flex-wrap">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold">คอร์สของฉัน</h1>
        <p class="text-sm text-slate-500">เฉพาะคอร์สที่คุณซื้อไว้เท่านั้น</p>
      </div>
      <button
        class="h-9 px-4 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        type="button"
        @click="load"
      >
        Refresh
      </button>
    </div>

    <div v-if="loading" class="text-slate-500 flex items-center gap-2">
      <span class="inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"></span>
      กำลังโหลด...
    </div>

    <div v-else-if="errorMsg" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
      {{ errorMsg }}
    </div>

    <div v-else>
      <div v-if="items.length === 0" class="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
        ยังไม่มีคอร์สที่ซื้อไว้
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <NuxtLink
          v-for="c in items"
          :key="c.id"
          :to="`/my-courses/${c.id}`"
          class="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
        >
          <div class="aspect-[16/9] bg-slate-100 overflow-hidden">
            <img
              v-if="c.thumbnail_url"
              :src="c.thumbnail_url"
              class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
              alt=""
            />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-400 text-sm">
              No thumbnail
            </div>
          </div>

          <div class="p-4">
            <div class="font-bold text-slate-900 line-clamp-2">{{ c.title }}</div>
            <div class="text-sm text-slate-500 mt-1 line-clamp-2">{{ c.description || "" }}</div>
            <div class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
              เข้าเรียน <span aria-hidden="true">→</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] })

type Course = {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
}

type EnrollRow = {
  course: Course | null
}

const { $supabase } = useNuxtApp() as any
const { getSession } = useAuth()

const loading = ref(true)
const errorMsg = ref("")
const items = ref<Course[]>([])

const load = async () => {
  loading.value = true
  errorMsg.value = ""
  items.value = []

  try {
    const { session } = await getSession()
    const uid = session?.user?.id
    if (!uid) {
      errorMsg.value = "กรุณาเข้าสู่ระบบก่อน"
      return
    }

    // ✅ ดึงจาก course_enrollments แล้ว join ไป courses ตรงๆ (ชัวร์สุด)
    const { data, error } = await $supabase
      .from("course_enrollments")
      .select("course:courses(id,title,description,thumbnail_url)")
      .eq("user_id", uid)

    if (error) throw error

    const rows = (data || []) as EnrollRow[]
    items.value = rows.map(r => r.course).filter(Boolean) as Course[]
  } catch (e: any) {
    errorMsg.value = e?.message || "โหลดข้อมูลไม่สำเร็จ"
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
