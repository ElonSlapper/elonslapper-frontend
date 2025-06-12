<template>
  <img
    :src="image"
    alt="Elon"
    :class="[
      'h-70 w-70 md:w-80 md:h-80 rounded-full transition duration-200 touch-manipulation select-none pointer-events-auto stop-long-press',
      isClicked ? 'cursor-clicked' : 'custom-cursor'
    ]"
    @click="onClick"
  />
</template>

<script setup lang="ts">
defineProps<{
  image: string
  isClicked: boolean
}>()

const emit = defineEmits(['slap'])

function onClick() {
  emit('slap')
}
</script>

<style scoped>
img {
  object-fit: cover;
}

.custom-cursor {
  cursor: url('/cursor.png') 16 16, pointer;
}
.cursor-clicked {
  cursor: url('/cursor-slap.png') 16 16, pointer;
}

.stop-long-press {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
</style>
