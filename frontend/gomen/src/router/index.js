import { createRouter, createWebHistory } from 'vue-router'
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import BoardView from '@/views/FreeBoard/BoardView.vue'
import WritePost from '@/views/FreeBoard/WritePost.vue'


const routes = [
  { path: '/boards/free/:id', name: 'FreeBoardPage', component: FreeBoardPage },
  { path: '/boards/free', name: 'FreeBoardList', component: BoardView },
  {
    path: '/boards/free/write',name: 'WritePost',
    component: WritePost
  }
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
