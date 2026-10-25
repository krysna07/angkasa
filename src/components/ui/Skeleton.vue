<template>
  <div
    class="animate-pulse bg-surface-container-high/80"
    :class="[roundedClass]"
    :style="customStyle"
  ></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  rounded: { type: String, default: 'md' }, // sm, md, lg, full
  circle: { type: Boolean, default: false }
})

const roundedClass = computed(() => {
  if (props.circle) return 'rounded-full'
  switch (props.rounded) {
    case 'sm': return 'rounded'
    case 'lg': return 'rounded-2xl'
    case 'full': return 'rounded-full'
    case 'md':
    default: return 'rounded-xl'
  }
})

const customStyle = computed(() => ({
  width: props.circle ? props.height : props.width,
  height: props.height
}))
</script>
