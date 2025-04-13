import { createRouter, createWebHistory } from 'vue-router'

// 기존 자유게시판
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import BoardView from '@/views/FreeBoard/BoardView.vue'
import WritePost from '@/views/FreeBoard/WritePost.vue'

// 메시지함 & 유저 관련
import MessageInbox from '@/components/message/MessageInbox.vue'
import LoginPage from '@/components/user/LoginPage.vue'
import FindIdPage from '@/components/user/FindIdPage.vue'
import FindPasswordPage from '@/components/user/FindPasswordPage.vue'
import SignUpPage from '@/components/user/SignUpPage.vue'
import StartPage from '@/components/user/StartPage.vue'
import MainPage from '@/components/user/MainPage.vue'
import MyPage from '@/components/user/MyPage.vue'
import EditProfile from '@/components/user/EditProfile.vue'

// 관리자 페이지들
import AdminHomePage from '@/views/Admin/AdminHomePage.vue'
import ReportPage from '@/views/Admin/ReportPage.vue'
import TitlePage from '@/views/Admin/TitlePage.vue'
import MentorRequestPage from '@/views/Admin/MentorRequestPage.vue'

// ✅ 신고 페이지
// import ReportFormPage from '@/views/Report/ReportPage.vue'

const routes = [
  // 기본 진입 시 관리자 홈으로 리다이렉트
  { path: '/', redirect: '/admin' },

  // 자유게시판
  { path: '/board/free', component: FreeBoardPage },
<<<<<<< HEAD
  { path: '/mail', component: MessageInbox},
  { path: '/', component: StartPage},
  { path: '/signUp', component: SignUpPage},
  { path: '/login', component: LoginPage},
  { path: '/findId', component:FindIdPage},
  { path: '/findPassword', component: FindPasswordPage},
  { path: '/main', component: MainPage},
  { path: '/myPage', component: MyPage},
  { path: '/changeInfo', component: EditProfile},
=======
>>>>>>> develop
  { path: '/boards/free/:id', name: 'FreeBoardPage', component: FreeBoardPage },
  { path: '/boards/free', name: 'FreeBoardList', component: BoardView },
  { path: '/boards/free/write', name: 'WritePost', component: WritePost },

  // 유저 관련
  { path: '/mail', component: MessageInbox },
  { path: '/signup', component: SignUpPage },
  { path: '/login', component: LoginPage },
  { path: '/main', component: MainPage },
  { path: '/myPage', component: MyPage },
  { path: '/changeInfo', component: EditProfile },
  { path: '/find-id', component: FindIdPage },
  { path: '/find-password', component: FindPasswordPage },
  { path: '/start', component: StartPage },

  // 관리자 페이지
  { path: '/admin', component: AdminHomePage },
  { path: '/admin/reports', component: ReportPage },
  { path: '/admin/titles', component: TitlePage },
  { path: '/admin/mentors', component: MentorRequestPage },

  // ✅ 신고 페이지
  // { path: '/report', name: 'ReportPage', component: ReportFormPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
