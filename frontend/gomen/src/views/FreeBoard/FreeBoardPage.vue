<template> 
  <div class="free-board-page">
    <main class="board-container">
      <h2 class="board-title">🌱 자유 게시판</h2>

      <router-link to="/boards/free" class="back-button">목록</router-link>

      <PostCard v-if="post && post.category && post.title" :post="post" :isAuthor="isAuthor" />
      
      <!-- 🔥 댓글 목록 -->
      <CommentList
  v-if="post && Array.isArray(post.comments)"
  :key="post.comments.length"
  :comments="post.comments"
  @edit-comment="handleEditComment"
  @delete-comment="handleDeleteComment"
  @add-reply="handleAddReply"
/>
    <!-- 댓글 폼 -->
    <CommentForm  @add-comment="handleAddComment" />
  </main>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import PostCard from '@/components/freeboard/PostCard.vue'
import CommentList from '@/components/freeboard/CommentList.vue'
import CommentForm from '@/components/freeboard/CommentForm.vue'

const post = ref(null)
const route = useRoute()
const postId = route.params.id
const user = JSON.parse(localStorage.getItem('user'))

// ✔ 작성자인지 여부
const isAuthor = computed(() => {
  return post.value && user && post.value.author === user.nickname
})

// ✔ 게시글 데이터 로딩
onMounted(async () => {
  await fetchPost()
})

const fetchPost = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/allposts/${postId}`)
    post.value = res.data
  } catch (error) {
    console.error('데이터 로딩 실패:', error)
  }
}

// ✅ 댓글 수정
const handleAddComment = async (newComment) => {
  const updatedComments = [...post.value.comments, newComment]

  await axios.put(`http://localhost:3001/allposts/${postId}`, {
    ...post.value,
    comments: updatedComments
  })

  post.value = { ...post.value, comments: updatedComments }
}

const handleDeleteComment = async (id) => {
  console.log('삭제 처리 시작:', id)

  const updatedComments = post.value.comments.filter(
    (comment) => String(comment.id) !== String(id)
  )

  console.log('업데이트된 댓글 목록:', updatedComments)

  try {
    await axios.put(`http://localhost:3001/allposts/${postId}`, {
      ...post.value,
      comments: updatedComments,
    })

    console.log('서버 업데이트 완료')
    post.value.comments = JSON.parse(JSON.stringify(updatedComments))
    console.log('post.value.comments 갱신됨')
  } catch (error) {
    console.error('삭제 에러:', error)
  }
}



// ✅ 대댓글 추가
const handleAddReply = async ({ commentId, reply }) => {
  const updatedComments = post.value.comments.map(comment =>
    comment.id === commentId
      ? { ...comment, replies: [...(comment.replies || []), reply] }
      : comment
  )

  await axios.put(`http://localhost:3001/allposts/${postId}`, {
    ...post.value,
    comments: updatedComments
  })

  post.value.comments = updatedComments
}

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
