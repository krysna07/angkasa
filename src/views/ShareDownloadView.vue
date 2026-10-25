<template>
  <div class="min-h-screen bg-[#070512] text-white flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden font-sans">
    <!-- Ambient glowing backdrop blobs -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/15 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Top Header -->
    <header class="w-full max-w-lg flex items-center justify-between py-2 relative z-10">
      <router-link to="/" class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <span class="material-symbols-outlined text-white text-[20px]">auto_awesome</span>
        </div>
        <div>
          <span class="font-bold text-sm tracking-tight text-white block">Angkasa</span>
          <span class="text-[9px] uppercase tracking-widest text-purple-300 block -mt-1 font-semibold">Photobooth Cloud</span>
        </div>
      </router-link>

      <!-- Expire status badge -->
      <div 
        class="px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border"
        :class="isExpired ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'"
      >
        <span class="w-2 h-2 rounded-full" :class="isExpired ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'"></span>
        <span>{{ isExpired ? 'Tautan Kedaluwarsa' : 'Aktif ' + timeRemaining }}</span>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="w-full max-w-lg my-auto py-6 relative z-10">
      
      <!-- EXPIRED STATE -->
      <div v-if="isExpired" class="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
        <div class="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <span class="material-symbols-outlined text-[32px]">link_off</span>
        </div>
        <h1 class="text-xl font-bold text-white mb-2">Tautan Telah Kedaluwarsa</h1>
        <p class="text-xs text-white/60 leading-relaxed mb-6">
          Sesuai kebijakan privasi Angkasa Photobooth, foto sesi disimpan selama maksimal 24 jam demi keamanan dan privasi kamu. Tautan ini sudah tidak dapat diakses lagi.
        </p>

        <div class="bg-white/5 rounded-2xl p-4 text-xs text-white/50 mb-6 space-y-1.5 text-left border border-white/5">
          <div class="flex justify-between">
            <span>Kode Sesi</span>
            <span class="font-mono font-semibold text-white/80">{{ token }}</span>
          </div>
          <div class="flex justify-between">
            <span>Waktu Selesai</span>
            <span class="text-white/80">Kemarin, 24 jam yang lalu</span>
          </div>
        </div>

        <div class="space-y-2">
          <button @click="isExpired = false" class="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all">
            Simulasi Tautan Aktif (Demo)
          </button>
          <router-link to="/" class="block text-center py-2 text-xs text-purple-300 hover:text-white transition-colors">
            Kembali ke Beranda
          </router-link>
        </div>
      </div>

      <!-- ACTIVE STATE -->
      <div v-else class="space-y-6">
        <!-- Expire Warning Banner -->
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3 flex items-center justify-between text-xs">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-amber-400 text-[18px]">timer</span>
            <span class="text-amber-200">Foto akan dihapus otomatis dalam <strong>{{ timeRemaining }}</strong></span>
          </div>
          <button @click="isExpired = true" class="text-[10px] text-amber-300/70 hover:text-amber-200 underline">
            Tes Kadaluwarsa
          </button>
        </div>

        <!-- Photostrip Display Card -->
        <div class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col items-center">
          <div class="flex items-center justify-between w-full mb-4">
            <div>
              <h2 class="text-base font-bold text-white">Photostrip Digital</h2>
              <p class="text-[11px] text-white/50">Resolusi Tinggi (Original Print Quality)</p>
            </div>
            <span class="text-[11px] font-mono font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-400/30">
              #{{ token }}
            </span>
          </div>

          <!-- Photostrip Visual -->
          <div 
            class="w-48 p-3 pb-6 rounded-2xl shadow-2xl relative mb-6 transition-transform hover:scale-[1.02] duration-300"
            style="background: #181329; box-shadow: 0 10px 40px rgba(124, 58, 237, 0.35);"
          >
            <div class="space-y-2">
              <div v-for="(img, idx) in sessionPhotos" :key="idx" class="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black/40 relative">
                <img :src="img" :alt="'Pose ' + (idx + 1)" class="w-full h-full object-cover" />
                <span class="absolute top-1 left-1.5 text-[8px] bg-black/50 text-white/80 px-1 rounded font-mono">0{{ idx + 1 }}</span>
              </div>
            </div>

            <!-- Strip Footer Branding -->
            <div class="mt-3 text-center">
              <p class="text-[9px] font-bold text-purple-300 tracking-wider">ANGKASA PHOTOBOOTH</p>
              <p class="text-[7px] text-white/40 font-mono mt-0.5">25 OKT 2026 • BOOTH #01</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="w-full space-y-2.5">
            <button 
              @click="downloadFullStrip"
              class="w-full py-3.5 rounded-2xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all active:scale-[0.98]"
              style="background: linear-gradient(135deg, #7c3aed, #ec4899)"
            >
              <span class="material-symbols-outlined text-[18px]">download</span>
              <span>Unduh Photostrip Lengkap (Ultra HD)</span>
            </button>

            <button 
              @click="copyShareLink"
              class="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-all active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">share</span>
              <span>{{ copied ? 'Tautan Berhasil Disalin!' : 'Bagikan Tautan Unduhan' }}</span>
            </button>
          </div>
        </div>

        <!-- Individual Poses Grid -->
        <div class="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-bold text-white uppercase tracking-wider">Foto Asli Per Pose ({{ sessionPhotos.length }})</h3>
            <span class="text-[10px] text-white/40">Tanpa Frame</span>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div 
              v-for="(photo, index) in sessionPhotos" 
              :key="index"
              class="group relative rounded-xl overflow-hidden aspect-[4/3] bg-white/5 border border-white/10"
            >
              <img :src="photo" class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
              <button 
                @click="downloadSinglePhoto(photo, index)"
                class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity text-white"
                title="Unduh Pose Ini"
              >
                <span class="material-symbols-outlined text-[20px]">download</span>
                <span class="text-[9px] font-bold">Pose {{ index + 1 }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full max-w-lg text-center py-4 text-[11px] text-white/30 relative z-10 border-t border-white/5">
      &copy; 2026 Angkasa Photobooth. Foto tersimpan aman secara privat selama 24 jam.
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from '@/composables/usePhotobooth'

const route = useRoute()
const token = computed(() => route.params.token || 'ANGKASA-88X9A')

const isExpired = ref(false)
const timeRemaining = ref('23 Jam 42 Menit')
const copied = ref(false)

const sessionPhotos = ref([
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
])

function downloadFullStrip() {
  const link = document.createElement('a')
  link.href = sessionPhotos.value[0]
  link.download = `angkasa-strip-${token.value}.jpg`
  link.click()
  showToast('Mengunduh Photostrip Ultra HD...')
}

function downloadSinglePhoto(url, index) {
  const link = document.createElement('a')
  link.href = url
  link.download = `angkasa-pose-${index + 1}-${token.value}.jpg`
  link.click()
  showToast(`Mengunduh Foto Pose ${index + 1}...`)
}

function copyShareLink() {
  navigator.clipboard?.writeText(window.location.href)
  copied.value = true
  showToast('Tautan telah disalin ke clipboard!')
  setTimeout(() => {
    copied.value = false
  }, 2500)
}
</script>
