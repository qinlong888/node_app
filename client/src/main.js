import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/http'
// import Vue from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
app.use(ElementPlus)

// Vue.prototype.$axios = axios;
app.config.globalProperties.$axios = axios;
