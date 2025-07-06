<template>
  <div class="flex flex-col items-center gap-y-5 md:gap-y-10 min-h-screen">
    <div class="flex flex-col items-center gap-y-5 md:gap-y-10">
      <SlapCount :count="formattedStoreCount" />
      <SlapImage
        :image="currentImage"
        :isClicked="isCursorClicked"
        @slap="slap"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SlapImage from './SlapImage.vue'
import SlapCount from './SlapCount.vue'

import { useSlapStore } from '@/stores/slap'
import elonImage from '@/assets/elon.jpg'
import slappedImage from '@/assets/slapped.jpg'

const store = useSlapStore()

const currentImage = ref(elonImage)
const isCursorClicked = ref(false)


const formattedStoreCount = computed(() => store.count.toLocaleString())

let slapTimeout = 0
let lastSlapTime = 0

function slap() {
  store.slap()

  const now = Date.now()
  const timeSinceLastSlap = now - lastSlapTime
  lastSlapTime = now

  const fastSlap = timeSinceLastSlap < 300
  const animationDuration = fastSlap ? 80 : 200

  clearTimeout(slapTimeout)

  currentImage.value = slappedImage
  isCursorClicked.value = true

  slapTimeout = setTimeout(() => {
    currentImage.value = elonImage
    isCursorClicked.value = false
  }, animationDuration)
}

</script>
