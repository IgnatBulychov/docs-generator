import { createPinia } from "pinia";
import { createApp } from "vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./style.css";

import "virtual:svg-icons-register";

import i18n from "@/locales/index.js";

import App from "./App.vue";
import router from "./router";

import VIcon from "./components/icons/VIcon.vue";

const app = createApp(App);

app.component("VIcon", VIcon);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(i18n);

app.mount("#app");
