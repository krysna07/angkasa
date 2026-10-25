<template>
  <div
    class="bg-surface-container-lowest rounded-3xl border border-surface-container-high/70 shadow-soft-sm transition-all"
    :class="[paddingClasses, hoverable ? 'hover:shadow-soft-md hover:border-secondary-container/50' : '']"
  >
    <div v-if="$slots.header || title" class="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-high/60">
      <slot name="header">
        <div>
          <h3 class="text-sm font-bold text-primary">{{ title }}</h3>
          <p v-if="subtitle" class="text-xs text-on-surface-variant mt-0.5">{{ subtitle }}</p>
        </div>
      </slot>
    </div>

    <slot />

    <div v-if="$slots.footer" class="pt-4 mt-4 border-t border-surface-container-high/60">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  hoverable: { type: Boolean, default: false },
  padding: { type: String, default: 'normal' } // none, sm, normal, lg
})

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none': return 'p-0'
    case 'sm': return 'p-4'
    case 'lg': return 'p-8'
    case 'normal':
    default: return 'p-6'
  }
})
</script>
