<template>
  <div class="container mx-auto text-center p-5">
    <div class="flex flex-col items-center">
      <img
        :src="currentImage"
        alt="Elon Musk"
        :class="[
          'w-80 h-80 rounded-full mb-6 transition duration-200 touch-manipulation',
          isCursorClicked ? 'cursor-clicked' : 'custom-cursor'
        ]"
        @click="slap"
      />

      <p class="mt-4 text-lg">
        You've slapped Elon
        <span class="font-mono font-bold text-red-800">{{ formattedStoreCount }}</span>
        times.
      </p>

      <div class="my-20">
        <p class="text-md text-gray-700">Global Slaps</p>
        <p>
          <span class="text-xl font-mono">{{ formattedGlobalSlaps }}</span>
        </p>
      </div>

      <div class="my-10">
        Your rank is <span class="font-mono">{{ formattedRank }}</span> out of <span class="font-mono">{{ formattedTotalUsers }}</span> users.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useSlapStore } from '@/stores/slap'
import elonImage from '@/assets/elon.jpg'
import slappedImage from '@/assets/slapped.jpg'

const store = useSlapStore()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const currentImage = ref(elonImage)
const isCursorClicked = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null
let interval: ReturnType<typeof setInterval>

// Computed
const formattedStoreCount = computed(() => store.count.toLocaleString())
const formattedGlobalSlaps = computed(() => store.globalSlaps.toLocaleString())

const formattedRank = computed(() =>
  store.rank > 0 ? store.rank.toLocaleString() : '—'
)

const formattedTotalUsers = computed(() =>
  store.totalUsers > 0 ? store.totalUsers.toLocaleString() : '—'
)



async function fetchRankAndTotal() {
  if (!store.userId) return
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/rank/?user_id=${store.userId}`)
    const data = await res.json()
    if (res.ok && data.rank !== undefined && data.total_users !== undefined) {
      store.setRank(data.rank)
      store.setTotalUsers(data.total_users)
      console.log('🔢 Rank & total users updated:', data)
    }
  } catch (err) {
    console.error('❌ Error fetching rank and total users:', err)
  }
}


function slap() {
  store.slap()
  debounceSendSlaps()

  currentImage.value = slappedImage
  isCursorClicked.value = true
  setTimeout(() => {
    currentImage.value = elonImage
    isCursorClicked.value = false
  }, 150)
}

function debounceSendSlaps() {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    const unsent = store.getUnsentSlaps()
    if (unsent > 0) sendSlaps(unsent)
  }, 2000)
}

async function sendSlaps(count: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slap_count: count, user_id: store.userId }),
    })

    if (res.ok) {
      store.markSubmitted()
      console.log(`✅ Successfully submitted ${count} slaps`)
    } else {
      console.warn('⚠️ Failed to submit slaps')
    }
  } catch (err) {
    console.error('❌ Error sending slaps:', err)
  }
}

async function fetchUserId() {
  if (store.userId) return
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/create-user`, { method: 'POST' })
    const data = await res.json()
    if (res.ok && data.user_id) {
      store.setUserId(data.user_id)
    }
  } catch (err) {
    console.error('❌ Failed to fetch user ID:', err)
  }
}

async function fetchGlobalSlaps() {
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/global-count`)
    const data = await res.json()
    if (data.count !== undefined) {
      store.setGlobalSlaps(data.count)
      console.log('🌍 Global slaps updated:', data.count)
    }
  } catch (err) {
    console.error('❌ Error fetching global slaps:', err)
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    clearInterval(interval)
    console.log('⏸️ Polling paused (tab hidden)')
  } else {
    fetchGlobalSlaps()
    interval = setInterval(fetchGlobalSlaps, 15000)
    console.log('▶️ Polling resumed (tab visible)')
  }
}

onMounted(() => {
  fetchUserId()
  fetchGlobalSlaps()
  fetchRankAndTotal()
  interval = setInterval(() => {
    fetchGlobalSlaps()
    fetchRankAndTotal()
  }, 6000)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  clearInterval(interval)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

watch(() => store.userId, (newId: string) => {
  if (newId) fetchRankAndTotal()
})

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
