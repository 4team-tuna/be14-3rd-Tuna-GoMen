<template>
    <div class="comment-form">
      <textarea placeholder="댓글을 남겨보세요." rows="3" v-model="commentText" />
      <button @click="submitComment">등록</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const commentText = ref('')
  
  const submitComment = () => {
    if (!commentText.value.trim()) return
    alert(`댓글 등록: ${commentText.value}`)
    commentText.value = ''
  }
  </script>
  
  <style scoped>
  .comment-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  .comment-form textarea {
    padding: 10px;
    font-size: 14px;
    resize: none;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  .comment-form button {
    align-self: flex-end;
    margin-top: 8px;
    padding: 8px 16px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }
  .comment-form button:hover {
    background-color: #3730a3;
  }
  </style>
  