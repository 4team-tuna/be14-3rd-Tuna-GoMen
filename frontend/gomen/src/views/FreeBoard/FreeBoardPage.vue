<template>
    <div class="free-board-page">
  
      <main class="board-container">
        <h2 class="board-title">자유 게시판</h2>
  
        <PostCard v-if="post" :post="post" />
  
        <CommentList v-if="comments.length" :comments="comments" />
        <CommentForm />
      </main>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  // 공통 컴포넌트
  import PostCard from '@/components/PostCard.vue'
  import CommentList from '@/components/CommentList.vue'
  import CommentForm from '@/components/CommentForm.vue'
  
  const post = ref(null)
  const comments = ref([])
  
  onMounted(async () => {
  try {
    const postRes = await axios.get('/api/posts/1')
    post.value = postRes.data

    const commentRes = await axios.get('/api/comments?postId=1')
    comments.value = commentRes.data

    console.log('🔥 댓글 목록:', comments.value)
  } catch (error) {
    console.error('데이터 로딩 실패:', error)
  }
})

  </script>
  
  <style scoped>
  .free-board-page {
    background: #f9f9fb;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .board-container {
  width: 100%;
  max-width: 1200px; /* 필요시 늘릴 수 있음 */
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

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
  </style>
  