<template>
  <header class="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/85 backdrop-blur-md border-b border-surface-container-high/70 shadow-soft-sm">
    <div class="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
      <!-- Logo -->
      <button @click="setTab('beranda')" class="flex items-center gap-2.5 group cursor-pointer text-left">
        <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform">
          <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
        </div>
        <div>
          <span class="text-xl font-bold text-primary tracking-tight block">Angkasa</span>
          <span class="text-[10px] uppercase font-semibold text-secondary tracking-widest block -mt-1">Photobooth</span>
        </div>
      </button>

      <!-- Center Desktop Navigation Tabs -->
      <nav class="hidden md:flex items-center gap-1.5 p-1.5 bg-surface-container-low/90 rounded-full border border-surface-container-high/60 shadow-xs">
        <button
          v-for="item in navTabs"
          :key="item.id"
          @click="setTab(item.id)"
          class="px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer"
          :class="isActive(item.id) ? 'bg-primary-container text-on-primary shadow-sm scale-102' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60'"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Right CTAs -->
      <div class="flex items-center gap-3">
        <!-- Live Terminal Kiosk Mode -->
        <router-link
          to="/kiosk"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary to-primary-container text-on-primary text-xs font-semibold shadow-soft-md hover:shadow-soft-lg hover:scale-[1.02] transition-all"
        >
          <span class="material-symbols-outlined text-[18px]">photo_camera</span>
          <span>Layar Kiosk Booth</span>
        </router-link>

        <!-- Admin Portal Icon Button -->
        <router-link
          to="/admin/ringkasan"
          class="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container text-primary flex items-center justify-center border border-surface-container-high/60 shadow-soft-sm transition-all"
          title="Portal Admin Photobooth"
        >
          <span class="material-symbols-outlined text-[20px]">admin_panel_settings</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { activeLandingTab } from '@/composables/usePhotobooth'

const router = useRouter()
const route = useRoute()

const navTabs = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'cara-kerja', label: 'Cara Kerja' },
  { id: 'paket', label: 'Paket & Harga' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'faq', label: 'FAQ' }
]

function isActive(id) {
  return route.path === '/' && activeLandingTab.value === id
}

function setTab(id) {
  activeLandingTab.value = id
  if (route.path !== '/') {
    router.push({ path: '/', query: { tab: id } })
  } else {
    router.replace({ query: { tab: id } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
