import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(ElementPlus).use(router).useP.mount('#app')

// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
