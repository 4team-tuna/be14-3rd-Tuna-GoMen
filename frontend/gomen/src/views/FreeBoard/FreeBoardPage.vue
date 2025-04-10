<template>
    <div class="free-board-page">
      <Header />
  
      <main class="board-container">
        <h2 class="board-title">자유 게시판</h2>
  
        <PostCard v-if="post" :post="post" />
  
        <CommentList :comments="comments" />
        <CommentForm />
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  // 공통 컴포넌트
  import Header from '@/components/common/Header.vue'
  import Footer from '@/components/common/Footer.vue'
  import PostCard from '@/components/PostCard.vue'
  import CommentList from '@/components/CommentList.vue'
  import CommentForm from '@/components/CommentForm.vue'
  
  const post = ref(null)
  const comments = ref([])
  
  onMounted(async () => {
    const postRes = await axios.get('http://localhost:3001/posts/1')
    post.value = postRes.data
  
    const commentRes = await axios.get('http://localhost:3001/comments?postId=1')
    comments.value = commentRes.data
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
    max-width: 800px;
    margin: 40px auto;
    padding: 0 16px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  .board-title {
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  </style>
  