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
  padding: 0 40px; /* 좌우 패딩 추가해서 여백 조절 */
}


.comment-form textarea {
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
}

.comment-form button {
  margin-top: 10px;
  padding: 10px 16px;
  align-self: flex-end;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

  .comment-form button:hover {
    background-color: #3730a3;
  }
  </style>
  