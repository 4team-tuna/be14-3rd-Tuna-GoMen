import { createRouter, createWebHistory } from 'vue-router'

// 기존 자유게시판
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import BoardView from '@/views/FreeBoard/BoardView.vue'
import WritePost from '@/views/FreeBoard/WritePost.vue'

// 팀모집 게시판
import TeamRecruitBoardPage from '@/views/teamRecruitBoard/TeamRecruitBoardPage.vue'

// 메시지함 & 유저 관련
import MessageInbox from '@/views/Message/MessageInbox.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
import FindIdPage from '@/views/Login/FindIdPage.vue'
import FindPasswordPage from '@/views/Login/FindPasswordPage.vue'
import SignUpPage from '@/views/Login/SignUpPage.vue'
import StartPage from '@/views/StartPage.vue'
import MainPage from '@/views/MainPage.vue'
import MyPage from '@/views/MyInfo/MyPage.vue'
import EditProfile from '@/views/MyInfo/EditProfile.vue'

// 관리자 페이지들
import AdminHomePage from '@/views/Admin/AdminHomePage.vue'
import ReportPage from '@/views/Admin/ReportPage.vue'
import TitlePage from '@/views/Admin/TitlePage.vue'
import MentorRequestPage from '@/views/Admin/MentorRequestPage.vue'

// ✅ 신고 페이지
// import ReportFormPage from '@/views/Report/ReportPage.vue'

// 지원자 페이지
import ApplicantListPage from "@/views/Applicant/ApplicantListPage.vue";

const routes = [
  // 기본 진입 시 관리자 홈으로 리다이렉트
  // { path: '/', redirect: '/admin' },
  { path: '/', component: StartPage},
  { path: '/main', component: MainPage},


  // 자유게시판
  { path: '/board/free', component: FreeBoardPage },
  { path: '/boards/free/:id', name: 'FreeBoardPage', component: FreeBoardPage },
  { path: '/boards/free', name: 'FreeBoardList', component: BoardView },
  {
    path: '/boards/free/write',name: 'WritePost', component: WritePost
  },

  // 유저 관련
  { path: '/signUp', component: SignUpPage},
  { path: '/login', component: LoginPage },
  { path: '/myPage', component: MyPage },
  { path: '/changeInfo', component: EditProfile},
  { path: '/findId', component:FindIdPage},
  { path: '/findPassword', component: FindPasswordPage},

  // 쪽지 관련
  { path: '/mail', component: MessageInbox},

  // 관리자 페이지
  { path: '/admin', component: AdminHomePage },
  { path: '/admin/reports', component: ReportPage },
  { path: '/admin/titles', component: TitlePage },
  { path: '/admin/mentors', component: MentorRequestPage },

    // ✅ 신고 페이지
  // { path: '/report', name: 'ReportPage', component: ReportFormPage }

  // 팀 모집 게시판
  { path: '/board/team-recruit', name: 'TeamRecruitBoard', component: TeamRecruitBoardPage },
  { path: '/board/team-recruit/:id', name: 'TeamRecruitDetail',
    component: () => import('@/views/teamRecruitBoard/TeamRecruitBoardDetailPage.vue'),alias: '/recruit/:id' },

  // 지원자 리스트
  {
    path: '/board/team-recruit/:id/applicants',
    name: 'ApplicantList',
    component: ApplicantListPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
