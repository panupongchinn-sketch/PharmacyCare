<template>
  <div class="flex min-h-screen bg-base-200">
    <aside :class="[
      'bg-primary text-primary-content shadow-xl flex flex-col transition-all duration-300',
      isSidebarCollapsed ? 'w-16' : 'w-40'
    ]">
      <div class="p-4 flex flex-col items-center justify-center gap-3 border-b border-primary-content/20 bg-white">
        <img v-if="!isSidebarCollapsed" src="/logo.png" alt="AAA Logo" class="w-20" />
        <img v-else src="/logo.png" alt="AAA Logo" class="w-10" />
      </div>

      <nav class="flex-1 p-2 space-y-1">
        <NuxtLink to="/" class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-focus transition"
          active-class="bg-primary-focus font-semibold">
          <Icon icon="mdi:view-dashboard" class="w-5 h-5 shrink-0" />
          <span v-if="!isSidebarCollapsed" class="text-sm">Overview</span>
        </NuxtLink>

        <NuxtLink to="/machines" class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-focus transition"
          active-class="bg-primary-focus font-semibold">
          <Icon icon="mdi:factory" class="w-5 h-5 shrink-0" />
          <span v-if="!isSidebarCollapsed" class="text-sm">Machines</span>
        </NuxtLink>

        <NuxtLink to="/alarms" class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-focus transition"
          active-class="bg-primary-focus font-semibold">
          <Icon icon="mdi:bell-alert" class="w-5 h-5 shrink-0" />
          <span v-if="!isSidebarCollapsed" class="text-sm">Alarm log</span>
        </NuxtLink>

        <NuxtLink to="/reports" class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary-focus transition"
          active-class="bg-primary-focus font-semibold">
          <Icon icon="mdi:chart-line" class="w-5 h-5 shrink-0" />
          <span v-if="!isSidebarCollapsed" class="text-sm">Reports</span>
        </NuxtLink>
      </nav>
      <button
        class="w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary-focus transition text-xs"
        :title="theme === 'dark' ? 'โหมดสว่าง' : 'โหมดมืด'" @click="toggleTheme">
        <Icon :icon="theme === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="w-4 h-4" />
        <span v-if="!isSidebarCollapsed">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
      </button>
      <div class="p-2 border-t border-primary-content/20">
        <button
          class="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg hover:bg-primary-focus transition text-xs"
          :title="isSidebarCollapsed ? 'ขยาย Sidebar' : 'ซ่อน Sidebar'" @click="toggleSidebar">
          <Icon :icon="isSidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" class="w-4 h-4" />
          <span v-if="!isSidebarCollapsed">Sidebar</span>
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const isSidebarCollapsed = useState('sidebarCollapsed', () => false);
const theme = useState<'dark' | 'light'>('theme', () => 'dark');

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const applyTheme = () => {
  if (process.client) {
    document.documentElement.setAttribute('data-theme', theme.value);
  }
};

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  applyTheme();
};

onMounted(() => {
  applyTheme();
});
</script>
