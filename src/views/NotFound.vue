<script setup lang="ts">
import confusedImage from '@/assets/confused.jpg'
</script>

<template>
  <main>
    <section class="bg-white flex items-center justify-center">
      <div class="py-8 px-4 max-w-screen-md text-center">
        <img
          :src="confusedImage"
          alt="Confused Elon"
          class="mx-auto w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full mb-6 object-cover"
        />
        <h1 class="text-6xl sm:text-7xl lg:text-9xl font-extrabold text-red-700 mb-4">404</h1>
        <p class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Something's missing.
        </p>
        <p class="text-base sm:text-lg text-gray-500 mb-6">
          Bro, that page does not exist.
        </p>
        <a
          href="/"
          class="inline-block text-red-800 bg-red-200 hover:bg-red-300/80 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  transition"
        >
          Back to Homepage
        </a>
      </div>
    </section>
  </main>
</template>
