import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

import Register from '../views/Register.vue'

import NotFound from '../views/404.vue'

import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // ...
  const isLogin = localStorage.token ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    // 登陆界面和注册界面，直接通行
    next();
  } else {
    // 如果已经登录，直接通行
    isLogin ? next() : next('/login');
  }
  // 返回 false 以取消导航
  // return false
})

export default router
