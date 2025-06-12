<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'danger' | 'primary'
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'danger':
      return 'bg-red-50 text-red-700 ring-red-300 hover:bg-red-100'
    case 'primary':
      return 'bg-blue-50 text-blue-700 ring-blue-300 hover:bg-blue-100'
    default:
      return 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
  }
})
</script>

<template>
  <button
    type="button"
    class="rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-xs ring-1 ring-inset cursor-pointer"
    :class="variantClass"
  >
    <slot />
  </button>
</template>
