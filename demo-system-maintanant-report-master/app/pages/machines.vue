<template>
  <div class="p-4 sm:p-6 space-y-4">
    <h1 class="text-lg font-semibold mb-2">ข้อมูลเครื่องจักร</h1>
    <div class="card bg-base-100 shadow-md max-w-5xl mx-auto">
      <div class="card-body">
        <div v-if="loading" class="flex justify-center py-10">
          <span class="loading loading-spinner loading-lg text-primary" />
        </div>
        <div v-else-if="error" class="alert alert-error">
          <span>{{ error }}</span>
        </div>
        <div v-else>
          <div class="hidden sm:block overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in paginatedMachines" :key="m.id">
                  <td>{{ m.name }}</td>
                  <td>{{ m.code }}</td>
                  <td>{{ m.location }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:hidden">
            <div v-for="m in paginatedMachines" :key="m.id" class="card bg-base-200">
              <div class="card-body p-4">
                <h2 class="card-title text-sm mb-1">{{ m.name }}</h2>
                <p class="text-xs opacity-80">Code: {{ m.code }}</p>
                <p class="text-xs opacity-80">Location: {{ m.location || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-4">
            <div class="join">
              <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">
                «
              </button>
              <button class="join-item btn btn-sm">
                Page {{ currentPage }} of {{ totalPages }}
              </button>
              <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="currentPage++">
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

interface Machine {
  id: string;
  name: string;
  code: string;
  location?: string;
}

const { getMachines } = useMachines();

const machines = ref<Machine[]>([]);
const loading = ref(true);
const error = ref("");

// Pagination
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() => Math.ceil(machines.value.length / pageSize));

const paginatedMachines = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return machines.value.slice(start, end);
});

onMounted(async () => {
  const { data, error: e } = await getMachines();
  if (e) {
    error.value = e.message || "Failed to load machines";
  } else if (data) {
    machines.value = data as Machine[];
  }
  loading.value = false;
});
</script>
