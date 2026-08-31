<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/default.vue";

const layouts = {
  default: DefaultLayout,
};

const route = useRoute();

const layout = computed(() => {
  return layouts[route.meta.layout || "empty"];
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
