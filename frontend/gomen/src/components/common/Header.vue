<template>
  <header class="header">
    <!-- 왼쪽: 로고 + 메뉴 묶음 -->
    <div class="left-group">
      <img src="@/assets/gomen-logo.png" alt="GoMen Logo" class="logo" />
      <nav class="nav-links">
  <router-link to="/boards/free">자유 게시판</router-link>
  <router-link to="#">팀 모집 게시판</router-link>
  <router-link to="#">멘토링</router-link>
  <router-link to="#">멘토 리스트</router-link>
</nav>
    </div>
    
    <!-- 오른쪽 -->
    <div class="actions">
      <img src="@/assets/icon-message.png" class="icon-message" />
      <img src="@/assets/icon-user.png" class="icon-user" />
      <span>로그아웃</span>
    </div>
  </header>
</template>

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

</style>

