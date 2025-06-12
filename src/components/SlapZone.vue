<template>
  <div class="container mx-auto text-center p-5">
    <div class="flex flex-col items-center">
      <SlapImage
        :image="currentImage"
        :isClicked="isCursorClicked"
        @slap="slap"
      />

      <SlapStats
        :storeCount="formattedStoreCount"
        :globalSlaps="formattedGlobalSlaps"
        :rank="formattedRank"
        :totalUsers="formattedTotalUsers"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SlapImage from './SlapImage.vue'
import SlapStats from './SlapStats.vue'
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

// Image slap + debounce logic
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
    if (res.ok) store.markSubmitted()
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
    }
  } catch (err) {
    console.error('❌ Error fetching global slaps:', err)
  }
}

async function fetchRankAndTotal() {
  if (!store.userId) return
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/rank/?user_id=${store.userId}`)
    const data = await res.json()
    if (res.ok && data.rank !== undefined) {
      store.setRank(data.rank.rank)
      store.setTotalUsers(data.rank.total)
    }
  } catch (err) {
    console.error('❌ Error fetching rank and total users:', err)
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    clearInterval(interval)
  } else {
    fetchGlobalSlaps()
    interval = setInterval(periodicFetch, 15000)
  }
}

let fetching = false
async function periodicFetch() {
  if (fetching) return
  fetching = true
  try {
    await fetchGlobalSlaps()
    await fetchRankAndTotal()
  } finally {
    fetching = false
  }
}

onMounted(() => {
  fetchUserId()
  periodicFetch()
  interval = setInterval(periodicFetch, 6000)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  clearInterval(interval)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>
