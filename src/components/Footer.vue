<template>
  <footer class="w-full bg-surface-container-low border-t border-surface-container-high/60 pt-16 pb-12 mt-auto">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand Info -->
        <div class="md:col-span-1 space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <span class="text-lg font-bold text-primary tracking-tight block">Angkasa</span>
              <span class="text-[10px] uppercase font-semibold text-secondary tracking-widest block -mt-1">Photobooth</span>
            </div>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Pengalaman photobooth generasi baru. Foto di terminal kiosk, hias bebas di ponsel, bayar instan, dan simpan kenangan abadi berkualitas studio.
          </p>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high/60 text-xs text-on-surface-variant">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Booth #01 • Grand Atrium Online</span>
          </div>
        </div>

        <!-- Quick Links (Tabs) -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-primary">Navigasi Halaman</h4>
          <ul class="space-y-2 text-xs text-on-surface-variant">
            <li><button @click="setTab('beranda')" class="hover:text-primary transition-colors cursor-pointer">Beranda</button></li>
            <li><button @click="setTab('cara-kerja')" class="hover:text-primary transition-colors cursor-pointer">Cara Kerja Sesi</button></li>
            <li><button @click="setTab('paket')" class="hover:text-primary transition-colors cursor-pointer">Katalog Paket Foto</button></li>
            <li><button @click="setTab('galeri')" class="hover:text-primary transition-colors cursor-pointer">Galeri Inspirasi</button></li>
            <li><button @click="setTab('faq')" class="hover:text-primary transition-colors cursor-pointer">Tanya Jawab (FAQ)</button></li>
          </ul>
        </div>

        <!-- System & Kiosk -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-primary">Aplikasi & Portal</h4>
          <ul class="space-y-2 text-xs text-on-surface-variant">
            <li><router-link to="/kiosk" class="hover:text-primary flex items-center gap-1.5 font-medium text-secondary">
              <span class="material-symbols-outlined text-[16px]">touch_app</span>
              <span>Layar Siaga Kiosk</span>
            </router-link></li>
            <li><router-link to="/admin/ringkasan" class="hover:text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">dashboard</span>
              <span>Ringkasan Admin</span>
            </router-link></li>
            <li><router-link to="/admin/preset" class="hover:text-primary">Katalog Preset</router-link></li>
            <li><router-link to="/admin/riwayat" class="hover:text-primary">Riwayat Sesi</router-link></li>
            <li><router-link to="/admin/pengaturan" class="hover:text-primary">Pengaturan Kiosk</router-link></li>
          </ul>
        </div>

        <!-- Legal & Contacts -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-primary">Kebijakan & Dukungan</h4>
          <ul class="space-y-2 text-xs text-on-surface-variant">
            <li><router-link to="/kebijakan-privasi" class="hover:text-primary transition-colors">Kebijakan Privasi</router-link></li>
            <li><router-link to="/syarat-ketentuan" class="hover:text-primary transition-colors">Syarat & Ketentuan</router-link></li>
            <li class="pt-2 text-xs text-on-surface-variant/80">
              <span class="block font-semibold text-primary">Hubungi Kami</span>
              <span>halo@angkasabooth.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <p>© 2026 Angkasa Photobooth. Seluruh hak cipta dilindungi.</p>
        <p class="flex items-center gap-1">
          Dibuat dengan <span class="material-symbols-outlined text-secondary text-[14px]">favorite</span> untuk momen terbaikmu.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { activeLandingTab } from '@/composables/usePhotobooth'

const router = useRouter()
const route = useRoute()

function setTab(tabId) {
  activeLandingTab.value = tabId
  if (route.path !== '/') {
    router.push({ path: '/', query: { tab: tabId } })
  } else {
    router.replace({ query: { tab: tabId } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
