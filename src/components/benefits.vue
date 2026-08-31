<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
    <div class="benefit-card">
      <div class="benefit-icon">
        <VIcon name="flash" class="size-6" />
      </div>

      <h3 class="benefit-title">{{ t("benefits.speed.title") }}</h3>

      <p class="benefit-desc">{{ t("benefits.speed.description") }}</p>
    </div>

    <div class="benefit-card">
      <div class="benefit-icon">
        <VIcon name="lock" class="size-6" />
      </div>

      <h3 class="benefit-title">{{ t("benefits.privacy.title") }}</h3>

      <p class="benefit-desc">{{ t("benefits.privacy.description") }}</p>
    </div>

    <div class="benefit-card">
      <div class="benefit-icon">
        <VIcon name="settings" class="size-6" />
      </div>

      <h3 class="benefit-title">{{ t("benefits.flexibility.title") }}</h3>

      <p class="benefit-desc">{{ t("benefits.flexibility.description") }}</p>
    </div>
  </div>
</template>

<style scoped>
.benefit-card {
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 12px 32px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  margin-bottom: 1rem;
}

.benefit-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.benefit-desc {
  margin-top: 0.5rem;
  line-height: 1.6;
  color: #6b7280;
}
</style>
