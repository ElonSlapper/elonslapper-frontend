<template>
  <div class="container mx-auto text-center p-8">
    <div class="flex flex-col items-center">
      <img
        :src="currentImage"
        alt="Elon Musk"
        class="w-80 h-80 rounded-full mb-6 cursor-pointer transition duration-200"
        @click="slap"
      />
      <p class="mt-4 text-lg">
        You've slapped Elon <span class="font-mono font-bold text-red-800">{{ store.count }}</span> times.
      </p>


      <div class="my-20">
        <p class=" text-md text-gray-700">
          Global Slaps
        </p>
        <p>
          <span class="text-xl font-mono">123,345,32</span>
        </p>
      </div>

      <div>
        <p class="mt-4 text-lg">
          You're in the top <span> 1%</span> of all slappers!
        </p>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSlapStore } from '@/stores/slap'
import elonImage from '@/assets/elon.png'
import slappedImage from '@/assets/slapped.png'

const store = useSlapStore()
const currentImage = ref(elonImage)

const globalCount = ref<number | null>(null)
const totalUsers = ref<number | null>(null)

const percentile = computed(() => {
  if (!totalUsers.value || totalUsers.value <= 1) return null
  const rank = store.countRank // Assume this gives user's rank among total users (1 is best)
  return 100 * (rank / totalUsers.value)
})

function slap() {
  store.slap()
  currentImage.value = slappedImage
  setTimeout(() => {
    currentImage.value = elonImage
  }, 150)
  fetchStats()
}

async function fetchStats() {
  // These should be replaced with actual API or store calls
  globalCount.value = await store.getGlobalCount()
  totalUsers.value = await store.getTotalUsers()
}

onMounted(fetchStats)
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
