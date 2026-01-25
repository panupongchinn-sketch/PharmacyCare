<template>
    <div class="min-h-screen bg-linear-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div class="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

            <div class="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
                <div class="relative group cursor-default">
                    <div
                        class="absolute -inset-1 bg-linear-to-r from-blue-300 to-cyan-300 rounded-[2.5rem] blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200">
                    </div>

                    <div
                        class="relative bg-white p-10 md:p-14 rounded-4xl shadow-2xl ring-1 ring-white/50 transform transition duration-500 hover:scale-[1.02]">
                        <img src="/logo.png" alt="AAA Company Logo" class="w-40 md:w-56 object-contain" />
                    </div>
                </div>

                <!-- <p class="mt-8 text-white/80 text-lg font-light tracking-widest hidden md:block text-center">
                    AAA System
                </p> -->
            </div>

            <div class="flex-1 flex items-center justify-center w-full">
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
                    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
                        เข้าสู่ระบบ
                    </h1>

                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <div>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </span>
                                <input v-model="email" type="email" placeholder="Email" required
                                    class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" />
                            </div>
                        </div>

                        <div>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input v-model="password" type="password" placeholder="Password" required
                                    class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition" />
                            </div>
                        </div>

                        <div class="flex items-center justify-between text-sm">
                            <label class="flex items-center gap-2 cursor-pointer select-none">
                                <input v-model="rememberMe" type="checkbox"
                                    class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 border-gray-300" />
                                <span class="text-gray-600">จดจำฉัน</span>
                            </label>
                            <a href="#" class="text-blue-600 hover:text-blue-800 font-medium transition">
                                ลืมรหัสผ่าน?
                            </a>
                        </div>

                        <div v-if="errorMessage"
                            class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ errorMessage }}
                        </div>

                        <button type="submit" :disabled="isLoading"
                            class="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                            <span v-if="!isLoading">เข้าสู่ระบบ</span>
                            <span v-else class="flex items-center justify-center gap-2">
                                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                กำลังตรวจสอบ...
                            </span>
                        </button>

                        <div class="text-center text-sm text-gray-500 pt-2">
                            ยังไม่มีบัญชี?
                            <NuxtLink to="/signup" class="text-blue-600 hover:text-blue-800 font-bold ml-1 transition">
                                สร้างบัญชีใหม่
                            </NuxtLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Script คงเดิมของคุณ
definePageMeta({
    layout: false,
    middleware: ['auth']
});

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);

const { signIn } = useAuth(); // สมมติว่ามี useAuth

const handleLogin = async () => {
    errorMessage.value = '';
    isLoading.value = true;

    try {
        const { data, error } = await signIn(email.value, password.value, rememberMe.value);

        if (error) {
            errorMessage.value = error.message || 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง';
            return;
        }

        if (data) {
            await navigateTo('/');
        }
    } catch (err: any) {
        errorMessage.value = err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    } finally {
        isLoading.value = false;
    }
};
</script>