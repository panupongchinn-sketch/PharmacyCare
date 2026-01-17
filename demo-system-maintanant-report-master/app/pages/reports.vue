<template>
  <div class="p-4 sm:p-6 space-y-6">
    <h1 class="text-2xl font-bold">OEE Overview</h1>

    <!-- OEE Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title text-sm">OEE</div>
        <div class="stat-value text-3xl" :class="oeeColor(avgOEE)">
          {{ avgOEE.toFixed(1) }}%
        </div>
      </div>
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title text-sm">Availability</div>
        <div class="stat-value text-3xl text-success">
          {{ avgAvailability.toFixed(1) }}%
        </div>
      </div>
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title text-sm">Quality</div>
        <div class="stat-value text-3xl text-warning">
          {{ avgQuality.toFixed(1) }}%
        </div>
      </div>
      <div class="stat bg-base-100 shadow rounded-lg">
        <div class="stat-title text-sm">Performance</div>
        <div class="stat-value text-3xl text-info">
          {{ avgPerformance.toFixed(1) }}%
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h2 class="card-title">OEE Trend</h2>
        <div v-if="loading" class="flex justify-center py-10">
          <span class="loading loading-spinner loading-lg text-primary" />
        </div>
        <div v-else-if="error" class="alert alert-error">
          <span>{{ error }}</span>
        </div>
        <div v-else class="h-64">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <h2 class="card-title">Daily OEE Data</h2>
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
                  <th>Date</th>
                  <th>OEE</th>
                  <th>Availability</th>
                  <th>Performance</th>
                  <th>Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in paginatedData" :key="row.id">
                  <td>{{ formatDate(row.date) }}</td>
                  <td :class="oeeColor(row.oee)">{{ row.oee }}%</td>
                  <td class="text-success">{{ row.availability }}%</td>
                  <td class="text-info">{{ row.performance }}%</td>
                  <td class="text-warning">{{ row.quality }}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:hidden">
            <div v-for="row in paginatedData" :key="row.id" class="card bg-base-200">
              <div class="card-body p-4 space-y-1">
                <h2 class="card-title text-sm mb-1">{{ formatDate(row.date) }}</h2>
                <p class="text-xs" :class="oeeColor(row.oee)">OEE: {{ row.oee }}%</p>
                <p class="text-xs text-success">Availability: {{ row.availability }}%</p>
                <p class="text-xs text-info">Performance: {{ row.performance }}%</p>
                <p class="text-xs text-warning">Quality: {{ row.quality }}%</p>
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
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions as ChartJSOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

definePageMeta({
  middleware: ['auth']
});

interface OEEData {
  id: string;
  machine_id: string;
  date: string;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
}

const { getMachines } = useMachines();
const { $supabase } = useNuxtApp();

const oeeData = ref<OEEData[]>([]);
const loading = ref(true);
const error = ref('');
const selectedMachineId = ref<string>('');

// Pagination
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() => Math.ceil(oeeData.value.length / pageSize));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return oeeData.value.slice(start, end);
});

// Computed averages
const avgOEE = computed(() => {
  if (oeeData.value.length === 0) return 0;
  const sum = oeeData.value.reduce((acc, row) => acc + (row.oee || 0), 0);
  return sum / oeeData.value.length;
});

const avgAvailability = computed(() => {
  if (oeeData.value.length === 0) return 0;
  const sum = oeeData.value.reduce((acc, row) => acc + (row.availability || 0), 0);
  return sum / oeeData.value.length;
});

const avgPerformance = computed(() => {
  if (oeeData.value.length === 0) return 0;
  const sum = oeeData.value.reduce((acc, row) => acc + (row.performance || 0), 0);
  return sum / oeeData.value.length;
});

const avgQuality = computed(() => {
  if (oeeData.value.length === 0) return 0;
  const sum = oeeData.value.reduce((acc, row) => acc + (row.quality || 0), 0);
  return sum / oeeData.value.length;
});

// Chart data
const chartData = computed<ChartData<'line'>>(() => ({
  labels: oeeData.value.map(row => formatDate(row.date)),
  datasets: [
    {
      label: 'OEE',
      data: oeeData.value.map(row => row.oee || 0),
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      tension: 0.4
    },
    {
      label: 'Availability',
      data: oeeData.value.map(row => row.availability || 0),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    },
    {
      label: 'Performance',
      data: oeeData.value.map(row => row.performance || 0),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    },
    {
      label: 'Quality',
      data: oeeData.value.map(row => row.quality || 0),
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.4
    }
  ]
}));

const chartOptions: ChartJSOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value) => `${value}%`
      }
    }
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const oeeColor = (value: number) => {
  if (value >= 85) return 'text-success';
  if (value >= 60) return 'text-warning';
  return 'text-error';
};

const loadOEEData = async () => {
  loading.value = true;
  error.value = '';

  try {
    console.log('Loading OEE data...');

    // Fetch ALL OEE data (don't filter by machine_id)
    const { data, error: fetchError } = await ($supabase as any)
      .from('machine_oee_daily')
      .select('*')
      .order('date', { ascending: true });

    console.log('OEE data response:', { data, fetchError });

    if (fetchError) {
      console.error('Supabase error:', fetchError);
      throw new Error(fetchError.message);
    }

    if (data) {
      console.log(`Found ${data.length} OEE records`);
      oeeData.value = data as OEEData[];
    } else {
      console.log('No data returned');
      oeeData.value = [];
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load OEE data';
    console.error('Error loading OEE data:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadOEEData();
});
</script>
