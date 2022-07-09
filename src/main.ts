import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Router from './router/index'
import { createPinia } from 'pinia'
import '@/assets/style.less'
const app = createApp(App)

// 应用以插件形式挂载Pinia实例
app.use(createPinia())
app.use(Router)
app.use(ElementPlus)
app.mount('#app')