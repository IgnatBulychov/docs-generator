import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/locales/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/pages/index.vue"),
      meta: { titleKey: "pages.index.title", layout: "default" },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const title = to.meta?.titleKey ? i18n.global.t(to.meta?.titleKey) : "App";
  document.title = title;
  next();
});

export default router;
