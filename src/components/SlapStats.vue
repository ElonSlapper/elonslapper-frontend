<template>
  <div class="text-center">
    <dl class="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <!-- Your Slaps -->
      <div class="overflow-hidden px-4 py-5 sm:p-6 border-2 border-gray-200 rounded-lg">
        <dt class="truncate text-sm font-medium text-gray-500">Your slaps</dt>
        <dd class="mt-1 font-mono lg:text-xl tracking-tight text-red-900">
          <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
            {{ storeCount }}
          </div>
        </dd>
      </div>

      <!-- Rank -->
      <div class="overflow-hidden px-4 py-5 sm:p-6 border-2 border-gray-200 rounded-lg">
        <dt class="truncate text-sm font-medium text-gray-500">Your Rank</dt>
        <dd class="mt-1 font-mono lg:text-xl tracking-tight text-gray-900">
          <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
            <span :class="rank === '1' ? 'text-green-700' : 'text-gray-900'">{{ rank }}</span>
            <span class="text-gray-500"> / {{ totalUsers }}</span>
          </div>
        </dd>
      </div>

      <!-- Global Slaps -->
      <div class="col-span-2 sm:col-span-1 overflow-hidden px-4 py-5 sm:p-6 border-2 border-gray-200 rounded-lg">
        <dt class="truncate text-sm font-medium text-gray-500">Global slaps</dt>
        <dd class="mt-1 font-mono lg:text-xl tracking-tight text-gray-900">
          <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
            {{ globalSlaps }}
          </div>
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
