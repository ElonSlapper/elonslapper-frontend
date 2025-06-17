<template>
  <div class="flex flex-col items-center justify-center text-center space-y-2 py-4">
    <img
      src="@/assets/loading.png"
      alt="Loading..."
      class="animate-spin object-contain"
    />
    <p class="text-gray-600 text-lg font-medium flex gap-[1px] loading-text">
      Loading
      <span class="dot dot-1">.</span>
      <span class="dot dot-2">.</span>
      <span class="dot dot-3">.</span>
    </p>
  </div>
</template>

<style scoped>
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 2s linear infinite;
  transform-origin: center;
}

@keyframes blink {
  0%, 80%, 100% {
    visibility: hidden;
  }
  40% {
    visibility: visible;
  }
}

.dot {
  width: 0.25rem;
  animation: blink 1.4s infinite;
}
.dot-1 {
  animation-delay: 0s;
}
.dot-2 {
  animation-delay: 0.2s;
}
.dot-3 {
  animation-delay: 0.4s;
}
</style>
