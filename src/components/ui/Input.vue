<template>
  <div class="w-full">
    <label v-if="label" class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>
    <div class="relative">
      <span v-if="iconLeft" class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
        {{ iconLeft }}
      </span>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full py-3 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all disabled:opacity-50 disabled:bg-surface-container-low"
        :class="[iconLeft ? 'pl-12' : 'pl-4', iconRight || $slots.right ? 'pr-12' : 'pr-4', error ? 'border-error focus:border-error focus:ring-error/20' : '']"
      />
      <div v-if="$slots.right || iconRight" class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        <slot name="right">
          <span v-if="iconRight" class="material-symbols-outlined text-on-surface-variant text-[18px]">
            {{ iconRight }}
          </span>
        </slot>
      </div>
    </div>
    <p v-if="error" class="text-[11px] text-error mt-1.5 flex items-center gap-1">
      <span class="material-symbols-outlined text-[14px]">error</span>
      <span>{{ error }}</span>
    </p>
    <p v-else-if="hint" class="text-[11px] text-on-surface-variant mt-1.5">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  iconLeft: { type: String, default: '' },
  iconRight: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>
