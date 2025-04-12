import { createRouter, createWebHistory } from 'vue-router'

// 기존 자유게시판
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import BoardView from '@/views/FreeBoard/BoardView.vue'
import WritePost from '@/views/FreeBoard/WritePost.vue'
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

const routes = [
<<<<<<< HEAD
  // 기본 진입시 관리자 홈으로 리다이렉트
  { path: '/', redirect: '/admin' },

  // 자유게시판
  { path: '/board/free', component: FreeBoardPage },

  // 관리자 페이지
  { path: '/admin', component: AdminHomePage },
  { path: '/admin/reports', component: ReportPage },
  { path: '/admin/titles', component: TitlePage },
  { path: '/admin/mentors', component: MentorRequestPage },
=======
  { path: '/board/free', component: FreeBoardPage },
  { path: '/mail', component: MessageInbox},
  { path: '/', component: StartPage},
  { path: '/signup', component: SignUpPage},
  { path: '/login', component: LoginPage},
  { path: '/main', component: MainPage},
  { path: '/myPage', component: MyPage},
  { path: '/changeInfo', component: EditProfile},
  // { path: '/', component: FindPasswordPage}
  { path: '/boards/free/:id', name: 'FreeBoardPage', component: FreeBoardPage },
  { path: '/boards/free', name: 'FreeBoardList', component: BoardView },
  {
    path: '/boards/free/write',name: 'WritePost',
    component: WritePost
  }
>>>>>>> be6c3d8a7e9cd84974ac82702cc2f2b2f479a9df
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
