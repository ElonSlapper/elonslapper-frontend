<template>
  <div class="flex flex-col items-center gap-y-5 md:gap-y-10">

    <div v-if="!isOnline" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="shrink-0">
          <svg class="size-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">You are offline!</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>Global slaps and ranks will update when you are back online</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="requiresUpdate" class="rounded-md bg-blue-50 p-4">
      <div class="flex">
        <div class="shrink-0">
          <svg class="size-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">App update</h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>Refresh to update app to the latest version</p>
          </div>
          <div class="mt-4">
            <div class="-mx-2 -my-1.5 flex">
              <button @click="refreshApp" type="button" class="cursor-pointer rounded-md bg-blue-50 px-2 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-100 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50 focus:outline-hidden">Refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <GlobalCount :globalSlaps="formattedGlobalSlaps" />
    <SlapImage
      :image="currentImage"
      :isClicked="isCursorClicked"
      @slap="slap"
    />

    <SlapStats
      :storeCount="formattedStoreCount"
      :rank="formattedRank"
      :totalUsers="formattedTotalUsers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SlapImage from './SlapImage.vue'
import SlapStats from './SlapStats.vue'
import GlobalCount from './GlobalCount.vue'

import { useSlapStore } from '@/stores/slap'
import elonImage from '@/assets/elon.jpg'
import slappedImage from '@/assets/slapped.jpg'
import { getAppVersion } from '@/util/version'

const store = useSlapStore()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const currentImage = ref(elonImage)
const isCursorClicked = ref(false)
const isOnline = ref(navigator.onLine)
const requiresUpdate = ref(false)
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
const appVersion = getAppVersion()

// Image slap + debounce logic
function slap() {
  store.slap()
  debounceSendSlaps()

  currentImage.value = slappedImage
  isCursorClicked.value = true
  setTimeout(() => {
    currentImage.value = elonImage
    isCursorClicked.value = false
  }, 100)
}

function refreshApp() {
  requiresUpdate.value = false
  window.location.reload()
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
    if (res.ok){
      store.markSubmitted()
      console.log(`✅ Sent ${count} slaps successfully!`)
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
    }else{
      console.error('❌ Failed to create user ID:', data)
    }
  } catch (err) {
    console.error('❌ Failed to fetch user ID:', err)
  }
}

async function fetchStats() {
  if (!store.userId) return
  try {
    const params = new URLSearchParams({
      user_id: store.userId || '',
      app_version: appVersion,
    })

    const res = await fetch(`${API_BASE_URL}/slaps/stats?${params.toString()}`)
    const data = await res.json()

    if (res.ok) {
      if (data.global_count !== undefined) {
        store.setGlobalSlaps(data.global_count)
      }
      else{
        console.warn('⚠️ Global count not found in response')
      }
      if (data.rank !== undefined) {
        // Get rank and total out of the data
        store.setTotalUsers(data.rank.total)
        store.setRank(data.rank.rank)
      }else{
        console.warn('⚠️ Rank not found in response')
      }
      if (data.update !== undefined){
        requiresUpdate.value = data.update
      }
      else{
        console.warn('⚠️ Update flag not found in response')
      }
    }
  } catch (err) {
    console.error('❌ Error fetching slap stats:', err)
  }
}


function handleVisibilityChange() {
  if (document.hidden) {
    clearInterval(interval)
  } else {
    interval = setInterval(periodicFetch, 15000)
  }
}

let fetching = false
async function periodicFetch() {
  if (fetching) return
  fetching = true
  try {
    await fetchStats()
  } finally {
    fetching = false
  }
}

function handleOnline() {
  isOnline.value = true
  console.log('🟢 Back online')
  if (store.getUnsentSlaps() > 0) {
    sendSlaps(store.getUnsentSlaps())
  }
}

function handleOffline() {
  isOnline.value = false
  console.log('🔴 Offline')
}


onMounted(() => {
  fetchUserId()
  periodicFetch()
  interval = setInterval(periodicFetch, 6000)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
})

onUnmounted(() => {
  clearInterval(interval)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})
</script>
