<template>
  <footer class="px-4 py-6">
    <div class="max-w-screen-xl mx-auto text-center space-y-2">
      <hr class="my-4 border-gray-200 dark:border-gray-700" />

      <p class="text-sm text-gray-600 dark:text-gray-400">
        © {{ date }} <span class="font-semibold">ElonSlapper</span> — by Angus 🥴
      </p>

      <p class="text-xs text-gray-500 dark:text-gray-500 font-mono">
        v{{ version }}
      </p>

      <div class="text-xs space-x-4 text-gray-500 dark:text-gray-500">
        <a href="/" class="underline hover:text-gray-700 dark:hover:text-gray-300">Home</a>
        <a href="/about" class="underline hover:text-gray-700 dark:hover:text-gray-300">About</a>
        <button @click="refresh" class="underline hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">
          Refresh
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import pkg from '../../../package.json'

const date = new Date().getFullYear()
const version = pkg.version

function refresh() {
  window.location.reload()
}
</script>
