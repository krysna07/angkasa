<template>
  <span
    class="inline-flex items-center gap-1.5 font-semibold transition-all select-none"
    :class="[variantClasses, sizeClasses, roundedClass]"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotClasses"></span>
    <span v-if="icon" class="material-symbols-outlined text-[14px]">{{ icon }}</span>
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary, secondary, success, warning, error, neutral
  size: { type: String, default: 'sm' }, // xs, sm, md
  rounded: { type: String, default: 'full' },
  dot: { type: Boolean, default: false },
  icon: { type: String, default: '' }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'warning':
      return 'bg-amber-50 text-amber-800 border border-amber-200'
    case 'error':
      return 'bg-error-container text-on-error-container border border-error/20'
    case 'secondary':
      return 'bg-secondary-fixed text-primary border border-secondary/20'
    case 'neutral':
      return 'bg-surface-container text-on-surface-variant border border-surface-container-high'
    case 'primary':
    default:
      return 'bg-primary-container text-on-primary'
  }
})

const dotClasses = computed(() => {
  switch (props.variant) {
    case 'success': return 'bg-emerald-500 animate-pulse'
    case 'warning': return 'bg-amber-500 animate-pulse'
    case 'error': return 'bg-error'
    case 'secondary': return 'bg-secondary'
    case 'neutral': return 'bg-on-surface-variant'
    case 'primary':
    default: return 'bg-white'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs': return 'px-2 py-0.5 text-[10px]'
    case 'md': return 'px-3 py-1.5 text-xs'
    case 'sm':
    default: return 'px-2.5 py-1 text-[11px]'
  }
})

const roundedClass = computed(() => {
  switch (props.rounded) {
    case 'md': return 'rounded-md'
    case 'lg': return 'rounded-xl'
    case 'full':
    default: return 'rounded-full'
  }
})
</script>
