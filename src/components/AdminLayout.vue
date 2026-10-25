<template>
  <div class="min-h-screen bg-surface flex text-on-surface">
    <!-- Desktop Sidebar -->
    <aside class="w-64 bg-surface-container-lowest border-r border-surface-container-high/70 flex flex-col shrink-0 min-h-screen sticky top-0 h-screen z-30">
      <!-- Sidebar Brand Header -->
      <div class="p-6 border-b border-surface-container-high/60">
        <router-link to="/admin/ringkasan" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-soft-sm">
            <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
          </div>
          <div>
            <span class="text-base font-bold text-primary tracking-tight block">Angkasa</span>
            <span class="text-[10px] uppercase font-bold text-secondary tracking-widest block -mt-0.5">Admin Studio</span>
          </div>
        </router-link>

        <!-- Kiosk Status Chip -->
        <div class="mt-4 px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-semibold text-primary">Booth #01</span>
          </div>
          <span class="text-[10px] text-on-surface-variant font-medium">Tersinkron</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all group"
          :class="$route.path === item.path ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'"
        >
          <span class="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110" :class="{ 'fill-1': $route.path === item.path }">
            {{ item.icon }}
          </span>
          <span class="flex-1">{{ item.label }}</span>
          <span v-if="item.badge" class="px-2 py-0.5 rounded-full text-[10px] font-bold" :class="$route.path === item.path ? 'bg-secondary text-on-secondary' : 'bg-secondary-container/40 text-on-secondary-container'">
            {{ item.badge }}
          </span>
        </router-link>
      </nav>

      <!-- Bottom Quick Actions & Profile -->
      <div class="p-4 border-t border-surface-container-high/60 space-y-3">
        <!-- Quick Kiosk View Button -->
        <router-link
          to="/kiosk"
          target="_blank"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-low hover:bg-secondary-fixed text-primary text-xs font-semibold border border-surface-container-high/60 transition-all"
        >
          <span class="material-symbols-outlined text-[18px]">open_in_new</span>
          <span>Buka Layar Kiosk</span>
        </router-link>

        <!-- Admin Profile Info -->
        <div class="flex items-center gap-3 p-2 rounded-2xl bg-surface-container-lowest">
          <div class="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs shadow-soft-sm">
            AA
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-primary truncate">{{ adminAuth.user.name }}</p>
            <p class="text-[10px] text-on-surface-variant truncate">{{ adminAuth.user.role }}</p>
          </div>
          <button
            type="button"
            @click="handleLogout"
            class="text-on-surface-variant hover:text-error transition-colors p-1"
            title="Keluar"
          >
            <span class="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Layout -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top Bar -->
      <header class="h-20 bg-surface-container-lowest/80 backdrop-blur-md border-b border-surface-container-high/70 px-8 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 class="text-lg font-bold text-primary tracking-tight">{{ title }}</h1>
          <p class="text-xs text-on-surface-variant">{{ subtitle }}</p>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/"
            class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors border border-surface-container-high/60"
          >
            <span class="material-symbols-outlined text-[16px]">home</span>
            <span>Landing Page</span>
          </router-link>

          <button
            @click="handleSync"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-primary transition-colors border border-surface-container-high/60 shadow-soft-sm"
          >
            <span class="material-symbols-outlined text-[16px] text-emerald-600" :class="{ 'animate-spin': isSyncing }">sync</span>
            <span>Sinkron Hardware</span>
          </button>
        </div>
      </header>

      <!-- Content Page Body -->
      <main class="flex-1 p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminAuth, showToast } from '@/composables/usePhotobooth'

const router = useRouter()

defineProps({
  title: {
    type: String,
    default: 'Panel Admin'
  },
  subtitle: {
    type: String,
    default: 'Kelola seluruh operasional photobooth Angkasa'
  }
})

const isSyncing = ref(false)

function handleSync() {
  isSyncing.value = true
  setTimeout(() => {
    isSyncing.value = false
    showToast('Koneksi hardware Canon EOS & DNP RX1 berhasil disinkronkan!')
  }, 900)
}

function handleLogout() {
  adminAuth.value.isAuthenticated = false
  showToast('Anda telah keluar dari Panel Admin', 'info')
  router.push('/admin/login')
}

const navItems = [
  { path: '/admin/ringkasan', label: 'Ringkasan', icon: 'dashboard' },
  { path: '/admin/preset', label: 'Katalog Preset', icon: 'filter_frames', badge: '4 Paket' },
  { path: '/admin/aset', label: 'Frame & Stiker', icon: 'palette' },
  { path: '/admin/riwayat', label: 'Riwayat Sesi', icon: 'receipt_long' },
  { path: '/admin/pengaturan', label: 'Pengaturan Kiosk', icon: 'tune' },
]
</script>
