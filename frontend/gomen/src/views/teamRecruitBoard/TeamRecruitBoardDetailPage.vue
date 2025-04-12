<template>
    <div class="team-recruit-detail-page">
      <transition name="fade">
        <div class="alert" v-if="showAlert">모집 상태가 변경되었습니다</div>
      </transition>
  
      <main class="detail-container" v-if="post">
        <!-- 상단 제목 -->
        <h2 class="board-title">팀 모집 게시판</h2>
  
        <!-- 게시글 카드 -->
        <div class="post-card">
          <span class="status" :class="{ recruiting: post.isActivated === 'Y' }">
            {{ post.isActivated === 'Y' ? '모집중' : '모집완료' }}
          </span>
  
          <h3 class="post-title">{{ post.title }}</h3>
  
          <div class="post-info">
            <p>{{ post.nickname }}</p>
            <p>{{ formatDate(post.createdAt) }}</p>
          </div>
  
          <div class="post-content">
            <p>{{ post.teamIntroduce }}</p>
          </div>
  
          <!-- 이전/다음 버튼 -->
          <div class="button-group">
            <button class="action-button" :disabled="!prevPostId" @click="goToPost(prevPostId)">
              이전글
            </button>
            <button class="action-button" :disabled="!nextPostId" @click="goToPost(nextPostId)">
              다음글
            </button>
          </div>
        </div>
  
        <!-- 하단 버튼 -->
        <div class="button-group">
          <DeleteButton v-if="post" :postId="post.id" />
          <button class="action-button" @click="toggleActivation">
            {{ post.isActivated === 'Y' ? '모집 완료로 변경' : '모집중으로 변경' }}
          </button>
          <button class="action-button secondary" @click="goToList">목록</button>
        </div>
      </main>
  
      <div v-else class="loading">게시글을 불러오는 중...</div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import DeleteButton from '@/components/TeamRecruitBoard/DeleteButton.vue'
  
  const route = useRoute()
  const router = useRouter()
  
  const post = ref(null)
  const showAlert = ref(false)
  const prevPostId = ref(null)
  const nextPostId = ref(null)
  
  const fetchPost = async () => {
    const res = await fetch(`http://localhost:3001/teamRecruitPosts/${route.params.id}`)
    post.value = await res.json()
  
    if (post.value.isDeleted === 'Y') {
      alert('삭제된 게시글입니다.')
      router.push('/board/team-recruit')
    }
  }
  
  const fetchAdjacentPostIds = async () => {
    const res = await fetch('http://localhost:3001/teamRecruitPosts')
    const posts = await res.json()
    const currentIndex = posts.findIndex(p => p.id === Number(route.params.id))
  
    if (currentIndex !== -1) {
      prevPostId.value = posts[currentIndex - 1]?.id || null
      nextPostId.value = posts[currentIndex + 1]?.id || null
    }
  }
  
  const goToPost = (id) => {
    router.push(`/board/team-recruit/${id}`)
  }
  
  const toggleActivation = async () => {
    const newStatus = post.value.isActivated === 'Y' ? 'N' : 'Y'
  
    const res = await fetch(`http://localhost:3001/teamRecruitPosts/${post.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActivated: newStatus })
    })
  
    if (res.ok) {
      post.value.isActivated = newStatus
      showAlert.value = true
      setTimeout(() => {
        router.back()
      }, 1500)
    } else {
      alert('상태 변경에 실패했습니다.')
    }
  }
  
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString()
  const goToList = () => {
    router.push('/board/team-recruit')
  }
  
  onMounted(() => {
    fetchPost()
    fetchAdjacentPostIds()
  })
  </script>
  
  <style scoped>
  .team-recruit-detail-page {
    background: #f9f9fb;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .detail-container {
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .board-title {
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .post-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
  }
  
  .post-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
  
  .post-info {
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-between;
  }
  
  .post-content {
    font-size: 15px;
    line-height: 1.6;
    color: #444;
    white-space: pre-line;
  }
  
  .status {
    position: absolute;
    top: 16px;
    right: 20px;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 8px;
    background-color: #e0e7ff;
    color: #4f46e5;
  }
  
  .status:not(.recruiting) {
    background-color: #f3f4f6;
    color: #6b7280;
  }
  
  .recruiting {
    color: #4f46e5;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    gap: 1rem;
  }
  
  .action-button {
    padding: 0.6rem 1.2rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: #4f46e5;
  }
  
  .action-button.secondary {
    background-color: #6366f1;
    color: white;
  }
  
  .action-button.secondary:hover {
    background-color: #4f46e5;
  }
  
  .alert {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(74, 222, 128, 0.9);
    color: #fff;
    padding: 0.9rem 1.7rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    backdrop-filter: blur(4px);
  }
  
  .alert::after {
    content: '✔️';
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  