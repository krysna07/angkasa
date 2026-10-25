<template>
  <Transition name="fade">
    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-full shadow-soft-xl border backdrop-blur-md transition-all duration-300"
      :class="toastClasses"
    >
      <span class="material-symbols-outlined text-[20px]">{{ iconName }}</span>
      <span class="text-sm font-medium tracking-tight">{{ toast.message }}</span>
      <button 
        @click="toast.show = false" 
        class="ml-2 hover:opacity-75 transition-opacity"
      >
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { toast } from '@/composables/usePhotobooth'

const toastClasses = computed(() => {
  switch (toast.value.type) {
    case 'error':
      return 'bg-error-container text-on-error-container border-error/20'
    case 'warning':
      return 'bg-amber-100 text-amber-900 border-amber-300'
    case 'info':
      return 'bg-secondary-fixed text-on-secondary-fixed border-secondary/20'
    case 'success':
    default:
      return 'bg-primary-container text-on-primary border-primary/20'
  }
})

const iconName = computed(() => {
  switch (toast.value.type) {
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    case 'success':
    default:
      return 'check_circle'
  }
})
</script>
