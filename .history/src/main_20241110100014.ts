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
const app = createApp(App);

app.use(ElementPlus).use(router).use(pinia).mount("#app");
app.use(ElementPlus, {
  locale: zhCn,
});

// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
