import { createRouter, createWebHistory } from 'vue-router'
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import BoardView from '@/views/FreeBoard/BoardView.vue'

const routes = [
  { path: '/board/free/:id', name: 'FreeBoardPage', component: FreeBoardPage },
  { path: '/boards/free', name: 'FreeBoardList', component: BoardView }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
