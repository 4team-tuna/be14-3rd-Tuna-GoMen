<!-- PostCard.vue -->
<template>
    <section class="post-card">
      <div class="post-header">
        <span class="tag">{{ post.tag }}</span>
        <h3 class="post-title">{{ post.title }}</h3>
        <div class="post-meta">
          <span class="writer">{{ post.writer }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="views">조회수 {{ post.views }}</span>
          <span class="report" @click="reportPost">🚨 신고</span>
        </div>
      </div>
  
      <p class="post-content" v-html="post.content" />
  
      <div class="post-actions">
        <span class="likes">❤️ {{ post.likes }}</span>
        <span class="bookmark">🔖</span>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({ post: Object })
  
  const reportPost = () => {
    alert('이 게시글을 신고하시겠습니까?')
  }
  </script>
  
  <style scoped>
  /* 기존 스타일 유지 */
  .post-meta {
    font-size: 12px;
    color: #777;
  }
  .post-meta span + span {
    margin-left: 10px;
  }
  .report {
    cursor: pointer;
    color: red;
    font-weight: bold;
  }
  </style>
  