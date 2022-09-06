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

export default router
