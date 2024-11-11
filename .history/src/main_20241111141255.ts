import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import piniaPersist from "pinia-plugin-persist";
// 引入 Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入 Element Plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(piniaPersist);
import myConfirm from "./utils/myConfirm";
const app = createApp(App);
app.config.globalProperties.$myConfirm = myConfirm;
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(ElementPlus).use(router).use(pinia).mount("#app");


// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}