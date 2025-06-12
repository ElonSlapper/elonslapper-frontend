<script setup lang="ts">
function donate() {
  // Replace with your real donation URL or logic
  window.open('https://www.paypal.com/donate', '_blank')
}
</script>

<template>
  <main class="bg-white text-gray-700">
    <section class="max-w-3xl mx-auto space-y-8">
      <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-left text-gray-900">
        About Us
      </h1>
      <p class="text-lg leading-relaxed text-left">
        Slap Elon is a simple, fun project created to bring a bit of lighthearted relief and community connection to anyone who needs it. We believe in playfulness and shared moments of joy in the digital age.
      </p>

      <section class="pt-8 border-t border-gray-200 max-w-xs">
        <h2 class="text-xl font-medium mb-4 text-gray-800 text-left">
          Support Us
        </h2>
        <p class="text-sm text-gray-600 mb-6 text-left">
          If you enjoy Slap Elon, consider supporting us to keep the project running and evolving.
        </p>
        <button
          class="w-full rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 transition"
          @click="donate"
          aria-label="Donate to Slap Elon"
        >
          Donate
        </button>
      </section>
    </section>
  </main>
</template>
