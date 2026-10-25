<template>
  <div 
    class="min-h-screen flex flex-col transition-colors duration-200"
    :class="$route.path.startsWith('/editor') ? 'bg-[#06030f] text-white' : 'bg-surface text-on-surface'"
  >
    <router-view />
    <ToastNotification />
  </div>
</template>

<script setup>
import ToastNotification from '@/components/ToastNotification.vue'
</script>

