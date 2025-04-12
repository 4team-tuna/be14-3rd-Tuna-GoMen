<template>
  <header class="header">
    <!-- 왼쪽: 로고 + 메뉴 묶음 -->
    <div class="left-group">
      <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" />
      <nav class="nav-links">
        <a href="#">자유 게시판</a>
        <a href="#">팀 모집 게시판</a>
        <a href="#">멘토링</a>
        <a href="#">멘토 리스트</a>
      </nav>
    </div>
    
    <!-- 오른쪽 -->
    <div class="actions">
      <img src="@/assets/icon-message.png" class="icon-message" @click="goToMail" />
      <img src="@/assets/icon-user.png" class="icon-user" @click="goToMyInfo" />
      <span>로그아웃</span>
    </div>
  </header>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const goToMail = () => {
    router.push('/mail')
  }

  const goToMyInfo = () => {
    router.push('/myPage');
  }
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