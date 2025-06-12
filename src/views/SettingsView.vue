<script setup lang="ts">
import MainButton from '@/components/MainButton.vue'
import pkg from '../../package.json'
import { useSlapStore } from '@/stores/slap'
import { onMounted, ref } from 'vue'

const store = useSlapStore()

const version = ref('unknown')
const userId = ref('unknown')

// On mount, check for updates
onMounted(() => {
  version.value = pkg.version || 'unknown'
  userId.value = store.getUserId() || 'unknown'
})

function forceUpdate() {
  window.location.reload()
}

function clearAllData() {
  const confirmed = window.confirm('Are you sure you want to clear all data? This cannot be undone.')
  if (confirmed) {
    store.reset()
    window.location.reload()
  }
}
</script>

<template>
  <div>
    <div class="px-4 sm:px-0">
      <h1 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Settings</h1>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">App Version</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 font-mono">{{ version }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Device ID</dt>
          <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0 font-mono">{{ userId }}</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-gray-900">Actions</dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div class="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 sm:items-center">
              <MainButton @click="forceUpdate">Force update</MainButton>
              <MainButton variant="danger" @click="clearAllData">Clear all data</MainButton>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
