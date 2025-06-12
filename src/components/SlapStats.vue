<template>
  <div>
    <dl class="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <!-- Your Slaps -->
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Your slaps</dt>
        <dd class="mt-1 text-xl font-mono tracking-tight text-red-900">
          {{ storeCount }}
        </dd>
      </div>

      <!-- Rank -->
      <div class="overflow-hidden rounded-lg bg-white px-4 py-5 sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Your Rank</dt>
        <dd class="mt-1 text-xl font-mono tracking-tight text-gray-900">
          {{ rank }} / {{ totalUsers }}
        </dd>
      </div>

      <!-- Global Slaps (spans 2 cols on mobile) -->
      <div class="col-span-2 sm:col-span-1 overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Global slaps</dt>
        <dd class="mt-1 text-xl font-mono tracking-tight text-gray-900">
          {{ globalSlaps }}
        </dd>
      </div>
    </dl>
  </div>


</template>

<script setup lang="ts">
defineProps<{
  storeCount: string
  globalSlaps: string
  rank: string
  totalUsers: string
}>()
</script>
