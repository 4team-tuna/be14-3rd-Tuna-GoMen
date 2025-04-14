<template>
  <button class="floating-btn" @click="goToWritePage">
    ✏️
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const goToWritePage = () => {
  if (!userStore.isLogin) {
    alert('로그인 상태가 아닙니다. 로그인 후 글쓰기가 가능합니다.')
    return
  }
  router.push('/board/team-recruit/write')
}
</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background-color: #5D5FEF;
  color: white;
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  font-size: 28px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 50;
}

.floating-btn:hover {
  background-color: #4a4cd1;
  transform: scale(1.05);
}
</style>
