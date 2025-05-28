<template>
  <div class="container mx-auto text-center p-8">
    <div class="flex flex-col items-center">
      <img
        :src="currentImage"
        alt="Elon Musk"
        class="w-80 h-80 rounded-full mb-6  cursor-pointer transition duration-200"
        @click="slap"
      />
      <p class="mt-4 text-lg">
        You've slapped Elon <strong>{{ store.count }}</strong> times.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSlapStore } from '../stores/slap'
import elonImage from '@/assets/elon.png'
import slappedImage from '@/assets/slapped.png'

const store = useSlapStore()
const currentImage = ref(elonImage)

function slap() {
  store.slap()
  currentImage.value = slappedImage
  setTimeout(() => {
    currentImage.value = elonImage
  }, 150)
}
</script>

<style scoped>
img {
  object-fit: cover;
}
</style>
