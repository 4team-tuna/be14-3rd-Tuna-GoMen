<template>
  <div class="free-board-page">
    <main class="board-container">
      <h2 class="board-title">🌱 자유 게시판</h2>

      <router-link to="/boards/free" class="back-button">목록</router-link>

      <PostCard v-if="post" :post="post" />
      <CommentList v-if="post && post.comments.length" :comments="post.comments" />
      <CommentForm />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import PostCard from '@/components/freeboard/PostCard.vue'
import CommentList from '@/components/freeboard/CommentList.vue'
import CommentForm from '@/components/freeboard/CommentForm.vue'

const post = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const postId = route.params.id
    const res = await axios.get(`http://localhost:3001/allposts/${postId}`)
    post.value = res.data
    console.log('🔥 게시물:', post.value)
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
  margin-bottom: 4px;
}

.back-button {
  font-size: 12px;
  align-self: flex-end;
  background-color: #2563eb;
  color: white;
  padding: 8px 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 0;
  margin-bottom: 10px;
}

.back-button:hover {
  background-color: #1d4ed8;
}
</style>