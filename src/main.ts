import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import Router from './router/index';
import { createPinia } from 'pinia';

import SvgIcon from '@/components/IconSvg.vue';
import '@/assets/styles/index.less';
import '/public/font/iconfont.js';

const app = createApp(App);
app.component('SvgIcon', SvgIcon);
// 应用以插件形式挂载Pinia实例
app.use(createPinia());
app.use(Router);
app.use(ElementPlus);
app.mount('#app');
