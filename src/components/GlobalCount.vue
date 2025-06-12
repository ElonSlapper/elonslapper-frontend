<template>
  <div class=" text-center overflow-hidden">
    <dt class="truncate text-sm font-medium text-gray-500">Global slaps</dt>
    <dd class="mt-1 font-mono text-xl lg:text-2xl tracking-tight text-gray-900">
      <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
        {{ globalSlaps }}
      </div>
    </dd>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  globalSlaps: string
}>()
</script>
