import { createRouter, createWebHistory } from 'vue-router'
import FreeBoardPage from '@/views/FreeBoardPage.vue'

const routes = [
  { path: '/board/free', component: FreeBoardPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
