<!-- CommentList.vue -->
<template>
    <section class="comments">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <div class="comment-header">
          <strong>{{ comment.writer }}</strong>
          <span class="report" @click="reportComment(comment.id)">🚨 신고</span>
        </div>
        <p>{{ comment.content }}</p>
        <span class="comment-date">{{ comment.date }}</span>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({ comments: Array })
  
  const reportComment = (id) => {
    alert(`댓글 (ID: ${id})을 신고하시겠습니까?`)
  }
  </script>
  
  <style scoped>
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .report {
    font-size: 12px;
    cursor: pointer;
    color: red;
    font-weight: bold;
  }
  </style>
  