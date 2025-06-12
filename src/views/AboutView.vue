<script setup lang="ts">
import BackButton from '@/components/BackButton.vue';

</script>

<template>
  <BackButton page="About" class="mb-10" />
  <div class="mx-auto">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h1 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">About</h1>
      <p class="mt-6 text-lg/8 text-gray-600">
        ElonSlapper is a small, light-hearted app that lets you slap Elon.
      </p>
    </div>

    <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <div>
        <dt class="font-semibold text-gray-900">Built for fun</dt>
        <dd class="mt-1 text-gray-600">
          Slap Elon with a single click. It’s a simple.
        </dd>
      </div>

      <div>
        <dt class="font-semibold text-gray-900">No data tracking</dt>
        <dd class="mt-1 text-gray-600">
          We don’t want your data. Your slaps are anonymous and private. No tracking cookies, no analytics, just pure slap joy.
        </dd>
      </div>

      <div>
        <dt class="font-semibold text-gray-900">Global slap count</dt>
        <dd class="mt-1 text-gray-600">
          All slaps count toward a global total, updated every few seconds.
        </dd>
      </div>

      <div>
        <dt class="font-semibold text-gray-900">Rankings</dt>
        <dd class="mt-1 text-gray-600">
          Your slaps contribute to your rank on the global leaderboard. This leaderboard is updated every few minutes, so you can see how you stack up against other slap enthusiasts.
        </dd>
      </div>

      <div>
        <dt class="font-semibold text-gray-900">Free</dt>
        <dd class="mt-1 text-gray-600">
          There are no subscriptions, ads, or upgrades. It’s just a slap button with a leaderboard. That's it.
        </dd>
      </div>

      <div>
        <dt class="font-semibold text-gray-900">Support it?</dt>
        <dd class="mt-1 text-gray-600">
          If you like this app and want to support its development, you can buy me a coffee. It helps keep the servers running and the slaps coming. <br>
          <a
            href="https://coff.ee/angus_turtle"
            target="_blank"
            rel="noopener noreferrer"
            class="block mt-2 inline-block text-yellow-600 underline hover:text-yellow-700 transition"
          >
            ☕ Buy me a coffee
          </a>
        </dd>
      </div>
    </dl>
  </div>
</template>
