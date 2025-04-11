import { createRouter, createWebHistory } from 'vue-router'
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import MentorListPage from '@/views/MentorList/MentorListPage.vue'

const routes = [
  { path: '/board/free', component: FreeBoardPage },
  { path: '/mentorlist', component: MentorListPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
