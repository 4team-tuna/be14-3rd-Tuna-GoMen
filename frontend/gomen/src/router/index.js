import { createRouter, createWebHistory } from 'vue-router'
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import TeamRecruitBoardPage from '@/views/teamRecruitBoard/TeamRecruitBoardPage.vue'

const routes = [
  { path: '/board/free', component: FreeBoardPage },
  { path: '/board/team-recruit', name: 'TeamRecruitBoard', component: TeamRecruitBoardPage },
  { path: '/board/team-recruit/:id', name: 'TeamRecruitDetail',
    component: () => import('@/views/teamRecruitBoard/TeamRecruitBoardDetailPage.vue'),alias: '/recruit/:id' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
