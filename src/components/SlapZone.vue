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
          <span class="text-xl font-mono">{{globalSlaps}}</span>
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSlapStore } from '@/stores/slap'
import elonImage from '@/assets/elon.png'
import slappedImage from '@/assets/slapped.png'

const store = useSlapStore()
const currentImage = ref(elonImage)
const isCursorClicked = ref(false)

let timeout: ReturnType<typeof setTimeout> | null = null
const DEBOUNCE_DELAY = 2000 // Wait 2 seconds after last slap before sending
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

import Echo from '@/plugins/echo';

const globalSlaps = ref(0);

function handleSlapUpdate(event) {
  // Laravel is sending a JSON string in the `data` field
  try {
    const data = typeof event === 'string' ? JSON.parse(event) : event;
    if (data.global_slaps !== undefined) {
      globalSlaps.value = data.global_slaps;
      console.log('🔄 Updated global slaps:', data.global_slaps);
    }
  } catch (err) {
    console.error('Failed to parse slap update:', err);
  }
}

async function fetchGlobalSlaps() {
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/global-count`);
    const data = await res.json();
    if (data.count !== undefined) {
      globalSlaps.value = data.count;
      console.log('📦 Loaded initial slaps:', data.count);
    }
  } catch (err) {
    console.error('❌ Failed to fetch slaps:', err);
  }
}

onMounted(() => {
  fetchGlobalSlaps(); // Load immediately

  Echo.channel('slaps')
    .listen('.slap.updated', handleSlapUpdate);

  Echo.connector.pusher.connection.bind('connected', () => {
    console.log('✅ WebSocket connected');
  });
});

onUnmounted(() => {
  Echo.leave('slaps');
});

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
  }, DEBOUNCE_DELAY)
}

async function fetchUserId() {
  if (store.userId) return
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/create-user`, {
      method: 'POST',
    })
    const data = await res.json()
    if (res.ok && data.user_id) {
      store.setUserId(data.user_id)
    } else {
      console.error('Failed to fetch user ID', data)
    }
  } catch (err) {
    console.error('Error fetching user ID:', err)
  }
}

async function sendSlaps(count: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/slaps/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slap_count: count,
        user_id: store.userId,
      }),
    })

    if (res.ok) {
      store.markSubmitted()
    } else {
      console.warn('Failed to submit slaps, will retry later')
    }
  } catch (err) {
    console.error('Network error, will retry later', err)
  }
}

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
