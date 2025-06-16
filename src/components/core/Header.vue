
<script setup lang="ts">
import Logo from '@/components/core/Logo.vue';

</script>

<template>
  <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link to="/" class="flex items-center space-x-3 mx-auto">
          <span class="sr-only">Logo link to home</span>
          <Logo class="h-8" />
    </router-link>
    </div>
  </nav>

</template>
