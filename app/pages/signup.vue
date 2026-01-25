<template>
    <div class="min-h-screen bg-gradient-blue flex items-center justify-center p-4">
        <div class="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <!-- Left side - Logo -->
            <div class="flex-1 flex items-center justify-center mb-6 md:mb-0">
                <img src="/logo.png" alt="AAA Company Logo" class="w-40 md:w-full max-w-md drop-shadow-2xl" />
            </div>

            <!-- Right side - Signup Form -->
            <div class="flex-1 flex items-center justify-center">
                <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    <h1 class="text-3xl font-bold text-center mb-2 text-gray-800">
                        สร้างบัญชีผู้ใช้
                    </h1>
                    <p class="text-center text-gray-600 mb-8 text-sm">
                        Create a new account
                    </p>

                    <form @submit.prevent="handleSignup" class="space-y-6">
                        <!-- Name Input -->
                        <div>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input v-model="name" type="text" placeholder="ชื่อ-นามสกุล / Full Name"
                                    class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                        </div>

                        <!-- Email Input -->
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
                                    class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input v-model="password" type="password" placeholder="Password (อย่างน้อย 6 ตัวอักษร)"
                                    required minlength="6"
                                    class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                        </div>

                        <!-- Confirm Password Input -->
                        <div>
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <input v-model="confirmPassword" type="password" placeholder="ยืนยัน Password" required
                                    minlength="6"
                                    class="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                        </div>

                        <!-- Success Message -->
                        <div v-if="successMessage"
                            class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                            {{ successMessage }}
                        </div>

                        <!-- Error Message -->
                        <div v-if="errorMessage"
                            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {{ errorMessage }}
                        </div>

                        <!-- Signup Button -->
                        <button type="submit" :disabled="isLoading"
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!isLoading">สร้างบัญชี</span>
                            <span v-else class="flex items-center justify-center gap-2">
                                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                กำลังสร้างบัญชี...
                            </span>
                        </button>

                        <!-- Login Link -->
                        <div class="text-center text-sm text-gray-600">
                            มีบัญชีอยู่แล้ว?
                            <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-semibold transition">
                                เข้าสู่ระบบ
                            </NuxtLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ['auth']
});

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const { signUp } = useAuth();

const handleSignup = async () => {
    errorMessage.value = '';
    successMessage.value = '';

    // Validate passwords match
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'รหัสผ่านไม่ตรงกัน / Passwords do not match';
        return;
    }

    // Validate password length
    if (password.value.length < 6) {
        errorMessage.value = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร / Password must be at least 6 characters';
        return;
    }

    isLoading.value = true;

    try {
        const { data, error } = await signUp(email.value, password.value, name.value);

        if (error) {
            errorMessage.value = error.message || 'การสร้างบัญชีล้มเหลว / Signup failed';
            return;
        }

        if (data) {
            successMessage.value = 'สร้างบัญชีสำเร็จ! กำลังนำคุณไปยังหน้า Login...';

            // Clear form
            name.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigateTo('/login');
            }, 2000);
        }
    } catch (err: any) {
        errorMessage.value = err.message || 'เกิดข้อผิดพลาดที่ไม่คาดคิด / An unexpected error occurred';
    } finally {
        isLoading.value = false;
    }
};
</script>
