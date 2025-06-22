<template>
  <div class="text-center">
    <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">

      <!-- Your Slaps -->
      <div class="overflow-hiddenp-2 p-2 md:p-4  rounded-lg">
        <div class="truncate text-sm font-medium text-gray-500">Your slaps</div>
        <div class="mt-1 font-mono lg:text-xl tracking-tight text-red-900">
          <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
            {{ storeCount }}
          </div>
        </div>
      </div>

      <!-- Rank -->
      <div class="overflow-hidden p-2 md:p-4 rounded-lg">
        <div class="truncate text-sm font-medium text-gray-500">Your Rank</div>
        <div class="mt-1 font-mono lg:text-xl tracking-tight text-gray-900">
          <div class="overflow-x-auto whitespace-nowrap max-w-full scrollbar-thin">
            <span :class="rank === '1' ? 'text-green-700' : 'text-gray-900'">{{ rank }}</span>
            <span class="text-gray-500"> / {{ totalUsers }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="nextClosest">
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
      <p class="text-sm text-gray-500">
        Next highest user slap count
      </p>
      <p class="mt-1"> <span class="font-mono text-xs text-gray-500">{{ formattedNextClosest }}</span> </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  storeCount: string
  rank: string
  totalUsers: string,
  nextClosest: Number | null
}>()

const formattedNextClosest = computed(() => {
  return props.nextClosest ? props.nextClosest.toLocaleString() : '—'
})

</script>
