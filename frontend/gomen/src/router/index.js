import { createRouter, createWebHistory } from 'vue-router'
import FreeBoardPage from '@/views/FreeBoard/FreeBoardPage.vue'
import MessageInbox from '@/components/message/MessageInbox.vue'
import LoginPage from '@/components/user/LoginPage.vue'
import FindIdPage from '@/components/user/FindIdPage.vue'
import FindPasswordPage from '@/components/user/FindPasswordPage.vue'
import SignUpPage from '@/components/user/SignUpPage.vue'
import StartPage from '@/components/user/StartPage.vue'
import MainPage from '@/components/user/MainPage.vue'


const routes = [
  { path: '/board/free', component: FreeBoardPage },
  { path: '/mail', component: MessageInbox},
  { path: '/', component: StartPage},
  { path: '/signup', component: SignUpPage},
  { path: '/login', component: LoginPage},
  { path: '/main', component: MainPage}
  // { path: '/', component: FindPasswordPage}
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
