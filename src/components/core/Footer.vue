<template>
  <footer class="px-4 py-6">
    <div class="max-w-screen-xl mx-auto text-center space-y-3">
      <hr class="my-4 border-gray-200" />


      <div class="text-xs space-x-4 text-gray-500">
        <RouterLink to="/" class="underline hover:text-gray-700">Home</RouterLink>
        <RouterLink to="/about" class="underline hover:text-gray-700">About</RouterLink>
        <RouterLink to="/settings" class="underline hover:text-gray-700">Settings</RouterLink>
      </div>

      <p class="text-sm text-gray-600">
        © {{ date }} <span class="font-semibold">ElonSlapper</span> — by Angus
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const date = new Date().getFullYear()

</script>
