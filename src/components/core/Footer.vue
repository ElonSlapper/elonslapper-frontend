<template>
    <footer class="m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © {{ date }} ElonSlapper – Made by Angus
            </span>
            <span class="block mt-2 text-xs text-gray-500 sm:text-center dark:text-gray-400 font-mono">
                {{ version }}
            </span>
        </div>
    </footer>
</template>

<script setup lang="ts">
import pkg from '../../../package.json'

const date = new Date().getFullYear()
const version = pkg.version
</script>
