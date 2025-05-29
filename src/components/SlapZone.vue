<template>
  <div class="container mx-auto text-center p-8">
    <div class="flex flex-col items-center">
      <img
        :src="currentImage"
        alt="Elon Musk"
        :class="['w-80 h-80 rounded-full mb-6 transition duration-200', isCursorClicked ? 'cursor-clicked' : 'custom-cursor']"
        @click="slap"
      />
      <p class="mt-4 text-lg">
        You've slapped Elon <span class="font-mono font-bold text-red-800">{{ store.count }}</span> times.
      </p>

      <div class="my-20">
        <p class=" text-md text-gray-700">Global Slaps</p>
        <p>
          <span class="text-xl font-mono">{{ globalCount?.toLocaleString() ?? '...' }}</span>
        </p>
      </div>

      <div>
        <p class="mt-4 text-lg">
          You're in the top <span>{{ percentileDisplay }}</span> of all slappers!
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
const isCursorClicked = ref(false)

const percentile = computed(() => {
  if (!totalUsers.value || totalUsers.value <= 1) return null
  const rank = store.countRank // Assume 1 is best
  return 100 * (rank / totalUsers.value)
})

const percentileDisplay = computed(() => {
  if (percentile.value === null) return '...'
  return `${(100 - percentile.value).toFixed(2)}%`
})

function slap() {
  store.slap()
  currentImage.value = slappedImage
  isCursorClicked.value = true
  setTimeout(() => {
    currentImage.value = elonImage
    isCursorClicked.value = false
  }, 150)
  fetchStats()
}

async function fetchStats() {
  globalCount.value = await store.getGlobalCount()
  totalUsers.value = await store.getTotalUsers()
}

onMounted(fetchStats)

</script>

<style scoped>
img {
  object-fit: cover;
}

.custom-cursor {
  cursor: url('/cursor.png') 16 16, pointer;
}

.cursor-clicked {
  cursor: url('/cursor-slap.png') 16 16, pointer;
}
</style>
