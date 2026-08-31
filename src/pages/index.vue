<script setup>
import { useI18n } from "vue-i18n";
import { setLocale } from "@/locales/index.js";
import Benefits from "@/components/Benefits.vue";
import Steps from "@/components/Steps.vue";
import DocGenerator from "@/components/DocGenerator.vue";

const { t, locale } = useI18n();

function switchLocale(lang) {
  setLocale(lang);
}
</script>

<template>
  <div class="container mx-auto mt-6">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex justify-end mb-4">
        <a-segmented
          :value="locale"
          :options="[
            { label: 'RU', value: 'ru' },
            { label: 'EN', value: 'en' },
          ]"
          @change="switchLocale"
        />
      </div>

      <div class="hero text-center">
        <h1 class="hero-title">{{ t("pages.index.title") }}</h1>

        <p class="hero-subtitle">
          {{ t("pages.index.subtitle") }} <br />
          {{ t("pages.index.subtitleLine2") }}
          <br />{{ t("pages.index.subtitleLine3") }}
        </p>
      </div>

      <Benefits />

      <DocGenerator />

      <Steps />
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding: 3.5rem 1.5rem 2.5rem;
  border-radius: 1.5rem;
  background: linear-gradient(180deg, #fafafa 0%, #f3f4f6 100%);
  border: 1px solid #e5e7eb;
}

.hero-title {
  margin-top: 1.5rem;
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #111827;
}

.hero-subtitle {
  margin-top: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #4b5563;
}
</style>
