import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Toast
import 'vant/es/toast/style';
// Dialog
import 'vant/es/dialog/style';
// Notify
import 'vant/es/notify/style';
// ImagePreview
import 'vant/es/image-preview/style';

// 引入flexible 适配
import "./assets/flexible"
// 导入重置样式
import "./assets/reset.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
