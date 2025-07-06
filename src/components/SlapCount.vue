<template>
  <div class=" text-center overflow-hidden">
    <div class="truncate text-sm font-medium text-gray-500">Your slaps</div>
    <div class="mt-1 font-mono text-xl lg:text-2xl tracking-tight text-gray-900">
      <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: string
}>()
</script>
