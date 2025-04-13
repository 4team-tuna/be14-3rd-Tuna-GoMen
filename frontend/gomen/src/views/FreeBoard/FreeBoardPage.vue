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
  import PostCard from '@/components/freeboard/PostCard.vue'
  import CommentList from '@/components/freeboard/CommentList.vue'
  import CommentForm from '@/components/freeboard/CommentForm.vue'
  
  const post = ref(null)
  const comments = ref([])
  
  onMounted(async () => {
  try {
    const postId = Number(route.params.id) // 문자열을 숫자로 변환!
    const postRes = await axios.get(`http://localhost:3001/allposts/${postId}`)
    post.value = postRes.data

    console.log('🔥 게시물과 댓글:', post.value)
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
  max-width: 1000px;
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 5px;
}

.board-title {
  font-size: 30px;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom:4px;
}

.back-button {
  font-size: 12px;
  align-self: flex-end;
  background-color: #2563eb; /* Tailwind 기준으로는 'blue-600' */
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top:0;
  margin-bottom:10px;
}

.back-button:hover {
  background-color: #1d4ed8; /* 더 진한 파란색 */
}

</style>
