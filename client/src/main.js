import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/http'

import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import 'element-ui/lib/theme-chalk/index.css';//引入全部的样式
// import Vue from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.use(ElementPlus)

// 引入所有的icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// Vue.prototype.$axios = axios;
app.config.globalProperties.$axios = axios;
