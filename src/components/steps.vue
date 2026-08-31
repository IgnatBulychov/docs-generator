<script setup>
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const steps = [
  {
    number: "1",
    image: "template.svg",
    titleKey: "steps.step1.title",
    descKey: "steps.step1.description",
  },
  {
    number: "2",
    image: "excel.svg",
    titleKey: "steps.step2.title",
    descKey: "steps.step2.description",
  },
  {
    number: "3",
    image: "result.svg",
    titleKey: "steps.step3.title",
    descKey: "steps.step3.description",
  },
];
</script>

<template>
  <div class="steps-heading">{{ t("steps.heading") }}</div>

  <div class="mt-8 flex flex-col gap-6">
    <div v-for="step in steps" :key="step.number" class="step-card">
      <div class="step-number">{{ step.number }}</div>

      <div class="step-image">
        <img :src="`/images/steps/${locale}/${step.image}`" :alt="t(step.titleKey)" />
      </div>

      <div class="flex-1">
        <h3 class="step-title">{{ t(step.titleKey) }}</h3>
        <p class="step-desc">{{ t(step.descKey) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.steps-heading {
  margin: 3rem 0 1.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 2rem;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 12px 32px rgba(0, 0, 0, 0.1);
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #9ca3af;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-image {
  padding: 1rem;
  width: 100%;
  max-width: 24rem;
  display: flex;
  justify-content: center;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.step-desc {
  margin-top: 0.5rem;
  line-height: 1.6;
  color: #6b7280;
}

@media (min-width: 768px) {
  .step-card {
    flex-direction: row;
    gap: 2.5rem;
  }

  .step-image {
    width: 50%;
    max-width: none;
  }
}
</style>
