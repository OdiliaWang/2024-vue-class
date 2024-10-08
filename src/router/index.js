import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hw01',
      component: () => import('../views/OrderPractice.vue')
    }
    ,
    {
      path: '/hw02',
      component: () => import('../views/TodoView.vue')
    }
  ]
})

export default router
