import { createRouter, createWebHistory } from 'vue-router'

// 기존 자유게시판
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'

// 관리자 페이지들
import AdminHomePage from '@/views/Admin/AdminHomePage.vue'
import ReportPage from '@/views/Admin/ReportPage.vue'
import TitlePage from '@/views/Admin/TitlePage.vue'
import MentorRequestPage from '@/views/Admin/MentorRequestPage.vue'

const routes = [
  // 기본 진입시 관리자 홈으로 리다이렉트
  { path: '/', redirect: '/admin' },

  // 자유게시판
  { path: '/board/free', component: FreeBoardPage },

  // 관리자 페이지
  { path: '/admin', component: AdminHomePage },
  { path: '/admin/reports', component: ReportPage },
  { path: '/admin/titles', component: TitlePage },
  { path: '/admin/mentors', component: MentorRequestPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
