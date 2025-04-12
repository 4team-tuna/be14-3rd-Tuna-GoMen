<template>
  <header class="header">
    <!-- 왼쪽: 로고 + 메뉴 묶음 -->
    <div class="left-group">
      <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" @click="goToMainPage"/>
      <nav class="nav-links">
  <router-link to="/boards/free">자유 게시판</router-link>
  <router-link to="/team">팀 모집 게시판</router-link>
  <router-link to="/mentoring">멘토링</router-link>
  <router-link to="/mentorlist">멘토 리스트</router-link>
</nav>
    </div>
    
    <!-- 오른쪽 -->
    <div class="actions">
      <img v-if="isLogin" src="@/assets/icon-message.png" class="icon-message" @click="goToMail" />
      <img v-if="isLogin" src="@/assets/icon-user.png" class="icon-user" @click="goToMyInfo" />
      <button v-if="isLogin" @click="openLogOutModal">로그아웃</button>
    </div>
  </header>

  <LogOutModal
  v-if="showModal"
        @close="closeLogOutModal"
        @confirm="logout"
  />
</template>



<script setup>
  import LogOutModal from '../message/LogOutModal.vue';
  import { useRouter } from 'vue-router';
  import {ref, watchEffect} from 'vue';

  const isLogin = ref(localStorage.getItem('isLogin') === 'true')
  watchEffect(() => {
  isLogin.value = localStorage.getItem('isLogin') === 'true'
})
  const router = useRouter();
  const showModal = ref(false);
  const openLogOutModal = () => {showModal.value = true;}
  const closeLogOutModal = () => {
    showModal.value = false;
  }

  const goToMainPage = () => {router.push('/main')}
  const goToMail = () => {router.push('/mail')}
  const goToMyInfo = () => {router.push('/myPage');}
  const logout = () => {
    localStorage.removeItem('isLogin') // 로그아웃 시 제거해주는 것도 좋음!
    isLogin.value = false;
    router.push('/')
    closeLogOutModal();
  };
</script>



<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
}

.left-group {
  display: flex;
  align-items: center;
  gap: 32px; /* 로고와 메뉴 사이 간격 */
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  height: 100px;
  width: auto;
}

.icon-message {
  height: 24px;
  width: auto;
  object-fit: contain;
  
}

.icon-user{
  height: 32px;
  width: auto;
  object-fit: contain;
}

.icon-message,
.icon-user {
  filter: brightness(0) saturate(100%) invert(64%) sepia(6%) saturate(512%) hue-rotate(174deg) brightness(102%) contrast(91%);
  transition: filter 0.2s ease-in-out;
  cursor: pointer;
}

.icon-message:hover,
.icon-user:hover {
  filter: brightness(1.2) saturate(130%) invert(64%) sepia(6%) saturate(512%) hue-rotate(174deg) brightness(102%) contrast(91%);
}

</style>