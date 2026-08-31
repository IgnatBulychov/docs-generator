import ru from "./ru.json";
import en from "./en.json";

import { createI18n } from "vue-i18n";

const messages = Object.assign({
  ru: ru,
  en: en,
});

const STORAGE_KEY = "docs-generator-locale";

function getInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "ru" || saved === "en") {
    return saved;
  }
  return "en";
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: "en",
  messages,
});

export function setLocale(locale) {
  i18n.global.locale.value = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}

export default i18n;
