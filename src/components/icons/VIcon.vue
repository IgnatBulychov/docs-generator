<script setup>
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: true },
});

const symbolId = computed(() => `#icon-${props.name}`);
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  aspect-ratio: 1 / 1;
  fill: currentColor;
  flex-shrink: 0;
}
</style>
