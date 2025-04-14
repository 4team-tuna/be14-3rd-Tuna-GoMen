import { createRouter, createWebHistory } from 'vue-router'

// 기존 자유게시판
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import BoardView from '@/views/FreeBoard/BoardView.vue'
import WritePost from '@/views/FreeBoard/WritePost.vue'
import EditPost from '@/views/FreeBoard/EditPost.vue'

// 팀모집 게시판
import TeamRecruitBoardPage from '@/views/teamRecruitBoard/TeamRecruitBoardPage.vue'
import TeamRecruitWritePage from '@/views/teamRecruitBoard/TeamRecruitWritePage.vue'

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

import MentorListPage from '@/views/MentorList/MentorListPage.vue'
// 관리자 페이지들
import AdminHomePage from '@/views/Admin/AdminHomePage.vue'
import ReportPage from '@/views/Admin/ReportPage.vue'
import TitlePage from '@/views/Admin/TitlePage.vue'
import MentorRequestPage from '@/views/Admin/MentorRequestPage.vue'

// ✅ 신고 페이지
import ReportForm from '@/views/Report/ReportForm.vue'

// 지원자 페이지
import ApplicantListPage from "@/views/Applicant/ApplicantListPage.vue";

// 별점 리뷰 페이지
import ReviewWritePage from '@/views/Review/ReviewWritePage.vue'

const routes = [
  { path: '/mail', component: MessageInbox},
  // 기본 진입 시 관리자 홈으로 리다이렉트
  // { path: '/', redirect: '/admin' },

  { path: '/', component: StartPage},
  { path: '/main', component: MainPage},


  // 자유게시판
  { path: '/boards/free/:id', name: 'FreeBoardPage', component: FreeBoardPage },
  { path: '/boards/free', name: 'FreeBoardList', component: BoardView },
  {
    path: '/boards/free/write',name: 'WritePost', component: WritePost
  },
  { path: '/boards/free/edit/:id', name: 'EditPost', component: EditPost },
  

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
  { path: '/report', name: 'ReportForm', component: ReportForm },

  // 팀 모집 게시판
  { path: '/board/team-recruit', name: 'TeamRecruitBoard', component: TeamRecruitBoardPage },
  { path: '/board/team-recruit/:id', name: 'TeamRecruitDetail',
    component: () => import('@/views/teamRecruitBoard/TeamRecruitBoardDetailPage.vue'),alias: '/recruit/:id' },

  // 지원자 리스트
  {
    path: '/board/team-recruit/:id/applicants',
    name: 'ApplicantList',
    component: ApplicantListPage
  },

// 팀모집 게시판 글쓰기 페이지
{
  path: '/board/team-recruit/write',
  name: 'TeamRecruitWritePage',
  component: () => import('@/views/teamRecruitBoard/TeamRecruitWritePage.vue'),
},

  { path: '/mentorlist', component: MentorListPage },
  {
    path: '/mentorlist/:id',
    name: 'MentorDetail',
    component: () => import('@/views/MentorList/MentorDetailPage.vue')
  },
  {
    path: '/mentorlist/add',
    name: 'MentorListAdd',
    component: () => import('@/views/MentorList/MentorListAddPage.vue') 
  },
  {
    path: '/mentorlist/status',
    name: 'MentorStatus',
    component: () => import('@/views/MentorList/MentorStatusPage.vue') 
  },

  // 별점 리뷰 페이지
  {
    path: '/review/write',
    name:'ReviewWritePage',
    component: () => import('@/views/Review/ReviewWritePage.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router