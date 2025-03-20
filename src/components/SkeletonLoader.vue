<template>
  <div class="skeleton-loader" :style="loaderStyles"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '20px',
  },
  borderRadius: {
    type: String,
    default: '4px',
  },
});

const loaderStyles = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius,
}));
</script>

<style scoped>
.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
