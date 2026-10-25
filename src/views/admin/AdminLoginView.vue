<template>
  <div class="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Ambient glowing backdrop blobs -->
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-secondary-fixed/40 rounded-full blur-[110px] pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-fixed/30 rounded-full blur-[130px] pointer-events-none"></div>

    <div class="w-full max-w-md rounded-3xl bg-surface-container-lowest/90 backdrop-blur-xl border border-surface-container-high/70 shadow-soft-xl p-8 sm:p-10 relative z-10">
      <!-- Brand & Header -->
      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
          <span class="material-symbols-outlined text-[28px]">admin_panel_settings</span>
        </div>
        <h1 class="text-2xl font-light text-primary tracking-tight">Masuk Panel Admin</h1>
        <p class="text-xs text-on-surface-variant mt-1.5">Kelola sesi, preset, aset, dan status kiosk booth</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email / Username</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
            <input
              v-model="email"
              type="text"
              required
              placeholder="admin@angkasabooth.com"
              class="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-bold text-primary uppercase tracking-wider">Kata Sandi</label>
            <a href="#" class="text-xs text-secondary hover:underline font-medium">Lupa sandi?</a>
          </div>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full pl-12 pr-12 py-3 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
            >
              <span class="material-symbols-outlined text-[18px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            v-model="rememberMe"
            class="rounded border-outline-variant text-secondary focus:ring-secondary"
          />
          <label for="remember" class="text-xs text-on-surface-variant cursor-pointer">Ingat saya di perangkat ini</label>
        </div>

        <button
          type="submit"
          :disabled="isLoading || isGoogleLoading"
          class="w-full py-3.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-md hover:shadow-soft-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <span v-if="isLoading" class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
          <span>{{ isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard' }}</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="relative my-6 text-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-surface-container-high"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-surface-container-lowest px-3 text-[10px] font-bold text-on-surface-variant tracking-wider">
            atau lanjutkan dengan
          </span>
        </div>
      </div>

      <!-- Google OAuth Button -->
      <button
        type="button"
        @click="handleGoogleLogin"
        :disabled="isLoading || isGoogleLoading"
        class="w-full py-3 px-4 rounded-full border border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-low text-primary text-xs font-semibold shadow-soft-sm hover:shadow-soft-md hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-60"
      >
        <span v-if="isGoogleLoading" class="material-symbols-outlined text-[18px] animate-spin text-secondary">progress_activity</span>
        <svg v-else class="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>{{ isGoogleLoading ? 'Menghubungkan Akun Google...' : 'Masuk dengan Google (OAuth 2.0)' }}</span>
      </button>

      <!-- Back Link -->
      <div class="text-center mt-8 pt-6 border-t border-surface-container-high/60">
        <router-link to="/" class="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Kembali ke Beranda Publik</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, adminAuth } from '@/composables/usePhotobooth'

const router = useRouter()
const email = ref('admin@angkasabooth.com')
const password = ref('password123')
const showPassword = ref(false)
const rememberMe = ref(true)
const isLoading = ref(false)
const isGoogleLoading = ref(false)

function handleLogin() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    adminAuth.value.isAuthenticated = true
    showToast('Selamat datang kembali, Admin Angkasa!')
    router.push('/admin/ringkasan')
  }, 700)
}

function handleGoogleLogin() {
  isGoogleLoading.value = true
  setTimeout(() => {
    isGoogleLoading.value = false
    adminAuth.value.isAuthenticated = true
    adminAuth.value.user = {
      name: 'I Gusti Krysna DevaNanda',
      email: 'krysna@angkasabooth.com',
      role: 'Super Admin'
    }
    showToast('Berhasil login via Google OAuth: krysna@angkasabooth.com')
    router.push('/admin/ringkasan')
  }, 1000)
}
</script>
