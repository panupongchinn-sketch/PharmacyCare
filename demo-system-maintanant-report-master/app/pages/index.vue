<template>
    <div class="min-h-screen">
        <header class="navbar border-b border-base-300">
            <div class="flex-1 gap-3 px-4">
                <!-- <img src="/logo.png" alt="AAA Logo" class="h-10 rounded bg-base-100 p-1" /> -->
                <div>
                    <h1 class="font-semibold">บริษัท AAA</h1>
                    <p class="text-xs opacity-70">
                        JI TB Simatupang, Kav 25, Alamanda Tower
                    </p>
                </div>
            </div>
            <div class="flex-none px-4">
                <button class="btn btn-sm btn-outline btn-error" @click="handleLogout">
                    ออกจากระบบ
                </button>
            </div>
        </header>

        <div class="p-4 sm:p-6 space-y-4">
            <div class="flex items-center justify-between gap-2 flex-wrap">
                <h2 class="text-lg font-semibold">ROBOT SYSTEM</h2>
            </div>

            <div class="card bg-base-100 shadow-md max-w-5xl mx-auto">
                <div class="card-body p-3 sm:p-6">
                    <div v-if="loading" class="flex justify-center items-center h-80">
                        <span class="loading loading-spinner loading-lg text-primary" />
                    </div>
                    <div v-else-if="error" class="alert alert-error justify-center">
                        <span>{{ error }}</span>
                    </div>
                    <MachineLayoutViewer v-else :layout-points="layoutPoints" class="w-full" />
                </div>
            </div>

            <div class="w-full overflow-x-auto mt-4">
                <div class="stats stats-horizontal shadow bg-base-100 max-w-5xl mx-auto min-w-max">
                    <div class="stat">
                        <div class="stat-title">Normal Status</div>
                        <div class="stat-value text-primary">{{ normalCount }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Error Status</div>
                        <div class="stat-value text-error">{{ errorCount }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Warning Status</div>
                        <div class="stat-value text-warning">{{ warningCount }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
});

const { signOut } = useAuth();

interface LayoutPoint {
    id: string;
    machine_id: string;
    label?: string;
    x: number;
    y: number;
    status: string;
}

const { getMachineLayoutPoints } = useMachines();

const layoutPoints = ref<LayoutPoint[]>([]);
const loading = ref(true);
const error = ref('');

const normalCount = computed(() =>
    layoutPoints.value.filter(p => p.status?.toLowerCase() === 'normal').length
);

const errorCount = computed(() =>
    layoutPoints.value.filter(p => p.status?.toLowerCase() === 'error').length
);

const warningCount = computed(() =>
    layoutPoints.value.filter(p => p.status?.toLowerCase() === 'warning').length
);

const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
        await navigateTo('/login');
    }
};

const loadData = async () => {
    loading.value = true;
    error.value = '';

    try {
        const { data, error: fetchError } = await getMachineLayoutPoints();

        if (fetchError) {
            throw new Error(fetchError.message || 'Failed to load machine layout data');
        }

        if (data) {
            layoutPoints.value = data as LayoutPoint[];
        }
    } catch (err: any) {
        error.value = err.message || 'An unexpected error occurred';
        console.error('Error loading machine layout:', err);
    } finally {
        loading.value = false;
    }
};

// Load data on mount
onMounted(() => {
    loadData();
});
</script>
