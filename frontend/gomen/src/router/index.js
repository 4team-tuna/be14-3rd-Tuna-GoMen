import { createRouter, createWebHistory } from 'vue-router'
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


const routes = [
  { path: '/board/free', component: FreeBoardPage },
  { path: '/mail', component: MessageInbox},
  { path: '/', component: StartPage},
  { path: '/signup', component: SignUpPage},
  { path: '/login', component: LoginPage},
  { path: '/main', component: MainPage},
  { path: '/myPage', component: MyPage},
  { path: '/changeInfo', component: EditProfile}
  // { path: '/', component: FindPasswordPage}
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
