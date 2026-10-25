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
          <!-- Live Sync Badge with 60s Auto Refresh -->
          <div class="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-surface-container-high/70 text-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-semibold text-primary">Tersinkron Live</span>
            <span class="text-on-surface-variant font-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded-md">
              {{ autoRefreshSeconds }}s
            </span>
          </div>

          <!-- Notification Bell & Dropdown -->
          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container-high/70 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all relative shadow-soft-sm"
              title="Notifikasi Booth"
            >
              <span class="material-symbols-outlined text-[20px]">notifications</span>
              <span 
                v-if="unreadCount > 0"
                class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-error text-on-error text-[9px] font-bold flex items-center justify-center animate-pulse"
              >
                {{ unreadCount }}
              </span>
            </button>

            <!-- Notification Dropdown Panel -->
            <div 
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-surface-container-lowest border border-surface-container-high/80 shadow-soft-xl p-4 z-50 animate-fade"
            >
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-high/60">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-primary">Aktivitas & Notifikasi Booth</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-bold">
                    {{ unreadCount }} Baru
                  </span>
                </div>
                <button 
                  v-if="unreadCount > 0" 
                  @click="markAllNotificationsRead" 
                  class="text-[11px] text-secondary hover:underline font-semibold"
                >
                  Tandai Dibaca
                </button>
              </div>

              <!-- Notifications list -->
              <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
                <div 
                  v-for="notif in notifications" 
                  :key="notif.id"
                  class="p-3 rounded-2xl transition-all border text-xs"
                  :class="notif.read ? 'bg-surface-container-low/40 border-transparent opacity-60' : 'bg-surface-container-low border-surface-container-high/60'"
                >
                  <div class="flex items-start gap-2.5">
                    <div 
                      class="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      :class="notif.type === 'warning' ? 'bg-amber-100 text-amber-800' : notif.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-secondary-fixed text-primary'"
                    >
                      <span class="material-symbols-outlined text-[16px]">{{ notif.icon }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-primary text-[11px]">{{ notif.title }}</p>
                      <p class="text-on-surface-variant text-[11px] leading-tight mt-0.5">{{ notif.desc }}</p>
                      <span class="text-[9px] text-on-surface-variant/70 font-mono mt-1 block">{{ notif.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Manual Sync Button -->
          <button
            @click="handleSync"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-primary transition-colors border border-surface-container-high/60 shadow-soft-sm"
          >
            <span class="material-symbols-outlined text-[16px] text-emerald-600" :class="{ 'animate-spin': isSyncing }">sync</span>
            <span class="hidden sm:inline">Sinkron Hardware</span>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
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

// 60-Second Auto Refresh Timer
const autoRefreshSeconds = ref(60)
let refreshTimer = null

onMounted(() => {
  refreshTimer = setInterval(() => {
    if (autoRefreshSeconds.value > 1) {
      autoRefreshSeconds.value--
    } else {
      autoRefreshSeconds.value = 60
      // Auto refresh trigger
      showToast('Data sesi & hardware diperbarui otomatis (Live 60s)', 'info', 2000)
    }
  }, 1000)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})

// Notifications State
const showNotifications = ref(false)
const notifications = ref([
  {
    id: 1,
    title: 'Kertas Printer DNP Terpakai',
    desc: 'Tersisa 412 lembar di Booth #01. Cukup untuk ~200 sesi cetak.',
    time: '2 menit lalu',
    icon: 'print',
    type: 'info',
    read: false
  },
  {
    id: 2,
    title: 'Pembayaran QRIS Berhasil',
    desc: 'Sesi #SESI-20261025-089 senilai Rp 35.000 telah lunas dibayar.',
    time: '8 menit lalu',
    icon: 'payments',
    type: 'success',
    read: false
  },
  {
    id: 3,
    title: 'Peringatan Suhu Bilik Kiosk',
    desc: 'Suhu pendingin kamera normal di 26°C.',
    time: '25 menit lalu',
    icon: 'thermostat',
    type: 'warning',
    read: true
  }
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function markAllNotificationsRead() {
  notifications.value.forEach(n => n.read = true)
  showToast('Semua notifikasi ditandai telah dibaca')
}

const isSyncing = ref(false)

function handleSync() {
  isSyncing.value = true
  autoRefreshSeconds.value = 60
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
