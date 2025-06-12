<template>
  <div class="text-center">
    <p class="mt-4 text-lg">
      You've slapped Elon
      <span class="font-mono font-bold text-red-800">{{ storeCount }}</span>
      times.
    </p>

    <div class="my-20">
      <p class="text-md text-gray-700">Global Slaps</p>
      <p><span class="text-xl font-mono">{{ globalSlaps }}</span></p>
    </div>

    <div class="my-10">
      Your rank is
      <span class="font-mono">{{ rank }}</span> out of
      <span class="font-mono">{{ totalUsers }}</span> users.
    </div>
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
