<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-semibold transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
    :class="[variantClasses, sizeClasses, roundedClass, block ? 'w-full' : '']"
  >
    <span v-if="loading" class="material-symbols-outlined animate-spin text-[18px] mr-2">progress_activity</span>
    <span v-else-if="iconLeft" class="material-symbols-outlined text-[18px] mr-1.5">{{ iconLeft }}</span>
    <slot />
    <span v-if="iconRight && !loading" class="material-symbols-outlined text-[18px] ml-1.5">{{ iconRight }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, // primary, secondary, outline, ghost, danger
  size: { type: String, default: 'md' }, // sm, md, lg
  rounded: { type: String, default: 'full' }, // md, lg, full
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  iconLeft: { type: String, default: '' },
  iconRight: { type: String, default: '' }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-secondary-fixed text-primary hover:bg-secondary-fixed-dim shadow-soft-sm'
    case 'outline':
      return 'border border-surface-container-high bg-surface-container-lowest text-primary hover:bg-surface-container-low'
    case 'ghost':
      return 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
    case 'danger':
      return 'bg-error text-on-error hover:bg-error/90 shadow-soft-sm'
    case 'primary':
    default:
      return 'bg-primary-container text-on-primary hover:opacity-95 shadow-soft-sm'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs'
    case 'lg':
      return 'px-6 py-3.5 text-sm'
    case 'md':
    default:
      return 'px-4 py-2.5 text-xs'
  }
})

const roundedClass = computed(() => {
  switch (props.rounded) {
    case 'md': return 'rounded-xl'
    case 'lg': return 'rounded-2xl'
    case 'full':
    default: return 'rounded-full'
  }
})
</script>
