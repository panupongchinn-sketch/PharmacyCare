<template>
  <div class="p-4 sm:p-6 space-y-4">
    <h1 class="text-lg font-semibold mb-2">Alarm log</h1>
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
                  <th>Machine</th>
                  <th>Alarm</th>
                  <th>Code</th>
                  <th>Start</th>
                  <th>End</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in paginatedAlarms" :key="a.id">
                  <td>{{ a.machine?.name || a.machine_id }}</td>
                  <td>{{ a.alarm_name }}</td>
                  <td>{{ a.alarm_code }}</td>
                  <td>{{ formatTime(a.start_time) }}</td>
                  <td>{{ a.end_time ? formatTime(a.end_time) : '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:hidden">
            <div v-for="a in paginatedAlarms" :key="a.id" class="card bg-base-200">
              <div class="card-body p-4 space-y-1">
                <h2 class="card-title text-sm mb-1">
                  {{ a.alarm_name }} <span v-if="a.alarm_code" class="text-xs opacity-70">({{ a.alarm_code }})</span>
                </h2>
                <p class="text-xs opacity-80">Machine: {{ a.machine?.name || a.machine_id }}</p>
                <p class="text-xs opacity-80">Start: {{ formatTime(a.start_time) }}</p>
                <p class="text-xs opacity-80">
                  End: {{ a.end_time ? formatTime(a.end_time) : '-' }}
                </p>
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

interface Alarm {
  id: string;
  machine_id: string;
  alarm_name: string;
  alarm_code?: string;
  start_time: string;
  end_time?: string | null;
  machine?: { name: string };
}

const { getMachineAlarms } = useMachines();

const alarms = ref<Alarm[]>([]);
const loading = ref(true);
const error = ref("");

// Pagination
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() => Math.ceil(alarms.value.length / pageSize));

const paginatedAlarms = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return alarms.value.slice(start, end);
});

const formatTime = (t: string) =>
  new Date(t).toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

onMounted(async () => {
  const { data, error: e } = await getMachineAlarms(undefined, false);
  if (e) {
    error.value = e.message || "Failed to load alarms";
  } else if (data) {
    alarms.value = data as Alarm[];
  }
  loading.value = false;
});
</script>
